const express = require('express');
const router = express.Router();
const { placeOrder, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/place-order', (req, res, next) => {
  // Optional auth for place-order
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
}, placeOrder);

router.get('/my-orders', protect, getMyOrders);

module.exports = router;
