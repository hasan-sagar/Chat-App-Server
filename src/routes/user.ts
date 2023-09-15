import express from "express";
import { UserRegistration } from "../controllers/user";
const router = express.Router();

router.post("/users", UserRegistration);

export default router;
