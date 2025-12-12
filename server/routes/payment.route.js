import { Router } from "express";
import { createCheckoutSession, checkoutSuccess } from "../controllers/payment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create-checkout-session", authMiddleware, createCheckoutSession);
router.post("/checkout-success", authMiddleware, checkoutSuccess);


export default router;