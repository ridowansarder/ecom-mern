import cookieParser from "cookie-parser";
import express from "express";
import "dotenv/config";
import connectDB from "./configs/db.js";
import cors from "cors";
import Path from "path";

// Init express
const app = express();
// Init port
const port = process.env.PORT || 5000;

const __dirname = Path.resolve();

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  cors({
    origin:
      process.env.CLIENT_URL || "https://ecommerce-mern-482l.onrender.com",
    credentials: true,
  })
);

// Routes
import authRouter from "./routes/auth.route.js";
import cartRouter from "./routes/cart.route.js";
import productRouter from "./routes/product.route.js";
import paymentRouter from "./routes/payment.route.js";
import analyticRouter from "./routes/analytic.route.js";

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/auth", authRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/analytics", analyticRouter);

if (process.env.NODE_ENV === "production") {
  const clientDist = Path.join(__dirname, "client", "dist");

  // Serve static assets
  app.use(express.static(clientDist));

  // SPA fallback
  app.use((req, res) => {
    res.sendFile(Path.join(clientDist, "index.html"));
  });
}

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));

connectDB();
