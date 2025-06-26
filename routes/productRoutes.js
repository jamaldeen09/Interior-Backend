const router = require('express').Router();
const { createProduct, getProducts } = require('../controllers/ProductController');
const { verifyAdmin } = require('../middlewares/authMiddleware');
const parser = require("../config/upload")

router.post('/', verifyAdmin, parser ,createProduct);
router.get('/', getProducts);

module.exports = router;