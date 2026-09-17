/* Eleventy build. Turns src/ into _site/ — plain static HTML, no client-side framework.
   Pages live in src/*.njk, the shared header and footer in src/_includes/,
   and everything Faye edits in src/_data/. */

module.exports = function (eleventyConfig) {
  // Files that ship as-is.
  for (const dir of ['css', 'js', 'assets', 'chapbook']) {
    eleventyConfig.addPassthroughCopy(`src/${dir}`);
  }
  eleventyConfig.addPassthroughCopy('src/favicon.svg');
  eleventyConfig.addPassthroughCopy('src/robots.txt');
  // Redirects from the old WordPress URLs; read by Cloudflare Workers, not served.
  eleventyConfig.addPassthroughCopy('src/_redirects');

  // Rebuild when CSS or JS changes, even though they are copied rather than compiled.
  eleventyConfig.addWatchTarget('src/css');
  eleventyConfig.addWatchTarget('src/js');

  // The three pieces the home page features.
  eleventyConfig.addFilter('featured', (items) => (items || []).filter((w) => w.featured));

  // Distinct `type` values, for the gallery's medium filters.
  eleventyConfig.addFilter('mediums', (items) => {
    const seen = [];
    for (const w of items || []) {
      const t = w.placeholder ? w.label : w.type;
      if (t && !seen.includes(t)) seen.push(t);
    }
    return seen;
  });

  // Embed a data file into the page as JSON (used for the chapbook reader settings).
  eleventyConfig.addFilter('json', (value) => JSON.stringify(value));

  // Notes left for Faye inside src/ are documentation, not pages.
  eleventyConfig.ignores.add('src/**/README.md');

  return {
    dir: { input: 'src', output: '_site', includes: '_includes', data: '_data' },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
