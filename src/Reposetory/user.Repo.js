import { User } from "../Models/user.Model.js";
import { BadReqError } from "../Utils/BadReqError.js";
import { InternalServerError } from "../Utils/InternalServerError.js";

const findUser = async (parameter) => {
  const { mobile, email, _id } = parameter;
  console.log(_id);
  try {
    const response = await User.findOne({
      $or: [{ mobile }, { email }, { _id }],
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (parameter) => {
  const { username, email, mobile, password } = parameter;
  try {
    const response = await User.create({ username, email, mobile, password });
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorlist = Object.keys(error.errors).map((property) => {
        return error.errors[property].message;
      });
      throw new BadReqError(errorlist);
    }

    console.log(error);
    throw new InternalServerError();
  }
};

const getUsers = async () => {
  try {
    const response = await User.find();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { findUser, createUser, getUsers };
