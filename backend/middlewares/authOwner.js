const jwt = require("jsonwebtoken");
const Owner = require("../models/owner-model");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const verifyOwner = async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.owner = await Owner.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = verifyOwner;
