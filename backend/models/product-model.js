const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
   image: Buffer,
  name: { type: String, required: true },
  category: String,
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "owner"
  }
})

module.exports = mongoose.model("product", productSchema);