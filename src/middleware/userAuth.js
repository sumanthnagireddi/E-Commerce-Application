const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user/user_model");


// method to check whether was logged in or not
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
       return res.status(401).render("login")
    //   return res.status(401).send("Please login!!");
    }
    const decodeUser = await jwt.verify(token, process.env.SECRET_KEY);
    const { _id } = decodeUser;
    const user = await User.findById(_id)
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// method to get jwt token
const getJWTtoken = async (user) => {
  const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  return token;
};

// method to validate password by bcrypt
const validatePassword = async (userPassword, passwordInputByUser) => {
  const isValidPassword = await bcrypt.compare(
    passwordInputByUser,
    userPassword
  );

  return isValidPassword;
};

module.exports = { userAuth, getJWTtoken, validatePassword };
