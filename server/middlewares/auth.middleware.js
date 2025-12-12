import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Get access token from cookies
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify access token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await UserModel.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    // Error response
    console.error("Authentication Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
