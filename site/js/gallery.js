/* Faye Wai — visual art.
   To add a piece: drop the image into assets/art/ and add a line below.
   Fields: src (required), title (required), meta (shown beside the title),
           type ('painting' | 'illustration' | 'pottery' | 'sketch' — drives the filters),
           ratio ('sq' 1:1 · 'r34' 3:4 · 'r45' 4:5 · 'r43' 4:3), position (object-position for the crop),
           contain: true (show the whole image on paper instead of cropping), full (optional larger file for the lightbox),
           featured: true (shows on the home page — first three), alt (accessible description).
   Order here is the order on the page. Newest work at the top reads best. */
window.GALLERY = [
  { src: 'assets/art/curious-curiouser.jpg', title: 'The Void', meta: 'Diptych · mixed media', type: 'painting', ratio: 'r34', position: 'center 40%', featured: true, alt: 'Two tall abstract paintings in plum and violet hung on a brick wall' },
  { src: 'assets/art/roots-and-rise.jpg', title: 'Root & Rise', meta: 'Mixed media', type: 'painting', ratio: 'r34', position: 'center 30%', featured: true, alt: 'Tall painting in warm amber washes with fine dark lines, leaning on a shelf' },
  { src: 'assets/art/dancing-whisper.jpg', title: 'Dancing Whispers', meta: 'Acrylic', type: 'painting', ratio: 'sq', featured: true, alt: 'Abstract painting with pink, green and black gestures on cream' },
  { src: 'assets/art/containing-fire.jpg', title: 'To Hold a Fire', meta: 'Diptych · acrylic', type: 'painting', ratio: 'sq', alt: 'Two framed abstract paintings in indigo and copper above a white sofa' },
  { src: 'assets/art/bloom-baby-bloom.jpg', title: 'Bloom, Baby Bloom', meta: 'Painting', type: 'painting', ratio: 'r45', position: 'center 40%', alt: 'Framed painting of pastel flowers against a lilac sky' },
  { src: 'assets/art/untitled-florals.jpg', title: 'Untitled', meta: 'Florals · acrylic', type: 'painting', ratio: 'r45', alt: 'Dense, bright painting of sunflowers and garden blooms' },
  { src: 'assets/faye-illustration.jpg', title: 'Me & Jai', meta: 'Illustration', type: 'illustration', ratio: 'sq', contain: true, alt: 'Illustration of Faye with her dog Jai' },
  { src: 'assets/chapbook-cover.jpg', title: 'fragments & echoes', meta: 'Cover artwork', type: 'illustration', ratio: 'sq', contain: true, alt: 'Cover artwork for fragments & echoes: layered petals in blush and grey inside a circle' },
  { placeholder: true, label: 'pottery', title: 'Vessels', meta: 'Coming' }
];
