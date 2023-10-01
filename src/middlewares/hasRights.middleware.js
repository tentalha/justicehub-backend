import { R4XX } from "../API";

export const hasRights = (roles) => {
  return async (req, res, next) => {
    try {
      let role = req?.role;
      if (roles.includes(role)) return next();
      else return R4XX(res, 403, "AUTHORIZATION-ERROR", `Not Enough Rights`);
    } catch (error) {
      next(error);
    }
  };
};
