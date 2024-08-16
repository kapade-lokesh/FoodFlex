import { cloudinary } from "../config/cloudinary.config.js";
import fs from "fs/promises";

const uploadOnCloudinary = async (imagePath) => {
  try {
    if (!imagePath) return null;
    const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);

    const { secure_url, public_id } = cloudinaryResponse;
    fs.unlink(imagePath);
    return { secure_url, public_id };
  } catch (error) {
    throw { message: "cloudinary error", statusCode: 500 };
  }
};

const deleteFromCloudinary = async (public_id) => {
  try {
    if (!public_id) return null;
    const cloudinaryResponse = await cloudinary.uploader.destroy(public_id);
    return cloudinaryResponse;
  } catch (error) {
    console.log(error);
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
