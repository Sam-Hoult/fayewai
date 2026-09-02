# fayewai.com

Faye Wai’s site — artist, poet, and content strategist. A static site: no build step, no framework. Open `site/index.html` or run any local server from `site/`.

## Pages

| File | Page |
| --- | --- |
| `site/index.html` | Home — hero, three doors, selected work, about teaser, chapbook panel |
| `site/art.html` | Art — mediums, filterable gallery with lightbox, origin story |
| `site/poetry.html` | Poetry — *fragments & echoes* chapbook reader (flipbook), selected poems |
| `site/about.html` | About — bio, journey, photo strip |
| `site/editorial.html` | Editorial — bylines, brand work, background |
| `site/404.html` | Not-found page |

## Adding work (the parts Faye will touch)

- **A new painting / piece** → drop the image in `site/assets/art/` and add one line to `site/js/gallery.js`. Fields are documented at the top of that file. `featured: true` puts it on the home page.
- **Chapbook pages** → see `site/chapbook/README.md`. Either a PDF (`site/chapbook/fragments-and-echoes.pdf`) or page images listed in `site/chapbook/config.js`. The reader picks either up automatically.
- **A poem** → add an object to `site/js/poems.js`; the “Selected poems” section appears once there is at least one.
- **Photos on About** → the tiles in `site/about.html` are plain `<figure>` blocks; copy one.
- **A new section or page** → copy any page, keep the `<nav>` and `<footer>` blocks, and add a link in the nav on every page.

Images: keep them around 1600px on the long edge as JPEG. Everything in `assets/` was optimised that way.

## Structure

```
site/
  css/site.css        tokens, type, layout, components, responsive rules
  js/site.js          nav, scroll reveals, gallery rendering, lightbox
  js/gallery.js       ← artwork list
  js/poems.js         ← poems list
  js/flipbook.js      chapbook reader (images or PDF via pdf.js)
  chapbook/config.js  ← chapbook source
  chapbook/pages/     page images
  assets/             images (art/, photos/, editorial/)
```

## Design

Tokens, type, and rhythm follow the Claude Design handoff exactly:

```
--paper #F7F4EF  --ink #2C2925  --muted #82786E  --faint #A79C92
--accent #AE6C55 --blush #EEDFD8 --blush2 #F5EAE4 --sand #E9E3D9
```

Newsreader (display, serif accents) · Inter Tight (UI, prose) · monospace eyebrows. 1360px max width, `clamp(24px,4.5vw,64px)` gutters, near-square radii, hairline rules. Scroll reveals use a rect sweep with a 1600ms fallback. Hover tints and button opacity are CSS.

## Deploying

Pushes to `main` deploy `site/` to GitHub Pages via `.github/workflows/pages.yml`. To point `fayewai.com` at it later: add the domain under Settings → Pages in the repo, then set the DNS records GitHub lists (A records for the apex, CNAME `www` → `sam-hoult.github.io`), and add a `site/CNAME` file containing `fayewai.com`.
