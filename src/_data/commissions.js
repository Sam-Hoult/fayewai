/* Commissioned pieces, shown on the Art page under the landscapes.
   Fields: src, title, meta (shown small beside the title),
           ratio ('r43' 4:3 · 'r34' 3:4 · 'sq' 1:1 · 'r45' 4:5),
           contain: true (show the whole piece on paper instead of cropping),
           position (object-position for the crop), alt.
   Order here is the order on the page. */

module.exports = [
  { src: 'assets/art/dune.jpg', title: 'Dune', meta: 'Acrylic', ratio: 'r34', contain: true, alt: 'Tall framed painting of pale sand drifts under a clear blue sky' },
  { src: 'assets/art/tides-and-turns.jpg', title: 'Tides and Turns', meta: 'Acrylic', ratio: 'r43', alt: 'Abstract painting: blue and teal currents sweeping past a soft yellow sun on a pale ground' },
  { src: 'assets/art/to-hold-a-fire.jpg', title: 'To Hold a Fire', meta: 'Diptych · acrylic', ratio: 'r43', alt: 'Diptych of two framed abstract paintings in indigo, white and red' },
  { src: 'assets/art/bloom-baby-bloom.jpg', title: 'Bloom, Baby Bloom', meta: 'Mixed media · fabric embroidery', ratio: 'r45', position: 'center 40%', alt: 'Framed painting of pastel flowers against a lilac sky' },
  { src: 'assets/art/roots-and-rise.jpg', title: 'Root & Rise', meta: 'Mixed media', ratio: 'r34', position: 'center 30%', alt: 'Tall painting in warm amber washes with fine dark lines, leaning on a shelf' },
];
