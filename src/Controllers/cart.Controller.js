import { getCart, erazeCart, modifyCart } from "../Services/cart.Services.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
const getCartByUser = async (req, res) => {
  try {
    const cart = await getCart(req.user.id);
    return res
      .status(200)
      .json(new ApiResponse(true, 200, cart, "cart found sucessfully"));
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json(new ApiResponse(false, error.statusCode, {}, error.message));
    }
    return res
      .status(error.statusCode)
      .json(new ApiResponse(false, error.statusCode, {}, error.message));
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await erazeCart(req.user.id);
    return res
      .status(200)
      .json(new ApiResponse(true, 200, cart, "cart clear sucessfully"));
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json(new ApiResponse(false, error.statusCode, {}, error.message));
    }
    return res
      .status(error.statusCode)
      .json(new ApiResponse(false, error.statusCode, {}, error.message));
  }
};

const updateCart = async (req, res) => {
  try {
    const { productId, shouldAdd } = req.body;
    const booleanshould = shouldAdd === "true" || shouldAdd === true;
    const cart = await modifyCart(productId, req.user.id, booleanshould);
    return res
      .status(200)
      .json(new ApiResponse(true, 200, cart, "cart updated.."));
  } catch (error) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json(new ApiResponse(false, error.statusCode, {}, error.message));
    }
    return res
      .status(error.statusCode)
      .json(new ApiResponse(false, error.statusCode, {}, error.message));
  }
};

export { getCartByUser, clearCart, updateCart };
