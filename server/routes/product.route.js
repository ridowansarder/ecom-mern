import { createProduct, deleteProduct, featuredProducts, getAllProducts, getProductsByCategory, toggleFeaturedProduct } from "../controllers/product.controller.js";
import { Router } from "express";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getAllProducts);
router.get("/featured", featuredProducts);
router.post("/", authMiddleware, adminMiddleware, createProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);
router.get("/category/:category", getProductsByCategory);
router.patch("/:id", authMiddleware, adminMiddleware, toggleFeaturedProduct);

export default router;