import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// 1) Load env FIRST
dotenv.config();

const app = express();

// 2) Middlewares
app.use(express.json());

// CORS (use ENV if provided)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Optional: if you deploy behind proxy (render/vercel/nginx)
app.set("trust proxy", 1);

// 3) Routes
app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// 4) Global error handler (helps debugging)
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// 5) Start server ONLY after DB connected
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`✅ Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
