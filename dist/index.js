"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
require("dotenv").config();
const connectDatabase_1 = __importDefault(require("./config/connectDatabase"));
const user_1 = __importDefault(require("./routes/user"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const cors_1 = __importDefault(require("cors"));
const chat_1 = __importDefault(require("./routes/chat"));
const message_1 = __importDefault(require("./routes/message"));
app.use((0, cors_1.default)());
(0, connectDatabase_1.default)();
app.use(express_1.default.json());
//user routes
app.use("/api/v1/users", user_1.default);
//chat routes
app.use("/api/v1/chat", chat_1.default);
//message routes
app.use("/api/v1/message", message_1.default);
app.get("/api/v1", (req, res) => [res.send("Hello Users")]);
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
app.listen(5000, () => {
    console.log("hi 5000");
});
