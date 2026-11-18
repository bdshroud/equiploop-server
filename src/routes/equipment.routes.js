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
import { verifyAuth, optionalAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = express.Router();

// Public routes
router.get("/", optionalAuth, getAllEquipment);
router.get("/featured", getFeaturedEquipment);
router.get("/:id", optionalAuth, getEquipmentById);

// Owner protected routes
router.post("/", verifyAuth, requireRole("Owner", "Admin"), createEquipment);
router.put("/:id", verifyAuth, updateEquipment);
router.delete("/:id", verifyAuth, deleteEquipment);

// Admin moderation route
router.patch("/:id/status", verifyAuth, requireRole("Admin"), updateEquipmentStatus);

export default router;
