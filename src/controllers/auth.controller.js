import { R2XX, R4XX } from "../API";
import { createUser, getUserByCNIC, getUserByEmail } from "../services";
import { USER_ALREADY_EXIST } from "../constants";
import { issueJWT, sanitizeUser, verifyPassword } from "../utils";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    // -------------------------------------------------------------------------->>
    if (!user) {
      return R4XX(res, 401, "UN-AUTHORIZED", `${email} is unauthorized!`);
    }
    let isVerify = await verifyPassword(password.toString(), user?.password);
    // -------------------------------------------------------------------------->>
    if (!isVerify) {
      return R4XX(res, 401, "UN-AUTHORIZED", `${email} is unauthorized!`);
    }
    // -------------------------------------------------------------------------->>
    let jwt = issueJWT(user, "2h");

    return R2XX(res, 200, "SUCCESS", "User logged in successfully.", {
      user: sanitizeUser(user),
      jwt,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { email, CNIC } = req.body;
    // -------------------------------------------------------------------------->>
    const user = await getUserByEmail(email);
    if (user) {
      return R4XX(
        res,
        409,
        USER_ALREADY_EXIST.type,
        USER_ALREADY_EXIST.message
      );
    }
    // -------------------------------------------------------------------------->>
    const _user = await getUserByCNIC(CNIC);
    if (_user) {
      return R4XX(
        res,
        409,
        USER_ALREADY_EXIST.type,
        "Resource with this CNIC already exist."
      );
    }
    // -------------------------------------------------------------------------->>
    const newUser = await createUser(req.body);
    let jwt = issueJWT(newUser, "2h");

    return R2XX(res, 201, "SUCCESS", "Resource registered successfully!", {
      user: sanitizeUser(newUser),
      jwt,
    });
  } catch (error) {
    next(error);
  }
};
