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
  deleteEvidenceFIRId,
  deleteFIR,
  getActiveFIRs,
  getAllFIRs,
  getClosedFIRs,
  getCompletedFIRs,
  getEvidenceFIRId,
  getFIRCounts,
  getPendingFIRs,
  postEvidenceFIRId,
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

//Evidence
router.post(
  "/:id/evidence",
  hasRights(["investigator"]),
  mongoIdValidation(),
  validate,
  upload.array("files"),
  postEvidenceFIRId
);

router.get(
  "/:id/evidence",
  hasRights(["investigator"]),
  mongoIdValidation(),
  validate,
  getEvidenceFIRId
);

router.delete(
  "/evidence/:id",
  hasRights(["investigator", "admin"]),
  mongoIdValidation(),
  validate,
  deleteEvidenceFIRId
);

export default router;
