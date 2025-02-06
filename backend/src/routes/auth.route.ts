import { Request, Response, Router } from "express";
import {
  demo,
  login,
  logout,
  validateToken,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.route("/login").post(login);
router.route("/logout").post(verifyToken, logout);
router.get("/validate-token", verifyToken, validateToken);
export { router };
