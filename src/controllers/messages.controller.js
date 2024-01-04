import { getChat, getUserById } from "../services";
import { R2XX, R4XX } from "../API";

export const getMessagesOfChat = async (req, res, next) => {
  try {
    //Fetching messages from database
    const receiverId = req.query.rec;
    const senderId = req.user;

    //Checking the existence of users in system
    const usersExistence = await Promise.all([
      getUserById(receiverId),
      getUserById(senderId),
    ]);

    if (usersExistence.includes(null)) {
      return R4XX(
        res,
        404,
        "NOT-FOUND",
        `One of sender or receiver doesn't exist in system.`
      );
    }

    const messages = await getChat(receiverId, senderId);
    //Sending Response
    R2XX(res, 200, "SUCCESS", "Messages list in payload.", {
      messages,
    });
  } catch (error) {
    next(error);
  }
};
