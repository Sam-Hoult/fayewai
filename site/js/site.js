/* Faye Wai — shared behaviour: nav, scroll reveals, gallery rendering, lightbox. */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  /* ---------- Nav ---------- */
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('[data-nav-toggle]');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  [].forEach.call(document.querySelectorAll('.nav__links a'), function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href === here) a.setAttribute('aria-current', 'page');
  });

  /* ---------- Scroll reveals ----------
     Rect sweep on scroll/resize plus a 1600ms fallback that reveals
     everything if nothing has fired (keeps a slow page from being blank). */
  var els = [].slice.call(document.querySelectorAll('[data-reveal]'));
  function show(el) { el.classList.add('is-in'); }
  function sweep() {
    var h = window.innerHeight || 900;
    els.forEach(function (el) {
      if (el.classList.contains('is-in')) return;
      var r = el.getBoundingClientRect();
      if (r.top < h * 0.94 && r.bottom > -80) show(el);
    });
  }
  function startReveals() {
    sweep();
    document.addEventListener('scroll', sweep, { passive: true, capture: true });
    window.addEventListener('resize', sweep);
    setTimeout(sweep, 400);
    setTimeout(function () {
      if (els.every(function (el) { return !el.classList.contains('is-in'); })) els.forEach(show);
    }, 1600);
  }

  /* ---------- Gallery ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function workHTML(w) {
    if (w.placeholder) {
      return '<figure class="work work--placeholder" style="cursor:default">' +
        '<div class="placeholder"><span>' + esc(w.label || 'coming soon') + '</span></div>' +
        '<figcaption><span class="work__title">' + esc(w.title) + '</span><span>' + esc(w.meta || 'Coming') + '</span></figcaption></figure>';
    }
    var frame = 'frame ' + (w.ratio || 'sq') + (w.contain ? ' frame--contain frame--paper' : '');
    return '<figure class="work" tabindex="0" role="button" aria-label="View ' + esc(w.title) + '" data-full="' + esc(w.full || w.src) + '">' +
      '<div class="' + frame + '"><img src="' + esc(w.src) + '" alt="' + esc(w.alt || w.title) + '" loading="lazy"' + (w.position ? ' style="object-position:' + esc(w.position) + '"' : '') + '></div>' +
      '<figcaption><span class="work__title">' + esc(w.title) + '</span><span>' + esc(w.meta || '') + '</span></figcaption></figure>';
  }
  window.renderGallery = function (container, items) {
    if (!container) return;
    container.innerHTML = items.map(workHTML).join('');
    bindLightbox(container);
  };

  /* ---------- Lightbox ---------- */
  var lb, lbImg, lbTitle, lbMeta, lbCount, current = { list: [], i: 0 };
  function buildLightbox() {
    if (lb) return;
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Artwork');
    lb.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close">Close ×</button>' +
      '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous">←</button>' +
      '<img class="lightbox__img" alt="">' +
      '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next">→</button>' +
      '<div class="lightbox__cap"><span><b></b> <span class="lightbox__meta"></span></span><span class="lightbox__count"></span></div>';
    document.body.appendChild(lb);
    lbImg = lb.querySelector('.lightbox__img');
    lbTitle = lb.querySelector('b');
    lbMeta = lb.querySelector('.lightbox__meta');
    lbCount = lb.querySelector('.lightbox__count');
    lb.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox__nav--prev').addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
    lb.querySelector('.lightbox__nav--next').addEventListener('click', function (e) { e.stopPropagation(); step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target === lbImg) { if (e.target === lb) closeLightbox(); } });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    });
  }
  function render() {
    var w = current.list[current.i];
    lbImg.src = w.full;
    lbImg.alt = w.alt;
    lbTitle.textContent = w.title;
    lbMeta.textContent = w.meta ? ' — ' + w.meta : '';
    lbCount.textContent = (current.i + 1) + ' / ' + current.list.length;
    var prev = current.list[current.i - 1], next = current.list[current.i + 1];
    if (next) new Image().src = next.full;
    if (prev) new Image().src = prev.full;
  }
  function step(d) {
    var n = current.i + d;
    if (n < 0 || n >= current.list.length) return;
    current.i = n; render();
  }
  function openLightbox(list, i) {
    buildLightbox();
    current = { list: list, i: i };
    render();
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lightbox__close').focus();
  }
  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  function collect(container) {
    return [].map.call(container.querySelectorAll('.work:not(.work--placeholder)'), function (f) {
      var img = f.querySelector('img');
      var caps = f.querySelectorAll('figcaption span');
      return {
        full: f.getAttribute('data-full') || (img && img.src),
        alt: img ? img.alt : '',
        title: caps[0] ? caps[0].textContent : '',
        meta: caps[1] ? caps[1].textContent : ''
      };
    });
  }
  function bindLightbox(container) {
    var figs = [].slice.call(container.querySelectorAll('.work:not(.work--placeholder)'));
    figs.forEach(function (f, i) {
      if (f.__lb) return;
      f.__lb = true;
      f.setAttribute('tabindex', '0');
      function open() { openLightbox(collect(container), i); }
      f.addEventListener('click', open);
      f.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }
  window.bindLightbox = bindLightbox;

  document.addEventListener('DOMContentLoaded', function () {
    [].forEach.call(document.querySelectorAll('[data-lightbox]'), bindLightbox);
    startReveals();
  });
})();
