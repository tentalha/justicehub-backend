import {
  mongoIdValidation,
  resourceCreationValidationRules,
  resourceUpdationValidationRules,
} from "../validations";
import {
  getAllOperator,
  postOperator,
  getOperatorId,
  deleteOperatorId,
  patchOperatorId,
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
router.patch(
  "/:id",
  mongoIdValidation(),
  resourceUpdationValidationRules(),
  validate,
  patchOperatorId
);
//Delete operator
router.delete("/:id", mongoIdValidation(), validate, deleteOperatorId);

export default router;
