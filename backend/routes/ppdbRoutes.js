const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Ppdb = require('../models/Ppdb');
const Setting = require('../models/Setting');
const response = require('../utils/response');

// Settings
router.get('/settings', async (req, res, next) => {
  try {
    const settings = await Setting.getGroup('ppdb');
    return response.success(res, settings);
  } catch (error) { next(error); }
});

router.put('/settings', authMiddleware, async (req, res, next) => {
  try {
    const { settings } = req.body;
    if (settings) {
      for (const [key, value] of Object.entries(settings)) {
        await Setting.setValue(key, value);
      }
    }
    return response.success(res, null, 'Pengaturan PPDB berhasil diupdate');
  } catch (error) { next(error); }
});

// Public registration
router.post('/register', async (req, res, next) => {
  try {
    const year = new Date().getFullYear();
    const regNumber = await Ppdb.generateRegistrationNumber(year);
    const data = await Ppdb.create({ ...req.body, registration_number: regNumber });
    return response.created(res, { registration_number: data.registration_number }, 'Pendaftaran berhasil');
  } catch (error) { next(error); }
});

// Check status
router.get('/check/:registrationNumber', async (req, res, next) => {
  try {
    const data = await Ppdb.findByRegistrationNumber(req.params.registrationNumber);
    if (!data) return response.notFound(res, 'Nomor pendaftaran tidak ditemukan');
    return response.success(res, {
      registration_number: data.registration_number,
      student_name: data.student_name,
      status: data.status,
      registered_at: data.registered_at
    });
  } catch (error) { next(error); }
});

// Admin
router.get('/registrants', authMiddleware, async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const where = [];
    const params = [];
    if (status) { where.push('status = ?'); params.push(status); }
    if (search) { where.push('student_name LIKE ?'); params.push(`%${search}%`); }
    const result = await Ppdb.paginate({
      page: parseInt(page),
      limit: parseInt(limit),
      where: where.join(' AND '),
      params,
      orderBy: 'registered_at DESC'
    });
    return response.success(res, result);
  } catch (error) { next(error); }
});

router.get('/registrants/:id', authMiddleware, async (req, res, next) => {
  try {
    const data = await Ppdb.findById(req.params.id);
    if (!data) return response.notFound(res, 'Pendaftar tidak ditemukan');
    return response.success(res, data);
  } catch (error) { next(error); }
});

router.put('/registrants/:id/status', authMiddleware, async (req, res, next) => {
  try {
    const existing = await Ppdb.findById(req.params.id);
    if (!existing) return response.notFound(res, 'Pendaftar tidak ditemukan');
    await Ppdb.update(req.params.id, { status: req.body.status, notes: req.body.notes });
    return response.success(res, null, 'Status pendaftar berhasil diupdate');
  } catch (error) { next(error); }
});

router.get('/stats', authMiddleware, async (req, res, next) => {
  try {
    const stats = await Ppdb.getStats();
    return response.success(res, stats);
  } catch (error) { next(error); }
});

module.exports = router;
