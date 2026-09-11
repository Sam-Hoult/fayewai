/* The poem reader on the Poetry page.
   Each card holds its own poem. Clicking one opens it over the page and puts
   its slug in the address bar (poetry.html#poem-may), so a poem can be linked
   to and the back button closes it. No separate page, no reload. */
(function () {
  var cards = [].slice.call(document.querySelectorAll('[data-poem]'));
  if (!cards.length) return;

  var reader, titleEl, metaEl, noteEl, bodyEl, prevBtn, nextBtn;
  var index = -1;
  var lastFocus = null;

  function build() {
    if (reader) return;
    reader = document.createElement('div');
    reader.className = 'reader-overlay';
    reader.setAttribute('role', 'dialog');
    reader.setAttribute('aria-modal', 'true');
    reader.setAttribute('aria-label', 'Poem');
    reader.innerHTML =
      '<button class="reader-overlay__close" type="button">Close</button>' +
      '<article class="reader-overlay__in">' +
      '<h2 class="reader-overlay__title"></h2>' +
      '<p class="reader-overlay__meta"></p>' +
      '<p class="reader-overlay__note"></p>' +
      '<div class="reader-overlay__body"></div>' +
      '<nav class="reader-overlay__nav">' +
      '<button class="reader-overlay__step reader-overlay__step--prev" type="button"><span class="reader-overlay__dir">← Previous poem</span><span class="reader-overlay__peek"></span></button>' +
      '<button class="reader-overlay__step reader-overlay__step--next" type="button"><span class="reader-overlay__dir">Next poem →</span><span class="reader-overlay__peek"></span></button>' +
      '</nav>' +
      '</article>';
    document.body.appendChild(reader);
    titleEl = reader.querySelector('.reader-overlay__title');
    metaEl = reader.querySelector('.reader-overlay__meta');
    noteEl = reader.querySelector('.reader-overlay__note');
    bodyEl = reader.querySelector('.reader-overlay__body');
    prevBtn = reader.querySelector('.reader-overlay__step--prev');
    nextBtn = reader.querySelector('.reader-overlay__step--next');

    reader.querySelector('.reader-overlay__close').addEventListener('click', function () { close(true); });
    prevBtn.addEventListener('click', function () { step(-1); });
    nextBtn.addEventListener('click', function () { step(1); });
    reader.addEventListener('click', function (e) { if (e.target === reader) close(true); });
    document.addEventListener('keydown', function (e) {
      if (!reader.classList.contains('is-open')) return;
      if (e.key === 'Escape') close(true);
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }

  function render() {
    var card = cards[index];
    var note = card.getAttribute('data-note');
    var year = card.getAttribute('data-year');
    titleEl.textContent = card.getAttribute('data-title');
    metaEl.textContent = year ? 'Faye Wai · ' + year : 'Faye Wai';
    noteEl.textContent = note || '';
    noteEl.hidden = !note;
    bodyEl.textContent = card.querySelector('[data-poem-body]').textContent;
    var before = cards[index - 1];
    var after = cards[index + 1];
    prevBtn.hidden = !before;
    nextBtn.hidden = !after;
    if (before) prevBtn.querySelector('.reader-overlay__peek').textContent = before.getAttribute('data-title');
    if (after) nextBtn.querySelector('.reader-overlay__peek').textContent = after.getAttribute('data-title');
    reader.scrollTop = 0;
  }

  function open(i, push) {
    build();
    index = i;
    render();
    if (!reader.classList.contains('is-open')) lastFocus = document.activeElement;
    reader.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    reader.querySelector('.reader-overlay__close').focus();
    var hash = '#poem-' + cards[i].getAttribute('data-poem');
    if (push && location.hash !== hash) history.pushState(null, '', hash);
  }

  function close(push) {
    /* Clear the scroll lock even if the reader was never built, so a stale
       lock can never leave the page stuck. */
    document.body.style.overflow = '';
    if (!reader) return;
    reader.classList.remove('is-open');
    if (lastFocus) lastFocus.focus();
    if (push && location.hash.indexOf('#poem-') === 0) history.pushState(null, '', location.pathname);
  }

  function step(d) {
    var n = index + d;
    if (n < 0 || n >= cards.length) return;
    open(n, true);
  }

  function fromHash() {
    var m = /^#poem-(.+)$/.exec(location.hash);
    if (!m) { close(false); return; }
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].getAttribute('data-poem') === m[1]) { open(i, false); return; }
    }
  }

  cards.forEach(function (card, i) {
    card.querySelector('[data-poem-open]').addEventListener('click', function (e) {
      e.preventDefault();
      open(i, true);
    });
  });
  window.addEventListener('popstate', fromHash);
  window.addEventListener('pageshow', function () { if (!reader || !reader.classList.contains('is-open')) document.body.style.overflow = ''; });
  document.body.style.overflow = '';
  fromHash();
})();
