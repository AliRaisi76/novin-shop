const Order = require('../models/orderModel')
const asyncHandler = require('../middleware/asyncHandler')
const advancedResults = require('../middleware/advancedResults')
const errorResponse = require('../utils/ErrorResponse')

// @Desc Get all orders
// @Route /api/v1/orders
// @Route /api/v1/users/:userId/orders
// @

exports.getOrders = asyncHandler(async (req, res, next) => {})
