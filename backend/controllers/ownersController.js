const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ownerModel = require("../models/owner-model"); // make sure this exists
const { generateToken } = require("../utils/generateToken");

module.exports.registerOwner = async (req, res) => {
  try {
    const { email, password, fullname } = req.body;

    let owner = await ownerModel.findOne({ email });
    if (owner) return res.status(400).json({ message: "Owner already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    owner = await ownerModel.create({
      email,
      password: hashedPassword,
      fullname,
    });

    const token = generateToken(owner);
    res.status(201).json({ message: "Owner registered", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await ownerModel.findOne({ email });
    if (!owner) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, owner.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(owner);
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
