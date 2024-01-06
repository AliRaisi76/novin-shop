const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The product must have a title!'],
    maxlength: 50,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'A product must have a description!'],
    maxlength: 500,
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Please add how much of this product is in stock!'],
  },
})

module.exports = mongoose.model('Product', productSchema)
