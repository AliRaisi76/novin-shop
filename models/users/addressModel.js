const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
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
})
