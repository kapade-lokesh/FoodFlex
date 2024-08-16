import { Product } from "../Models/product.Model.js";
import { BadReqError } from "../Utils/BadReqError.js";
import { InternalServerError } from "../Utils/InternalServerError.js";

const createProduct = async (parameters) => {
  try {
    const response = await Product.create({ ...parameters });
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorlist = Object.keys(error.errors).map((property) => {
        return error.errors[property].message;
      });
      throw new BadReqError(errorlist);
    }
    throw new InternalServerError();
  }
};

const getProduct = async (parameters) => {
  try {
    const response = await Product.findById({ _id: parameters });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async ({ _id: parameters }) => {
  try {
    const response = await Product.findByIdAndDelete(parameters);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { createProduct, getProduct, deleteProduct };
