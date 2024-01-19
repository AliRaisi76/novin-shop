const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'An order must have at least one prodcut!'],
    },
  ],
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'An order must have a customer!'],
  },
  address: { type: String, required: [true, 'Order must have an address'] },
  postcode: {
    type: Number,
    required: [true, 'Customer postcode needed for order!'],
  },
  price: { type: Number, required: [true, `Order doesn't have a price!`] },

  createdAt: {
    type: Date,
    dafault: Date.now,
  },
  status: {
    type: String,
    emun: ['registered', 'processed', 'delivered'],
    default: 'registered',
  },
})

module.exports = mongoose.model('Order', orderSchema)
