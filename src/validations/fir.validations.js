import {
  NAME_INVALID,
  NAME_REQUIRED,
  CNIC_INVALID,
  LETTER_SPACES,
} from "../constants";
import { body, param, query } from "express-validator";
import mongoose from "mongoose";

export const firCreationValidationRules = () => {
  return [
    body("caseNo")
      .notEmpty()
      .withMessage("Unique caseNo is required")
      .isString()
      .isLength({ min: 6, max: 6 })
      .withMessage("Case number be 6 characters long")
      .matches(/^[A-Z]{3}\d{3}$/)
      .withMessage("Invalid caseNo format"),
    body("complainantCNIC")
      .notEmpty()
      .withMessage("CNIC of complainant is required")
      .isString()
      .matches(/^\d{5}-\d{7}-\d{1}$/)
      .withMessage(CNIC_INVALID),
    body("complainantPhone")
      .notEmpty()
      .withMessage("Phone Number of complainant is required")
      .isString()
      .matches(/^03\d{9}$/)
      .withMessage("Invalid Phone number"),
    body("complainantName")
      .notEmpty()
      .withMessage(NAME_REQUIRED)
      .isString()
      .isLength({ min: 3 })
      .withMessage(NAME_INVALID)
      .matches(/^[A-Za-z\s]+$/)
      .withMessage(LETTER_SPACES),
    body("applicationType")
      .notEmpty()
      .withMessage("Application Type is required")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid application type"),
    body("location")
      .notEmpty()
      .withMessage("Location is required")
      .isString()
      .isLength({ min: 5 })
      .withMessage("Location must be 5 characters long"),
    body("datetime")
      .notEmpty()
      .withMessage("Date and Time is required")
      .isISO8601()
      // .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
      .withMessage("Invalid Date Time"),
    body("details")
      .notEmpty()
      .withMessage("Details field is required")
      .isString()
      .isLength({ min: 50 })
      .withMessage("Details must be at-least 50 characters"),
    body("suspects").isString(),
  ];
};

export const approveFIRValidation = () => {
  return [
    param("caseId")
      .notEmpty()
      .withMessage("Case caseId is required in query params")
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("Invalid caseId mentioned in query"),
    body("investigatorId")
      .notEmpty()
      .withMessage("Investigator Id is required")
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("Invalid Investigator Id"),
  ];
};

export const deleteFIRValidation = () => {
  return [
    param("caseId")
      .notEmpty()
      .withMessage("Case caseId is required in query params")
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("Invalid caseId mentioned in query"),
  ];
};

export const validateStatus = () => {
  return [
    query("status")
      .notEmpty()
      .withMessage("Status is required in query")
      .isIn(["completed", "closed"])
      .withMessage("Invalid Status in query"),
  ];
};
