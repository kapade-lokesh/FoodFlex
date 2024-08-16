import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectioninstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(
      `Database Connected Host Name : ${connectioninstance.connection.host}`
    );
  } catch (error) {
      console.log(error)
  }
};

export {connectDB}