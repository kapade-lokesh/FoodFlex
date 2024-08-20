import { getCartbyUser } from "../Reposetory/cart.Repo.js";
import {
  cancelOrder,
  createOrder,
  getOrderById,
  getOrderByUserId,
  updateOrder,
} from "../Reposetory/order.Repo.js";
import { findUser } from "../Reposetory/user.Repo.js";
import { BadReqError } from "../Utils/BadReqError.js";
import { NotFoundError } from "../Utils/NotFoundError.js";

const placeOrder = async (orderDetails) => {
  const { userId, paymentmethod } = orderDetails;

  const cart = await getCartbyUser(userId);
  if (!cart) {
    throw new NotFoundError("cart");
  }
  if (cart.item.length <= 0) {
    throw new BadReqError(["cart is empty"]);
  }

  const user = await findUser({ _id: userId });

  console.log(user);

  let orderObj = {};
  orderObj.user = user;
  orderObj.item = cart.item.map((citem) => {
    return { product: citem.product._id, quantity: citem.quantity };
  });

  orderObj.totalprice = 0;
  cart.item.map((citem) => {
    orderObj.totalprice += citem.product.price * citem.quantity;
  });

  orderObj.status = "ORDERED";
  orderObj.paymentmethod = paymentmethod;
  orderObj.address = user.address;

  const order = await createOrder(orderObj);
  if (!order) {
    throw { message: "order is not created", statusCode: 500 };
  }

  cart.item = [];
  await cart.save();
  return order;
};

const getOrder = async (orderDetails) => {
  const order = await getOrderById(orderDetails);
  if (!order) {
    throw new NotFoundError("Order");
  }
  return order;
};

const getUserOrders = async (orderDetails) => {
  const order = await getOrderByUserId(orderDetails);
  if (!order) {
    throw new NotFoundError("Order");
  }
  return order;
};

const cancleUserOrder = async (orderDetails) => {
  const order = await cancelOrder(orderDetails);
  return order;
};

const updateUserOrder = async (orderDetails) => {
  
  const { orderId, status } = orderDetails;
  console.log(orderId, "  ", status);
  const order = await updateOrder({orderId, status});
  return order;
};
export {
  placeOrder,
  getOrder,
  getUserOrders,
  updateUserOrder,
  cancleUserOrder,
};
