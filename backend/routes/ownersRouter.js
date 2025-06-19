const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const Owner = require("../models/owner-model");
const verifyOwner = require("../middlewares/authOwner");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Create admin account
router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if already exists
    const existing = await Owner.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = new Owner({
      fullname,
      email,
      password: hashedPassword,
    });

    await owner.save();
    res.status(201).json({ message: "Owner registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// Owner Login Route
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const owner = await Owner.findOne({ email });
     console.log("Owner found:", owner);
console.log("Entered password:", password);
console.log("Stored password:", owner?.password);
    if (!owner) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password.trim(), owner.password.trim());
console.log("Is password match:", isMatch);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: owner._id, role: owner.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Logged in successfully",
      owner: {
        id: owner._id,
        fullname: owner.fullname,
        email: owner.email,
        role: "admin",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/me", verifyOwner, (req, res) => {
  res.json(req.owner);
});

module.exports = router;
