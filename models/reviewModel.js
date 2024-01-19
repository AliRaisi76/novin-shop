const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
  description: {
    type: String,
    maxlength: 500,
    required: [true, 'A review must have a description!'],
  },
  title: {
    type: String,
    maxlength: 100,
    required: [true, 'A review must have a title!'],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'A review must be for a product!'],
  },
  score: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: [true, 'A review must have a score from 1 to 5!'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A review must have a user posted it!'],
  },
  createdAt: {
    type: Date,
    dafault: Date.now,
  },
})

module.exports = mongoose.model('Review', reviewSchema)
