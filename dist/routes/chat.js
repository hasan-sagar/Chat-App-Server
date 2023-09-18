"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authecticationMiddleware_1 = require("../middlewares/authecticationMiddleware");
const chat_1 = require("../controllers/chat");
const router = express_1.default.Router();
router.post("/", authecticationMiddleware_1.VerifyToken, chat_1.ChatAccess);
router.get("/", authecticationMiddleware_1.VerifyToken, chat_1.FetchChat);
router.post("/group-chat", authecticationMiddleware_1.VerifyToken, chat_1.GroupChatCreate);
router.put("/rename/group-chat", authecticationMiddleware_1.VerifyToken, chat_1.GroupChatNameUpdate);
router.put("/addUser/group-chat", authecticationMiddleware_1.VerifyToken, chat_1.UserAddToGroup);
router.put("/removeUser/group-chat", authecticationMiddleware_1.VerifyToken, chat_1.UserRemoveFromGroup);
exports.default = router;
