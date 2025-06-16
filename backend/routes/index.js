const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn")
const Product = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function(req, res){
    let error = req.flash("error");
    res.render("index", {error, loggedin: false});
})

router.get("/shop", isLoggedIn, async function(req, res){
    try {
    const products = await Product.find(); 
    // fetch all products
    let success = req.flash("success");
    res.render('shop', { products, success}); // pass products to EJS
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading products');
  }
})

router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    if (!user.cart) user.cart = [];

    const existingItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === req.params.productid
    );

    if (existingItemIndex > -1) {
      user.cart[existingItemIndex].quantity += 1;
    } else {
      user.cart.push({ product: req.params.productid, quantity: 1 });
    }

    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
  } catch (err) {
    console.error("Add to cart error:", err);
    req.flash("error", "Unable to add to cart");
    res.redirect("/shop");
  }
});

// Logout
router.get("/logout", isLoggedIn, function (req, res) {
  res.clearCookie("token");
  req.flash("success", "Logged out successfully");
  res.redirect("/");
});

module.exports = router;