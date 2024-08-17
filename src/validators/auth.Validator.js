import { ApiResponse } from "../Utils/ApiResponse.js";
import { UnaunthorizedError } from "../Utils/UnauthorizedError.js";
import jwt from "jsonwebtoken";

const isLoggedin = async (req, res, next) => {
  const token = req.cookies["authToken"];

  if (!token) {
    return res
      .status(500)
      .json(new ApiResponse(false, 500, {}, "token not found"));
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      throw new UnaunthorizedError();
    }

    req.user = {
      email: decode.email,
      id: decode.id,
      role: decode.role,
    };

    next();
  } catch (error) {
    console.log(error);
  }
};

const isAdmin = async (req, res, next) => {
  const loginUser = req.user;
  console.log(loginUser);
  if (loginUser.role === "ADMIN") {
    next();
  } else {
    throw new UnaunthorizedError();
  }
};

export { isLoggedin, isAdmin };
