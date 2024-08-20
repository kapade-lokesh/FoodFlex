import { Order } from "../Models/order.Model.js";
import { BadReqError } from "../Utils/BadReqError.js";
import { InternalServerError } from "../Utils/InternalServerError.js";

const createOrder = async (parameters) => {
  try {
    const response = await Order.create(parameters);
    return response;
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      const errorlist = Object.keys(error.errors).map((property) => {
        return error.errors[property].message;
      });
      throw new BadReqError(errorlist);
    }
    throw new InternalServerError();
  }
};

const getOrderById = async (parameters) => {
  try {
    const response = await Order.findOne({ _id: parameters });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getOrderByUserId = async (parameters) => {
  try {
    const response = await Order.find({ user: parameters });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (parameters) => {
  try {
    const { orderId, status } = parameters;
    const response = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      {
        new: true,
      }
    );
    console.log(response);
    response.save();
    return response;
  } catch (error) {
    console.log(error);
  }
};

const cancelOrder = async (parameters) => {
  try {
    const response = await Order.findByIdAndUpdate(
      parameters,
      {
        status: "CANCELLED",
      },
      { new: true }
    );
    response.save();
    return response;
  } catch (error) {
    console.log(error);
  }
};
export {
  createOrder,
  getOrderById,
  getOrderByUserId,
  updateOrder,
  cancelOrder,
};
