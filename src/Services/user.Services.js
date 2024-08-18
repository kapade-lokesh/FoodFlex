import { createCart } from "../Reposetory/cart.Repo.js";
import { createUser, findUser, getUsers } from "../Reposetory/user.Repo.js";
import { InternalServerError } from "../Utils/InternalServerError.js";

const registerUser = async (userDetails) => {
  const { username, email, mobile, password } = userDetails;
  const user = await findUser({ username, email });

  if (user) {
    throw { massage: "user already exist !!", statusCode: 400 };
  }

  const newUser = await createUser({
    username,
    email,
    mobile,
    password,
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
