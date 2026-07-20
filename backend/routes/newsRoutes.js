const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const News = require('../models/News');
const response = require('../utils/response');
const { generateSlug, generateUniqueSlug } = require('../services/slugService');

// Public
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 9, category, search } = req.query;
    const result = await News.findPublished({ page, limit, category, search });
    return response.success(res, result);
  } catch (error) { next(error); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const param = req.params.slug;
    const isId = /^\d+$/.test(param);
    const news = isId ? await News.findById(param) : await News.findBySlug(param);
    if (!news) return response.notFound(res, 'Berita tidak ditemukan');
    if (!isId) await News.incrementViews(news.id);

    const related = await News.getRelated(news.id, news.category_id);
    return response.success(res, { ...news, related });
  } catch (error) { next(error); }
});

// Admin
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    let slug = generateSlug(req.body.title);
    const existing = await News.findBySlug(slug);
    if (existing) {
      const timestamp = Date.now();
      slug = generateUniqueSlug(req.body.title, timestamp.toString());
    }
    const payload = { ...req.body, slug, category_id: req.body.category_id || null };
    const data = await News.create(payload);
    return response.created(res, data, 'Berita berhasil ditambahkan');
  } catch (error) { next(error); }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const existing = await News.findById(req.params.id);
    if (!existing) return response.notFound(res, 'Berita tidak ditemukan');
    const payload = { ...req.body };
    if (payload.category_id === '' || payload.category_id === undefined) payload.category_id = null;
    await News.update(req.params.id, payload);
    const updated = await News.findById(req.params.id);
    return response.success(res, updated, 'Berita berhasil diupdate');
  } catch (error) { next(error); }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const existing = await News.findById(req.params.id);
    if (!existing) return response.notFound(res, 'Berita tidak ditemukan');
    await News.delete(req.params.id);
    return response.success(res, null, 'Berita berhasil dihapus');
  } catch (error) { next(error); }
});

module.exports = router;
