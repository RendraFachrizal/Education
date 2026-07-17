const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const response = require('../utils/response');
const path = require('path');
const fs = require('fs-extra');

const modules = {
  photos: 'images/photos',
  thumbnails: 'images/thumbnails',
  galleries: 'images/galleries',
  sliders: 'images/sliders',
  banners: 'images/banners',
  ppdb: 'documents/ppdb',
  downloads: 'documents/downloads',
  general: 'general'
};

router.post('/', authMiddleware, (req, res) => {
  const module = req.query.module || 'general';
  req.params = { ...req.params, module: modules[module] || 'general' };
  const single = upload.single('file');
  single(req, res, (err) => {
    if (err) return response.error(res, err.message);
    if (!req.file) return response.badRequest(res, 'File tidak ditemukan');
    return response.created(res, {
      url: `/uploads/${req.file.filename}`,
      path: req.file.path,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    }, 'File berhasil diupload');
  });
});

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

router.delete('/:filename', authMiddleware, (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
  if (fs.existsSync(filePath)) {
    fs.removeSync(filePath);
    return response.success(res, null, 'File berhasil dihapus');
  }
  return response.success(res, null, 'File tidak ditemukan');
});

module.exports = router;
