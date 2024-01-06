const express = require('express')

const {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products_controller')

const router = express.Router()

router.route('/').get(getProducts).post(createProduct)
router.route('/:id').get(getOneProduct).put(updateProduct).delete(deleteProduct)

module.exports = router
