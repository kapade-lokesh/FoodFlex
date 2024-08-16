import express from "express";
import { upload } from "../Middlewares/multer.Middleware.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
} from "../Controllers/product.Controller.js";

const productRoutes = express.Router();

productRoutes.route("/addproduct").post(upload.single("image"), createProduct);
productRoutes.route("/getproduct/:id").post(getProduct);
productRoutes.route("/deleteproduct/:id").post(deleteProduct);
export { productRoutes };
