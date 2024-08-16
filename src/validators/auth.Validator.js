import { ApiResponse } from "../Utils/ApiResponse.js";
import { UnaunthorizedError } from "../Utils/UnauthorizedError.js";
import jwt from "jsonwebtoken";
const isLoggedin = async (req, res, next) => {
  console.log(req.cookies);
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

    console.log(req.user);

    console.log(`
      
      
      `);

    req.user = {
      email: decode.email,
      id: decode.id,
    };

    console.log(req.user);

    next();
  } catch (error) {
    console.log(error);
  }
};

export { isLoggedin };
