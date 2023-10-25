import bcyrpt from "bcryptjs";

export const comparePassword = async (
  normalPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcyrpt.compare(normalPassword, hashedPassword);
};
