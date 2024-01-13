const User = require('../models/userModel')
const asyncHandler = require('../middleware/asyncHandler')
// @desc Register user
// @route Post /api/v1/users
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { email, password, role } = req.body
  let user = await User.create({ email, password, role })
  res.status(200).json({
    data: user,
  })
})
