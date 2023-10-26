import { UserEntity } from "entities";
import { Logger, getUserRepository } from "utils";

export const getUser = async (
  data: Partial<Pick<UserEntity, "email" | "phoneNumber">>
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  const user: UserEntity | null = await userRepository
    .createQueryBuilder("user")
    .select([
      "user.email",
      "user.displayName",
      "user.countryCode",
      "user.phoneNumber",
      "user.role",
      "user.activated",
      "user.avatar",
    ])
    .where(data)
    .getOne();
  Logger.log("User", user);
  return user;
};

export const createUser = async (
  display_name: string,
  country_code: string,
  phone_number: string,
  email: string,
  password: string
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  const user = new UserEntity();
  user.displayName = display_name;
  user.countryCode = country_code;
  user.phoneNumber = phone_number;
  user.email = email;
  user.password = password;
  await userRepository.save(user);
  return user;
};

export const getPassword = async (
  email: string
): Promise<UserEntity | null> => {
  const userRepository = await getUserRepository();
  const user: UserEntity | null = await userRepository
    .createQueryBuilder("user")
    .select(["user.password"])
    .where({ email })
    .getOne();
  return user;
};
