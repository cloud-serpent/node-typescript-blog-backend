import { UserEntity } from "entities";
import {Logger, getUserRepository} from 'utils';

export const getUserByEmail = async (email: string):Promise<UserEntity | null> => {
    const userRepository = await getUserRepository();
    const user: UserEntity | null = await userRepository
    .createQueryBuilder('user')
    .select([
        'user.email',
        'user.first_name',
        'user.last_name',
        'user.role',
    ])
    .where('user.email = :email', {email})
    .getOne();
    Logger.log("User", user);
    return user;
}

export const createUser = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string
): Promise<UserEntity | null> => {
    const userRepository = await getUserRepository();
    const user = new UserEntity();
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.password = password;
    await userRepository.save(user);
    return user;
}