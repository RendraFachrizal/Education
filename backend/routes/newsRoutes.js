const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const News = require('../models/News');
const response = require('../utils/response');

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
    const news = await News.findBySlug(req.params.slug);
    if (!news) return response.notFound(res, 'Berita tidak ditemukan');
    await News.incrementViews(news.id);

    const related = await News.getRelated(news.id, news.category_id);
    return response.success(res, { ...news, related });
  } catch (error) { next(error); }
});

// Admin
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const data = await News.create(req.body);
    return response.created(res, data, 'Berita berhasil ditambahkan');
  } catch (error) { next(error); }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const existing = await News.findById(req.params.id);
    if (!existing) return response.notFound(res, 'Berita tidak ditemukan');
    await News.update(req.params.id, req.body);
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
