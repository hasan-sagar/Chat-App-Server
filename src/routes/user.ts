import express from "express";
import { AllUsersList, LoginUser, UserRegistration } from "../controllers/user";
import { VerifyToken } from "../middlewares/authecticationMiddleware";
const router = express.Router();

router.post("/register", UserRegistration);
router.post("/login", LoginUser);
router.get("/all-users", VerifyToken, AllUsersList);

export default router;
