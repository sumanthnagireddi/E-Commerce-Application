const app = require("express");
const { getProducts } = require("../../controllers/products/products");
const { userAuth } = require("../../middleware/userAuth");

const product_route = app.Router();

product_route.get("/", userAuth, getProducts);

module.exports = product_route;
