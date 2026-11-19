import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { initBookingCron, runBookingCompletionJob } from "./cron/bookingCompletion.js";
import { seedDatabase } from "./seed/seedData.js";
import { errorHandler } from "./middleware/error.js";
import { handleStripeWebhook } from "./controllers/payments.controller.js";

// Routes
import categoriesRouter from "./routes/categories.routes.js";
import equipmentRouter from "./routes/equipment.routes.js";
import bookingsRouter from "./routes/bookings.routes.js";
import reviewsRouter from "./routes/reviews.routes.js";
import paymentsRouter from "./routes/payments.routes.js";
import usersRouter from "./routes/users.routes.js";
import analyticsRouter from "./routes/analytics.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const clientUrl = (process.env.CLIENT_URL || "http://localhost:3000").replace(/\/+$/, "");

// Production hardened CORS configuration
// Allows dynamic origin reflection for local, preview, and production domains
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server, curl, mobile, and postman requests without Origin header
      if (!origin) return callback(null, true);
      // Echo back the requesting origin to satisfy Access-Control-Allow-Credentials: true
      return callback(null, origin);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    exposedHeaders: ["Set-Cookie"],
  })
);

// Explicit OPTIONS preflight handler
app.options("*", cors());

// Stripe Webhook needs RAW body before express.json() is parsed
app.post("/api/payments/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

// Body parsers for remaining endpoints
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serverless DB Connection & Auto-Seed Middleware
let serverlessInitPromise = null;
async function ensureServerlessInit() {
  if (!serverlessInitPromise) {
    serverlessInitPromise = (async () => {
      await connectDB();
      // Background non-blocking auto-seed for clean deployments
      seedDatabase().catch((err) =>
        console.warn("[Auto-Seed Serverless Notice]:", err.message)
      );
    })();
  }
  return serverlessInitPromise;
}

app.use(async (req, res, next) => {
  try {
    await ensureServerlessInit();
    next();
  } catch (error) {
    console.error("[MongoDB Serverless] Connection failed:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// Root Route - Server info & discovery
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    app: "EquipLoop API Server",
    tagline: "Rent smarter. Work better.",
    version: "1.0.0",
    docs: "/api/health",
    environment: process.env.NODE_ENV || (process.env.VERCEL ? "production" : "development"),
    endpoints: [
      "/api/categories",
      "/api/equipment",
      "/api/bookings",
      "/api/reviews",
      "/api/payments",
      "/api/users",
      "/api/analytics",
      "/api/health",
    ],
  });
});

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    app: "EquipLoop Commercial Equipment Rental API",
    tagline: "Rent smarter. Work better.",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || (process.env.VERCEL ? "production" : "development"),
  });
});

// Optional Cron Trigger for Vercel Cron or webhook
app.get("/api/cron/booking-completion", async (req, res) => {
  try {
    const result = await runBookingCompletionJob();
    res.status(200).json({
      success: true,
      message: "Booking completion cron executed successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Mount Resource Routes
app.use("/api/categories", categoriesRouter);
app.use("/api/equipment", equipmentRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/users", usersRouter);
app.use("/api/analytics", analyticsRouter);

// 404 Handler for Unmatched API Routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use(errorHandler);

// Start persistent server in local/non-serverless environments
async function startServer() {
  try {
    await connectDB();
    await seedDatabase();
    initBookingCron();

    app.listen(PORT, () => {
      console.log(`[EquipLoop Server] Running at http://localhost:${PORT}`);
      console.log(`[EquipLoop Server] Accepting requests from: ${clientUrl}`);
    });
  } catch (error) {
    console.error("[EquipLoop Server] Startup failed:", error);
    process.exit(1);
  }
}

if (!process.env.VERCEL) {
  startServer();
}

// Export default app for Vercel Serverless Function (@vercel/node)
export default app;
