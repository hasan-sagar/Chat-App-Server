import express, { Response, Request } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("click korso");
});
app.get("/api", (req: Request, res: Response) => {
  res.send("api click korso");
});

app.listen(5000, () => {
  console.log("hi 5000");
});
