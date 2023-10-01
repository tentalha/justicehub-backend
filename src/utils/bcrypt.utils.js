import { hash, compare } from "bcrypt";

export const hashPassword = async (pass) => {
  return await hash(pass, 10);
};

export const verifyPassword = async (pass, hashPass) => {
  return await compare(pass, hashPass);
};
