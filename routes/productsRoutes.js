const express = require('express')
const multer = require('multer')

const { storage } = require('../cloudinary')
const upload = multer({ storage })

const {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productsController')

const router = express.Router()

router.route('/').get(getProducts).post(createProduct)
router.route('/:id').get(getOneProduct).put(updateProduct).delete(deleteProduct)

router.route('/upload-image/:id').put(upload.array('image'), uploadImage)
module.exports = router
