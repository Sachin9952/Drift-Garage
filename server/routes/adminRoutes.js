const express = require('express');
const router = express.Router();
const { getOrders, updateOrderStatus } = require('../controllers/orderController');
const { createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');

// Product Management
router.post('/add-product', upload.single('image'), createProduct);
router.put('/edit-product/:id', upload.single('image'), updateProduct);
router.delete('/delete-product/:id', deleteProduct);

// Order Management
router.get('/orders', getOrders);
router.put('/orders/:id/status', updateOrderStatus);

module.exports = router;
