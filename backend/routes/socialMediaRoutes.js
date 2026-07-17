const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const createCrudController = require('../controllers/crudController');
const SocialMedia = require('../models/SocialMedia');

const controller = createCrudController(SocialMedia, 'Social Media');

router.get('/', controller.index);
router.post('/', authMiddleware, controller.store);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.destroy);

module.exports = router;
