import { getUserById } from "../services";
import { R2XX } from "../API";
import { sanitizeUser } from "../utils";

export const meController = async (req, res, next) => {
  try {
    const user = await getUserById(req.user);
    return R2XX(res, 200, "AUTHORIZED", "User is authorized", {
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};
