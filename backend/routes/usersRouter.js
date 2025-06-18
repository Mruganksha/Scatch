const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const User = require('../models/user-model');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require("../config/multer-config");

// Register
router.post("/register", authController.registerUser);

// Login
router.post("/login", authController.loginUser);

// Logout
router.get("/logout", authController.logout);

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ user });
  } catch (err) {
    console.error("Profile fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

// Upload Profile Image
router.post("/upload-profile", authMiddleware, upload.single("profileImage"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const user = await User.findById(req.user.id);
    user.profileImage = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    await user.save();
    res.status(200).json({ message: "Profile image updated", profileImage: user.profileImage });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Failed to upload profile image" });
  }
});

router.get("/profile-image", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.profileImage?.data) {
      return res.status(404).send("No image found");
    }

    res.set("Content-Type", user.profileImage.contentType);
    res.send(user.profileImage.data);
  } catch (err) {
    console.error("Fetch image error:", err);
    res.status(500).send("Failed to load image");
  }
});


router.post("/update-address", authMiddleware, async (req, res) => {
  try {
    const { address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { address },
      { new: true }
    );
    res.status(200).json({ message: "Address updated", user });
  } catch (err) {
    console.error("Address update error:", err.message);
    res.status(500).json({ message: "Failed to update address" });
  }
});

router.put("/update-address", authMiddleware, async (req, res) => {
  try {
    const { address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { address },
      { new: true }
    );
    res.status(200).json({ message: "Address updated", user });
  } catch (err) {
    console.error("Address update error:", err.message);
    res.status(500).json({ message: "Failed to update address" });
  }
});

// Get all users (admin only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    if (currentUser.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error("User delete error:", err.message);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

// PUT /api/users/:id - update user
router.put("/users/:id", async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated", user: updatedUser });
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ message: "Update failed" });
  }
});


module.exports = router;
