const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Log = require('../models/Log');
const response = require('../utils/response');

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const result = await Log.paginate({ page, limit, orderBy: 'created_at DESC' });
    return response.success(res, result);
  } catch (error) { next(error); }
});

module.exports = router;
