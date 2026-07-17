const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const createCrudController = require('../controllers/crudController');
const Download = require('../models/Download');

const controller = createCrudController(Download, 'Download');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', authMiddleware, controller.store);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.destroy);

module.exports = router;
