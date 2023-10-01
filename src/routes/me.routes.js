import { meController } from "../controllers";
import { Router } from "express";

const router = Router();

router.get("/", meController);

export default router;
