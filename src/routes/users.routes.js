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
  verifyRenter,
  verifyAdmin,
} from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

// Wishlist / Favorites routes
router.get("/wishlist", verifyRenter, getWishlist);
router.get("/favorites", verifyRenter, getWishlist);
router.post("/wishlist/:equipmentId", verifyRenter, toggleWishlist);
router.post("/favorites/:equipmentId", verifyRenter, toggleWishlist);

// Profile routes
router.get("/profile", getUserProfile);
router.patch("/profile", updateUserProfile);

// Admin user management routes
router.get("/", verifyAdmin, getAllUsers);
router.patch("/:id/role", verifyAdmin, updateUserRole);
router.patch("/:id/status", verifyAdmin, updateUserStatus);

export default router;
