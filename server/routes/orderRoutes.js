const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getMyOrders,
  getOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, addOrderItems);
router.get('/my-orders', protect, getMyOrders);

router.get('/admin/all', protect, admin, getOrders);
router.put('/admin/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
