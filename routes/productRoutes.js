const express = require('express')
const { upload } = require('../cloudinary')

const advancedResults = require('../middleware/advancedResults')
const Product = require('../models/productModel')

const {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productController')

const router = express.Router()

router.route('/').get(advancedResults(Product), getProducts).post(createProduct)
router.route('/:id').get(getOneProduct).put(updateProduct).delete(deleteProduct)

router.route('/upload-image/:id').put(upload.array('image'), uploadImage)
module.exports = router
