"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//db connection
const mongoose_1 = __importDefault(require("mongoose"));
const DbConnect = () => {
    mongoose_1.default
        .connect(process.env.MONGODB_URI)
        .then(() => {
        console.log("DB Connected");
    })
        .catch((error) => {
        throw new Error(error.toString());
    });
};
exports.default = DbConnect;
