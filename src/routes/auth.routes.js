import { Router } from "express";
import { login as LoginC, register as RegisterC } from "../controllers";
import { loginValidationRules, registerValidationRules } from "../validations";
import { validate } from "../middlewares";

const router = Router();

router.post("/login", loginValidationRules(), validate, LoginC);

router.post("/register", registerValidationRules(), validate, RegisterC);

export default router;
