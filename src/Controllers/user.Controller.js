import { getall, registerUser } from "../Services/user.Services.js";
import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";

const CreateUser = async (req, res) => {
  try {
    const response = await registerUser(req.body);
    return res
      .status(200)
      .json(new ApiResponse(200, "user created sucessfully", response));
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(
        new ApiResponse(false,error.message,{},error)
      );
    }

    console.log(error)
    return res.status(error.statusCode).json(
      new ApiResponse(false,error.message,{},error)
    );
  }
};

const GetallUsers = async (req, res) => {
  try {
    const response = await getall();
    return res
      .status(200)
      .json(new ApiResponse(true, "users fetched", response,{}));
  } catch (error) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .send(new ApiResponse(false,error.statusCode,{},error.message));
    }

    return res
      .status(error.statusCode)
      .send(new ApiResponse(false, error.statusCode, {}, error.message));
  }
};

export { CreateUser, GetallUsers };
