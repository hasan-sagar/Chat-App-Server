"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const VerifyToken = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            //decode
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = await user_1.default.findById(decoded._id).select("-password");
            next();
        }
        catch (error) {
            res.status(401);
        }
    }
    if (!token) {
        res.status(401);
    }
};
exports.VerifyToken = VerifyToken;
