const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Contact = require('../models/Contact');
const response = require('../utils/response');

router.get('/', async (req, res, next) => {
  try {
    const contact = await Contact.getFirst();
    return response.success(res, contact);
  } catch (error) { next(error); }
});

router.put('/', authMiddleware, async (req, res, next) => {
  try {
    const data = await Contact.updateOrCreate(req.body);
    return response.success(res, data, 'Kontak berhasil diupdate');
  } catch (error) { next(error); }
});

module.exports = router;
