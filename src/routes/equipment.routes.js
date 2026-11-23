import express from "express";
import {
  getAllEquipment,
  getFeaturedEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  updateEquipmentStatus,
} from "../controllers/equipment.controller.js";
import {
  verifyToken,
  verifyOwner,
  verifyAdmin,
  optionalAuth,
} from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", optionalAuth, getAllEquipment);
router.get("/featured", getFeaturedEquipment);
router.get("/:id", optionalAuth, getEquipmentById);

// Owner protected routes
router.post("/", verifyToken, verifyOwner, createEquipment);
router.put("/:id", verifyToken, verifyOwner, updateEquipment);
router.delete("/:id", verifyToken, verifyOwner, deleteEquipment);

// Admin moderation route
router.patch("/:id/status", verifyToken, verifyAdmin, updateEquipmentStatus);

export default router;
