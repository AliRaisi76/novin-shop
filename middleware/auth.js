const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')
const User = require('../models/userModel')

exports.protect = asyncHandler(async (req, res, next) => {
  let token
  console.log('hello')
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  // else if (req.cookies.token) {
  //   // Use cookies to get the token from the front-end
  //   token = req.cookies.token
  // }

  if (!token) {
    return next(new ErrorResponse('Not authorized to acces this route!', 401))
  }

  try {
    // Verify tokne
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    req.user = await User.findById(decoded.id)
    next()
  } catch (err) {
    return next(new ErrorResponse('Not authorized to acces this route!', 401))
  }
})
