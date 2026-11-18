import express from "express";
import {
  getOwnerAnalytics,
  getAdminAnalytics,
} from "../controllers/analytics.controller.js";
import { verifyAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = express.Router();

router.use(verifyAuth);

router.get("/owner", requireRole("Owner", "Admin"), getOwnerAnalytics);
router.get("/admin", requireRole("Admin"), getAdminAnalytics);

export default router;
