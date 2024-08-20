import {
  cancleUserOrder,
  getOrder,
  getUserOrders,
  placeOrder,
  updateUserOrder,
} from "../Services/order.services.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
const createOrder = async (req, res) => {
  const { paymentmethod } = req.body;
  try {
    const response = await placeOrder({ paymentmethod, userId: req.user.id });
    return res
      .status(200)
      .json(new ApiResponse(true, 200, response, "order placed"));
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

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const response = await getOrder(orderId);
    return res.status(200).json(new ApiResponse(true, 200, response, "orders"));
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

const getOrderByUserId = async (req, res) => {
  try {
    const orderId = req.params.id;
    const response = await getUserOrders(orderId);
    return res.status(200).json(new ApiResponse(true, 200, response, "orders"));
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

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const status = req.body.status;
    const response = await updateUserOrder({ orderId, status });
    return res.status(200).json(new ApiResponse(true, 200, response, "orders"));
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

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const response = await cancleUserOrder(orderId);
    return res.status(200).json(new ApiResponse(true, 200, response, "orders"));
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
export {
  createOrder,
  updateOrder,
  getOrderByUserId,
  getOrderById,
  cancelOrder,
};
