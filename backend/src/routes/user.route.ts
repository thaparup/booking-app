import { Router } from "express";
import { fetchCurrentUser, registerUser } from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.route("/register").post(registerUser);

router.get("/me", verifyToken, fetchCurrentUser);

export { router };
