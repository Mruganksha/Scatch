const Product = require("../models/product-model");

module.exports.createProduct = async function (req, res) {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor, category, description } = req.body;

    const product = await Product.create({
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
      category,
      description,
      image: req.file.buffer, // from multer
      createdBy: req.owner._id // set by isOwner middleware
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    console.error("Create Product Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getAllProducts = async function (req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

module.exports.getProductById = async function (req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error finding product" });
  }
};

module.exports.deleteProduct = async function (req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

module.exports.updateProduct = async function (req, res) {
  try {
    const updateData = req.body;
    if (req.file) {
      updateData.image = req.file.buffer;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ message: "Error updating product" });
  }
};