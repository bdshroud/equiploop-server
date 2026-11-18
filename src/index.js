import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { initBookingCron } from "./cron/bookingCompletion.js";
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
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

// CORS configuration
app.use(
  cors({
    origin: [clientUrl, "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Stripe Webhook needs RAW body before express.json() is parsed
app.post("/api/payments/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

// Body parsers for remaining endpoints
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    app: "EquipLoop Commercial Equipment Rental API",
    tagline: "Rent smarter. Work better.",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Mount Resource Routes
app.use("/api/categories", categoriesRouter);
app.use("/api/equipment", equipmentRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/users", usersRouter);
app.use("/api/analytics", analyticsRouter);

// Global Error Handler
app.use(errorHandler);

// Start Server
async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Auto-seed sample equipment if database is clean
    await seedDatabase();

    // Start background automated booking completion job
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

startServer();
