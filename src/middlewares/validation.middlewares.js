import { R4XX } from "../API";
import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
  } else {
    //Fields containing errors.
    let fields = [...new Set(errors.array().map((err) => err.path))];
    let extractedErrors = errors.array().map((err) => err.msg);
    R4XX(res, 403, "VALIDATION-ERROR", "Error during request validation.", {
      faultyFields: fields,
      messages: extractedErrors[0],
    });
  }
};
