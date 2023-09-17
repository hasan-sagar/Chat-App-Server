import express from "express";
import { VerifyToken } from "../middlewares/authecticationMiddleware";
import { AllMessages, SendMessage } from "../controllers/message";
const router = express.Router();

router.post("/", VerifyToken, SendMessage);
router.get("/:chatId", VerifyToken, AllMessages);

export default router;
