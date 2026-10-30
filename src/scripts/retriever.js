// Hybrid retriever running in the browser.
// Ranker 1: BM25 over word tokens (+ chunk metadata keywords).
// Ranker 2: TF-IDF cosine over character trigrams (robust to typos and FR/EN variants).
// Fusion: Reciprocal Rank Fusion (k = 60). Results keep full provenance.
(function () {
  var data = JSON.parse(document.getElementById('rag-data').textContent);
  var corpus = data.corpus;
  var UI = data.ui;
  var API = data.api || '';

  var STOP = new Set(('a an the and or of to in on for with by from at as is are was were be been it its this that these those how what which who do does did you your i my me we our about into than then there their they them can could would should has have had not no yes ' +
    'le la les un une des du de d l et ou en au aux pour par sur dans avec sans que qui quoi comment est sont etait ete etre ce cette ces son sa ses vous votre vos je mon ma mes nous notre nos il elle ils elles a ne pas plus quel quelle quels quelles avez avoir fait faire').split(' '));

  // FR → EN bridges so French questions reach English metadata too.
  var BRIDGE = {
    qualite: 'quality', donnee: 'data', donnees: 'data', recherche: 'search', outil: 'tool', outils: 'tools',
    echelle: 'scale', grande: 'large', volume: 'volumes', hallucination: 'grounding', hallucinations: 'grounding',
    limiter: 'grounding', reduire: 'grounding', vectoriel: 'vector', vectorielle: 'vector', agent: 'agents',
    migration: 'migration', experience: 'experience', formation: 'education', diplome: 'education', langue: 'languages',
    langues: 'languages', anglais: 'english', francais: 'french', securite: 'security', confidentialite: 'privacy',
    souverainete: 'sovereignty', decoupage: 'chunking', citer: 'citation', source: 'citation', sources: 'citation',
    tracabilite: 'traceability', hybride: 'hybrid', vecteur: 'vector', vecteurs: 'vector', donne: 'data'
  };
  var EXPAND = {
    hallucination: ['grounding', 'citation'], hallucinations: ['grounding', 'citation'], grounding: ['citation'],
    vector: ['qdrant', 'chromadb', 'embeddings'], vectors: ['qdrant', 'embeddings'], embedding: ['embeddings'],
    agent: ['agents'], tool: ['tools'], llm: ['genai'], rag: ['retrieval'], quality: ['reconciliation'],
    privacy: ['local', 'premise'], sovereignty: ['local', 'premise'], cite: ['citation'], sources: ['citation']
  };

  function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ' ');
  }
  function stem(w) {
    if (w.length > 4 && /(ies)$/.test(w)) return w.slice(0, -3) + 'y';
    if (w.length > 3 && /[sx]$/.test(w) && !/ss$/.test(w)) return w.slice(0, -1);
    return w;
  }
  function tokens(s) {
    return norm(s).split(/[^a-z0-9]+/).filter(function (w) { return w.length > 1 && !STOP.has(w); });
  }
  function queryTokens(q) {
    var out = [];
    tokens(q).forEach(function (w) {
      out.push(w);
      if (BRIDGE[w]) out.push(BRIDGE[w]);
      var e = EXPAND[w] || EXPAND[BRIDGE[w]];
      if (e) e.forEach(function (x) { out.push(x); });
    });
    return out.map(stem);
  }
  function trigrams(s) {
    var t = ' ' + norm(s).replace(/[^a-z0-9]+/g, ' ').trim() + ' ';
    var m = new Map();
    for (var i = 0; i < t.length - 2; i++) {
      var g = t.substr(i, 3);
      m.set(g, (m.get(g) || 0) + 1);
    }
    return m;
  }

  // ---- Build both indexes for one language ----
  var indexes = {};
  function buildIndex(lang) {
    var docs = corpus.map(function (c) {
      var words = tokens(c.text[lang] + ' ' + c.keywords).map(stem);
      return { c: c, words: words, len: words.length, tf: count(words), tri: trigrams(c.text[lang]) };
    });
    var N = docs.length, df = new Map(), tdf = new Map(), avg = 0;
    docs.forEach(function (d) {
      avg += d.len;
      d.tf.forEach(function (_, w) { df.set(w, (df.get(w) || 0) + 1); });
      d.tri.forEach(function (_, g) { tdf.set(g, (tdf.get(g) || 0) + 1); });
    });
    avg /= N;
    docs.forEach(function (d) {
      var v = new Map(), n = 0;
      d.tri.forEach(function (f, g) { var w = (1 + Math.log(f)) * Math.log(1 + N / tdf.get(g)); v.set(g, w); n += w * w; });
      d.tv = v; d.tn = Math.sqrt(n);
    });
    return { docs: docs, N: N, df: df, tdf: tdf, avg: avg };
  }
  function count(arr) { var m = new Map(); arr.forEach(function (w) { m.set(w, (m.get(w) || 0) + 1); }); return m; }

  function search(q, lang, k) {
    var ix = indexes[lang] || (indexes[lang] = buildIndex(lang));
    var qt = queryTokens(q), k1 = 1.4, b = 0.75;
    var bm = ix.docs.map(function (d, i) {
      var s = 0;
      qt.forEach(function (w) {
        var f = d.tf.get(w); if (!f) return;
        var idf = Math.log(1 + (ix.N - ix.df.get(w) + 0.5) / (ix.df.get(w) + 0.5));
        s += idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * d.len / ix.avg));
      });
      return { i: i, s: s };
    });
    var qtri = trigrams(q), qv = new Map(), qn = 0;
    qtri.forEach(function (f, g) { if (!ix.tdf.has(g)) return; var w = (1 + Math.log(f)) * Math.log(1 + ix.N / ix.tdf.get(g)); qv.set(g, w); qn += w * w; });
    qn = Math.sqrt(qn);
    var tr = ix.docs.map(function (d, i) {
      var dot = 0; qv.forEach(function (w, g) { var x = d.tv.get(g); if (x) dot += w * x; });
      return { i: i, s: qn && d.tn ? dot / (qn * d.tn) : 0 };
    });
    var rank = function (list, min) {
      var r = new Map();
      list.filter(function (x) { return x.s > min; }).sort(function (a, b) { return b.s - a.s; })
        .forEach(function (x, pos) { r.set(x.i, pos + 1); });
      return r;
    };
    var rb = rank(bm, 0), rt = rank(tr, 0.12);
    var fused = new Map();
    [rb, rt].forEach(function (r) { r.forEach(function (pos, i) { fused.set(i, (fused.get(i) || 0) + 1 / (60 + pos)); }); });
    // Require lexical evidence or a strong trigram match.
    var res = Array.from(fused.entries())
      .filter(function (e) { return rb.has(e[0]) || (tr[e[0]].s > 0.22); })
      .sort(function (a, b) { return b[1] - a[1]; })
      .slice(0, k)
      .map(function (e) { return { doc: ix.docs[e[0]].c, rrf: e[1], bm: rb.get(e[0]), tri: rt.get(e[0]) }; });
    return { results: res, terms: qt, N: ix.N };
  }

  // ---- UI ----
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var form = $('#rag-form'), input = $('#rag-q'), out = $('#rag-results'), stats = $('#rag-stats'), steps = document.querySelectorAll('.pipe li');
  function lang() { return document.documentElement.getAttribute('data-lang') || 'en'; }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function highlight(text, terms) {
    var set = new Set(terms);
    return esc(text).replace(/[\p{L}\p{N}][\p{L}\p{N}\-]*/gu, function (w) {
      var n = stem(norm(w).replace(/-/g, ''));
      return set.has(n) || (n.length > 3 && Array.from(set).some(function (t) { return t.length > 3 && (n.indexOf(t) === 0 || t.indexOf(n) === 0); }))
        ? '<mark>' + w + '</mark>' : w;
    });
  }
  function animatePipe() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    steps.forEach(function (li, i) {
      li.classList.remove('on');
      if (reduce) { li.classList.add('on'); return; }
      setTimeout(function () { li.classList.add('on'); }, 90 * i);
    });
  }
  function render(q) {
    var L = lang();
    var t0 = performance.now();
    var r = search(q, L, 4);
    var ms = Math.max(1, Math.round(performance.now() - t0));
    animatePipe();
    stats.textContent = UI.demoStats[L].replace('{chunks}', r.N).replace('{ms}', ms).replace('{k}', r.results.length);
    if (!r.results.length) { out.innerHTML = '<p class="rag-empty">' + esc(UI.demoEmpty[L]) + '</p>'; return; }
    out.innerHTML = '<div id="rag-answer"></div>' + r.results.map(function (x, i) {
      var c = x.doc;
      return '<article class="hit" style="--d:' + (i * 70) + 'ms">' +
        '<header><a class="cite" href="#' + c.anchor + '" data-target="' + c.id + '">[' + (i + 1) + ']</a>' +
        '<span class="prov">' + esc(c.path[L]) + '</span>' +
        '<span class="ranks" title="BM25 rank · trigram rank · RRF score">' +
        (x.bm ? 'BM25 #' + x.bm : 'BM25 –') + ' · ' + (x.tri ? '3-gram #' + x.tri : '3-gram –') + ' · RRF ' + x.rrf.toFixed(4) + '</span></header>' +
        '<p>' + highlight(c.text[L], r.terms) + '</p>' +
        (c.parent[L] !== c.text[L] ? '<details><summary>' + esc(UI.demoParent[L]) + '</summary><pre>' + esc(c.parent[L]) + '</pre></details>' : '') +
        '</article>';
    }).join('');
    if (API) askApi(q, L, r.results);
  }
  function askApi(q, L, results) {
    var box = $('#rag-answer');
    box.className = 'answer loading';
    box.innerHTML = '<h3>' + esc(UI.demoAnswer[L]) + '</h3><p>…</p>';
    fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q, lang: L, contexts: results.map(function (x) { return { id: x.doc.id, text: x.doc.parent[L] }; }) }) })
      .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
      .then(function (j) { box.className = 'answer'; box.querySelector('p').textContent = j.answer || ''; })
      .catch(function () { box.className = 'answer error'; box.querySelector('p').textContent = UI.demoAnswerError[L]; });
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); var q = input.value.trim(); if (q) render(q); });
  document.querySelectorAll('[data-suggest]').forEach(function (b) {
    b.addEventListener('click', function () {
      var vis = b.querySelector('.l-' + lang());
      input.value = (vis || b).textContent.trim();
      render(input.value);
    });
  });
  // Clicking a citation scrolls to the exact paragraph on the page and flags it.
  out.addEventListener('click', function (e) {
    var a = e.target.closest('a.cite'); if (!a) return;
    var el = document.querySelector('[data-chunk="' + a.dataset.target + '"]');
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    el.classList.remove('flag'); void el.offsetWidth; el.classList.add('flag');
  });
  document.addEventListener('langchange', function () {
    input.placeholder = UI.demoPlaceholder[lang()];
    if (input.value.trim() && out.children.length) render(input.value.trim());
  });
  input.placeholder = UI.demoPlaceholder[lang()];
  // Show the system working on arrival with the first suggested question.
  var first = UI.demoSuggestions[lang()][0];
  input.value = first; render(first);
})();
