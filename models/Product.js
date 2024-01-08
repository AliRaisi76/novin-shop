const mongoose = require('mongoose')
const slugify = require('slugify')
const productSchema = new mongoose.Schema(
  {
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
    slug: String,
    price: {
      type: Number,
      required: [true, 'The product must have a price'],
      get: getPrice,
      set: setPrice,
    },
  },
  { toJSON: { getters: true } }
)

// Convert prices from cents form into dollar form
function getPrice(num) {
  // Convert price from cents to dollars, and round it to two decimal places
  return (num / 100).toFixed(2)
}
// Convert prices from dollar form to cents form
function setPrice(num) {
  // Convert the price from dollars to cents, and round it to the nearest integer
  return Math.round(num * 100)
}

// Mongoose hook for slugify from the name
productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})
module.exports = mongoose.model('Product', productSchema)
