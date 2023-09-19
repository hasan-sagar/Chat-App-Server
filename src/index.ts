import express, { Response, Request } from "express";
const app = express();
require("dotenv").config();
import DbConnect from "./config/connectDatabase";
import UserRouter from "./routes/user";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";
import cors from "cors";
import ChatRouter from "./routes/chat";
import MessageRouter from "./routes/message";
import { Server } from "socket.io";

app.use(cors());

DbConnect();
app.use(express.json());

//user routes
app.use("/api/v1/users", UserRouter);
//chat routes
app.use("/api/v1/chat", ChatRouter);
//message routes
app.use("/api/v1/message", MessageRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Users");
});
app.use(notFound);
app.use(errorHandler);

const serverConnection = app.listen(process.env.PORT || 5000, () => {
  console.log(`hi ${process.env.PORT}`);
});

const io = new Server(serverConnection, {
  pingTimeout: 60000,
  cors: {
    origin: [
      "http://localhost:5000",
      "http://localhost:5173",
      "https://chat-server-yf54.onrender.com",
      "https://chat-app-o.vercel.app/",
    ],
  },
});

io.on("connection", (socket) => {
  console.log("connected with socket io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room " + room);
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user: any) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
