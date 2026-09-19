require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const contactRoutes = require("./routes/contact");

const app = express();

// ---------- Middleware ----------
app.use(helmet());
// ---------- CORS ----------
// CLIENT_URL accepts one origin or a comma-separated list, e.g.
//   CLIENT_URL=http://localhost:5173,http://localhost:3000
// Defaults cover both Vite's default port (5173) and the common CRA-style port (3000)
// so the form works out of the box regardless of which dev server the frontend uses.
const allowedOrigins = (
  process.env.CLIENT_URL || "http://localhost:5173,http://localhost:3000"
)
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests (curl, Postman, server-to-server) which send no origin
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

// Basic rate limiting on the contact endpoint to prevent spam/abuse
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 submissions per window
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
