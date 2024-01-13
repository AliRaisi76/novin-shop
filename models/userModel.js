const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: 6,
    select: false,
  },
  address: {
    type: String,
    // required: [true, 'Please add an address'],
  },
  role: {
    type: String,
    enum: ['customer'],
    default: 'customer',
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = new mongoose.model('user', userSchema)
