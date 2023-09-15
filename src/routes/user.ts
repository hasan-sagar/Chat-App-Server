import express from "express";
import { LoginUser, UserRegistration } from "../controllers/user";
const router = express.Router();

router.post("/register", UserRegistration);
router.post("/login", LoginUser);

export default router;
