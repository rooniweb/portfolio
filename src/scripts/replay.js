// Scenario tabs + step-by-step replay. Every scenario is fully rendered at rest;
// "Run again" replays the reveal. Respects reduced motion.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-replay]').forEach(function (root) {
    var timers = [];
    function current() { return root.querySelector('.rp-steps:not([hidden])'); }
    function play() {
      timers.forEach(clearTimeout); timers = [];
      var steps = current().querySelectorAll('.rp-step');
      if (reduce) { steps.forEach(function (s) { s.classList.remove('wait'); }); return; }
      steps.forEach(function (s, i) {
        s.classList.add('wait');
        timers.push(setTimeout(function () { s.classList.remove('wait'); }, 120 + i * 520));
      });
    }
    root.querySelectorAll('.rp-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        root.querySelectorAll('.rp-tab').forEach(function (x) { x.setAttribute('aria-selected', x === tab ? 'true' : 'false'); });
        root.querySelectorAll('.rp-steps').forEach(function (ol) { ol.hidden = ol.getAttribute('data-sc') !== tab.getAttribute('data-i'); });
        play();
      });
    });
    root.querySelector('[data-run]').addEventListener('click', play);
  });
})();
