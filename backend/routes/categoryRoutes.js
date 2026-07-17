const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const createCrudController = require('../controllers/crudController');
const NewsCategory = require('../models/NewsCategory');

const controller = createCrudController(NewsCategory, 'Kategori');

router.get('/', controller.index);
router.post('/', authMiddleware, controller.store);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.destroy);

module.exports = router;
