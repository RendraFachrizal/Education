const router = require('express').Router();
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');
const response = require('../utils/response');

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await User.findAllWithRole({ page, limit });
    return response.success(res, result);
  } catch (error) { next(error); }
});

router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return response.notFound(res, 'User tidak ditemukan');
    return response.success(res, user);
  } catch (error) { next(error); }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const existing = await User.findByEmail(req.body.email);
    if (existing) return response.badRequest(res, 'Email sudah terdaftar');

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const data = await User.create({ ...req.body, password: hashedPassword });
    delete data.password;
    return response.created(res, data, 'User berhasil ditambahkan');
  } catch (error) { next(error); }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const existing = await User.findById(req.params.id);
    if (!existing) return response.notFound(res, 'User tidak ditemukan');

    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
      delete updateData.password;
    }

    await User.update(req.params.id, updateData);
    const updated = await User.findById(req.params.id);
    delete updated.password;
    return response.success(res, updated, 'User berhasil diupdate');
  } catch (error) { next(error); }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    if (parseInt(req.params.id) === req.user.id) {
      return response.badRequest(res, 'Tidak dapat menghapus akun sendiri');
    }
    const existing = await User.findById(req.params.id);
    if (!existing) return response.notFound(res, 'User tidak ditemukan');
    await User.delete(req.params.id);
    return response.success(res, null, 'User berhasil dihapus');
  } catch (error) { next(error); }
});

module.exports = router;
