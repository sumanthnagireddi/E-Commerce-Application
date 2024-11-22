const app = require("express");
const { getCartItems, addToCart,removeFromCart, deleteItemFromCart } = require("../../controllers/cart/cart");
const { userAuth } = require("../../middleware/userAuth");

const cart_router = app.Router();

cart_router.get("/", userAuth, getCartItems);
cart_router.put("/add", userAuth, addToCart);
cart_router.put("/remove", userAuth, removeFromCart);
cart_router.put("/delete/:id",userAuth,deleteItemFromCart)
module.exports = cart_router;
