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
      "user.display_name",
      "user.country_code",
      "user.phone_number",
      "user.role",
      "user.activated",
      "user.avartar",
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
    .where("user.email = :email", { email })
    .getOne();
  return user;
};
