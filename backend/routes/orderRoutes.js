const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const isLogin = require('../middlewares/isLoggedIn');
const authenticate = require("../middlewares/authMiddleware");

router.post('/order', authenticate, async (req, res) => {
  try {
    console.log("Reached order route");
    const user = req.user;
    console.log("User from token:", user);

    const transformedItems = req.body.items.map((item) => {
      let base64Image = "";
      if (item.image && item.image.data) {
        base64Image = Buffer.from(item.image.data).toString("base64");
      }
      return {
        ...item,
        image: base64Image,
      };
    });

    // Calculate total
    const total = transformedItems.reduce((sum, item) => {
      return sum + (item.price || 0);
    }, 0);

    const newOrder = new Order({
      userId: user.id,
      items: transformedItems,
      total, // include total
    });

    await newOrder.save();
    res.status(201).json({ success: true, order: newOrder });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ success: false, message: "Order creation failed", error: err.message });
  }
});


// GET: Get orders for logged-in user
router.get('/order', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({ placedAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("User order fetch error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user orders" });
  }
});


// GET: Get all orders (Admin only)
router.get('/admin/orders', authenticate, async (req, res) => {
  console.log("User role:", req.user);
  /*
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }*/

  try {
    const orders = await Order.find()
      .sort({ placedAt: -1 })
      .populate('userId', 'fullname email'); // to fetch customer name/email
    res.status(200).json(orders);
  } catch (err) {
    console.error("Admin order fetch error:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});


// PATCH: Update order status (Admin only)
router.patch('/admin/orders/:id/status', authenticate, async (req, res) => {
  

  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Status updated', order });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ message: 'Failed to update status' });
  }
});


module.exports = router;
