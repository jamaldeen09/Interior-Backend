const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: String,
  products: [
    {
      productId: String,
      quantity: Number
    }
  ],
  amount: Number,
  address: String,
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Order', OrderSchema)