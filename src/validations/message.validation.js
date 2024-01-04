import { query } from "express-validator";
import mongoose from "mongoose";

export const receiverIdValidation = () => {
  return [
    query("rec")
      .notEmpty()
      .withMessage("Receiver Id is required in query params")
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("Invalid receiver id mentioned in query"),
  ];
};
