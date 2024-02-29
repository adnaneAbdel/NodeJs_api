const express = require('express');
const router = express.Router();
const controller = require('../controllers/movieControllers')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

router.post('/',[auth.check, admin.check], controller.create)
router.put('/:id',[auth.check, admin.check], controller.update)
router.delete('/:id',[auth.check, admin.check], controller.delete)



router.get('/', auth.check , controller.list)
router.get('/:id', auth.check , controller.find)

router.post('/:id/reviews', auth.check , controller.addreviews)
router.get('/:id/reviews', auth.check , controller.reviews)



module.exports = router;
