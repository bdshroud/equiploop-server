import express from "express";
import {
  createBooking,
  getMyBookings,
  getOwnerBookings,
  getAdminBookings,
  getBookingById,
  updateBookingStatus,
} from "../controllers/bookings.controller.js";
import { verifyAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = express.Router();

router.use(verifyAuth); // All booking routes require authentication

router.post("/", createBooking);
router.get("/my-bookings", getMyBookings);
router.get("/owner-bookings", requireRole("Owner", "Admin"), getOwnerBookings);
router.get("/admin/all", requireRole("Admin"), getAdminBookings);
router.get("/:id", getBookingById);
router.patch("/:id/status", updateBookingStatus);

export default router;
