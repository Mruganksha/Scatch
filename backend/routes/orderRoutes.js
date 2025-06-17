const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const isLogin = require('../middlewares/isLoggedIn');
const authenticate = require("../middlewares/authMiddleware");

router.post('/order', authenticate, async (req, res) => {
    console.log("✅ Reached order route");
  console.log("User from token:", req.user);
  try {
    const { billingDetails, location, items, total } = req.body;
    const userId = req.user._id; // ✅ from your isloggin.js

    const order = await Order.create({
      userId: req.user.id,
      billingDetails,
      location,
      items,
      total,
      placedAt: new Date(),
    });
    await order.save();
      console.log("Received user from token:", req.user);
    res.status(201).json({ message: "Order placed", success: true, order: order });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
});

// GET: Get all orders for the logged-in user
router.get('/order', authenticate, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const orders = await Order.find({ userId }).sort({ placedAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Order fetch error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});


module.exports = router;
