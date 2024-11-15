const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/shopping-cart");
  
  } catch (error) {
    console.log(`Connection Error ${error}`);
  }
};

module.exports = connectToDB;
