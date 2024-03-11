const User = require('../models/users/userModel')
const UserInfo = require('../models/users/userInfoModel')
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')
const sendEmail = require('../utils/sendEmail')

// Update user info
// POST api/v1/users
// Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    return new ErrorResponse('User not found!')
  }

  // We can change the name of this method to registerUserInfo
  // Then create a new route for only updating user info
  // Or we can use the following commented code which is not entirely clean
  // const updatingUser = await UserInfo.findOne({ user: req.user.id })
  // if (updatingUser) {
  //   const body = { ...req.body }
  //   Object.assign(updatingUser, body)
  //   await updatingUser.save()
  //   return res.status(200).json({
  //     success: true,
  //     data: updatingUser,
  //   })
  // }

  req.body.user = req.user.id

  const userInfo = await UserInfo.create(req.body)

  res.status(200).json({
    success: true,
    data: userInfo,
  })
})

// Get user persnoal info
// POST api/v1/users
// Private
exports.getMyInfo = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('userInfo')
  if (!user) {
    return new ErrorResponse('User not found!')
  }

  res.status(200).json({
    success: true,
    data: user,
  })
})
