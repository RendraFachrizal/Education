const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const config = require('../config/env');

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const subFolder = req.params.module || 'general';
    const dest = path.join(config.upload.path, subFolder);
    fs.ensureDirSync(dest);
    cb(null, dest);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (_req, file, cb) => {
  const allowedImages = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedDocs = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

  if (allowedImages.includes(file.mimetype) || allowedDocs.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipe file tidak didukung'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: config.upload.maxFileSize }
});

module.exports = upload;
