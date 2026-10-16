
import mongoose from "mongoose";

export async function connectDB() {
  const username = encodeURIComponent(process.env.W9_MONGO_USER);
  const password = encodeURIComponent(process.env.W9_MONGO_PASSWORD);

  const mongoURI = `mongodb://${username}:${password}@localhost:27017/library?authSource=admin`;

  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}
