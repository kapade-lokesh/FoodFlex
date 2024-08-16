import express from 'express'
import { login } from '../Controllers/auth.Controller.js';
const authRoutes = express.Router();

authRoutes.route("/login").post(login)

export {authRoutes}