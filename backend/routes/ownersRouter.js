const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

const isOwner = require("../middlewares/isOwner");
const upload = require("../config/multer-config");
const productController = require("../controllers/productController");

// Create initial owner (only in development mode)
if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res
        .status(503)
        .send("You don't have permission to create a new owner.");
    }

    let { fullname, email, password } = req.body;

    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });

    res.status(201).send(createdOwner);
  });
}

// Admin Panel Page
router.get("/admin", isOwner, function (req, res) {
  let success = req.flash("success");
  res.render("createproducts", { success });
});

// Product Creation (Admin)
router.post(
  "/product/create",
  isOwner,
  upload.single("image"),
  productController.createProduct
);

module.exports = router;