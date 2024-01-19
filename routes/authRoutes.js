const express = require('express')
const { protect, authorize } = require('../middleware/auth')

const {
  register,
  login,
  getMe,
  forgotPassword,
} = require('../controllers/authController')

const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)
router.post('/forgotPassword', forgotPassword)

module.exports = router
