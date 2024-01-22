const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = mongoose.Schema({
  personalInfo: {
    firstName: {
      type: String,
      trim: true,
      maxlength: 50,
      match: [/^[a-zA-Z]+$/, 'Provide a valid first name!'],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 50,
      match: [/^[a-zA-Z]+$/, 'Provide a last name!'],
    },
    nationalCode: {
      type: String,
      match: [/^\d{10}$/, 'Please add a valid national code'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^09\d{9}$/, 'Please provide a Valid Iranian phone number!'],
    },
    birthDate: {
      type: Date,
    },
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
    required: [true, 'please provide an email!'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: 6,
    select: false,
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,}$/,
      'Please provide a strong password!',
    ],
    maxlength: 50,
  },
  locations: [
    {
      address: {
        type: String,
        maxlength: 500,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
        match: [/^[a-zA-Z]+$/, 'Provide a valid city name!'],
      },
      province: {
        type: String,
        trim: true,
        match: [/^[a-zA-Z]+$/, 'Provide a valid province name!'],
      },
      postalCode: {
        type: String,
        trim: true,
        match: [/^\d{10}$/, 'Please add a valid postal code'],
      },
      recipient: {
        type: String,
        trim: true,
        match: [/^[a-zA-Z]+$/, 'Provide a valid recipient full name!'],
      },
      recipientPhoneNumber: {
        type: String,
        match: [/^09\d{9}$/, 'Please provide a Valid Iranian phone number!'],
      },
    },
  ],
  role: {
    type: String,
    enum: ['customer', 'manager'],
    default: 'customer',
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Check if the password matches
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

// Sign jwt token
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
  return resetToken
}

module.exports = new mongoose.model('User', userSchema)
