/* Faye Wai — site-wide settings.
   Everything here appears on every page: the nav, the footer, contact details.
   Change it once and the whole site follows. */

module.exports = {
  name: 'Faye Wai',
  url: 'https://sam-hoult.github.io/fayewai',
  email: 'hi.fayewai@gmail.com',
  linkedin: 'https://www.linkedin.com/in/fayewai/',

  /* The nav. Add a page here and it appears in the menu on every page. */
  nav: [
    { text: 'Art', href: 'art.html' },
    { text: 'Poetry', href: 'poetry.html' },
    { text: 'About', href: 'about.html' },
    { text: 'Editorial', href: 'editorial.html' },
  ],

  footer: {
    heading: 'Commissions are open',
    body: 'I make art that reflects the spirit of a space — a new home still finding its warmth, a clinic welcoming clients with comfort, a restaurant building an atmosphere worth remembering.',
    tagline: 'colour, texture, rhythm, wisdom',
    copyright: '© 2026 Faye Wai. All rights reserved.',
  },

  /* Google Fonts request. The theme panel loads any other font it needs on demand. */
  fonts: 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..500;1,6..72,200..400&family=Inter+Tight:wght@400;500&display=swap',
};
