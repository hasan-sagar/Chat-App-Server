"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllUsersList = exports.LoginUser = exports.UserRegistration = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRegistration = async (req, res) => {
    try {
        const bodyData = req.body;
        const { name, email, password, image } = bodyData;
        if (!name || !email || !password) {
            throw new Error("Fill the form correctly");
        }
        const findExistUser = await user_1.default.findOne({
            email: email,
        });
        if (findExistUser) {
            throw new Error("User Exist! Login Now");
        }
        const saveNewUser = await user_1.default.create({
            name,
            email,
            password,
            image,
        });
        if (saveNewUser) {
            const token = jsonwebtoken_1.default.sign({ _id: saveNewUser._id }, process.env.JWT_SECRET);
            res.status(201).json({
                user: saveNewUser,
                access_token: token,
            });
        }
    }
    catch (error) {
        res.status(400).send(error === null || error === void 0 ? void 0 : error.toString());
    }
};
exports.UserRegistration = UserRegistration;
const LoginUser = async (req, res) => {
    try {
        const bodyData = req.body;
        const { email, password } = bodyData;
        const findUser = await user_1.default.findOne({
            email: email,
        });
        if (findUser) {
            const isPasswordValid = await findUser.matchPassword(password);
            if (isPasswordValid) {
                const token = jsonwebtoken_1.default.sign({ _id: findUser._id }, process.env.JWT_SECRET);
                res.status(200).json({
                    user: findUser,
                    access_token: token,
                });
            }
            else {
                throw new Error("Wrong credentials");
            }
        }
    }
    catch (error) {
        res.status(400).send(error === null || error === void 0 ? void 0 : error.toString());
    }
};
exports.LoginUser = LoginUser;
const AllUsersList = async (req, res) => {
    try {
        const searchQuery = req.query.search
            ? {
                $or: [
                    {
                        name: { $regex: req.query.search, $options: "i" },
                    },
                    {
                        email: { $regex: req.query.search, $options: "i" },
                    },
                ],
            }
            : {};
        const searchUser = await user_1.default.find(searchQuery).find({
            _id: { $ne: req.user._id },
        });
        res.status(200).json(searchUser);
    }
    catch (error) {
        throw new Error("Server Problem");
    }
};
exports.AllUsersList = AllUsersList;
