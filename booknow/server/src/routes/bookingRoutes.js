const router = require('express').Router();
const auth = require('../middleware/auth');
const c = require('../controllers/bookingController');

router.use(auth);
router.post('/', c.create);
router.get('/', c.mine);
router.delete('/:id', c.cancel);

module.exports = router;
