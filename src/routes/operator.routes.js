import {
  mongoIdValidation,
  resourceCreationValidationRules,
} from "../validations";
import {
  getAllOperator,
  postOperator,
  getOperatorId,
  deleteOperatorId,
} from "../controllers";
import { Router } from "express";
import { validate } from "../middlewares";

const router = Router();

//Get all operators
router.get("/", getAllOperator);
//Get operator with id
router.get("/:id", mongoIdValidation(), validate, getOperatorId);
//Create operator
router.post(
  "/",
  resourceCreationValidationRules(["operator"]),
  validate,
  postOperator
);
//Edit operator
router.put("/:id", mongoIdValidation(), (req, res) =>
  res.json("API not yet ready")
);
//Delete operator
router.delete("/:id", mongoIdValidation(), validate, deleteOperatorId);

export default router;
