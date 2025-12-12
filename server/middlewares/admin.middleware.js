export const adminMiddleware = async (req, res, next) => {
    try {
        // Check if user is admin
        const { role } = req.user;
        if (role !== "admin") {
            return res.status(401).json({ message: "Unauthorized - You are not an admin" });
        }
        next();
    } catch (error) {
        console.error("Admin Middleware Error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}