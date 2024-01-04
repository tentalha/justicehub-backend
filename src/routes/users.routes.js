import { getContactsOfUser } from "../controllers";
import { Router } from "express";
import { hasRights } from "../middlewares";
const router = Router();

router.get(
  "/contacts",
  hasRights(["citizen", "investigator"]),
  getContactsOfUser
);

export default router;
