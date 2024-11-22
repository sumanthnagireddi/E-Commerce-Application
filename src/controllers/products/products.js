const Product = require("../../models/products/product_model");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().lean();
    if (!products || products.length == 0) {
      const error = new Error("Products not found");
      error.statusCode = 404;
      throw error;
    }
    res.render("products", { data: products });
    // res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (id) => {
  // const id = req.params.id;
  try {
    const product = await Product.findById(id).select("product_name");
    if (!product || product.length == 0) {
      const error = new Error("Products not found");
      error.statusCode = 404;
      throw error;
    }
    // console.log(products)
    return product?.product_name;
    // res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
module.exports = { getProducts, getProductById };
