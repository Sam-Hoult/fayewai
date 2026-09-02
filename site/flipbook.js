(function(){
  // Chapbook page images, in reading order. Add page files to assets/chapbook/ and list them here.
  var PAGES = [];
  var spread = 0, busy = false;
  var SPREADS = Math.max(1, Math.ceil(Math.max(PAGES.length, 8) / 2));
  function paint(){
    var L = spread * 2, R = L + 1;
    [['l', L], ['r', R]].forEach(function(pair){
      var el = document.querySelector('[data-page="' + pair[0] + '"]'), i = pair[1];
      if (!el) return;
      if (PAGES[i]) { el.style.backgroundImage = 'url("' + PAGES[i] + '")'; }
      var lab = el.querySelector('[data-label]');
      if (lab) lab.textContent = PAGES.length ? String(i + 1) : 'page ' + (i + 1);
    });
    var c = document.querySelector('[data-counter]');
    if (c) c.textContent = PAGES.length
      ? 'Pages ' + (L + 1) + '–' + Math.min(R + 1, PAGES.length) + ' of ' + PAGES.length
      : 'Spread ' + (spread + 1) + ' of ' + SPREADS;
  }
  function go(dir){
    if (busy) return;
    var to = spread + dir;
    if (to < 0 || to >= SPREADS) return;
    busy = true;
    var leaf = document.querySelector('[data-leaf]');
    var faces = leaf ? leaf.children : null;
    if (faces && PAGES.length) {
      var front = dir === 1 ? spread * 2 + 1 : spread * 2 - 2;
      var back = dir === 1 ? spread * 2 + 2 : spread * 2 - 1;
      faces[0].style.backgroundImage = PAGES[front] ? 'url("' + PAGES[front] + '")' : 'none';
      faces[1].style.backgroundImage = PAGES[back] ? 'url("' + PAGES[back] + '")' : 'none';
    }
    if (leaf) {
      leaf.style.opacity = '1';
      leaf.style.animation = 'none';
      void leaf.offsetWidth;
      leaf.style.animation = (dir === 1 ? 'leaf-fwd' : 'leaf-back') + ' .76s cubic-bezier(.42,.05,.3,1) forwards';
    }
    setTimeout(function(){
      if (leaf) { leaf.style.animation = 'none'; leaf.style.opacity = '0'; }
      spread = to; busy = false; paint();
    }, 820);
  }
  document.addEventListener('DOMContentLoaded', function(){
    paint();
    var prev = document.querySelector('[data-prev]'), next = document.querySelector('[data-next]');
    if (prev) prev.addEventListener('click', function(){ go(-1); });
    if (next) next.addEventListener('click', function(){ go(1); });
    window.addEventListener('keydown', function(e){
      if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1);
    });
    var stage = document.querySelector('[data-stage]'), x0 = null;
    if (stage) {
      stage.addEventListener('pointerdown', function(e){ x0 = e.clientX; });
      stage.addEventListener('pointerup', function(e){
        if (x0 === null) return;
        var dx = e.clientX - x0; x0 = null;
        if (Math.abs(dx) > 44) go(dx < 0 ? 1 : -1);
      });
      stage.addEventListener('pointerleave', function(){ x0 = null; });
    }
  });
})();