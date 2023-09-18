"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllMessages = exports.SendMessage = void 0;
const message_1 = __importDefault(require("../models/message"));
const user_1 = __importDefault(require("../models/user"));
const chat_1 = __importDefault(require("../models/chat"));
const SendMessage = async (req, res) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        res.status(400);
        throw new Error("Invalid Data");
    }
    const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };
    try {
        let message = await message_1.default.create(newMessage);
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await user_1.default.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });
        await chat_1.default.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
        res.json(message);
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};
exports.SendMessage = SendMessage;
const AllMessages = async (req, res) => {
    try {
        const messages = await message_1.default.find({ chat: req.params.chatId })
            .populate("sender", "name image email")
            .populate("chat");
        res.json(messages);
    }
    catch (error) {
        res.status(400);
        throw new Error("Server Problem");
    }
};
exports.AllMessages = AllMessages;
