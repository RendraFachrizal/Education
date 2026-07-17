const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Contact = require('../models/Contact');
const SocialMedia = require('../models/SocialMedia');
const SchoolProfile = require('../models/SchoolProfile');
const Menu = require('../models/Menu');
const response = require('../utils/response');

router.get('/', async (req, res, next) => {
  try {
    const [contact, socialMedia, profile, menus] = await Promise.all([
      Contact.getFirst(),
      SocialMedia.findMany({ where: "status = 'active'", orderBy: 'sort_order ASC' }),
      SchoolProfile.getFirst(),
      Menu.getMenuTree('footer')
    ]);

    return response.success(res, { contact, socialMedia, profile, menus });
  } catch (error) { next(error); }
});

module.exports = router;
