import { Router } from "express";
import { validate } from "../middlewares";
import {
  createCriminal,
  deleteCriminalId,
  getAllCriminals,
} from "../controllers";
import { upload } from "../configs";
import {
  criminalCreationValidationRules,
  mongoIdValidation,
} from "../validations";
const router = Router();

router.post(
  "/",
  upload.single("image"),
  criminalCreationValidationRules(),
  validate,
  createCriminal
);

router.get("/", getAllCriminals);
router.delete("/:id", mongoIdValidation(), validate, deleteCriminalId);

export default router;
