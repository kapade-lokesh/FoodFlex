import { app } from "./app.js";
import { connectDB } from "./Db/connectDB.js";
import dotenv from "dotenv";
import { InternalServerError } from "./Utils/InternalServerError.js";
import { isLoggedin } from "./validators/auth.Validator.js";

dotenv.config({ path: "./env" });
const port = process.env.PORT;

(async () => {
  try {
    await connectDB();
  } catch (error) {
    throw new InternalServerError();
  }
})();

app.get("/api", isLoggedin, (req, res) => {
  res.status(200).send("auth validator is sucessided");
});

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
