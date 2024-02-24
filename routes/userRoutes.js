const express = require('express')
const { protect, authorize } = require('../middleware/auth')
const { updateUser } = require('../controllers/userController')

const router = express.Router()

router.route('/').post(protect, updateUser)

module.exports = router
