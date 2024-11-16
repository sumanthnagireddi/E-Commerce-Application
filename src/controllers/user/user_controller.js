const bcrypt = require("bcrypt");
const User = require("../../models/user/user_model");
const { getJWTtoken, validatePassword } = require("../../middleware/userAuth");

// method for registering the user
const registerUser = async (req, res, next) => {
  try {
    // validate the user based on inputs given;
    if (!req.body.username) {
      throw new Error("Username is mandatory");
    }
    const { username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: passwordHash,
    });
    const savedUser = await user.save();
    const jwtToken = await getJWTtoken(savedUser);
    res.cookie("token", jwtToken);
    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (error) {
    next(error);
  }
};

// method for logging in the user based on username and password;

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isValidPassword = await validatePassword(user.password, password);
    if (isValidPassword) {
      const jwtToken = await getJWTtoken(user);
      res.cookie("token", jwtToken);
      res.status(200).send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { registerUser, loginUser };
