const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Menu = require('../models/Menu');
const response = require('../utils/response');

router.get('/', async (req, res, next) => {
  try {
    const position = req.query.position || 'header';
    const data = await Menu.getMenuTree(position);
    return response.success(res, data);
  } catch (error) { next(error); }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const data = await Menu.create(req.body);
    return response.created(res, data, 'Menu berhasil ditambahkan');
  } catch (error) { next(error); }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const existing = await Menu.findById(req.params.id);
    if (!existing) return response.notFound(res, 'Menu tidak ditemukan');
    await Menu.update(req.params.id, req.body);
    const updated = await Menu.findById(req.params.id);
    return response.success(res, updated, 'Menu berhasil diupdate');
  } catch (error) { next(error); }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const existing = await Menu.findById(req.params.id);
    if (!existing) return response.notFound(res, 'Menu tidak ditemukan');
    await Menu.delete(req.params.id);
    return response.success(res, null, 'Menu berhasil dihapus');
  } catch (error) { next(error); }
});

module.exports = router;
