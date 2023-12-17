import { Router } from "express";
import { validate, hasRights } from "../middlewares";

import { upload } from "../configs";

import {
  approveFIRValidation,
  deleteFIRValidation,
  firCreationValidationRules,
  mongoIdValidation,
  validateStatus,
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
  updateFIRStatus,
} from "../controllers";

const router = Router();

//GET
router.get(
  "/",
  hasRights(["admin", "operator", "investigator", "citizen"]),
  getAllFIRs
);
router.get("/pending", hasRights(["admin"]), getPendingFIRs);
router.get("/active", hasRights(["admin"]), getActiveFIRs);
router.get("/closed", hasRights(["admin"]), getClosedFIRs);
router.get("/completed", hasRights(["admin"]), getCompletedFIRs);
router.get("/details", hasRights(["admin"]), getFIRCounts);
router.get(
  "/update-status/:id",
  hasRights(["admin", "investigator"]),
  mongoIdValidation(),
  validateStatus(),
  validate,
  updateFIRStatus
);
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

// router.post("/:caseId/evidence", hasRights["investigator"]);

export default router;
