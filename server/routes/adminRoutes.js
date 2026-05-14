const express = require('express');
const router = express.Router();
const { getOrders, updateOrderStatus } = require('../controllers/orderController');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const { getUsers, deleteUser } = require('../controllers/userController');

// All routes here are protected and require admin role
router.use(protect);
router.use(admin);

// User Management
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

// Order Management
router.get('/orders', getOrders);
router.put('/orders/:id/status', updateOrderStatus);

// Product Management
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
