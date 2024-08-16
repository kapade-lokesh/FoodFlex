import {
  addproduct,
  findProduct,
  removeProduct,
} from "../Services/product.Services.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const createProduct = async (req, res) => {
  try {
    const response = await addproduct({
      ...req.body,
      imagePath: req.file.path,
    });

    return res.status(200).json(new ApiResponse(true, 200, response, {}));
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json(new ApiResponse(false, error.statusCode, {}, error.message));
    }
    return res
      .status(error.statusCode)
      .json(new ApiResponse(false, error.statusCode, {}, error.message));
  }
};

const getProduct = async (req, res) => {
  try {
    const response = await findProduct(req.params.id);
    return res.status(200).json(new ApiResponse(true, 200, response, {}));
  } catch (error) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json(new ApiResponse(false, error.statusCode, {}, error.massage));
    }
    return res
      .status(error.statusCode)
      .json(new ApiResponse(false, error.statusCode, {}, error.message));
  }
};

const deleteProduct = async (req, res) => {
  try {
    const response = await removeProduct(req.params.id);
    return res.status(200).json(new ApiResponse(true, 200, response, {}));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(false, error.statusCode, {}, error.massage));
  }
};

export { createProduct, deleteProduct, getProduct };
