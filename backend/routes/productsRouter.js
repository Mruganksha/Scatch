const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController");
const isOwner = require("../middlewares/isOwner");
const isLoggedIn = require("../middlewares/isLoggedIn");
const upload = require("../config/multer-config");

// Get product by ID — safer path
router.get("/product/:id", productController.getProductById);

// Get all products
router.get("/", productController.getAllProducts);

// Create product (Admin only)
router.post(
  "/create",
  isOwner,
  upload.single("image"),
  productController.createProduct
);

// Update product (Admin only)
router.put(
  "/update/:id",
  isOwner,
  upload.single("image"),
  productController.updateProduct
);

// Delete product (Admin only)
router.delete("/delete/:id", isOwner, productController.deleteProduct);

module.exports = router;
