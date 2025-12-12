import { signup, login, logout, getProfile, refreshAccessToken } from "../controllers/auth.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/profile", authMiddleware, getProfile);
router.post("/refresh-token", refreshAccessToken);

export default router;
