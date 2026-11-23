import express from "express";
import {
  createBooking,
  getMyBookings,
  getOwnerBookings,
  getAdminBookings,
  getBookingById,
  updateBookingStatus,
} from "../controllers/bookings.controller.js";
import {
  verifyToken,
  verifyRenter,
  verifyOwner,
  verifyAdmin,
} from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken); // All booking routes require authenticated token

router.post("/", verifyRenter, createBooking);
router.get("/my-bookings", verifyRenter, getMyBookings);
router.get("/owner-bookings", verifyOwner, getOwnerBookings);
router.get("/admin/all", verifyAdmin, getAdminBookings);
router.get("/:id", getBookingById);
router.patch("/:id/status", updateBookingStatus);

export default router;
