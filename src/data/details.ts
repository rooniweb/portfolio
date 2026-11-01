// Dedicated "how it works" pages. Keep every statement factual: these pages are read
// by recruiters next to the CV.
import type { L } from './content';
import { diagram } from '../lib/diagram';

export type Detail = {
  slug: string;
  projectId: string; // matches projects[].id in content.ts
  lead: L;
  diagramTitle: L;
  svg: string;
  steps: { title: L; text: L }[];
  example?: { caption: L; code: string };
  notes?: L[];
  results?: L[];
  poc?: { url: string; lead: L; height?: number };
  chart?: { title: L; svg: string; note: L };
  table?: { head: L[]; rows: (L | string)[][]; highlight?: number; muted?: number };
};

const W = 140, H = 64;
const row = (y: number, xs: number[]) => xs.map((x) => ({ x, y, w: W, h: H }));

// ---------- Migroo ----------
const m1 = row(66, [34, 192, 350, 508, 666, 818]);
const m2 = row(312, [34, 192, 350, 508, 666, 818]);
const migrooSvg = diagram({
  w: 992, h: 420,
  title: { en: 'Migroo pipeline', fr: 'Pipeline Migroo' },
  groups: [
    { x: 14, y: 14, w: 964, h: 140, label: { en: 'Indexing · runs locally', fr: 'Indexation · tourne en local' } },
    { x: 14, y: 262, w: 964, h: 140, label: { en: 'Answering a question · FastAPI API', fr: 'Répondre à une question · API FastAPI' } },
  ],
  nodes: [
    { ...m1[0], kind: 'io', label: { en: 'Sources', fr: 'Sources' }, sub: { en: 'documents', fr: 'documents' } },
    { ...m1[1], label: { en: 'Parsing', fr: 'Parsing' }, sub: { en: 'text, pages, lines', fr: 'texte, pages, lignes' } },
    { ...m1[2], label: { en: 'Chunking', fr: 'Chunking' }, sub: { en: 'parent / child', fr: 'parent / enfant' } },
    { ...m1[3], label: { en: 'Metadata', fr: 'Métadonnées' }, sub: { en: 'page · ¶ · line', fr: 'page · ¶ · ligne' } },
    { ...m1[4], label: { en: 'Embeddings', fr: 'Embeddings' }, sub: { en: 'child chunks', fr: 'passages enfants' } },
    { ...m1[5], kind: 'store', label: { en: 'Qdrant', fr: 'Qdrant' }, sub: { en: 'vectors + payload', fr: 'vecteurs + payload' } },
    { ...m2[0], kind: 'io', label: { en: 'Question', fr: 'Question' } },
    { ...m2[1], label: { en: 'Hybrid retrieval', fr: 'Retrieval hybride' }, sub: { en: 'dense + BM25', fr: 'dense + BM25' } },
    { ...m2[2], label: { en: 'RRF fusion', fr: 'Fusion RRF' }, sub: { en: 'one ranking', fr: 'un seul classement' } },
    { ...m2[3], label: { en: 'Parent context', fr: 'Contexte parent' }, sub: { en: 'larger chunks', fr: 'passages larges' } },
    { ...m2[4], kind: 'accent', label: { en: 'LLM', fr: 'LLM' }, sub: { en: 'hosted by default', fr: 'hébergé par défaut' } },
    { ...m2[5], kind: 'io', label: { en: 'Answer', fr: 'Réponse' }, sub: { en: 'with citations', fr: 'avec citations' } },
  ],
  edges: [
    ...[0, 1, 2, 3, 4].map((i) => ({ points: [[m1[i].x + W, 98], [m1[i + 1].x - 2, 98]] as [number, number][] })),
    ...[0, 1, 2, 3, 4].map((i) => ({ points: [[m2[i].x + W, 344], [m2[i + 1].x - 2, 344]] as [number, number][] })),
    {
      points: [[888, 130], [888, 208], [262, 208], [262, 310]],
      label: { en: 'search filtered by document owner', fr: 'recherche filtrée par propriétaire' }, at: [575, 200],
    },
  ],
});

// ---------- PrivaSearch ----------
const p1 = row(70, [34, 192, 350, 508]);
const p2 = row(270, [34, 192, 350, 508, 666, 818]);
const privaSvg = diagram({
  w: 992, h: 376,
  title: { en: 'PrivaSearch architecture', fr: 'Architecture PrivaSearch' },
  groups: [
    { x: 14, y: 14, w: 964, h: 348, kind: 'boundary', label: { en: 'On premise · documents and questions stay inside', fr: 'On-premise · documents et questions restent en interne' } },
  ],
  nodes: [
    { ...p1[0], kind: 'io', label: { en: 'Documents', fr: 'Documents' } },
    { ...p1[1], label: { en: 'Migroo', fr: 'Migroo' }, sub: { en: 'ingestion', fr: 'ingestion' } },
    { ...p1[2], label: { en: 'Embeddings', fr: 'Embeddings' }, sub: { en: 'nomic-embed-text', fr: 'nomic-embed-text' } },
    { ...p1[3], kind: 'store', label: { en: 'ChromaDB', fr: 'ChromaDB' }, sub: { en: 'local index', fr: 'index local' } },
    { ...p2[0], kind: 'io', label: { en: 'Question', fr: 'Question' } },
    { ...p2[1], label: { en: 'Embed query', fr: 'Vectoriser' }, sub: { en: 'nomic-embed-text', fr: 'nomic-embed-text' } },
    { ...p2[2], label: { en: 'Search', fr: 'Recherche' }, sub: { en: 'semantic, top-k', fr: 'sémantique, top-k' } },
    { ...p2[3], label: { en: 'Grounding', fr: 'Grounding' }, sub: { en: 'context only', fr: 'contexte seul' } },
    { ...p2[4], kind: 'accent', label: { en: 'Local LLM', fr: 'LLM local' }, sub: { en: 'Ollama', fr: 'Ollama' } },
    { ...p2[5], kind: 'io', label: { en: 'Answer', fr: 'Réponse' } },
  ],
  edges: [
    ...[0, 1, 2].map((i) => ({ points: [[p1[i].x + W, 102], [p1[i + 1].x - 2, 102]] as [number, number][] })),
    ...[0, 1, 2, 3, 4].map((i) => ({ points: [[p2[i].x + W, 302], [p2[i + 1].x - 2, 302]] as [number, number][] })),
    { points: [[578, 134], [578, 196], [420, 196], [420, 268]], label: { en: 'nearest vectors', fr: 'vecteurs les plus proches' }, at: [499, 188] },
  ],
});

// ---------- Orange Money AI Agent ----------
const agentSvg = diagram({
  w: 992, h: 420,
  title: { en: 'ReAct agent loop', fr: 'Boucle de l’agent ReAct' },
  groups: [
    { x: 214, y: 14, w: 480, h: 392, label: { en: 'LangGraph state graph · ReAct loop', fr: 'Graphe d’états LangGraph · boucle ReAct' } },
  ],
  nodes: [
    { x: 30, y: 110, w: W, h: H, kind: 'io', label: { en: 'Request', fr: 'Demande' }, sub: { en: 'natural language', fr: 'langage naturel' } },
    { x: 30, y: 270, w: W, h: H, kind: 'io', label: { en: 'Final answer', fr: 'Réponse finale' } },
    { x: 262, y: 190, w: W, h: H, kind: 'accent', label: { en: 'Reason', fr: 'Raisonner' }, sub: { en: 'LLM decides', fr: 'le LLM décide' } },
    { x: 506, y: 80, w: W, h: H, label: { en: 'Act', fr: 'Agir' }, sub: { en: 'tool call', fr: 'appel d’outil' } },
    { x: 506, y: 300, w: W, h: H, label: { en: 'Observe', fr: 'Observer' }, sub: { en: 'tool result', fr: 'résultat de l’outil' } },
    { x: 784, y: 80, w: W + 20, h: H, label: { en: 'FastMCP server', fr: 'Serveur FastMCP' }, sub: { en: 'tools over MCP', fr: 'outils via MCP' } },
    { x: 784, y: 280, w: W + 20, h: H + 6, kind: 'store', label: { en: 'Sandbox API', fr: 'API sandbox' }, sub: { en: 'test environment', fr: 'environnement de test' } },
  ],
  edges: [
    { points: [[170, 142], [214, 142], [214, 210], [260, 210]] },
    { points: [[332, 190], [332, 112], [504, 112]], label: { en: 'tool + arguments', fr: 'outil + arguments' }, at: [418, 104] },
    { points: [[646, 112], [782, 112]] },
    { points: [[864, 144], [864, 278]] },
    { points: [[784, 332], [648, 332]] },
    { points: [[506, 332], [332, 332], [332, 256]], label: { en: 'loop until enough', fr: 'boucle jusqu’à suffisance' }, at: [420, 324] },
    { points: [[262, 236], [236, 236], [236, 302], [172, 302]], label: { en: 'done', fr: 'terminé' }, at: [200, 292] },
  ],
});


// ---------- Sogolon ----------
const sogolonSvg = diagram({
  w: 992, h: 470,
  title: { en: 'Sogolon architecture', fr: 'Architecture Sogolon' },
  groups: [
    { x: 196, y: 14, w: 300, h: 196, label: { en: 'AI service · no database access', fr: 'Service IA · sans accès à la base' } },
    { x: 196, y: 248, w: 616, h: 208, kind: 'boundary', labelEnd: true, label: { en: 'Data service', fr: 'Service données' } },
  ],
  nodes: [
    { x: 24, y: 178, w: 140, h: 64, kind: 'io', label: { en: 'Question', fr: 'Question' }, sub: { en: 'in French', fr: 'en français' } },
    { x: 226, y: 62, w: 240, h: 64, label: { en: 'Prompt', fr: 'Prompt' }, sub: { en: 'rules + knowledge + schema', fr: 'consignes + savoir + schéma' } },
    { x: 226, y: 140, w: 240, h: 56, kind: 'accent', label: { en: 'LLM', fr: 'LLM' }, sub: { en: 'writes one SQL query', fr: 'écrit une requête SQL' } },
    { x: 545, y: 62, w: 220, h: 64, label: { en: 'Metadata', fr: 'Métadonnées' }, sub: { en: 'columns + comments', fr: 'colonnes + commentaires' } },
    { x: 226, y: 300, w: 200, h: 64, label: { en: 'Guardrails', fr: 'Garde-fous' }, sub: { en: 'SELECT only · LIMIT', fr: 'SELECT seul · LIMIT' } },
    { x: 226, y: 386, w: 200, h: 52, kind: 'io', label: { en: 'Refusal explained', fr: 'Refus expliqué' } },
    { x: 500, y: 296, w: 200, h: 72, kind: 'store', label: { en: 'Test database', fr: 'Base de test' }, sub: { en: 'read-only session', fr: 'session lecture seule' } },
    { x: 836, y: 178, w: 140, h: 64, kind: 'io', label: { en: 'SQL + table', fr: 'SQL + tableau' }, sub: { en: '+ chart', fr: '+ graphique' } },
  ],
  edges: [
    { points: [[164, 210], [196, 210], [196, 94], [224, 94]] },
    { points: [[346, 126], [346, 138]] },
    { points: [[655, 296], [655, 128]], label: { en: 'schema as text', fr: 'schéma en texte' }, at: [655, 220] },
    { points: [[543, 94], [468, 94]] },
    { points: [[346, 196], [346, 236], [326, 236], [326, 298]], label: { en: 'SQL', fr: 'SQL' }, at: [362, 232] },
    { points: [[426, 332], [498, 332]], label: { en: 'allowed', fr: 'autorisé' }, at: [462, 324] },
    { points: [[326, 364], [326, 384]], dashed: true },
    { points: [[700, 332], [906, 332], [906, 244]], label: { en: 'rows stay here', fr: 'les lignes restent ici' }, at: [800, 324] },
  ],
});

// ---------- Payment default risk ----------
const riskSvg = diagram({
  w: 992, h: 300,
  title: { en: 'Modelling approach', fr: 'Démarche de modélisation' },
  groups: [
    { x: 14, y: 14, w: 964, h: 128, label: { en: 'Data, built as of the issue date', fr: 'Données, construites à la date d’émission' } },
    { x: 14, y: 158, w: 964, h: 128, label: { en: 'Models, judged on 5 unseen months', fr: 'Modèles, jugés sur 5 mois jamais vus' } },
  ],
  nodes: [
    { x: 34, y: 58, w: 200, h: 64, kind: 'io', label: { en: '100,885 invoices', fr: '100 885 factures' }, sub: { en: '5,000 accounts, simulated', fr: '5 000 comptes, simulés' } },
    { x: 270, y: 58, w: 210, h: 64, label: { en: 'Target', fr: 'Cible' }, sub: { en: 'unpaid 60 days after due', fr: 'impayée à échéance + 60 j' } },
    { x: 516, y: 58, w: 210, h: 64, label: { en: '23 features', fr: '23 variables' }, sub: { en: 'no leakage', fr: 'sans fuite' } },
    { x: 762, y: 58, w: 196, h: 64, label: { en: 'Time-based split', fr: 'Découpage temporel' }, sub: { en: 'train · valid · test', fr: 'appr. · valid. · test' } },
    { x: 34, y: 202, w: 200, h: 64, label: { en: 'Business rule', fr: 'Règle métier' }, sub: { en: 'AUC 0.650', fr: 'AUC 0,650' } },
    { x: 270, y: 202, w: 210, h: 64, label: { en: 'Logistic regression', fr: 'Régression logistique' }, sub: { en: 'AUC 0.728', fr: 'AUC 0,728' } },
    { x: 516, y: 202, w: 210, h: 64, kind: 'accent', label: { en: 'LightGBM + SHAP', fr: 'LightGBM + SHAP' }, sub: { en: 'AUC 0.725 · kept', fr: 'AUC 0,725 · retenu' } },
    { x: 762, y: 202, w: 196, h: 64, kind: 'io', label: { en: 'Oracle ceiling', fr: 'Plafond oracle' }, sub: { en: 'AUC 0.797', fr: 'AUC 0,797' } },
  ],
  edges: [
    { points: [[234, 90], [268, 90]] },
    { points: [[480, 90], [514, 90]] },
    { points: [[726, 90], [760, 90]] },
  ],
});

const months = {"2024-01": 0.1772, "2024-02": 0.1822, "2024-03": 0.1823, "2024-04": 0.1856, "2024-05": 0.1723, "2024-06": 0.2389, "2024-07": 0.1714, "2024-08": 0.16, "2024-09": 0.1622, "2024-10": 0.197, "2024-11": 0.1595, "2024-12": 0.1872, "2025-01": 0.1546, "2025-02": 0.1588, "2025-03": 0.1549, "2025-04": 0.1564, "2025-05": 0.1651, "2025-06": 0.2353, "2025-07": 0.1597, "2025-08": 0.165, "2025-09": 0.1473, "2025-10": 0.1806, "2025-11": 0.1595, "2025-12": 0.1659, "2026-01": 0.1513, "2026-02": 0.1604, "2026-03": 0.1599, "2026-04": 0.1503, "2026-05": 0.2097, "2026-06": 0.1504, "2026-07": 0.1417};
const riskChart = (() => {
  const W = 760, H = 240, l = 44, r = 34, t = 16, b = 34;
  const keys = Object.keys(months), vals = keys.map((k) => months[k]);
  const lo = 0.12, hi = 0.26;
  const X = (i: number) => l + (i * (W - l - r)) / (keys.length - 1);
  const Y = (v: number) => t + ((hi - v) * (H - t - b)) / (hi - lo);
  let g = '';
  for (const v of [0.14, 0.18, 0.22, 0.26]) {
    g += `<line class="ch-grid" x1="${l}" x2="${W - r}" y1="${Y(v)}" y2="${Y(v)}"/><text class="ch-tick" x="${l - 8}" y="${Y(v) + 4}" text-anchor="end">${Math.round(v * 100)}%</text>`;
  }
  keys.forEach((k, i) => {
    if (k.endsWith('-01') || k.endsWith('-07')) g += `<text class="ch-tick" x="${X(i)}" y="${H - 10}" text-anchor="middle">${k}</text>`;
  });
  const d = vals.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ');
  const area = d + ` L${X(vals.length - 1)} ${H - b} L${X(0)} ${H - b} Z`;
  g += `<path class="ch-area" d="${area}"/><path class="ch-line" d="${d}"/>`;
  const peaks = ['2024-06', '2025-06', '2026-05'];
  peaks.forEach((k) => {
    const i = keys.indexOf(k);
    g += `<circle class="ch-peak" cx="${X(i)}" cy="${Y(vals[i])}" r="4.5"/><text class="ch-label" x="${X(i)}" y="${Y(vals[i]) - 10}" text-anchor="middle">Tabaski</text>`;
  });
  return `<svg class="ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="Monthly 60-day default rate">${g}</svg>`;
})();

// ---------- DocuCheck ----------
const dcSvg = diagram({
  w: 992, h: 330,
  title: { en: 'DocuCheck pipeline', fr: 'Pipeline DocuCheck' },
  groups: [
    { x: 14, y: 14, w: 964, h: 150, label: { en: 'Each piece', fr: 'Chaque pièce' } },
    { x: 14, y: 180, w: 964, h: 136, label: { en: 'The whole file', fr: 'Le dossier entier' } },
  ],
  nodes: [
    { x: 34, y: 62, w: 170, h: 70, kind: 'io', label: { en: 'PDFs', fr: 'PDF' }, sub: { en: 'native or scanned', fr: 'natifs ou scannés' } },
    { x: 238, y: 62, w: 210, h: 70, label: { en: 'Reading', fr: 'Lecture' }, sub: { en: 'text or OCR · page + line', fr: 'texte ou OCR · page + ligne' } },
    { x: 482, y: 62, w: 210, h: 70, label: { en: 'Classification', fr: 'Classification' }, sub: { en: 'type from content', fr: 'type par le contenu' } },
    { x: 726, y: 62, w: 232, h: 70, label: { en: 'Extraction', fr: 'Extraction' }, sub: { en: 'Pydantic schema + source', fr: 'schéma Pydantic + source' } },
    { x: 34, y: 222, w: 260, h: 70, label: { en: 'Verification', fr: 'Vérification' }, sub: { en: 'completeness · consistency', fr: 'complétude · cohérence' } },
    { x: 330, y: 222, w: 250, h: 70, kind: 'accent', label: { en: 'Decision', fr: 'Décision' }, sub: { en: '< 0.80 → human review', fr: '< 0,80 → revue humaine' } },
    { x: 616, y: 222, w: 342, h: 70, kind: 'io', label: { en: 'Report', fr: 'Rapport' }, sub: { en: 'file · page · field, time, cost', fr: 'fichier · page · champ, temps, coût' } },
  ],
  edges: [
    { points: [[204, 97], [236, 97]] },
    { points: [[448, 97], [480, 97]] },
    { points: [[692, 97], [724, 97]] },
    { points: [[842, 132], [842, 170], [164, 170], [164, 220]] },
    { points: [[294, 257], [328, 257]] },
    { points: [[580, 257], [614, 257]] },
  ],
});

export const details: Detail[] = [
  {
    slug: 'docucheck',
    projectId: 'docucheck',
    lead: {
      en: 'A higher-education institution receives registration files as PDFs: a form, an ID card, a transcript and a proof of address. DocuCheck reads every piece, identifies it, extracts its fields, checks that the file is complete and consistent, and writes a report that cites the file, page and field of each anomaly. This proof of concept runs without any language model and is measured end to end.',
      fr: 'Un établissement d’enseignement supérieur reçoit des dossiers d’inscription en PDF : formulaire, pièce d’identité, relevé de notes, justificatif de domicile. DocuCheck lit chaque pièce, l’identifie, en extrait les champs, vérifie que le dossier est complet et cohérent, et rédige un rapport qui cite le fichier, la page et le champ de chaque anomalie. Ce POC tourne sans aucun modèle de langage et il est mesuré de bout en bout.',
    },
    diagramTitle: { en: 'From a set of PDFs to a decision a person can check', fr: 'D’un lot de PDF à une décision vérifiable' },
    svg: dcSvg,
    table: {
      head: [{ en: 'Metric (12 fictional files)', fr: 'Mesure (12 dossiers fictifs)' }, { en: 'Result', fr: 'Résultat' }],
      rows: [
        [{ en: 'Files correctly classified (compliant / incomplete / to check)', fr: 'Dossiers bien classés (conforme / incomplet / à vérifier)' }, { en: '12 / 12 (100%)', fr: '12 / 12 (100 %)' }],
        [{ en: 'Time per file, median', fr: 'Temps par dossier, médiane' }, { en: '34 ms', fr: '34 ms' }],
        [{ en: 'Time per file with scanned pieces (OCR), median', fr: 'Temps par dossier avec pièces scannées (OCR), médiane' }, { en: '1.0 s', fr: '1,0 s' }],
        [{ en: 'Slowest file (4 scanned pieces)', fr: 'Dossier le plus lent (4 pièces scannées)' }, { en: '4.4 s', fr: '4,4 s' }],
        [{ en: 'Cost per file', fr: 'Coût par dossier' }, { en: '$0 (no model call)', fr: '0 $ (aucun appel de modèle)' }],
        [{ en: 'Sent to human review', fr: 'Envoyés en revue humaine' }, { en: '9 / 12', fr: '9 / 12' }],
      ],
      highlight: 0,
    },
    steps: [
      { title: { en: 'Read every piece', fr: 'Lire chaque pièce' }, text: { en: 'Native PDF text when there is one, otherwise Tesseract OCR in French. Every line keeps its page and number, and OCR lines keep a confidence score.', fr: 'Le texte natif du PDF quand il existe, sinon l’OCR Tesseract en français. Chaque ligne garde sa page et son numéro, et les lignes OCR gardent un score de confiance.' } },
      { title: { en: 'Identify the piece', fr: 'Identifier la pièce' }, text: { en: 'The type comes from the content, not the file name: form, ID card, transcript or proof of address.', fr: 'Le type vient du contenu, pas du nom du fichier : formulaire, pièce d’identité, relevé ou justificatif.' } },
      { title: { en: 'Extract into schemas', fr: 'Extraire dans des schémas' }, text: { en: 'Fields are cleaned of scan noise and validated by Pydantic schemas, each with its source line.', fr: 'Les champs sont nettoyés du bruit de scan et validés par des schémas Pydantic, chacun avec sa ligne source.' } },
      { title: { en: 'Check the file', fr: 'Contrôler le dossier' }, text: { en: 'Mandatory pieces present; same name, first name and birth date everywhere; ID valid on the filing date; proof of address under 90 days; consistent diploma date; readable scans.', fr: 'Pièces obligatoires présentes ; même nom, prénom et date de naissance partout ; pièce d’identité valide à la date de dépôt ; justificatif de moins de 90 jours ; date de diplôme cohérente ; scans lisibles.' } },
      { title: { en: 'Decide and report', fr: 'Décider et rendre compte' }, text: { en: 'Compliant, incomplete or to be checked, with a confidence score; below 0.80 a person reviews the file. The report lists each anomaly with its file, page and field, plus the time of each step and the cost.', fr: 'Conforme, incomplet ou à vérifier, avec un score de confiance ; sous 0,80, une personne revoit le dossier. Le rapport liste chaque anomalie avec son fichier, sa page et son champ, ainsi que le temps de chaque étape et le coût.' } },
    ],
    notes: [
      { en: 'The 12 files cover 4 compliant files (native, scanned, mixed) and 8 defects: two missing pieces, a different name, a different birth date, an expired ID, an old proof of address, an unreadable scan and an impossible diploma date.', fr: 'Les 12 dossiers couvrent 4 dossiers conformes (natifs, scannés, mixtes) et 8 défauts : deux pièces manquantes, un nom différent, une date de naissance différente, une pièce expirée, un justificatif trop ancien, un scan illisible et une date de diplôme impossible.' },
      { en: 'One extra alert: OCR missed the number of a scanned ID card. The file is still correctly classified, and the gap is flagged for a person.', fr: 'Une alerte en trop : l’OCR a manqué le numéro d’une pièce d’identité scannée. Le dossier reste bien classé, et le manque est signalé pour une personne.' },
      { en: 'Limits: rules are tuned to known templates; real documents with varied layouts will need LLM extraction. The Docker image and CI workflow are written but not yet run.', fr: 'Limites : les règles sont adaptées à des gabarits connus ; de vrais documents aux mises en page variées demanderont une extraction par LLM. L’image Docker et le workflow de CI sont écrits mais pas encore exécutés.' },
      { en: 'Next: Docling for reading, LLM extraction through LiteLLM (local model and API compared on accuracy, time and cost per file), TypeSafe Jev for routing, n8n for intake.', fr: 'Suite : Docling pour la lecture, extraction par LLM via LiteLLM (modèle local et API comparés en précision, temps et coût par dossier), TypeSafe Jev pour le routage, n8n pour le dépôt.' },
    ],
  },
  {
    slug: 'sogolon',
    projectId: 'sogolon',
    poc: {
      url: '/demos/sogolon/',
      lead: {
        en: 'A reduced, self-contained version running in your browser: a fictional SQLite database, the guardrails replayed live, and the exact prompt the model would receive. Queries are pre-written and replayed; no AI model is called. The demo is in French.',
        fr: 'Une version réduite et autonome qui tourne dans votre navigateur : une base SQLite fictive, les garde-fous rejoués en direct et le prompt exact que recevrait le modèle. Les requêtes sont pré-écrites et rejouées ; aucun modèle d’IA n’est appelé.',
      },
    },
    lead: {
      en: 'Sogolon is an assistant that turns a sales or collections question asked in French into a SQL query, runs it read-only and shows the query, the result and a chart. Built for a West African telecom operator after several commercial systems were merged into one.',
      fr: 'Sogolon est une assistante qui traduit une question de pilotage commercial ou de recouvrement posée en français en requête SQL, l’exécute en lecture seule et affiche la requête, le résultat et un graphique. Réalisée pour un opérateur télécom d’Afrique de l’Ouest, après la fusion de plusieurs systèmes commerciaux en un seul.',
    },
    diagramTitle: { en: 'The model sees the schema, never the data', fr: 'Le modèle voit le schéma, jamais les données' },
    svg: sogolonSvg,
    steps: [
      { title: { en: 'The problem', fr: 'Le problème' }, text: { en: 'Every reporting question, such as “collections this month by shop” or “accounts with more than 3 unpaid invoices”, went through the data team and a hand-written query. The database is large and many column names, inherited from the old systems, are misleading.', fr: 'Chaque question de pilotage, comme « encaissements du mois par boutique » ou « comptes avec plus de 3 factures impayées », passait par l’équipe données et une requête écrite à la main. La base est vaste et beaucoup de noms de colonnes, hérités des anciens systèmes, sont trompeurs.' } },
      { title: { en: 'Build the prompt from the schema', fr: 'Construire le prompt à partir du schéma' }, text: { en: 'The data service reads the metadata (tables, columns, types, comments). The AI service sends the model the rules, a short business knowledge base and this schema as text, with the question.', fr: 'Le service données lit les métadonnées (tables, colonnes, types, commentaires). Le service IA envoie au modèle les consignes, une base de connaissance métier courte et ce schéma en texte, avec la question.' } },
      { title: { en: 'Check before running', fr: 'Vérifier avant d’exécuter' }, text: { en: 'The returned SQL goes through guardrails: a single SELECT or WITH, no write keywords outside strings and comments, no variables, LIMIT 1000 added, a time limit. The session itself is read-only as a second barrier.', fr: 'Le SQL renvoyé passe les garde-fous : une seule instruction SELECT ou WITH, aucun mot-clé d’écriture hors chaînes et commentaires, pas de variables, LIMIT 1000 ajouté, délai maximal. La session elle-même est en lecture seule, comme seconde barrière.' } },
      { title: { en: 'Show the work', fr: 'Montrer le travail' }, text: { en: 'The user sees the SQL, a sortable and filterable table and a chart, with PNG, SVG and CSV export. If the answer is wrong, a feedback loop corrects the query and proposes a rule that an administrator can add to the knowledge base.', fr: 'L’utilisateur voit le SQL, un tableau triable et filtrable et un graphique, avec export PNG, SVG et CSV. Si la réponse ne convient pas, une boucle de retour corrige la requête et propose une règle qu’un administrateur peut ajouter à la base de connaissance.' } },
      { title: { en: 'Reuse what is validated', fr: 'Réutiliser ce qui est validé' }, text: { en: 'A question already validated is replayed as is, with no model call. A close question gets the validated query as an example. Recurring collection reports use fixed aggregated queries, without the model, so they are reproducible to the cent.', fr: 'Une question déjà validée est rejouée telle quelle, sans appel au modèle. Une question proche reçoit la requête validée comme exemple. Les rapports de recouvrement récurrents utilisent des requêtes fixes agrégées, sans modèle, pour être reproductibles au centime près.' } },
    ],
    notes: [
      { en: 'Documenting the schema’s traps worked better than changing models: misleading columns and implicit conventions caused most errors, and column comments plus a short knowledge base fixed most of them.', fr: 'Documenter les pièges du schéma a mieux marché que changer de modèle : les colonnes trompeuses et les conventions implicites causaient l’essentiel des erreurs, et des commentaires de colonnes plus une base de connaissance courte en ont corrigé la plupart.' },
      { en: 'Evaluation compares results, not query text: the generated SQL and the reference SQL are both executed on 30 business questions, because two different queries can both be right.', fr: 'L’évaluation compare les résultats, pas le texte des requêtes : le SQL généré et le SQL de référence sont tous deux exécutés sur 30 questions métier, car deux requêtes différentes peuvent être justes.' },
      { en: 'A transparency page shows exactly what was sent to the model provider (key masked) and automatic checks prove the AI service never received data rows.', fr: 'Une page Transparence montre exactement ce qui est parti vers le fournisseur du modèle (clé masquée), et des contrôles automatiques prouvent que le service IA n’a jamais reçu de lignes de données.' },
      { en: 'Stack: Python, FastAPI, MySQL, SQLite, OpenAI (GPT) or Anthropic API with an interchangeable provider, plain HTML and JavaScript front end, deployed on Windows Server.', fr: 'Stack : Python, FastAPI, MySQL, SQLite, API OpenAI (GPT) ou Anthropic avec fournisseur interchangeable, interface HTML et JavaScript natif, déploiement sur Windows Server.' },
    ],
    results: [
      { en: 'Target: at least 70% correct answers on the 30 reference questions (identical execution result).', fr: 'Objectif : au moins 70 % de réponses correctes sur les 30 questions de référence (résultat d’exécution identique).' },
      { en: 'About 14,500 lines of Python, HTML and JavaScript, 5 collection reports and 14 documented iterations.', fr: 'Environ 14 500 lignes de Python, HTML et JavaScript, 5 rapports de recouvrement et 14 évolutions documentées.' },
    ],
    example: {
      caption: { en: 'Excerpt of what the model receives: rules and schema, no data', fr: 'Extrait de ce que reçoit le modèle : consignes et schéma, aucune donnée' },
      code: `TABLE facture -- Factures mensuelles des comptes postpayés
  - periode TEXT -- Mois facturé au format 'AAAA-MM'
  - solde INTEGER -- Reste à payer en FCFA (0 = soldée)
  - statut TEXT -- 'VALIDE' ou 'ANNULEE'.
    Facture impayée = statut 'VALIDE' ET solde > 0

Question : Comptes avec plus de 3 factures impayées`,
    },
  },
  {
    slug: 'payment-risk',
    projectId: 'risk',
    lead: {
      en: 'A collections team cannot call every customer. It usually reminds late, once the delay shows in the aged balance, and somewhat at random. Can we estimate, as soon as an invoice is issued, the probability that it will still be unpaid 60 days after its due date, and remind the right customers first?',
      fr: 'Une équipe de recouvrement ne peut pas relancer tout le monde. Elle relance tard, une fois le retard visible dans la balance âgée, et un peu au hasard des listes. Peut-on estimer, dès l’émission d’une facture, la probabilité qu’elle reste impayée 60 jours après l’échéance, pour relancer d’abord ceux qui en ont besoin ?',
    },
    diagramTitle: { en: 'From raw invoices to a score the team can act on', fr: 'Des factures brutes à un score exploitable' },
    svg: riskSvg,
    poc: {
      url: '/demos/risque-impayes/',
      lead: {
        en: 'Interactive results and a simulator: the trained LightGBM model, exported to JSON, runs in your browser. Change an invoice or load a test example to see its score, its risk level and what drives it. The demo is in French; all data is fictional.',
        fr: 'Résultats interactifs et simulateur : le modèle LightGBM entraîné, exporté en JSON, tourne dans votre navigateur. Modifiez une facture ou chargez un exemple du test pour voir son score, son niveau de risque et ce qui le fait varier. Toutes les données sont fictives.',
      },
      height: 1150,
    },
    chart: {
      title: { en: 'Exploration: 60-day default rate by billing month', fr: 'Exploration : taux d’impayé à 60 jours par mois de facturation' },
      svg: riskChart,
      note: { en: 'Peaks in Tabaski months; by payment method, 5% defaults with direct debit against 24% with cash.', fr: 'Pics les mois de Tabaski ; par mode de paiement, 5 % d’impayés en prélèvement contre 24 % en espèces.' },
    },
    table: {
      head: [{ en: 'Model', fr: 'Modèle' }, { en: 'AUC', fr: 'AUC' }, { en: 'PR-AUC', fr: 'PR-AUC' }, { en: 'Lift top 10%', fr: 'Lift top 10 %' }, { en: 'Defaults in top 20%', fr: 'Impayées dans le top 20 %' }],
      rows: [
        [{ en: 'Business rule (worst delay + open debts)', fr: 'Règle métier (pire retard + impayés en cours)' }, { en: '0.650', fr: '0,650' }, { en: '0.280', fr: '0,280' }, { en: '× 2.1', fr: '× 2,1' }, { en: '36%', fr: '36 %' }],
        [{ en: 'Logistic regression', fr: 'Régression logistique' }, { en: '0.728', fr: '0,728' }, { en: '0.363', fr: '0,363' }, { en: '× 2.7', fr: '× 2,7' }, { en: '45%', fr: '45 %' }],
        [{ en: 'LightGBM (kept)', fr: 'LightGBM (retenu)' }, { en: '0.725', fr: '0,725' }, { en: '0.364', fr: '0,364' }, { en: '× 2.8', fr: '× 2,8' }, { en: '45%', fr: '45 %' }],
        [{ en: 'Oracle (true probability, ceiling)', fr: 'Oracle (vraie probabilité, plafond)' }, { en: '0.797', fr: '0,797' }, { en: '0.517', fr: '0,517' }, { en: '× 3.7', fr: '× 3,7' }, { en: '55%', fr: '55 %' }],
      ],
      highlight: 2,
      muted: 3,
    },
    steps: [
      { title: { en: 'Simulate realistic data', fr: 'Simuler des données réalistes' }, text: { en: '5,000 postpaid accounts and about 100,000 monthly invoices from January 2024 to September 2026, generated with a fixed seed: payer profiles, hardship periods, calendar effects, abnormal bills, invalid contacts, and interactions between them. 17.2% of invoices end up unpaid at 60 days.', fr: '5 000 comptes postpayés et environ 100 000 factures mensuelles de janvier 2024 à septembre 2026, générés avec une graine fixe : profils de payeurs, périodes de difficulté, effets de calendrier, factures anormales, contacts invalides et leurs interactions. 17,2 % des factures restent impayées à 60 jours.' } },
      { title: { en: 'Engineer features without leakage', fr: 'Construire des variables sans fuite' }, text: { en: '23 features computed at the issue date with only what was known that day: past delays, status of the previous invoice, 12-month regularity, open debts, trend, amount ratio. A previous invoice paid after that date counts as still unpaid.', fr: '23 variables calculées à la date d’émission avec ce que l’on savait ce jour-là : retards passés, statut de la facture précédente, régularité sur 12 mois, impayés en cours, tendance, ratio de montant. Une facture précédente payée après cette date compte comme encore impayée.' } },
      { title: { en: 'Split by time', fr: 'Découper dans le temps' }, text: { en: 'Training on 2024–2025, validation for early stopping, threshold and grid search, then a test on 5 months never seen (March to July 2026, 14,050 invoices).', fr: 'Apprentissage sur 2024-2025, validation pour l’arrêt anticipé, le seuil et la recherche en grille, puis test sur 5 mois jamais vus (mars à juillet 2026, 14 050 factures).' } },
      { title: { en: 'Compare against a rule and a ceiling', fr: 'Comparer à une règle et à un plafond' }, text: { en: 'Business rule, logistic regression and LightGBM. Because the data is simulated, the true probability is known: it gives the best AUC reachable and separates what the model misses from what is simply unpredictable.', fr: 'Règle métier, régression logistique et LightGBM. Comme les données sont simulées, la vraie probabilité est connue : elle donne l’AUC maximale atteignable et sépare ce que le modèle rate de ce qui est imprévisible.' } },
      { title: { en: 'Turn the score into action', fr: 'Passer du score à l’action' }, text: { en: 'Below 10%: automatic SMS at the due date. 10 to 25%: personalised reminder 3 days before, with a mobile money link. 25 to 50%: agent call at the due date and contact check. Above 50%: priority call and a payment plan before the debt builds up.', fr: 'Moins de 10 % : SMS automatique à l’échéance. 10 à 25 % : rappel personnalisé 3 jours avant, avec lien mobile money. 25 à 50 % : appel d’un agent dès l’échéance et vérification du contact. Plus de 50 % : appel prioritaire et proposition d’échéancier avant que la dette ne s’accumule.' } },
    ],
    notes: [
      { en: 'Honest reading: LightGBM and logistic regression tie and both clearly beat the rule. LightGBM is kept for its per-invoice SHAP explanations and native handling of missing values and categories; logistic regression remains a credible, easier-to-audit alternative.', fr: 'Lecture honnête : LightGBM et la régression logistique font jeu égal et battent nettement la règle. LightGBM est retenu pour ses explications SHAP par facture et sa gestion native des valeurs manquantes et des catégories ; la régression logistique reste une alternative crédible, plus simple à auditer.' },
      { en: 'The gap to the oracle comes from sudden hardship that no payment history can announce; more feature engineering did not close it. Other sources would be needed: top-ups, usage, complaints.', fr: 'L’écart avec l’oracle vient de difficultés soudaines qu’aucun historique de paiement n’annonce ; plus de feature engineering n’y a rien changé. Il faudrait d’autres sources : recharges, usage, réclamations.' },
      { en: 'SHAP shows a cheap lever: an invoice sent by SMS to an invalid number never arrives, so cleaning contacts lowers risk.', fr: 'SHAP fait ressortir un levier peu coûteux : une facture envoyée par SMS à un numéro invalide n’arrive jamais ; fiabiliser les contacts réduit le risque.' },
      { en: 'Limits: the 35% reminder effectiveness is an assumption to measure with an A/B test; an uplift model would target customers who respond to reminders; no sensitive variable is used and the score never triggers an automatic action.', fr: 'Limites : les 35 % d’efficacité des relances sont une hypothèse à mesurer par un test A/B ; un modèle d’uplift ciblerait les clients sensibles aux relances ; aucune variable sensible n’est utilisée et le score ne déclenche aucune action automatique.' },
      { en: 'Stack: Python, pandas, NumPy, scikit-learn, LightGBM, SHAP, matplotlib, Jupyter; web demo in plain HTML and JavaScript.', fr: 'Stack : Python, pandas, NumPy, scikit-learn, LightGBM, SHAP, matplotlib, Jupyter ; démo web en HTML et JavaScript natif.' },
    ],
    results: [
      { en: 'Calibrated probabilities (Brier 0.122). Threshold chosen on validation (0.22): 34% precision and 50% recall on the test set.', fr: 'Probabilités calibrées (Brier 0,122). Seuil choisi sur la validation (0,22) : précision 34 % et rappel 50 % sur le test.' },
      { en: 'Simulated campaign reminding 20% of invoices each month, assuming a reminder avoids 35% of targeted defaults: about 8.3 M FCFA avoided over 5 months with the model, against 6.9 M with the business rule and 4.2 M at random, so about twice the random result.', fr: 'Campagne simulée relançant 20 % des factures chaque mois, en supposant qu’une relance évite 35 % des impayés ciblés : environ 8,3 M FCFA évités sur 5 mois avec le modèle, contre 6,9 M avec la règle métier et 4,2 M au hasard, soit environ deux fois le hasard.' },
    ],
  },
  {
    slug: 'migroo',
    projectId: 'migroo',
    lead: {
      en: 'Migroo turns a pile of enterprise documents into an index that an LLM can quote from precisely. Every chunk carries where it came from, down to the line, so each answer can point back to its source.',
      fr: 'Migroo transforme un ensemble de documents d’entreprise en un index qu’un LLM peut citer avec précision. Chaque passage garde sa provenance jusqu’à la ligne, pour que chaque réponse renvoie à sa source.',
    },
    diagramTitle: { en: 'Two halves: indexing once, answering on demand', fr: 'Deux moitiés : indexer une fois, répondre à la demande' },
    svg: migrooSvg,
    steps: [
      { title: { en: 'Parse the sources', fr: 'Parser les sources' }, text: { en: 'Documents are read into text while keeping their structure: pages, paragraphs and lines.', fr: 'Les documents sont convertis en texte en conservant leur structure : pages, paragraphes et lignes.' } },
      { title: { en: 'Chunk in two sizes', fr: 'Découper en deux tailles' }, text: { en: 'Small child chunks (about 512 characters) are embedded for precise matching. Each one points to a larger parent chunk (about 2,048 characters) that gives the LLM enough context.', fr: 'De petits passages enfants (environ 512 caractères) sont vectorisés pour un appariement précis. Chacun pointe vers un passage parent plus large (environ 2 048 caractères) qui donne au LLM assez de contexte.' } },
      { title: { en: 'Attach provenance', fr: 'Attacher la provenance' }, text: { en: 'Each chunk stores its document, page, paragraph, line, position and provenance as metadata in Qdrant, next to its vector.', fr: 'Chaque passage enregistre document, page, paragraphe, ligne, position et provenance comme métadonnées dans Qdrant, à côté de son vecteur.' } },
      { title: { en: 'Retrieve two ways, then fuse', fr: 'Chercher de deux façons, puis fusionner' }, text: { en: 'A question runs through dense vector search and BM25 keyword search. Reciprocal rank fusion merges both rankings, so exact terms and paraphrases are both found.', fr: 'Une question passe par une recherche vectorielle dense et une recherche BM25 par mots-clés. La fusion RRF combine les deux classements : les termes exacts comme les reformulations sont retrouvés.' } },
      { title: { en: 'Answer with citations', fr: 'Répondre avec citations' }, text: { en: 'The parent chunks go to the LLM as context. Because every chunk carries its metadata, the answer can cite the exact page and paragraph it relies on.', fr: 'Les passages parents sont transmis au LLM comme contexte. Comme chaque passage porte ses métadonnées, la réponse peut citer la page et le paragraphe exacts sur lesquels elle s’appuie.' } },
    ],
    example: {
      caption: { en: 'Illustrative metadata stored with one child chunk', fr: 'Exemple illustratif des métadonnées d’un passage enfant' },
      code: `{
  "document": "procedure-manual.pdf",
  "page": 12,
  "paragraph": 3,
  "line": 41,
  "position": 2,
  "provenance": "shared-drive/operations",
  "owner": "team-a",
  "parent_id": "procedure-manual.pdf#p12-parent-1"
}`,
    },
  },
  {
    slug: 'privasearch',
    projectId: 'privasearch',
    lead: {
      en: 'PrivaSearch answers questions over internal documents without sending anything outside: embeddings, search and generation all run on local infrastructure.',
      fr: 'PrivaSearch répond aux questions sur des documents internes sans rien envoyer à l’extérieur : embeddings, recherche et génération tournent sur une infrastructure locale.',
    },
    diagramTitle: { en: 'Everything inside the boundary', fr: 'Tout reste dans le périmètre' },
    svg: privaSvg,
    steps: [
      { title: { en: 'Ingest with Migroo', fr: 'Ingérer avec Migroo' }, text: { en: 'Documents go through the Migroo pipeline: parsing, chunking and metadata.', fr: 'Les documents passent par le pipeline Migroo : parsing, découpage et métadonnées.' } },
      { title: { en: 'Embed locally', fr: 'Vectoriser en local' }, text: { en: 'Chunks are embedded with nomic-embed-text served by Ollama, then stored in a local ChromaDB index.', fr: 'Les passages sont vectorisés avec nomic-embed-text servi par Ollama, puis stockés dans un index ChromaDB local.' } },
      { title: { en: 'Search by meaning', fr: 'Chercher par le sens' }, text: { en: 'The question is embedded the same way, and semantic search returns the closest passages.', fr: 'La question est vectorisée de la même façon, et la recherche sémantique renvoie les passages les plus proches.' } },
      { title: { en: 'Ground the prompt', fr: 'Ancrer le prompt' }, text: { en: 'A grounding prompt tells the model to answer only from the retrieved context, which limits hallucinations.', fr: 'Un prompt de grounding demande au modèle de répondre uniquement à partir du contexte récupéré, ce qui limite les hallucinations.' } },
      { title: { en: 'Generate on site', fr: 'Générer sur place' }, text: { en: 'A local LLM served by Ollama writes the answer. No document or question leaves the infrastructure.', fr: 'Un LLM local servi par Ollama rédige la réponse. Aucun document ni aucune question ne quitte l’infrastructure.' } },
    ],
    notes: [
      { en: 'Built for teams whose documents cannot be sent to an external API.', fr: 'Pensé pour les équipes dont les documents ne peuvent pas partir vers une API externe.' },
    ],
  },
  {
    slug: 'orange-money-agent',
    projectId: 'agent',
    lead: {
      en: 'A personal project: an agent that reads a request, decides which tool to call, looks at the result and repeats until it can answer, all against a sandboxed API.',
      fr: 'Un projet personnel : un agent qui lit une demande, choisit l’outil à appeler, examine le résultat et recommence jusqu’à pouvoir répondre, le tout sur une API sandbox.',
    },
    diagramTitle: { en: 'Reason, act, observe, repeat', fr: 'Raisonner, agir, observer, recommencer' },
    svg: agentSvg,
    steps: [
      { title: { en: 'Read the request', fr: 'Lire la demande' }, text: { en: 'The user writes a request in plain language.', fr: 'L’utilisateur formule sa demande en langage courant.' } },
      { title: { en: 'Reason', fr: 'Raisonner' }, text: { en: 'The LLM reads the request and the tool descriptions, then decides the next step: call a tool or answer.', fr: 'Le LLM lit la demande et la description des outils, puis décide de l’étape suivante : appeler un outil ou répondre.' } },
      { title: { en: 'Act through MCP', fr: 'Agir via MCP' }, text: { en: 'The chosen tool is called with its arguments. A FastMCP server exposes the sandbox API operations as tools.', fr: 'L’outil choisi est appelé avec ses arguments. Un serveur FastMCP expose les opérations de l’API sandbox sous forme d’outils.' } },
      { title: { en: 'Observe and loop', fr: 'Observer et boucler' }, text: { en: 'The tool result is added to the graph state and the LLM reasons again, until it has what it needs.', fr: 'Le résultat de l’outil est ajouté à l’état du graphe et le LLM raisonne à nouveau, jusqu’à disposer de ce qu’il lui faut.' } },
      { title: { en: 'Answer', fr: 'Répondre' }, text: { en: 'The agent returns its final answer to the user.', fr: 'L’agent renvoie sa réponse finale à l’utilisateur.' } },
    ],
    notes: [
      { en: 'Most of the work went into the tool-use prompts: rewording tool descriptions to improve tool selection and reduce failed calls.', fr: 'L’essentiel du travail a porté sur les prompts d’usage d’outils : reformuler la description des outils pour mieux les choisir et réduire les appels en échec.' },
      { en: 'Runs against a sandbox API only: no real accounts or transactions are involved.', fr: 'Fonctionne uniquement sur une API sandbox : aucun compte ni aucune transaction réels ne sont concernés.' },
    ],
  },
];
