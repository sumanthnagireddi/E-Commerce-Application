const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [
    {
      product_name:{type:String,required:true},
      quantity: { type: Number, required: true, min: 1 },
      product_price: { type: Number },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
