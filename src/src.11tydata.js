/* Defaults for every page in src/.
   Keeps the .html URLs the site already has (art.html, poetry.html …) so
   existing links keep working, and puts every page in the shared layout. */
module.exports = {
  layout: 'base.njk',
  permalink: (data) => `${data.page.filePathStem}.html`,
};
