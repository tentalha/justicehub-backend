import { Router } from "express";
import { validate, hasRights } from "../middlewares";
import {
  checkCriminalStatus,
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
  validateCNIC,
} from "../validations";
const router = Router();

router.post(
  "/",
  hasRights(["admin"]),
  upload.single("image"),
  criminalCreationValidationRules(),
  validate,
  createCriminal
);

router.get("/", hasRights(["admin"]), getAllCriminals);
router.delete(
  "/:id",
  hasRights(["admin"]),
  mongoIdValidation(),
  validate,
  deleteCriminalId
);

router.patch(
  "/:id",
  hasRights(["admin"]),
  mongoIdValidation(),
  upload.single("image"),
  criminalUpdationValidationRules(),
  validate,
  updateCriminalId
);

router.get(
  "/check-status",
  hasRights(["operator"]),
  validateCNIC(),
  validate,
  checkCriminalStatus
);

export default router;
