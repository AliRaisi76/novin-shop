// @desc Get all products in a category
// @route GET /api/v1/products/:category
// @access Public
exports.getProducts = (req, res, next) => {
  res.status(200).json({
    message: 'All the products in the category!',
  });
};

// @desc Get all products in a category
// @route GET /api/v1/products/:category
// @access Public
exports.getOneProduct = (req, res, next) => {
  res.status(200).json({
    message: 'Product fetched!',
  });
};

// @desc Get all products in a category
// @route GET /api/v1/products/:category
// @access Public
exports.createProduct = (req, res, next) => {
  res.status(200).json({
    message: 'Product created!',
  });
};

// @desc Get all products in a category
// @route GET /api/v1/products/:category
// @access Public
exports.updateProduct = (req, res, next) => {
  res.status(200).json({
    message: 'Product updated!',
  });
};

// @desc Get all products in a category
// @route GET /api/v1/products/:category
// @access Public
exports.deleteProduct = (req, res, next) => {
  res.status(200).json({
    message: 'Product updated!',
  });
};
