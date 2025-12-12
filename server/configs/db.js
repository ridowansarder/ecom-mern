import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    // Error response
    res.status(500).json({ message: error.message });
  }
};

export default connectDB;
