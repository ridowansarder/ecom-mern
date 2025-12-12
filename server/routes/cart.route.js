import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addToCart, clearCart, getCartItems, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", authMiddleware, getCartItems);
router.post("/", authMiddleware, addToCart);
router.delete("/", authMiddleware, removeAllFromCart);
router.put("/:productId", authMiddleware, updateQuantity);
router.delete("/clear", authMiddleware, clearCart);

export default router;