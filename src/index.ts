import express, { Response, Request } from "express";
const app = express();
require("dotenv").config();
import DbConnect from "./config/connectDatabase";
import UserRouter from "./routes/user";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";
import cors from "cors";
import ChatRouter from "./routes/chat";
import MessageRouter from "./routes/message";

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

app.listen(process.env.PORT || 5000, () => {
  console.log(`hi ${process.env.PORT}`);
});
