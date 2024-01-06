const Product = require('../models/Product')

// @desc Get all products in the DB
// @route GET /api/v1/products
// @access Public
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()

    res.status(200).json({
      message: 'All products fetched!',
      count: products.length,
      data: products,
    })
  } catch (err) {
    console.log(err)
  }
}

// @desc Get a product by its id
// @route GET /api/v1/products/:id
// @access Public
exports.getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json({
      message: 'Product fetched!',
      data: product,
    })
  } catch (err) {
    console.log(err)
  }
}

// @desc Add a product to a category to DB
// @route POST /api/v1/products/:category
// @access Private
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    if (!product) {
      return res.status(404).json({
        message: `Product was'nt found!`,
      })
    }
    res.status(201).json({
      message: 'Product created!',
      data: product,
    })
  } catch (err) {
    console.log(err)
  }
}

// @desc Get all products in a category
// @route GET /api/v1/products/:category
// @access Public
exports.updateProduct = (req, res, next) => {
  res.status(200).json({
    message: 'Product updated!',
  })
}

// @desc Get all products in a category
// @route GET /api/v1/products/:category
// @access Public
exports.deleteProduct = (req, res, next) => {
  res.status(200).json({
    message: 'Product updated!',
  })
}
