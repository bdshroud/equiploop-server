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
import {
  verifyToken,
  verifyAdmin,
} from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

// Wishlist / Favorites routes
router.get("/wishlist", getWishlist);
router.get("/favorites", getWishlist);
router.post("/wishlist/:equipmentId", toggleWishlist);
router.post("/favorites/:equipmentId", toggleWishlist);

// Profile routes
router.get("/profile", getUserProfile);
router.patch("/profile", updateUserProfile);

// Admin user management routes
router.get("/", verifyAdmin, getAllUsers);
router.patch("/:id/role", verifyAdmin, updateUserRole);
router.patch("/:id/status", verifyAdmin, updateUserStatus);

export default router;
