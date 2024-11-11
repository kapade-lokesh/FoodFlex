import { loginUser } from "../Services/auth.Serevices.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const login = async (req, res) => {
  try {
    const response = await loginUser(req.body);
    res.cookie("authToken", response.accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
    });

    const newResponse = {
      user: response.userData,
      expiry: response.expiryTime,
    };

    return res
      .status(200)
      .json(new ApiResponse(true, 200, newResponse, "login success"));
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

const logout = async (req, res) => {
  console.log("cookies from frontend", res.cookies);

  res.cookie(
    "authToken",
    "",
    {},
    {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(true, 200, "logout sucessfully", {}));
};

export { login, logout };
