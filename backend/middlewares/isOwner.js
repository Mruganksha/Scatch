const jwt = require("jsonwebtoken");
const ownerModel = require("../models/owner-model");
const { JWT_KEY } = require("../config/keys");

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_KEY);

    const owner = await ownerModel.findOne({ email: decoded.email }).select("-password");

    if (!owner) return res.status(403).json({ message: "Access denied: Not an owner" });

    req.owner = owner;
    next();
  } catch (err) {
    console.error("isOwner error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
