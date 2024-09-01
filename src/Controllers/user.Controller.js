import { getall, registerUser } from "../Services/user.Services.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const CreateUser = async (req, res) => {
  try {
    const response = await registerUser(req.body);
    console.log(req.body);
    return res
      .status(200)
      .json(new ApiResponse(true, 200, response, "user created sucessfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error);
      console.log("inside of if");
      return res
        .status(error.statusCode)
        .json(new ApiResponse(false, error.message, {}, error));
    }

    console.log(error);
    console.log("out of if");
    return res
      .status(error.statusCode)
      .json(new ApiResponse(false, error.message, {}, error));
  }
};

const GetallUsers = async (req, res) => {
  try {
    const response = await getall();
    return res
      .status(200)
      .json(new ApiResponse(true, 200, response, "users fetched"));
  } catch (error) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .send(new ApiResponse(false, error.statusCode, {}, error.message));
    }

    return res
      .status(error.statusCode)
      .send(new ApiResponse(false, error.statusCode, {}, error.message));
  }
};

export { CreateUser, GetallUsers };
