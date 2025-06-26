const router = require('express').Router();
const { createProduct, getProducts } = require('../controllers/ProductController');
const { verifyAdmin } = require('../middlewares/authMiddleware');

router.post('/', verifyAdmin, createProduct);
router.get('/', getProducts);

module.exports = router;