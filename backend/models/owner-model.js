const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture: String,
  gstin: String,
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "product"
  }]
})

module.exports = mongoose.model("owner", ownerSchema);