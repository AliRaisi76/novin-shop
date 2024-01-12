const ErrorResponse = require('../utils/ErrorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  if (err.name === 'CastError') {
    // Mongoose bad ObjectID
    const message = 'Resource not Found!'
    error = new ErrorResponse(message, 404)
    //
  } else if (err.code === 110000) {
    // Mongoose duplicate key
    const message = 'Duplicate field value entered!'
    error = new ErrorResponse(message, 400)
    //
  } else if (err.name === 'ValidationError') {
    // Mongoose validation error
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorResponse(message, 400)
  } else {
    error = new ErrorResponse(error, 500)
  }

  res.status(error.statusCode || 500).json({
    success: 'false',
    message: error.message,
  })
}
module.exports = errorHandler
