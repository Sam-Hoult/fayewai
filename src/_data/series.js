/* A series of work shown on the Art page, above the full gallery.
   title  the series name
   meta   the line under it (medium, size, anything else)
   works  the pieces, in order. Each one:
            src   image, relative to the site root
            title the piece's name
            meta  shown small beside the title
            alt   accessible description
   To show a different series, change the pieces here — the page follows. */

module.exports = {
  title: 'The Dissolution of Time',
  meta: 'Acrylic on canvas · 8 × 8 in · five-part series',
  works: [
    { src: 'assets/art/dissolution/suspension.jpg', title: 'I. Suspension', meta: 'Acrylic, 8 × 8', alt: 'Small square canvas: pale violet impasto forms suspended in a near-black field' },
    { src: 'assets/art/dissolution/the-first-fracture.jpg', title: 'II. The First Fracture', meta: 'Acrylic, 8 × 8', alt: 'Small square canvas: a pale blue-green break curving across a plum-brown field' },
    { src: 'assets/art/dissolution/out-of-sync.jpg', title: 'III. Out of Sync', meta: 'Acrylic, 8 × 8', alt: 'Small square canvas: a slow spiral of teal, grey and black turning in on itself' },
    { src: 'assets/art/dissolution/breaking-point.jpg', title: 'IV. Breaking Point', meta: 'Acrylic, 8 × 8', alt: 'Small square canvas: silver-grey shards breaking across a dark teal ground' },
    { src: 'assets/art/dissolution/only-fragments-remain.jpg', title: 'V. Only Fragments Remain', meta: 'Acrylic, 8 × 8', alt: 'Small square canvas: scattered pale fragments over deep green and violet' },
  ],
};
