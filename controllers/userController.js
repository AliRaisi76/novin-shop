const User = require('../models/users/userModel')
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')
const sendEmail = require('../utils/sendEmail')

// Update user info
// PUT /users/:id
// Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  console.log('hello')
  const user = await User.findById(req.user.id)
  if (!user) {
    return new ErrorResponse('User not found!')
  }

  Object.assign(user.personalInfo, req.body)

  await user.save()

  res.status(200).json({
    success: true,
    data: user,
  })
})
