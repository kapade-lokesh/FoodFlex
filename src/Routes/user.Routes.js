import express from "express";
import { CreateUser, GetallUsers } from "../Controllers/user.Controller.js";

const userRoutes = express.Router();

userRoutes.route("/register").post(CreateUser);
userRoutes.route("/allusers").get(GetallUsers);

export { userRoutes };
