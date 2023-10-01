import {
  CNIC_INVALID,
  CNIC_REQUIRED,
  EMAIL_INVALID,
  EMAIL_REQUIRED,
  LETTER_SPACES,
  NAME_INVALID,
  NAME_REQUIRED,
  PASSWORD_INVALID,
  PASSWORD_REQUIRED,
} from "../constants";

import { body } from "express-validator";

export const registerValidationRules = () => {
  return [
    body("email", EMAIL_REQUIRED)
      .trim()
      .isEmail()
      .withMessage(EMAIL_INVALID)
      .isLength({ min: 6 }),
    body("password")
      .notEmpty()
      .withMessage(PASSWORD_REQUIRED)
      .isLength({ min: 8 })
      .withMessage(PASSWORD_INVALID),
    body("name")
      .notEmpty()
      .withMessage(NAME_REQUIRED)
      .isString()
      .isLength({ min: 3 })
      .withMessage(NAME_INVALID)
      .matches(/^[A-Za-z\s]+$/)
      .withMessage(LETTER_SPACES),
    body("CNIC")
      .notEmpty()
      .withMessage(CNIC_REQUIRED)
      .isString()
      .matches(/^\d{5}-\d{7}-\d{1}$/)
      .withMessage(CNIC_INVALID),
  ];
};

export const loginValidationRules = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage(EMAIL_REQUIRED)
      .trim()
      .isEmail()
      .withMessage(EMAIL_INVALID),
    body("password").notEmpty().withMessage(PASSWORD_REQUIRED),
  ];
};

