import { Router } from "express";
import { validate } from "../middlewares";
import {
  createCriminal,
  deleteCriminalId,
  getAllCriminals,
  updateCriminalId,
} from "../controllers";
import { upload } from "../configs";
import {
  criminalCreationValidationRules,
  criminalUpdationValidationRules,
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
router.patch(
  "/:id",
  mongoIdValidation(),
  upload.single("image"),
  criminalUpdationValidationRules(),
  validate,
  updateCriminalId
);

export default router;
