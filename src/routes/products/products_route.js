const app = require("express");
const { getProducts } = require("../../controllers/products");

const product_route = app.Router();

product_route.get("/", getProducts);

module.exports=product_route