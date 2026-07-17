const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Message = require('../models/Message');
const response = require('../utils/response');

// Public
router.post('/', async (req, res, next) => {
  try {
    const data = await Message.create(req.body);
    return response.created(res, null, 'Pesan berhasil dikirim');
  } catch (error) { next(error); }
});

// Admin
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const where = [];
    const params = [];
    if (status) { where.push('status = ?'); params.push(status); }
    const result = await Message.paginate({
      page: parseInt(page),
      limit: parseInt(limit),
      where: where.join(' AND '),
      params,
      orderBy: 'created_at DESC'
    });
    return response.success(res, result);
  } catch (error) { next(error); }
});

router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return response.notFound(res, 'Pesan tidak ditemukan');

    await Message.markAsRead(req.params.id, req.user.id);
    return response.success(res, message);
  } catch (error) { next(error); }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const existing = await Message.findById(req.params.id);
    if (!existing) return response.notFound(res, 'Pesan tidak ditemukan');
    await Message.delete(req.params.id);
    return response.success(res, null, 'Pesan berhasil dihapus');
  } catch (error) { next(error); }
});

module.exports = router;
