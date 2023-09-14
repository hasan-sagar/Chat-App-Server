import express, { Response, Request } from "express";
import mongoose from "mongoose";
const app = express();
const chatData = require("./demo-data/data");
require("dotenv").config();

//db connection
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error: any) => {
    throw new Error(error.toString());
  });

app.get("/", (req: Request, res: Response) => {
  res.send("click korso");
});

app.get("/api/chat", (req: Request, res: Response) => {
  res.send(chatData);
});

app.get("/api/chat/:id", (req: Request, res: Response) => {
  const singleChat = chatData.find((chat: any) => chat._id === req.params.id);
  res.send(singleChat);
});

app.listen(5000, () => {
  console.log("hi 5000");
});
