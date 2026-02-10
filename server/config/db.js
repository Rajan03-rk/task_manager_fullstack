import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri || typeof uri !== "string") {
    console.error("❌ MONGO_URI missing/invalid in server/.env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    console.error("👉 Fix: Check Atlas username/password + Network Access + DB name in URI");
    process.exit(1);
  }
};

export default connectDB;
