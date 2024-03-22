import { getRepository } from "typeorm";
import { User } from "../entities/User";

// *New* - This is a new method that we are adding to the repository
export const registerUser = async (paramsData: any) => {
  const { name, email, password } = paramsData;

  // adding New User info + company newly created
  const userRepository = getRepository(User);
  const user = new User();
  user.email = email;
  user.password = password;
  user.name = name;
  await userRepository.save(user);
  return user;
};


export const getByEmail = async (email: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository
    .createQueryBuilder("user")
    .where("user.email = :email", { email: email })
    .select([
      "user.id",
      "user.name",
      "user.email",
      "user.password",
    ])
    .getOne();
  return user;
};

export const getById = async (id: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository
    .createQueryBuilder("user")
    .where("user.id = :id", { id: id })
    .select([
      "user.id",
      "user.name",
      "user.email",
      "user.password",
    ])
    .getOne();
  return user;
};

export const deleteUser = async (userId: string) => {
  try {
    const user = await getById(userId);
    if (!user) return;
    await user.remove();
    return console.log("User Removed");
  } catch (error) {
    console.error("Error Deleting User:", error);
  }
};