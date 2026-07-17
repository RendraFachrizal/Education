const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Gallery = require('../models/Gallery');
const GalleryImage = require('../models/GalleryImage');
const response = require('../utils/response');
const upload = require('../middlewares/uploadMiddleware');

// Public
router.get('/', async (req, res, next) => {
  try {
    const data = await Gallery.findWithCoverImage();
    return response.success(res, data);
  } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const gallery = await Gallery.findByIdWithImages(req.params.id);
    if (!gallery) return response.notFound(res, 'Galeri tidak ditemukan');
    return response.success(res, gallery);
  } catch (error) { next(error); }
});

// Admin
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const data = await Gallery.create(req.body);
    return response.created(res, data, 'Album berhasil ditambahkan');
  } catch (error) { next(error); }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const existing = await Gallery.findById(req.params.id);
    if (!existing) return response.notFound(res, 'Galeri tidak ditemukan');
    await Gallery.update(req.params.id, req.body);
    const updated = await Gallery.findById(req.params.id);
    return response.success(res, updated, 'Album berhasil diupdate');
  } catch (error) { next(error); }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const existing = await Gallery.findById(req.params.id);
    if (!existing) return response.notFound(res, 'Galeri tidak ditemukan');
    await Gallery.delete(req.params.id);
    return response.success(res, null, 'Album berhasil dihapus');
  } catch (error) { next(error); }
});

// Images
router.post('/:id/images', authMiddleware, upload.single('image'), async (req, res, next) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return response.notFound(res, 'Galeri tidak ditemukan');

    const data = await GalleryImage.create({
      gallery_id: parseInt(req.params.id),
      image: req.file.filename,
      caption: req.body.caption || ''
    });
    return response.created(res, data, 'Foto berhasil ditambahkan');
  } catch (error) { next(error); }
});

router.delete('/:id/images/:imageId', authMiddleware, async (req, res, next) => {
  try {
    const image = await GalleryImage.findById(req.params.imageId);
    if (!image) return response.notFound(res, 'Foto tidak ditemukan');
    await GalleryImage.delete(req.params.imageId);
    return response.success(res, null, 'Foto berhasil dihapus');
  } catch (error) { next(error); }
});

module.exports = router;
