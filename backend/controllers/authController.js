const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Log = require('../models/Log');
const config = require('../config/env');
const response = require('../utils/response');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return response.unauthorized(res, 'Email tidak terdaftar');
    }

    if (user.status === 'inactive') {
      return response.unauthorized(res, 'Akun Anda tidak aktif');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.unauthorized(res, 'Password salah');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role_name },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn }
    );

    await User.update(user.id, { last_login: new Date() });

    await Log.create({
      user_id: user.id,
      action: 'login',
      module: 'auth',
      description: 'User login',
      ip_address: req.ip,
      user_agent: req.headers['user-agent']
    });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role_name,
      photo: user.photo
    };

    return response.success(res, { user: userData, token, refreshToken }, 'Login berhasil');
  } catch (error) {
    next(error);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return response.notFound(res, 'User tidak ditemukan');
    }

    return response.success(res, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: req.user.role,
      photo: user.photo
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (_req, res) => {
  return response.success(res, null, 'Logout berhasil');
};

module.exports = { login, me, logout };
