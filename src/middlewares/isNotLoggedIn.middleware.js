import { R4XX } from "../API";

export const isNotLoggedIn = (req, res, next) => {
  let jwt = req.headers.authorization;
  if (jwt) {
    return R4XX(res, 409, "CONFLICT-ERROR", "A USER is already Logged In");
  }
  next();
};
