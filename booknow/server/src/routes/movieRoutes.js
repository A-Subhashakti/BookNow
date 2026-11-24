const router = require('express').Router();
const c = require('../controllers/movieController');

router.get('/', c.list);
router.get('/:id', c.get);
router.get('/:id/seats', c.seats);

module.exports = router;
