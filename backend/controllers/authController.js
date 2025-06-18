const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateTokens } = require("../utils/generateTokens");
const User = require("../models/user-model");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.registerUser = async (req, res) => {
  try {
    console.log("🔔 Register request received:", req.body); // log request body
    const { fullname, email, password } = req.body;
    console.log("  parsed:", { fullname, email, password });

    let user = await User.findOne({ email });
    if (user) {
      console.log("❗ User already exists:", email);
      return res.status(400).json({ message: "Email already exists" });
    }

    user = new User({ fullname, email, password });
    await user.save();

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "User registered", user: { email: user.email }, token, });
    console.log("✅ Registration successful for:", email);

  } catch (err) {
    console.error("❌ Registration failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Use true if deploying over HTTPS
      sameSite: "Lax", // "None" if frontend/backend on different domains
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};