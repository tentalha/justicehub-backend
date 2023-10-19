import { R2XX, R4XX } from "../API";
import {
  createUser,
  deleteAllTokenOfUser,
  getToken,
  getUserByCNIC,
  getUserByEmail,
  getUserById,
  saveToken,
} from "../services";
import { USER_ALREADY_EXIST } from "../constants";
import {
  generateToken,
  hashPassword,
  issueJWT,
  sanitizeUser,
  verifyPassword,
} from "../utils";
import { RESET_CLIENT_URL } from "../configs";
import { sendEmail } from "../configs";

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

export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      return R4XX(res, 404, "NOT-FOUND", `Email ${email} not found.`);
    }

    const resetToken = await generateToken();
    const link = RESET_CLIENT_URL + `?token=${resetToken}&id=${user._id}`;
    console.log(link);
    // ------------------------------------------------------------------------>>
    await Promise.all([
      saveToken({ _id: user._id, token: resetToken }),
      sendEmail(
        email,
        "Reset Your Password",
        `Use this link in 5 minutes to your reset password ${link}`
      ),
    ]);
    // ------------------------------------------------------------------------>>
    R2XX(res, 200, "SUCCESS", "Reset link sent to email.", { link });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { id, token } = req.query;
    const { password } = req.body;
    const tokenFromDb = await getToken(id);

    if (!tokenFromDb.length || tokenFromDb[0].token !== token) {
      return R4XX(
        res,
        498,
        "INVALID/EXPIRED TOKEN",
        "Token is invalid/expired. Visit /backend/api/auth/forget-password to retrieve new token."
      );
    }

    const user = await getUserById(id);
    user.password = await hashPassword(password);

    await Promise.all([user.save(), deleteAllTokenOfUser(id)]);

    R2XX(
      res,
      200,
      "SUCCESS",
      "Password reset successfully. Now you can visit /backend/api/auth/login to Login to the system. "
    );
  } catch (error) {
    next(error);
  }
};
