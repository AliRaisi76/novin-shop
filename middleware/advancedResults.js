const advancedResults = (model, populate) => async (req, res, next) => {
  let query
  let reqQuery = { ...req.query }

  // Convert the queried price from dollar form to cent form
  const priceRange = Object.keys(reqQuery.price)
  priceRange.forEach((range) => {
    reqQuery.price[range] = `${reqQuery.price[range]}00`
  })
  const removeFields = ['select', 'sort', 'limit', 'page']

  removeFields.forEach((param) => delete reqQuery[param])

  let queryString = JSON.stringify(reqQuery)
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  )

  query = model.find(JSON.parse(queryString))
  // SELECT FIELDS
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ')
    query = query.select(fields)
  }

  // SORT
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  } else {
    query = query.sort('-price')
  }

  // PAGINATION
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 20
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await model.countDocuments()

  query = query.skip(startIndex).limit(limit)

  if (populate) {
    query = query.populate(populate)
  }

  const results = await query

  // Pagination results
  const pagination = {}
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    }
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }

  res.advancedResults = {
    message: 'All products fetched!',
    count: results.length,
    pagination,
    data: results,
  }
  next()
}

module.exports = advancedResults
