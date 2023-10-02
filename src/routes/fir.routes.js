import { Router } from "express";
import { validate, hasRights } from "../middlewares";

import { upload } from "../configs";

import {
  approveFIRValidation,
  deleteFIRValidation,
  firCreationValidationRules,
} from "../validations";

import {
  approveFIRandAssignInvestigator,
  createFir,
  deleteFIR,
  getActiveFIRs,
  getAllFIRs,
  getClosedFIRs,
  getCompletedFIRs,
  getFIRCounts,
  getPendingFIRs,
} from "../controllers";

const router = Router();

//GET
router.get("/", hasRights(["admin", "operator"]), getAllFIRs);
router.get("/pending", hasRights(["admin"]), getPendingFIRs);
router.get("/active", hasRights(["admin"]), getActiveFIRs);
router.get("/closed", hasRights(["admin"]), getClosedFIRs);
router.get("/completed", hasRights(["admin"]), getCompletedFIRs);
router.get("/details", hasRights(["admin"]), getFIRCounts);

//POST
router.post(
  "/",
  hasRights(["admin", "operator"]),
  upload.single("relevantDocs"),
  firCreationValidationRules(),
  validate,
  createFir
);
router.post(
  "/approve/:caseId",
  hasRights(["admin"]),
  approveFIRValidation(),
  validate,
  approveFIRandAssignInvestigator
);

//DELETE
router.delete(
  "/:caseId",
  hasRights(["admin"]),
  deleteFIRValidation(),
  validate,
  deleteFIR
);

export default router;
