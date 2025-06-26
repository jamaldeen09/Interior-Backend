const router = require('express').Router();
const { addToCart, getCart } = require('../controllers/ProductController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, addToCart);
router.get('/', verifyToken, getCart);

module.exports = router;