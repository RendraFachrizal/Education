const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Setting = require('../models/Setting');
const response = require('../utils/response');

router.get('/', async (req, res, next) => {
  try {
    const data = await Setting.getAllAsObject();
    return response.success(res, data);
  } catch (error) { next(error); }
});

router.put('/', authMiddleware, async (req, res, next) => {
  try {
    const { settings } = req.body;
    if (settings) {
      for (const [key, value] of Object.entries(settings)) {
        await Setting.setValue(key, value);
      }
    }
    return response.success(res, null, 'Pengaturan berhasil disimpan');
  } catch (error) { next(error); }
});

module.exports = router;
