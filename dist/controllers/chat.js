"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRemoveFromGroup = exports.UserAddToGroup = exports.GroupChatNameUpdate = exports.GroupChatCreate = exports.FetchChat = exports.ChatAccess = void 0;
const chat_1 = require("../models/chat");
const user_1 = __importDefault(require("../models/user"));
const ChatAccess = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        console.log("User Not Found");
        return res.sendStatus(400);
    }
    let isChat;
    try {
        isChat = await chat_1.Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
            .populate("users", "-password")
            .populate("latestMessage");
        isChat = await user_1.default.populate(isChat, {
            path: "latestMessage.sender",
            select: "name pic email",
        });
        if (isChat.length > 0) {
            res.send(isChat[0]);
        }
        else {
            var chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId],
            };
            const createdChat = await chat_1.Chat.create(chatData);
            const FullChat = await chat_1.Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).json(FullChat);
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.ChatAccess = ChatAccess;
const FetchChat = async (req, res) => {
    try {
        chat_1.Chat.find({
            users: {
                $elemMatch: {
                    $eq: req.user._id,
                },
            },
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
            results = await user_1.default.populate(results, {
                path: "latestMessage.sender",
                select: "name image email",
            });
            res.status(200).send(results);
        });
    }
    catch (error) {
        throw new Error("Server Problem");
    }
};
exports.FetchChat = FetchChat;
const GroupChatCreate = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
    }
    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }
    users.push(req.user);
    try {
        const createGroupChat = await chat_1.Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });
        const groupChat = await chat_1.Chat.findOne({ _id: createGroupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        res.status(200).json(groupChat);
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};
exports.GroupChatCreate = GroupChatCreate;
const GroupChatNameUpdate = async (req, res) => {
    try {
        const { chatId, chatName } = req.body;
        const updateChatName = await chat_1.Chat.findByIdAndUpdate(chatId, {
            chatName: chatName,
        }, {
            new: true,
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        if (!updateChatName) {
            res.status(400);
            throw new Error("Chat group not found");
        }
        else {
            res.json(updateChatName);
        }
    }
    catch (error) {
        throw new Error("Server Problem");
    }
};
exports.GroupChatNameUpdate = GroupChatNameUpdate;
const UserAddToGroup = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        const addUser = await chat_1.Chat.findByIdAndUpdate(chatId, {
            $push: { users: userId },
        }, { new: true })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        if (!addUser) {
            res.status(400);
            throw new Error("Chat Not Available");
        }
        else {
            res.status(201).json(addUser);
        }
    }
    catch (error) {
        throw new Error("Server Problem");
    }
};
exports.UserAddToGroup = UserAddToGroup;
const UserRemoveFromGroup = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        const removeUser = await chat_1.Chat.findByIdAndUpdate(chatId, {
            $pull: { users: userId },
        }, { new: true })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        if (!removeUser) {
            res.status(400);
            throw new Error("Chat Not Exist!");
        }
        else {
            res.status(200).json(removeUser);
        }
    }
    catch (error) {
        throw new Error("Server problem");
    }
};
exports.UserRemoveFromGroup = UserRemoveFromGroup;
