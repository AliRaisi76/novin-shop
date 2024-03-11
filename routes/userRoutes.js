const express = require('express')
const { protect } = require('../middleware/auth')
const { updateUser, getMyInfo } = require('../controllers/userController')

const router = express.Router()

router.route('/').post(protect, updateUser).get(protect, getMyInfo)

module.exports = router
