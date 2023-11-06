import {
  CNIC_INVALID,
  CNIC_REQUIRED,
  LETTER_SPACES,
  NAME_INVALID,
  NAME_REQUIRED,
} from "../constants";
import { body,query } from "express-validator";

export const criminalCreationValidationRules = () => {
  return [
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
    body("age")
      .notEmpty()
      .withMessage("Age is required")
      .isNumeric()
      .withMessage("Age must be a number"),
  ];
};

export const criminalUpdationValidationRules = () => {
  return [
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
    body("age").optional().isNumeric().withMessage("Age must be a number"),
  ];
};

export const validateCNIC = () => {
  return [
    query("CNIC")
      .notEmpty()
      .withMessage(CNIC_REQUIRED)
      .isString()
      .matches(/^\d{5}-\d{7}-\d{1}$/)
      .withMessage(CNIC_INVALID),
  ];
};
