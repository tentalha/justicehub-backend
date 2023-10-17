import { Token } from "../models";

export const saveToken = async (data) => {
  try {
    const newToken = new Token({
      userId: data?._id,
      token: data?.token,
    });
    await newToken.save();
    return newToken;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getToken = async (userId) => {
  try {
    return await Token.find({ userId }).sort({ createdAt: -1 }).exec();
  } catch (error) {
    Promise.reject(error);
  }
};

export const deleteAllTokenOfUser = async (userId) => {
  try {
    await Token.deleteMany({ userId });
  } catch (error) {
    Promise.reject(error);
  }
};
