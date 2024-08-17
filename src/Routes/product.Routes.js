import express from "express";
import { upload } from "../Middlewares/multer.Middleware.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
} from "../Controllers/product.Controller.js";
import { isAdmin, isLoggedin } from "../validators/auth.Validator.js";

const productRoutes = express.Router();

productRoutes
  .route("/addproduct")
  .post(isLoggedin, isAdmin, upload.single("image"), createProduct);
productRoutes.route("/getproduct/:id").post(getProduct);
productRoutes.route("/deleteproduct/:id").post(deleteProduct);
export { productRoutes };
