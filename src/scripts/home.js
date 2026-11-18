// Home page behaviour: case-study tabs, and a helper that makes any cited passage visible
// (right tab selected, enclosing details opened) before scrolling to it.
// Without JavaScript every panel stays visible, one after the other.
(function () {
  var list = document.querySelector('[data-tabs]');
  if (!list) return;
  var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
  var panelOf = function (tab) { return document.getElementById(tab.getAttribute('aria-controls')); };

  function select(tab, focus) {
    tabs.forEach(function (x) {
      var on = x === tab;
      x.setAttribute('aria-selected', on ? 'true' : 'false');
      x.tabIndex = on ? 0 : -1;
      panelOf(x).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(tab); });
    tab.addEventListener('keydown', function (e) {
      var to = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
      if (to === null) return;
      e.preventDefault();
      select(tabs[(to + tabs.length) % tabs.length], true);
    });
  });
  select(tabs[0]);

  // Links such as "See the case" open a given tab, then scroll to the case studies.
  document.querySelectorAll('[data-tab]').forEach(function (a) {
    a.addEventListener('click', function () {
      var tab = document.getElementById('tab-' + a.getAttribute('data-tab'));
      if (tab) select(tab);
    });
  });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.showChunk = function (id) {
    var el = document.querySelector('[data-chunk="' + id + '"]');
    if (!el) return false;
    var panel = el.closest('[role="tabpanel"]');
    if (panel && panel.hidden) select(document.getElementById(panel.getAttribute('aria-labelledby')));
    var d = el.closest('details');
    if (d) d.open = true;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    el.classList.remove('flag'); void el.offsetWidth; el.classList.add('flag');
    return true;
  };
})();
