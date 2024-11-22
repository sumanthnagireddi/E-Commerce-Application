const app = require("express");
const { registerUser, loginUser, logoutUser } = require("../../controllers/user/user_controller");
const user_route = app.Router();

// route handlers
user_route.post("/register",registerUser);
user_route.post("/login",loginUser)
user_route.get("/logout", logoutUser);  

module.exports = user_route;
