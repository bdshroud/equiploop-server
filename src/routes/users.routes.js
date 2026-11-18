import express from "express";
import {
  getAllUsers,
  updateUserRole,
  updateUserStatus,
  getUserProfile,
  updateUserProfile,
  getWishlist,
  toggleWishlist,
} from "../controllers/users.controller.js";
import { verifyAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = express.Router();

router.use(verifyAuth);

// Wishlist routes
router.get("/wishlist", getWishlist);
router.post("/wishlist/:equipmentId", toggleWishlist);

// Profile routes
router.get("/profile", getUserProfile);
router.patch("/profile", updateUserProfile);

// Admin user management routes
router.get("/", requireRole("Admin"), getAllUsers);
router.patch("/:id/role", requireRole("Admin"), updateUserRole);
router.patch("/:id/status", requireRole("Admin"), updateUserStatus);

export default router;
