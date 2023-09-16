import { Request, Response, json } from "express";
import { Chat } from "../models/chat";
import User from "../models/user";

export const ChatAccess = async (req: Request | any, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("User Not Found");
    return res.sendStatus(400);
  }
  let isChat;
  try {
    isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const FetchChat = async (req: Request | any, res: Response) => {
  try {
    Chat.find({
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
      .then(async (results: any) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name image email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    throw new Error("Server Problem");
  }
};

export const GroupChatCreate = async (req: Request | any, res: Response) => {
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
    const createGroupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const groupChat = await Chat.findOne({ _id: createGroupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(groupChat);
  } catch (error: any) {
    res.status(400);
    throw new Error(error.message);
  }
};

export const GroupChatNameUpdate = async (req: Request, res: Response) => {
  try {
    const { chatId, chatName } = req.body;

    const updateChatName = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updateChatName) {
      res.status(400);
      throw new Error("Chat group not found");
    } else {
      res.json(updateChatName);
    }
  } catch (error) {
    throw new Error("Server Problem");
  }
};

export const UserAddToGroup = async (req: Request, res: Response) => {
  try {
    const { chatId, userId } = req.body;

    const addUser = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (!addUser) {
      res.status(400);
      throw new Error("Chat Not Available");
    } else {
      res.status(201).json(addUser);
    }
  } catch (error) {
    throw new Error("Server Problem");
  }
};

export const UserRemoveFromGroup = async (req: Request, res: Response) => {
  try {
    const { chatId, userId } = req.body;

    const removeUser = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removeUser) {
      res.status(400);
      throw new Error("Chat Not Exist!");
    } else {
      res.status(200).json(removeUser);
    }
  } catch (error) {
    throw new Error("Server problem");
  }
};
