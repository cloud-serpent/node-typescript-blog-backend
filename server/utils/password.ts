import bcrypt from 'bcryptjs';

export const encryptPassword = async(password:string):Promise<string> => {
    const hashPassword = await bcrypt.hash(password, 8);
    return hashPassword;
}