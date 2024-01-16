const User = require('../models/userModel')
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')

// @desc Register user
// @route Post /api/v1/users/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { email, password, role } = req.body
  let user = await User.create({ email, password, role })

  sendTokenResponse(user, 201, res)
})

// @desc User login
// @route Post /api/v1/users/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(
      new ErrorResponse('Please provide and email addres and a password!', 400)
    )
  }

  const user = await User.findOne({ email }).select('+password')
  console.log(user)
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401))
  }

  // Maybe matchPassword in the if patanthesis?
  const isMatch = await user.matchPassword(password)
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401))
  }

  sendTokenResponse(user, 200, res)
})

// @desc Get User Info
// @route Get /api/v1/users/me
// @access private
exports.getMe = asyncHandler(async (req, res, next) => {
  console.log(req.user.id)
  const user = await User.findById(req.user.id)
  res.status(200).json({
    success: true,
    data: user,
  })
})

const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken()

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  if (process.env.NODE_ENV === 'prodoction') {
    options.secure = true
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token })
}
