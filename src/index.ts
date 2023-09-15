import express, { Response, Request } from "express";
const app = express();
require("dotenv").config();
import DbConnect from "./config/connectDatabase";
import UserRouter from "./routes/user";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";
DbConnect();
app.use(express.json());

app.use("/api/v1", UserRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("hi 5000");
});
