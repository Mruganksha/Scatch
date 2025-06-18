const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const Order = require("../models/orderModel");
const verifyOwner = require("../middlewares/authOwner");
const authenticate = require("../middlewares/authMiddleware");

// Get all users
router.get("/users", verifyOwner, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Get single user by ID
router.get("/users/:id", verifyOwner, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// Update user
router.put("/users/:id", verifyOwner, async (req, res) => {
  try {
    const { fullname, email, role, status } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        fullname,
        email,
        isadmin: role === "admin",
        status,
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
});

// Delete user
router.delete("api/users/:id", verifyOwner, async (req, res) => {
  try {
    // ✅ This will throw an error if req.user is not set
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const userId = req.params.id;

    // Perform deletion
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });

  } catch (err) {
    console.error("User delete error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/admin/stats", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    res.status(200).json({ totalUsers, totalOrders, totalRevenue });
  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

module.exports = router;
