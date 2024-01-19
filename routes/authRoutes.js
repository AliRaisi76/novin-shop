const express = require('express')
const { protect, authorize } = require('../middleware/auth')

const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController')

const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)
router.post('/forgotPassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassword)

module.exports = router
