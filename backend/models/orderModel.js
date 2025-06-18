// models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming your user model is called 'User'
    required: true,
  },
  billingDetails: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
  },
  location: {
    lat: Number,
    lng: Number,
  },
  items: [
    {
      id: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
  total: Number,
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  placedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
