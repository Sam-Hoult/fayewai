/* Photographs of Faye reading. Two sit beside the Poetry hero, the rest sit in
   the "Poetry, out loud" section. Drop a new photo into assets/readings/ and
   add a line here. position sets the crop (object-position). */

module.exports = {
  hero: [
    { src: 'assets/readings/gallery-mic.jpg', alt: 'Faye reading into a microphone in a gallery, prints on the wall behind her' },
    { src: 'assets/readings/brave-zine.jpg', alt: 'Faye reading from a zine at a microphone in a record shop' },
  ],
  /* Order matters: the darker two sit diagonally opposite each other in the grid. */
  live: [
    { src: 'assets/readings/floodlight.jpg', position: 'center 15%', alt: 'Faye at a microphone under purple stage light, papers in hand' },
    { src: 'assets/readings/cream-jacket.jpg', alt: 'Faye reading from her phone at a microphone in front of an audience' },
    { src: 'assets/readings/brave-teal.jpg', alt: 'Faye reading at a record shop open mic' },
    { src: 'assets/readings/bookshop.jpg', position: 'center 35%', alt: 'Faye reading at a microphone in a bookshop, shelves behind her' },
  ],
};
