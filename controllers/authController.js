const User = require('../models/userModel')
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')
const sendEmail = require('../utils/sendEmail')

// @desc Register user
// @route POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { email, password, role } = req.body
  let user = await User.create({ email, password, role })

  sendTokenResponse(user, 201, res)
})

// @desc User login
// @route POST /api/v1/auth/login
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
// @route GET /api/v1/auth/me
// @access private
exports.getMe = asyncHandler(async (req, res, next) => {
  console.log(req.user.id)
  const user = await User.findById(req.user.id)
  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc Forgot Password
// @route POST /api/v1/auth
// @access public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return next(new ErrorResponse('There is no user with that email!', 404))
  }

  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  // create reset URL
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`

  try {
    console.log('testing emalining')
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    })
    res.status(200).json({
      success: true,
      message: 'Email sent!',
    })
  } catch (err) {
    console.log(err)

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save({ validateBeforeSave: false })

    return next(new ErrorResponse('Email could not be sent', 500))
  }
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
