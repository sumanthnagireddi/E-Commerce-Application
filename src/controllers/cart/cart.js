const User = require("../../models/user/user_model");
const getAggregate = require("../../utils/getAggregate");
const { getProductById } = require("../products/products");

const getCartItems = async (req, res, next) => {
  try {
    const user = req.user;
    const cartItems = user?.cart || [];
    const getTotals = await getAggregate(user);
    res.render("cart", { data: { cart: cartItems, total: getTotals } });
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    // fetching user and payload from api
    const user = req.user;
    const cartItem = req.body;
    // checking whether product is there in user cart or not
    const isProductFoundinTheCart = await User.findOne({
      _id: user._id,
      "cart._id": cartItem._id,
    });

    // calculating the count of the product from user profile
    const userFromDB = await User.findById(user._id);
    const existingQuantity = userFromDB.cart.find(
      (item) => item._id.toString() == cartItem._id.toString()
    );

    if (isProductFoundinTheCart) {
      const userCart = await User.findOneAndUpdate(
        { _id: user._id, "cart._id": cartItem._id },
        {
          $inc: {
            "cart.$.quantity": cartItem.quantity,
          },
          $set: {
            "cart.$.product_price": Math.round(
              cartItem.product_price + existingQuantity.product_price
            ),
          },
        },
        { new: true }
      );
      return res.status(200).send(userCart);
    } else {
      const userCart = await User.findByIdAndUpdate(
        user._id,
        { $push: { cart: cartItem } },
        { new: true }
      );
      return res.status(200).send(userCart);
    }
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    // fetching user and payload from api
    const user = req.user;
    const cartItem = req.body;

    // checking whether product is there in user cart or not
    const isProductFoundinTheCart = await User.findOne({
      _id: user._id,
      "cart._id": cartItem._id,
    });
    if (!isProductFoundinTheCart)
      throw new Error("Product not found in the cart");

    // calculating the count of the product from user profile
    const userFromDB = await User.findById(user._id);
    const existingQuantity = userFromDB.cart.find(
      (item) => item._id.toString() == cartItem._id.toString()
    );

    // if product is there in cart and count is greater than one decreasing the count else removing the object from the cart array from user
    if (isProductFoundinTheCart && existingQuantity.quantity > 1) {
      const userCart = await User.findOneAndUpdate(
        {
          _id: user._id,
          "cart._id": cartItem._id,
          "cart.quantity": { $gt: 0 },
        },
        {
          $inc: { "cart.$.quantity": -1 },
          $set: {
            "cart.$.product_price": Math.round(
              existingQuantity.product_price - cartItem.product_price
            ),
          },
        },
        { new: true }
      );
      return res.status(200).send(userCart);
    } else {
      const userCart = await User.findByIdAndUpdate(
        user._id,
        { $pull: { cart: { _id: cartItem._id } } },
        { new: true }
      );
      return res.status(200).send(userCart);
    }
  } catch (error) {
    next(error);
  }
};

const deleteItemFromCart = async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.params.id;
    // Remove the item from the cart
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $pull: { cart: { _id: id } } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .send({ message: "User not found or item not in cart." });
    }

    res.redirect("api/v1/products");

    // return res.status(200).send({
    //   message: "Item removed from cart successfully.",
    //   cart: updatedUser.cart,
    // });
  } catch (error) {
    next(error); // Pass any errors to the error-handling middleware
  }
};

module.exports = {
  getCartItems,
  addToCart,
  removeFromCart,
  deleteItemFromCart,
};
