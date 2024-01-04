import { receiverIdValidation } from "../validations";
import { getMessagesOfChat } from "../controllers";
import { Router } from "express";
import { validate } from "../middlewares";
const router = Router();

//Get all messages of a chat
router.get("/", receiverIdValidation(), validate, getMessagesOfChat);

export default router;
