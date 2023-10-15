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
import mongoose from "mongoose";
import { body, param } from "express-validator";

export const resourceCreationValidationRules = (role) => {
  return [
    body("email", EMAIL_REQUIRED)
      .notEmpty()
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
    body("role")
      .notEmpty()
      .withMessage("Role required")
      .isString()
      .withMessage("Role must be a string")
      .isIn(role)
      .withMessage("Invalid role"),
  ];
};

export const mongoIdValidation = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage("Id is required in query params")
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("Invalid Id mentioned in query"),
  ];
};

export const resourceUpdationValidationRules = (role) => {
  return [
    body("email")
      .optional()
      .trim()
      .isEmail()
      .withMessage(EMAIL_INVALID)
      .isLength({ min: 6 }),
    body("name")
      .optional()
      .isString()
      .isLength({ min: 3 })
      .withMessage(NAME_INVALID)
      .matches(/^[A-Za-z\s]+$/)
      .withMessage(LETTER_SPACES),
    body("CNIC")
      .optional()
      .isString()
      .matches(/^\d{5}-\d{7}-\d{1}$/)
      .withMessage(CNIC_INVALID),
    body("password")
      .optional()
      .isLength({ min: 8 })
      .withMessage(PASSWORD_INVALID),
  ];
};
