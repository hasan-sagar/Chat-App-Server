import express from "express";
import { LoginUser, UserRegistration } from "../controllers/user";
const router = express.Router();

router.post("/users", UserRegistration);
router.get("/users", LoginUser);

export default router;
