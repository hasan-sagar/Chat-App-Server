import { Request, Response } from "express";
import Message from "../models/message";
import User from "../models/user";
import Chat from "../models/chat";

export const SendMessage = async (req: Request | any, res: Response) => {
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
    let message: any = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error: any) {
    res.status(400);
    throw new Error(error.message);
  }
};

export const AllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name image email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error("Server Problem");
  }
};
