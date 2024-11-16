const app = require("express");
const { registerUser, loginUser } = require("../../controllers/user/user_controller");
const user_route = app.Router();

// route handlers
user_route.post("/register",registerUser);
user_route.post("/login",loginUser)

module.exports = user_route;
