const router = require('express').Router();
const { createOrder, getOrders } = require('../controllers/ProductController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getOrders);

module.exports = router;