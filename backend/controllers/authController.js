const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const userModel = require("../models/user-model");

module.exports.registerUser = async function (req, res) {
  try {
    const { email, password, fullname } = req.body;

    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      email,
      password: hash,
      fullname,
    });

    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        fullname: newUser.fullname,
      },
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
      },
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.logout = function (req, res) {
  // Frontend should handle logout by clearing localStorage
  res.status(200).json({ message: "Logout successful" });
};
