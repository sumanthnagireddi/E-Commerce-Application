const app =require("express");
const { getCartItems } = require("../../controllers/cart/cart");

const cart_router=app.Router();

cart_router.route("/").get(getCartItems)