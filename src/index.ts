import express, { Response, Request } from "express";
const app = express();
require("dotenv").config();
import DbConnect from "./config/connectDatabase";
import UserRouter from "./routes/user";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";
import cors from "cors";
import ChatRouter from "./routes/chat";

app.use(cors());

DbConnect();
app.use(express.json());

//user routes
app.use("/api/v1/users", UserRouter);
//chat routes
app.use("/api/v1/chat", ChatRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("hi 5000");
});
