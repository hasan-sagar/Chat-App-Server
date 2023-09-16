import express from "express";
import { VerifyToken } from "../middlewares/authecticationMiddleware";
import { ChatAccess } from "../controllers/chat";
const router = express.Router();

router.post("/", VerifyToken, ChatAccess);

export default router;
