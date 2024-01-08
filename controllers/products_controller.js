const Product = require('../models/Product')
const ErrorResponse = require('../utils/ErrorResponse')

// @desc Get all products in the DB
// @route GET /api/v1/products
// @access Public
exports.getProducts = async (req, res, next) => {
  try {
    let query
    let reqQuery = { ...req.query }

    // Convert the asked price from dollar form to cent form
    const priceRange = Object.keys(reqQuery.price)
    priceRange.forEach((range) => {
      reqQuery.price[range] = `${reqQuery.price[range]}00`
    })

    const removeFields = ['select', 'sort']

    removeFields.forEach((param) => delete reqQuery[param])

    let queryString = JSON.stringify(reqQuery)
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    )

    query = Product.find(JSON.parse(queryString))

    // SELECT FIELDS
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ')
      query = query.select(fields)
    }

    // SORT
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      query = query.sort(sortBy)
    } else {
      query = query.sort('-price')
    }
    const products = await query

    res.status(200).json({
      message: 'All products fetched!',
      count: products.length,
      data: products,
    })
  } catch (err) {
    next(err)
  }
}

// @desc Get a product by its id
// @route GET /api/v1/products/:id
// @access Public
exports.getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        message: `Product was not found!`,
      })
    }

    res.status(200).json({
      message: 'Product fetched!',
      data: product,
    })
  } catch (err) {
    next(err)
  }
}

// @desc Add a product to DB
// @route POST /api/v1/products/:category
// @access Private
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    if (!product) {
      return res.status(404).json({
        message: `Product was not found!`,
      })
    }
    res.status(201).json({
      message: 'Product created!',
      data: product,
    })
  } catch (err) {
    next(err)
  }
}

// @desc Modify a product
// @route UPDATE /api/v1/products/:id
// @access private
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!product) {
      return res.status(404).json({
        message: `Product was not found!`,
      })
    }
    res.status(200).json({
      message: 'Product updated!',
      data: product,
    })
  } catch (err) {
    next(err)
  }
}

// @desc Delete a product
// @route DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({
        message: `Product was not found!`,
      })
    }
    res.status(200).json({
      message: 'Product deleted!',
      data: {},
    })
  } catch (err) {
    next(err)
  }
}
