import express from "express";
import { login, logout } from "../Controllers/auth.Controller.js";
const authRoutes = express.Router();

authRoutes.route("/login").post(login);
authRoutes.route("/logout").post(logout);

export { authRoutes };
