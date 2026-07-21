const router = require('express').Router();
const StudentStatistic = require('../models/StudentStatistic');
const response = require('../utils/response');

router.get('/', async (req, res, next) => {
  try {
    const { limit = 1 } = req.query;
    const data = await StudentStatistic.findMany({
      orderBy: 'year DESC',
      limit: parseInt(limit)
    });
    return response.success(res, data);
  } catch (error) { next(error); }
});

module.exports = router;
