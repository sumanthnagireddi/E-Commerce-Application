const Product = require("../../models/products/product_model");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products || products.length == 0) {
      const error = new Error("Products not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts };
