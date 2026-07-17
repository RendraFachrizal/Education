const jwt = require('jsonwebtoken');
const config = require('../config/env');
const response = require('../utils/response');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.unauthorized(res, 'Token tidak ditemukan');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return response.unauthorized(res, 'Token tidak valid atau telah kadaluarsa');
  }
};

module.exports = authMiddleware;
