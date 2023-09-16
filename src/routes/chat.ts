import express from "express";
import { VerifyToken } from "../middlewares/authecticationMiddleware";
import {
  ChatAccess,
  FetchChat,
  GroupChatCreate,
  GroupChatNameUpdate,
  UserAddToGroup,
  UserRemoveFromGroup,
} from "../controllers/chat";
const router = express.Router();

router.post("/", VerifyToken, ChatAccess);
router.get("/", VerifyToken, FetchChat);
router.post("/group-chat", VerifyToken, GroupChatCreate);
router.put("/rename/group-chat", VerifyToken, GroupChatNameUpdate);
router.put("/addUser/group-chat", VerifyToken, UserAddToGroup);
router.put("/removeUser/group-chat", VerifyToken, UserRemoveFromGroup);

export default router;
