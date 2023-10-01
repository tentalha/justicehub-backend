import { verifyToken } from "../utils";
import { R4XX } from "../API";

export const isLoggedIn = (req, res, next) => {
  const jwt = req.headers.authorization;

  if (!jwt) {
    return R4XX(res, 401, "AUTHENTICATION-ERROR", "User login required", {
      message: "No auth token",
    });
  }

  try {
    let decoded = verifyToken(jwt);
    req.role = decoded?.role;
    req.user = decoded?.sub;
    next();
  } catch (error) {
    R4XX(res, 401, "AUTHENTICATION-ERROR", "Invalid or expired auth token.");
  }
};
