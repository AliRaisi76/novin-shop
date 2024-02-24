const Product = require('../models/productModel')
const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middleware/asyncHandler')

// @desc Get all products in the DB
// @route GET /api/v1/products
// @access Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc Get a product by its id
// @route GET /api/v1/products/:id
// @access Public(admin)
exports.getOneProduct = asyncHandler(async (req, res, next) => {
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
})

// @desc Add a product to DB
// @route POST /api/v1/products/:category
// @access Private(admin)
exports.createProduct = asyncHandler(async (req, res, next) => {
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
})

// @desc Modify a product
// @route UPDATE /api/v1/products/:id
// @access private(admin)
exports.updateProduct = asyncHandler(async (req, res, next) => {
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
})

// @desc Delete a product
// @route DELETE /api/v1/products/:id
// @access Private(admin)
exports.deleteProduct = asyncHandler(async (req, res, next) => {
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
})
// @desc Upload image or images for the resource(here the product)
// @route PUT /api/v1/products/:id
// @access Private(admin)
exports.uploadImage = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body)

  const imgs = req.files.map((f) => f.path)
  console.log(req.files)
  product.images.push(...imgs)
  product.save()
  res.status(200).json({
    message: 'Worked',
    data: imgs,
  })
})
