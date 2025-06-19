const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateTokens } = require("../utils/generateTokens");
const User = require("../models/user-model");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
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
      secure: false, // true in production with HTTPS
      sameSite: "Lax",
    });

    // ✅ Add `token` in response JSON here!
    res.status(200).json({
      message: "Login successful",
      token,  // <-- THIS was missing
      user: {
        id: user._id,
        fullname: user.fullname,
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