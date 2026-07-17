const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const SchoolProfile = require('../models/SchoolProfile');
const response = require('../utils/response');

router.get('/', async (req, res, next) => {
  try {
    const profile = await SchoolProfile.getFirst();
    return response.success(res, profile);
  } catch (error) { next(error); }
});

router.put('/', authMiddleware, async (req, res, next) => {
  try {
    const data = await SchoolProfile.updateOrCreate(req.body);
    return response.success(res, data, 'Profil sekolah berhasil diupdate');
  } catch (error) { next(error); }
});

module.exports = router;
