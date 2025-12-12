import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { getAnalyticsData } from "../controllers/analytic.controller.js";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();

    res.json({
      analyticsData,
    });
  } catch (error) {
    console.error("Analytics error:", error);
  }
});

export default router;
