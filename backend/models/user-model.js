const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
     fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: Number,
  picture: String,
  isadmin: { type: Boolean, default: false },

  cart: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product"
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],

  orders: {
    type: Array,
    default: []
  }
})

module.exports = mongoose.model("user", userSchema);