import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../Middlewares/cloudinary.Middleware.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
} from "../Reposetory/product.Repo.js";

import fs from "fs/promises";
import { NotFoundError } from "../Utils/NotFoundError.js";

const addproduct = async (productDetails) => {
  const { imagePath, name, description, price } = productDetails;
  if (
    [imagePath, name, description, price].some(
      (field) => field == null || field.trim() === ""
    )
  ) {
    fs.unlink(imagePath);
    throw {
      message: "unable to carete product required fields are missing",
      statusCode: 400,
    };
  } else {
    var { secure_url, public_id } = await uploadOnCloudinary(imagePath);
  }

  const product = await createProduct({
    ...productDetails,
    image: secure_url,
    publicid: public_id,
  });

  if (!product) {
    throw { message: "product not created", statusCode: 500 };
  }
  return product;
};

const findProduct = async (productDetails) => {
  const product = await getProduct(productDetails);
  if (!product) {
    throw new NotFoundError("product");
  }
  return product;
};

const removeProduct = async (productDetails) => {
  const product = await getProduct(productDetails);

  if (!product) {
    throw  new NotFoundError("product")
  }

  const { publicid } = product;

  if (publicid) {
    await deleteFromCloudinary(publicid);
  }

  const response = await deleteProduct(product._id);
  return response;
};

export { addproduct, removeProduct, findProduct};
