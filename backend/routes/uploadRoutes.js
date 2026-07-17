const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const response = require('../utils/response');

router.post('/image', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) return response.badRequest(res, 'File tidak ditemukan');
  return response.created(res, {
    url: `/uploads/images/${req.file.filename}`,
    filename: req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype
  }, 'Gambar berhasil diupload');
});

router.post('/document', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) return response.badRequest(res, 'File tidak ditemukan');
  return response.created(res, {
    url: `/uploads/documents/${req.file.filename}`,
    filename: req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype
  }, 'Dokumen berhasil diupload');
});

module.exports = router;
