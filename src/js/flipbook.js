/* Faye Wai — chapbook reader.
   Two-page spread with a hinged 3D leaf. Sources, in priority order:
     1. CHAPBOOK.pages  — image files, one per page
     2. CHAPBOOK.pdf    — a PDF, rendered in the browser with pdf.js
     3. nothing yet     — blank striped paper, so the reader still works
   Configure in chapbook/config.js. */
(function () {
  'use strict';
  var cfg = window.CHAPBOOK || {};
  var $ = function (s) { return document.querySelector(s); };
  var stage = $('[data-stage]'), pageL = $('[data-page="l"]'), pageR = $('[data-page="r"]');
  var leaf = $('[data-leaf]'), counter = $('[data-counter]'), status = $('[data-status]');
  var prevBtn = $('[data-prev]'), nextBtn = $('[data-next]'), dl = $('[data-download]'), note = $('[data-reader-note]');
  if (!stage || !pageL || !pageR) return;
  var faces = leaf ? leaf.querySelectorAll('.leaf__face') : [];

  var src = [];          // src[i] = image URL (or data URL) for page i, 0-based
  var pending = {};
  var total = 0;         // 0 = no pages yet → blank book
  var pdfDoc = null, queue = [], rendering = false, RENDER_W = 1100;
  var spread = 0, busy = false;

  function count() { return total || 8; }
  function spreads() { return Math.ceil((count() + 1) / 2); }
  function idxL(s) { return 2 * s - 1; }   // cover sits alone on the right of spread 0
  function idxR(s) { return 2 * s; }
  function valid(i) { return i >= 0 && i < count(); }
  function setStatus(t) { if (status) status.textContent = t || ''; }

  function fill(el, i) {
    if (!el) return;
    var img = el.querySelector('img');
    var label = el.querySelector('[data-label]');
    if (!valid(i)) {
      if (img) img.parentNode.removeChild(img);
      el.classList.remove('has-img');
      if (label) label.textContent = '';
      return;
    }
    if (label) label.textContent = total ? String(i + 1) : 'page ' + (i + 1);
    var url = src[i];
    if (url) {
      if (!img) {
        img = document.createElement('img');
        img.alt = 'Page ' + (i + 1);
        img.draggable = false;
        el.appendChild(img);
      }
      if (img.getAttribute('src') !== url) img.setAttribute('src', url);
      el.classList.add('has-img');
    } else {
      if (img) img.parentNode.removeChild(img);
      el.classList.remove('has-img');
      if (total) ensure(i);
    }
  }

  function paint() {
    var L = idxL(spread), R = idxR(spread);
    fill(pageL, L); fill(pageR, R);
    if (counter) {
      if (total) {
        var a = Math.max(L, 0) + 1, b = Math.min(R, total - 1) + 1;
        counter.textContent = (L < 0 ? 'Cover' : (a === b ? 'Page ' + a : 'Pages ' + a + '–' + b)) + ' of ' + total;
      } else {
        counter.textContent = 'Spread ' + (spread + 1) + ' of ' + spreads();
      }
    }
    if (prevBtn) prevBtn.disabled = spread <= 0;
    if (nextBtn) nextBtn.disabled = spread >= spreads() - 1;
    prefetch();
  }

  function go(dir) {
    if (busy) return;
    var to = spread + dir;
    if (to < 0 || to >= spreads()) return;
    busy = true;
    if (leaf && faces.length === 2) {
      var front, back;
      if (dir === 1) { front = idxR(spread); back = idxL(to); fill(pageR, idxR(to)); }
      else { front = idxR(to); back = idxL(spread); fill(pageL, idxL(to)); }
      fill(faces[0], front); fill(faces[1], back);
      leaf.style.opacity = '1';
      leaf.style.animation = 'none';
      void leaf.offsetWidth;
      leaf.style.animation = (dir === 1 ? 'leaf-fwd' : 'leaf-back') + ' .76s cubic-bezier(.42,.05,.3,1) forwards';
    }
    setTimeout(function () {
      if (leaf) { leaf.style.animation = 'none'; leaf.style.opacity = '0'; }
      spread = to; busy = false; paint();
    }, leaf ? 820 : 0);
  }

  /* ----- sourcing pages ----- */
  function prefetch() {
    if (!total) return;
    var L = idxL(spread), R = idxR(spread);
    [L, R, R + 1, R + 2, L - 1, L - 2, R + 3, R + 4].forEach(function (i) { if (valid(i)) ensure(i); });
  }
  function ensure(i) {
    if (pending[i]) return;
    pending[i] = true;
    if (pdfDoc) { queue.push(i); pump(); }
    else if (src[i]) { var im = new Image(); im.src = src[i]; }
  }
  function pump() {
    if (rendering || !queue.length) return;
    rendering = true;
    var i = queue.shift();
    pdfDoc.getPage(i + 1).then(function (page) {
      var vp0 = page.getViewport({ scale: 1 });
      var scale = RENDER_W / vp0.width;
      var vp = page.getViewport({ scale: scale });
      var c = document.createElement('canvas');
      c.width = Math.round(vp.width); c.height = Math.round(vp.height);
      return page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise.then(function () {
        return c.toDataURL('image/jpeg', 0.88);
      });
    }).then(function (url) {
      src[i] = url; rendering = false;
      if (i === idxL(spread)) fill(pageL, i);
      if (i === idxR(spread)) fill(pageR, i);
      if (src[Math.max(idxL(spread), 0)] && src[idxR(spread)]) setStatus('');
      pump();
    }, function (err) {
      rendering = false; pending[i] = false;
      setStatus('Page ' + (i + 1) + ' could not be rendered');
      if (window.console) console.error(err);
      pump();
    });
  }
  function setRatio(r) {
    [].forEach.call(document.querySelectorAll('.page'), function (p) { p.style.aspectRatio = String(r); });
  }
  function ready(url) {
    if (dl && url) { dl.href = url; dl.hidden = false; }
    if (note) note.hidden = true;
    setStatus('');
    paint();
  }
  function useImages(list) {
    total = list.length; src = list.slice();
    var probe = new Image();
    probe.onload = function () { if (probe.naturalWidth && probe.naturalHeight) setRatio(probe.naturalWidth / probe.naturalHeight); };
    probe.src = list[0];
    ready(null);
    if (cfg.pdf && location.protocol !== 'file:') {
      fetch(cfg.pdf, { method: 'HEAD' }).then(function (r) { if (r.ok && dl) { dl.href = cfg.pdf; dl.hidden = false; } }).catch(function () {});
    }
  }
  function loadScript(u, cb) {
    var s = document.createElement('script'); s.src = u; s.onload = cb;
    s.onerror = function () { setStatus('The reader could not load'); };
    document.head.appendChild(s);
  }
  function usePdf(url) {
    setStatus('Opening the chapbook…');
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js', function () {
      var lib = window.pdfjsLib;
      lib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      lib.getDocument(url).promise.then(function (doc) {
        pdfDoc = doc; total = doc.numPages; src = new Array(total);
        return doc.getPage(1);
      }).then(function (p) {
        var vp = p.getViewport({ scale: 1 });
        setRatio(vp.width / vp.height);
        setStatus('Rendering pages…');
        ready(url);
        setTimeout(function () { for (var i = 0; i < total; i++) ensure(i); }, 1200);
      }).catch(function (e) {
        setStatus('The chapbook could not be opened');
        if (window.console) console.error(e);
        paint();
      });
    });
  }

  /* ----- controls ----- */
  document.addEventListener('DOMContentLoaded', function () {
    var pages = Array.isArray(cfg.pages) ? cfg.pages.filter(Boolean) : [];
    if (pages.length) useImages(pages);
    else if (cfg.pdf && location.protocol !== 'file:') {
      paint();
      fetch(cfg.pdf, { method: 'HEAD' }).then(function (r) { if (r.ok) usePdf(cfg.pdf); }).catch(function () {});
    } else paint();

    if (prevBtn) prevBtn.addEventListener('click', function () { go(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(1); });
    window.addEventListener('keydown', function (e) {
      var t = e.target && e.target.tagName;
      if (t === 'INPUT' || t === 'TEXTAREA' || document.querySelector('.lightbox.is-open')) return;
      var r = stage.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;   /* only while the reader is on screen */
      if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1);
    });
    var x0 = null;
    stage.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    stage.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 44) go(dx < 0 ? 1 : -1);
    });
    stage.addEventListener('pointerleave', function () { x0 = null; });
    stage.addEventListener('dragstart', function (e) { e.preventDefault(); });
  });
})();
