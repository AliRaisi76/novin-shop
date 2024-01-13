const User = require('../models/userModel')
const asyncHandler = require('../middleware/asyncHandler')

// @desc Register user
// @route Post /api/v1/users
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { email, password, role } = req.body
  let user = await User.create({ email, password, role })

  // Create token
  const token = user.getSignedJwtToken()

  res.status(200).json({
    success: true,
    token,
    data: user,
  })
})
