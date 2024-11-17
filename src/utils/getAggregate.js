const User = require("../models/user/user_model");

const getAggregate = async (user) => {
  try {
    const totalCartPrice = await User.aggregate([
      {
        $match: { _id: user._id },
      },
      {
        $unwind: "$cart",
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$cart.quantity" },
          totalPrice: {
            $sum: "$cart.product_price",
          },
        },
      },
    ]);
    return totalCartPrice;
  } catch (error) {
    throw new Error("error occured")
  }
};

module.exports = getAggregate;
