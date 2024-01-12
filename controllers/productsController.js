const Product = require('../models/productModel')
const ErrorResponse = require('../utils/ErrorResponse')

// @desc Get all products in the DB
// @route GET /api/v1/products
// @access Public
exports.getProducts = async (req, res, next) => {
  try {
    let query
    let reqQuery = { ...req.query }

    // Convert the queried price from dollar form to cent form
    const priceRange = Object.keys(reqQuery.price)
    priceRange.forEach((range) => {
      reqQuery.price[range] = `${reqQuery.price[range]}00`
    })
    const removeFields = ['select', 'sort', 'limit', 'page']

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

    // PAGINATION
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 20
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await Product.countDocuments()

    query = query.skip(startIndex).limit(limit)

    const products = await query
    console.log(products)
    // Pagination results
    const pagination = {}
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      }
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      }
    }

    res.status(200).json({
      message: 'All products fetched!',
      count: products.length,
      pagination,
      data: products,
    })
  } catch (err) {
    next(err)
  }
}

// @desc Get a product by its id
// @route GET /api/v1/products/:id
// @access Public(admin)
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
// @access Private(admin)
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
// @access private(admin)
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
// @access Private(admin)
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

// @desc Upload image or images for the resource(here the product)
// @route PUT /api/v1/products/:id
// @access Private(admin)
exports.uploadImage = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body)

    const imgs = req.files.map((f) => f.path)
    console.log(req.files)
    product.images.push(...imgs)
    product.save()
    res.status(200).json({
      message: 'Worked',
      data: imgs,
    })
  } catch (err) {
    console.log(err)
  }
}
