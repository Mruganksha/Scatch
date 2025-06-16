const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");

// Register user
router.post("/register", authController.registerUser);

// Login user
router.post("/login", authController.loginUser);

// Logout user
router.get("/logout", isLoggedIn, authController.logout);

module.exports = router;