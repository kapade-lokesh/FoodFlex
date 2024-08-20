import express from "express";
import { createOrder } from "../Controllers/order.Controller.js";
import { isLoggedin } from "../validators/auth.Validator.js";
import { cancelOrder, updateOrder, getOrderById , getOrderByUserId } from "../Controllers/order.Controller.js"
const orderRoutes = express.Router();

orderRoutes.route("/placeorder").post(isLoggedin, createOrder);
orderRoutes.route("/getbyid/:id").get(isLoggedin, getOrderById);
orderRoutes.route("/getbyuser/:id").get(isLoggedin, getOrderByUserId);
orderRoutes.route("/cancel/:id").post(isLoggedin, cancelOrder);
orderRoutes.route("/update/:id").post(isLoggedin,updateOrder);

export { orderRoutes };
