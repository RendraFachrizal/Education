const slugify = require('slugify');

function generateSlug(text) {
  return slugify(text, {
    lower: true,
    strict: true,
    locale: 'id',
    trim: true
  });
}

function generateUniqueSlug(text, suffix = '') {
  let slug = generateSlug(text);
  if (suffix) {
    slug = `${slug}-${suffix}`;
  }
  return slug;
}

module.exports = { generateSlug, generateUniqueSlug };
