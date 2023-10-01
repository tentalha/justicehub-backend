import {
  deleteInvestigatorId,
  getInvestigatorId,
  postInvestigator,
  getAllInvestigators,
} from "../controllers";
import {
  mongoIdValidation,
  resourceCreationValidationRules,
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
router.put("/:id", mongoIdValidation(), (req, res) =>
  res.json("API not yet ready")
);
//Delete operator
router.delete("/:id", mongoIdValidation(), validate, deleteInvestigatorId);

export default router;
