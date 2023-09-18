"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const authecticationMiddleware_1 = require("../middlewares/authecticationMiddleware");
const router = express_1.default.Router();
router.post("/register", user_1.UserRegistration);
router.post("/login", user_1.LoginUser);
router.get("/all-users", authecticationMiddleware_1.VerifyToken, user_1.AllUsersList);
exports.default = router;
