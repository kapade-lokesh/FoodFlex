import jwt from "jsonwebtoken";
import { findUser } from "../Reposetory/user.Repo.js";
import { UnaunthorizedError } from "../Utils/UnauthorizedError.js";
import { NotFoundError } from "../Utils/NotFoundError.js";

const loginUser = async (userDetails) => {
  const { email, mobile, password } = userDetails;
  //check if the user is already exist or not
  const user = await findUser(userDetails);

  if (!user) {
    throw new NotFoundError("user");
  }

  // check if the password is correct or not
  const correct = user.isPassCorrect(password);

  if (!correct) {
    throw new UnaunthorizedError();
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      name: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );

  const expiryTime = Date.now() + process.env.JWT_EXPIRY * 1000;

  return {
    accessToken,
    expiryTime,
    userData: {
      email: user.email,
      role: user.role,
      mobile: user.mobile,
      name: user.username,
    },
  };
};

export { loginUser };
