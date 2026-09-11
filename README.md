# fayewai.com

Faye Wai’s site — artist, poet, and content strategist.

Built with [Eleventy](https://www.11ty.dev/): pages in `src/` become plain static HTML in `_site/`. No client-side framework, no bundler. The header and footer are written once and shared by every page, and the lists Faye updates (artwork, poems, bylines, photos) live in `src/_data/` as small, commented files.

## Running it

```bash
npm install      # once
npm start        # http://localhost:8080, rebuilds and reloads as you save
```

`npm run build` writes the finished site to `_site/`.

## Where things are

```
src/
  index.njk  art.njk  poetry.njk  about.njk  editorial.njk  404.njk
  _includes/
    base.njk          the page shell — head, nav, footer, scripts
    nav.njk           the header, once
    footer.njk        the footer, once
    work.njk          one artwork tile, used by the home page and the gallery
  _data/              ← everything Faye edits
    site.js           name, email, nav links, footer words
    gallery.js        the artwork
    poems.js          the poems
    places.js         the About photo strip
    editorial.js      bylines and brands
    chapbook.js       the chapbook reader’s pages
  css/site.css        tokens, type, layout, components, responsive rules
  js/site.js          nav, scroll reveals, gallery filters, lightbox
  js/flipbook.js      chapbook reader (images, or a PDF via pdf.js)
  js/theme.js         the theme panel
  assets/             images (art/, photos/, editorial/)
  chapbook/pages/     chapbook page images
eleventy.config.js    build settings
```

Each page’s title, description and social image are the few lines of front matter at the top of its `.njk` file.

## Making changes

- **A new painting or piece** → drop the image in `src/assets/art/`, add a line to `src/_data/gallery.js`. Fields are documented at the top of that file. `featured: true` also puts it on the home page, and a new `type` adds itself to the gallery filters.
- **A poem** → add an object to `src/_data/poems.js`. The “Selected poems” section appears once there is at least one.
- **Chapbook pages** → see `src/chapbook/README.md`. Either a PDF at `src/chapbook/fragments-and-echoes.pdf` or page images listed in `src/_data/chapbook.js`. The reader picks either up on its own.
- **A photo on About** → add a line to `src/_data/places.js`.
- **A byline or brand** → add a line to `src/_data/editorial.js`.
- **A nav link, the email address, the footer words** → `src/_data/site.js`. It changes on every page at once.
- **A new page** → copy any `.njk` file, change the front matter, write the content. It gets the header and footer automatically; add it to `nav` in `src/_data/site.js` to put it in the menu.

Images: around 1600px on the long edge, JPEG. Everything in `assets/` was optimised that way.

## Theme panel

Every page has a small “· Theme” button at the end of the footer. It opens a panel where Faye can try presets (Paper, Blush, Sage, Stone, Night), pick any colour, change the heading and text fonts, the heading weight, and corner radius — live, on the real pages.

- **Save here** keeps the look in that browser only (localStorage).
- **Copy link** makes a URL with the theme in it, so anyone opening it sees that look.
- **Send to Sam** opens an email with the settings and the link.
- **Reset** goes back to the site default.

To make a theme the default for everyone, paste the settings from the email (or decode the link) into `src/js/theme-default.js`:

```js
window.THEME_DEFAULT = { paper: '#F3F4EE', accent: '#7E8C5A', serif: 'Fraunces', radius: 8 };
```

Fonts on offer are listed at the top of `src/js/theme.js`; add more there.

## Design

Tokens, type, and rhythm follow the Claude Design handoff exactly:

```
--paper #F7F4EF  --ink #2C2925  --muted #82786E  --faint #A79C92
--accent #AE6C55 --blush #EEDFD8 --blush2 #F5EAE4 --sand #E9E3D9
```

Newsreader (display, serif accents) · Inter Tight (UI, prose) · monospace eyebrows. 1360px max width, `clamp(24px,4.5vw,64px)` gutters, near-square radii, hairline rules. Scroll reveals use a rect sweep with a 1600ms fallback. Hover tints and button opacity are CSS.

## Deploying

Pushes to `main` build the site and deploy `_site/` to GitHub Pages via `.github/workflows/pages.yml`.

Pages keep their `.html` URLs (`art.html`, `poetry.html`) so existing links stay good.

To point `fayewai.com` at it later: add the domain under Settings → Pages in the repo, set the DNS records GitHub lists (A records for the apex, CNAME `www` → `sam-hoult.github.io`), and add a `src/CNAME` file containing `fayewai.com` plus a line for it in the passthrough list in `eleventy.config.js`.
