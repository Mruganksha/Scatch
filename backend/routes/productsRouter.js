const express = require('express');
const router = express.Router();
const Product = require('../models/product-model');
const upload = require('../config/multer-config');

// Create Product (with image buffer)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, category, price, discount, bgcolor, panelcolor, textcolor, description, createdBy } = req.body;

    const newProduct = new Product({
      name,
      category,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
      description,
      createdBy,
      image: req.file.buffer
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create product" });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    const processed = products.map((p) => ({
      _id: p._id,
      name: p.name,
      category: p.category,
      price: p.price,
      discount: p.discount,
      bgcolor: p.bgcolor,
      panelcolor: p.panelcolor,
      textcolor: p.textcolor,
      description: p.description,
      createdBy: p.createdBy,
        image: p.image ? p.image.toString('base64') : null,
    }));
    res.json(processed);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ message: "Product not found" });
    res.json(prod);
  } catch (err) {
    console.error("Product fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.buffer;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
});


module.exports = router;
