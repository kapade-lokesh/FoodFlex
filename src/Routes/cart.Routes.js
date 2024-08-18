import express from "express";
import {
  getCartByUser,
  clearCart,
  updateCart,
} from "../Controllers/cart.Controller.js";
import { isLoggedin } from "../validators/auth.Validator.js";

const cartRoutes = express.Router();

cartRoutes.route("/getcart").get(isLoggedin, getCartByUser);
cartRoutes.route("/clearcart").post(isLoggedin, clearCart);
cartRoutes.route("/modifycart").post(isLoggedin, updateCart);

export { cartRoutes };
