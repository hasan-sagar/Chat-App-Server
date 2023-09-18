"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authecticationMiddleware_1 = require("../middlewares/authecticationMiddleware");
const message_1 = require("../controllers/message");
const router = express_1.default.Router();
router.post("/", authecticationMiddleware_1.VerifyToken, message_1.SendMessage);
router.get("/:chatId", authecticationMiddleware_1.VerifyToken, message_1.AllMessages);
exports.default = router;
