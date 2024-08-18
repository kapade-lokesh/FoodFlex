import { Cart } from "../Models/cart.Model.js";
import { BadReqError } from "../Utils/BadReqError.js";
import { InternalServerError } from "../Utils/InternalServerError.js";

const createCart = async (userId) => {
  try {
    const response = await Cart.create({ user: userId });
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorlist = Object.keys(error.errors).map((property) => {
        return error.errors[property].message;
      });

      throw new BadReqError(errorlist);
    }
    console.log(error);
    throw new InternalServerError();
  }
};

const getCartbyUser = async (userId) => {
  try {
    const response = await Cart.findOne({ user: userId }).populate(
      "item.product"
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw new InternalServerError();
  }
};

const clearCart = async (userId) => {
  try {
    const response = await Cart.findOne({ user: userId });
    response.item = [];
    await response.save();

    return response;
  } catch (error) {
    throw new InternalServerError();
  }
};

export { createCart, getCartbyUser, clearCart };
