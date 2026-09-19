require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const contactRoutes = require("./routes/contact");

const app = express();
app.set("trust proxy", 1);
// ---------- Middleware ----------
app.use(helmet());

// ---------- CORS ----------
const allowedOrigins = [
  "https://innovexa-stdios.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000",
  ...(process.env.CLIENT_URL || "")
    .split(",")
    .map((o) => o.trim()),
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests such as curl/Postman
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked request from origin: ${origin}`));
      }
    },
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Basic rate limiting on the contact endpoint
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many submissions from this IP. Please try again later.",
  },
});

// ---------- Routes ----------
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "INNOVEXA STUDIOS API" });
});

app.use("/api/contact", contactLimiter, contactRoutes);

// ---------- 404 handler ----------
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ---------- Global error handler ----------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ---------- MongoDB Connection ----------
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 INNOVEXA STUDIOS API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
