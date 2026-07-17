const logger = require('../config/logger');

const errorMiddleware = (err, req, res, _next) => {
  logger.error(err.message, { stack: err.stack, url: req.originalUrl, method: req.method });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Terjadi kesalahan pada server';

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Data tidak valid',
      errors: err.errors || []
    });
  }

  if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid atau telah kadaluarsa'
    });
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'Ukuran file melebihi batas maksimal'
    });
  }

  if (process.env.NODE_ENV === 'development') {
    return res.status(statusCode).json({
      success: false,
      message,
      stack: err.stack
    });
  }

  return res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Terjadi kesalahan pada server' : message
  });
};

module.exports = errorMiddleware;
