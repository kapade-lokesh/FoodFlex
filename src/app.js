import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { userRoutes } from "./Routes/user.Routes.js";
import { authRoutes } from "./Routes/auth.Routes.js";
import { productRoutes } from "./Routes/product.Routes.js";
import cookieParser from "cookie-parser";
import { cartRoutes } from "./Routes/cart.Routes.js";
import { orderRoutes } from "./Routes/order.Routes.js";
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("server is fine how are you buddy");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

export { app };
