import express, { Response, Request } from "express";
const app = express();
require("dotenv").config();
import DbConnect from "./config/connectDatabase";
import UserRouter from "./routes/user";

DbConnect();
app.use(express.json());

app.use("/api/v1", UserRouter);

app.get("*", (req: Request, res: Response) => {
  res.send("404 route!");
});

app.listen(5000, () => {
  console.log("hi 5000");
});
