import { createCart } from "../Reposetory/cart.Repo.js";
import { createUser, findUser, getUsers } from "../Reposetory/user.Repo.js";
import { InternalServerError } from "../Utils/InternalServerError.js";

const registerUser = async (userDetails) => {
  const { username, email, mobile, password,address } = userDetails;
  const user = await findUser({ mobile, email });

  if (user) {
    if (user.email === email && user.mobile === mobile) {
      throw { message: "user already exist !!", 
        statusCode: 400 };
    }

    if (user.email === email || user.mobile === mobile) {
      throw {
        message: "user already exist with same e-mail id or mobile No. !!",
        statusCode: 400,
      };
    }
  }

  const newUser = await createUser({
    username,
    email,
    mobile,
    password,
    address,
  });


  if (!newUser) {
    throw new InternalServerError();
  }

 const cart = await createCart(newUser._id);
  if (!cart) {
    throw new InternalServerError();
  }
  return newUser;
};

const getall = async () => {
  const users = await getUsers();
  return users;
};
export { registerUser, getall };
