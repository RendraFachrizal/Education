const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const createCrudController = require('../controllers/crudController');
const Faq = require('../models/Faq');

const controller = createCrudController(Faq, 'FAQ');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', authMiddleware, controller.store);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.destroy);

module.exports = router;
