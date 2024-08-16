import { createUser, findUser, getUsers } from "../Reposetory/user.Repo.js";
 

const registerUser = async (userDetails) => {
  const { username, email, mobile, password } = userDetails;
  const user = await findUser({ username, email });

  if (user) {
     throw {massage:"user already exist !!" ,statusCode:400}
  }

  const newUser = await createUser({
    username,
    email,
    mobile,
    password,
  });

  if (!newUser) {
    throw { massage: "internal server error !!", statusCode: 500 };
  }
  return newUser;
};

const getall = async () => {
  const users = await getUsers();
  return users;
};
export { registerUser, getall };
