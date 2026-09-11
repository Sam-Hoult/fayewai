/* Faye Wai — theme panel.
   Lets Faye experiment with colours, fonts, weight and corners, live.
   "Save" keeps the look in this browser; "Copy link" / "Send to Sam" export it so it can become the site default
   (js/theme-default.js). Loaded in <head> so a saved theme applies before first paint. */
(function () {
  'use strict';
  var BASE = {
    paper: '#F7F4EF', ink: '#2C2925', muted: '#82786E', faint: '#A79C92',
    accent: '#AE6C55', blush: '#EEDFD8', blush2: '#F5EAE4', sand: '#E9E3D9',
    serif: 'Newsreader', sans: 'Inter Tight', weight: 300, radius: 1
  };
  var SERIFS = {
    'Newsreader': 'Newsreader:ital,opsz,wght@0,6..72,200..500;1,6..72,200..400',
    'Cormorant Garamond': 'Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400',
    'EB Garamond': 'EB+Garamond:ital,wght@0,400;0,500;1,400',
    'Fraunces': 'Fraunces:ital,opsz,wght@0,9..144,300..500;1,9..144,300..400',
    'Playfair Display': 'Playfair+Display:ital,wght@0,400;0,500;1,400',
    'Lora': 'Lora:ital,wght@0,400;0,500;1,400',
    'Libre Caslon Text': 'Libre+Caslon+Text:ital,wght@0,400;1,400'
  };
  var SANS = {
    'Inter Tight': 'Inter+Tight:wght@400;500', 'Inter': 'Inter:wght@400;500', 'DM Sans': 'DM+Sans:wght@400;500',
    'Manrope': 'Manrope:wght@400;500', 'Work Sans': 'Work+Sans:wght@400;500', 'Karla': 'Karla:wght@400;500',
    'Source Sans 3': 'Source+Sans+3:wght@400;500'
  };
  var PRESETS = {
    'Paper': {},
    'Blush': { paper: '#F8EFEA', ink: '#3A2C28', muted: '#8C7670', faint: '#B39A93', accent: '#B5604A', blush: '#F0D9D0', blush2: '#F5E4DC', sand: '#EBDCD3' },
    'Sage': { paper: '#F3F4EE', ink: '#2A2E28', muted: '#77806F', faint: '#A0A898', accent: '#7E8C5A', blush: '#E4E8DA', blush2: '#ECEFE4', sand: '#E1E4D7' },
    'Stone': { paper: '#F2F1EE', ink: '#26262A', muted: '#767579', faint: '#A3A1A5', accent: '#8B6E9E', blush: '#E6E1EA', blush2: '#EEEAF1', sand: '#E3E1DE' },
    'Night': { paper: '#1E1B19', ink: '#F1ECE4', muted: '#B3A89C', faint: '#7E746A', accent: '#D69A82', blush: '#2C2522', blush2: '#262020', sand: '#2E2926' }
  };
  var KEY = 'fw-theme';
  var current = {};

  function hexRgb(h) { h = String(h || '').replace('#', ''); if (h.length === 3) h = h.replace(/(.)/g, '$1$1'); var n = parseInt(h, 16); return isNaN(n) ? null : [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(','); }
  function merged(t) { var o = {}; Object.keys(BASE).forEach(function (k) { o[k] = t && t[k] != null ? t[k] : BASE[k]; }); return o; }
  function loadFont(name, map) {
    var spec = map[name]; if (!spec) return;
    var id = 'fw-font-' + name.replace(/\W+/g, '-');
    if (document.getElementById(id)) return;
    var l = document.createElement('link'); l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=' + spec + '&display=swap';
    document.head.appendChild(l);
  }
  function apply(t) {
    current = merged(t);
    var s = document.documentElement.style;
    ['paper', 'ink', 'muted', 'faint', 'accent', 'blush', 'blush2', 'sand'].forEach(function (k) { s.setProperty('--' + k, current[k]); });
    s.setProperty('--paper-rgb', hexRgb(current.paper)); s.setProperty('--ink-rgb', hexRgb(current.ink)); s.setProperty('--accent-rgb', hexRgb(current.accent));
    s.setProperty('--serif', '"' + current.serif + '",Georgia,serif');
    s.setProperty('--sans', '"' + current.sans + '",system-ui,sans-serif');
    s.setProperty('--display-weight', String(current.weight));
    s.setProperty('--radius', current.radius + 'px');
    loadFont(current.serif, SERIFS); loadFont(current.sans, SANS);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = current.paper;
  }
  function diff(t) { var o = {}; Object.keys(BASE).forEach(function (k) { if (t[k] !== BASE[k]) o[k] = t[k]; }); return o; }
  function read() { try { var v = localStorage.getItem(KEY); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function write(t) { try { if (t) localStorage.setItem(KEY, JSON.stringify(t)); else localStorage.removeItem(KEY); } catch (e) {} }
  function fromUrl() {
    var m = location.search.match(/[?&]theme=([^&]+)/); if (!m) return null;
    try { return JSON.parse(decodeURIComponent(escape(atob(m[1].replace(/-/g, '+').replace(/_/g, '/'))))); } catch (e) { return null; }
  }
  function toParam(t) { return btoa(unescape(encodeURIComponent(JSON.stringify(diff(t))))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }

  /* Apply, in order of priority: link → saved in this browser → site default → built-in. */
  var siteDefault = window.THEME_DEFAULT || {};
  var initial = fromUrl() || read() || siteDefault;
  apply(merged(Object.assign({}, siteDefault, initial)));

  /* ---------- panel ---------- */
  var panel, status;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function options(map, sel) { return Object.keys(map).map(function (n) { return '<option' + (n === sel ? ' selected' : '') + '>' + esc(n) + '</option>'; }).join(''); }
  function build() {
    if (panel) return panel;
    panel = document.createElement('aside');
    panel.className = 'tp'; panel.hidden = true; panel.setAttribute('aria-label', 'Theme');
    var sw = [['paper', 'Paper'], ['ink', 'Ink'], ['accent', 'Accent'], ['muted', 'Muted text'], ['faint', 'Captions'], ['blush', 'Panel'], ['blush2', 'Panel light'], ['sand', 'Placeholder']];
    panel.innerHTML =
      '<div class="tp__head"><span class="eyebrow">Theme</span><button class="tp__close" type="button" data-tp-close>Close ×</button></div>' +
      '<div class="tp__sec"><span class="label">Presets</span><div class="tp__presets">' +
        Object.keys(PRESETS).map(function (n) { var p = merged(PRESETS[n]); return '<button class="tp__preset" type="button" data-preset="' + esc(n) + '"><i style="background:' + p.paper + ';box-shadow:inset 0 0 0 3px ' + p.accent + '"></i>' + esc(n) + '</button>'; }).join('') +
      '</div></div>' +
      '<div class="tp__sec"><span class="label">Colours</span><div class="tp__swatches">' +
        sw.map(function (p) { return '<label class="tp__sw"><input type="color" data-color="' + p[0] + '" value="' + current[p[0]] + '"><span>' + p[1] + '</span></label>'; }).join('') +
      '</div></div>' +
      '<div class="tp__sec"><span class="label">Type &amp; shape</span>' +
        '<div class="tp__row"><span>Headings</span><select data-serif>' + options(SERIFS, current.serif) + '</select></div>' +
        '<div class="tp__row"><span>Text</span><select data-sans>' + options(SANS, current.sans) + '</select></div>' +
        '<div class="tp__row"><span>Weight <output data-out-weight>' + current.weight + '</output></span><input type="range" min="200" max="500" step="100" data-weight value="' + current.weight + '"></div>' +
        '<div class="tp__row"><span>Corners <output data-out-radius>' + current.radius + 'px</output></span><input type="range" min="0" max="16" step="1" data-radius value="' + current.radius + '"></div>' +
      '</div>' +
      '<div class="tp__acts">' +
        '<button class="btn btn--solid" type="button" data-tp-save>Save here</button>' +
        '<button class="btn" type="button" data-tp-copy>Copy link</button>' +
        '<a class="btn" data-tp-mail href="#">Send to Sam</a>' +
        '<button class="btn" type="button" data-tp-reset>Reset</button>' +
      '</div>' +
      '<div class="tp__status" data-tp-status></div>' +
      '<p class="tp__note">Save keeps this look on this device. Copy link makes a URL that shows it to anyone. Send to Sam emails the settings so it can become the site default.</p>';
    document.body.appendChild(panel);
    status = panel.querySelector('[data-tp-status]');

    panel.addEventListener('input', function (e) {
      var el = e.target, t = Object.assign({}, current);
      if (el.dataset.color) t[el.dataset.color] = el.value.toUpperCase();
      else if (el.hasAttribute('data-serif')) t.serif = el.value;
      else if (el.hasAttribute('data-sans')) t.sans = el.value;
      else if (el.hasAttribute('data-weight')) { t.weight = +el.value; panel.querySelector('[data-out-weight]').textContent = el.value; }
      else if (el.hasAttribute('data-radius')) { t.radius = +el.value; panel.querySelector('[data-out-radius]').textContent = el.value + 'px'; }
      else return;
      apply(t); say('Previewing — not saved yet');
    });
    panel.addEventListener('click', function (e) {
      var b = e.target.closest('button,a'); if (!b) return;
      if (b.dataset.preset != null) { apply(merged(PRESETS[b.dataset.preset])); sync(); say(b.dataset.preset + ' preset — press Save to keep it'); }
      else if (b.hasAttribute('data-tp-close')) toggle(false);
      else if (b.hasAttribute('data-tp-save')) { write(diff(current)); say('Saved on this device'); }
      else if (b.hasAttribute('data-tp-reset')) { write(null); apply(merged(siteDefault)); sync(); say('Back to the site default'); }
      else if (b.hasAttribute('data-tp-copy')) {
        var url = location.origin + location.pathname + '?theme=' + toParam(current);
        var done = function () { say('Link copied'); };
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt('Copy this link', url); });
        else prompt('Copy this link', url);
      }
    });
    var mail = panel.querySelector('[data-tp-mail]');
    mail.addEventListener('mouseenter', setMail); mail.addEventListener('focus', setMail); mail.addEventListener('touchstart', setMail, { passive: true });
    function setMail() {
      var body = 'Hi Sam — I like this theme for the site. Settings:\n\n' + JSON.stringify(diff(current), null, 2) + '\n\nPreview link:\n' + location.origin + location.pathname + '?theme=' + toParam(current);
      mail.href = 'mailto:sam.o.hoult@gmail.com?subject=' + encodeURIComponent('fayewai.com theme') + '&body=' + encodeURIComponent(body);
    }
    return panel;
  }
  function sync() {
    if (!panel) return;
    [].forEach.call(panel.querySelectorAll('[data-color]'), function (i) { i.value = current[i.dataset.color]; });
    panel.querySelector('[data-serif]').value = current.serif; panel.querySelector('[data-sans]').value = current.sans;
    panel.querySelector('[data-weight]').value = current.weight; panel.querySelector('[data-out-weight]').textContent = current.weight;
    panel.querySelector('[data-radius]').value = current.radius; panel.querySelector('[data-out-radius]').textContent = current.radius + 'px';
  }
  function say(t) { if (status) status.textContent = t; }
  function toggle(open) {
    build();
    var show = open == null ? panel.hidden : open;
    panel.hidden = !show;
    if (show) { sync(); say(read() ? 'Showing your saved theme' : ''); }
  }
  document.addEventListener('DOMContentLoaded', function () {
    [].forEach.call(document.querySelectorAll('[data-theme-toggle]'), function (b) { b.addEventListener('click', function (e) { e.preventDefault(); toggle(); }); });
    if (fromUrl()) { build(); toggle(true); say('Theme from a shared link — press Save to keep it'); }
  });
  window.FWTheme = { apply: apply, current: function () { return current; }, presets: PRESETS };
})();
