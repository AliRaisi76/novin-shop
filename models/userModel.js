const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'User must have an email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  role: {
    type: String,
    enum: ['customer'],
    default: 'customer',
  },
})

module.exports = new mongoose.Model('user', userSchema)
