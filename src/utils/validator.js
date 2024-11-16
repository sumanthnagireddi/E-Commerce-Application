const validator = require("validator");

const validateUser = (req) => {
  const { username, password, email } = req;
  if (!username) {
    throw new Error("Name is mandatory");
  }
};

module.exports = validateUser;
