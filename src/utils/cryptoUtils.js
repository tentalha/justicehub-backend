import { randomBytes } from "crypto";

export const generateToken = () => {
  return new Promise((resolve, reject) => {
    randomBytes(16, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString("hex"));
    });
  });
};
