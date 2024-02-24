const mongoose = require('mongoose')

const userInfoSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    maxlength: 50,
    match: [/^[a-zA-Z]+$/, 'Provide a valid first name!'],
    required: [true, 'Please add a first name!'],
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 50,
    match: [/^[a-zA-Z]+$/, 'Provide a last name!'],
    required: [true, 'Please add a last name!'],
  },
  nationalCode: {
    type: String,
    match: [/^\d{10}$/, 'Please add a valid national code'],
    trim: true,
    required: [true, 'National Code is required!'],
    required: [true, 'Please add your national code!'],
  },
  phoneNumber: {
    type: String,
    trim: true,
    match: [/^09\d{9}$/, 'Please provide a Valid Iranian phone number!'],
    required: [true, 'Please add a phone number!'],
  },
  birthDate: {
    type: Date,
  },
})

module.exports = new mongoose.model('UserInfo', userInfoSchema)
