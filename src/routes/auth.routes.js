import { Router } from "express";
import {
  login as LoginC,
  register as RegisterC,
  forgetPassword as ForgetPasswordC,
  resetPassword,
} from "../controllers";
import {
  forgetPasswordValidation,
  loginValidationRules,
  registerValidationRules,
  resetPasswordValidation,
} from "../validations";
import { validate } from "../middlewares";

const router = Router();

router.post("/login", loginValidationRules(), validate, LoginC);

router.post("/register", registerValidationRules(), validate, RegisterC);

router.post(
  "/forget-password",
  forgetPasswordValidation(),
  validate,
  ForgetPasswordC
);

router.post(
  "/reset-password",
  resetPasswordValidation(),
  validate,
  resetPassword
);

export default router;
