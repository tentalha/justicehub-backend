import {
  deleteInvestigatorId,
  getInvestigatorId,
  postInvestigator,
  getAllInvestigators,
  patchInvestigatorId,
} from "../controllers";
import {
  mongoIdValidation,
  resourceCreationValidationRules,
  resourceUpdationValidationRules,
} from "../validations";
import { validate } from "../middlewares";
import { Router } from "express";

const router = Router();

//Get all operators
router.get("/", getAllInvestigators);
//Get operator with id
router.get("/:id", mongoIdValidation(), validate, getInvestigatorId);
//Create operator
router.post(
  "/",
  resourceCreationValidationRules(["investigator"]),
  validate,
  postInvestigator
);
//Edit operator
router.patch(
  "/:id",
  mongoIdValidation(),
  resourceUpdationValidationRules(),
  validate,
  patchInvestigatorId
);
//Delete operator
router.delete("/:id", mongoIdValidation(), validate, deleteInvestigatorId);

export default router;
