import { Message } from "../models";
import mongoose from "mongoose";

export const saveMessage = async (messageObj) => {
  try {
    const newMessage = new Message({
      sender: messageObj?.sender,
      receiver: messageObj?.receiver,
      message: messageObj?.message,
    });
    await newMessage.save();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getChat = async (receiverId, senderId) => {
  try {
    //Casting string to ObjectId
    receiverId = new mongoose.Types.ObjectId(receiverId);
    senderId = new mongoose.Types.ObjectId(senderId);

    //Aggregate method
    return await Message.aggregate([
      {
        $match: {
          sender: {
            $in: [senderId, receiverId],
          },
          receiver: {
            $in: [senderId, receiverId],
          },
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ]);
  } catch (error) {
    return Promise.reject(error);
  }
};
