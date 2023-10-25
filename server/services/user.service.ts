import { UserEntity } from "entities";
import { Logger, getUserRepository } from "utils";

export const getUserByEmail = async (
  email: string
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  const user: UserEntity | null = await userRepository
    .createQueryBuilder("user")
    .select(["user.email", "user.first_name", "user.last_name", "user.role"])
    .where("user.email = :email", { email })
    .getOne();
  Logger.log("User", user);
  return user;
};

export const getPassword = async (
  email: string
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  const user: UserEntity | null = await userRepository
    .createQueryBuilder("user")
    .select(["user.password"])
    .where("user.email = :email", { email })
    .getOne();
  return user;
};
