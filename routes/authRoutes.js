const express = require('express')
const { protect, authorize } = require('../middleware/auth')

const { register, login, getMe } = require('../controllers/authController')

const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)

module.exports = router
