const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const pool = require('../config/database');
const Log = require('../models/Log');
const Message = require('../models/Message');
const Ppdb = require('../models/Ppdb');
const response = require('../utils/response');

router.get('/stats', authMiddleware, async (req, res, next) => {
  try {
    const [[{ total: totalNews }]] = await pool.query("SELECT COUNT(*) as total FROM news WHERE status = 'published'");
    const [[{ total: totalTeachers }]] = await pool.query("SELECT COUNT(*) as total FROM teachers WHERE status = 'active'");
    const [[{ total: totalEvents }]] = await pool.query("SELECT COUNT(*) as total FROM events WHERE status IN ('upcoming','ongoing')");
    const totalUnreadMessages = await Message.count("status = 'unread'");
    const ppdbStats = await Ppdb.getStats();

    return response.success(res, {
      total_news: totalNews,
      total_teachers: totalTeachers,
      total_events: totalEvents,
      total_unread_messages: totalUnreadMessages,
      ppdb_stats: ppdbStats
    });
  } catch (error) { next(error); }
});

router.get('/recent-activities', authMiddleware, async (req, res, next) => {
  try {
    const logs = await Log.getRecent(10);
    return response.success(res, logs);
  } catch (error) { next(error); }
});

module.exports = router;
