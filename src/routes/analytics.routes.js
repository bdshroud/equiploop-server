import express from "express";
import {
  getOwnerAnalytics,
  getAdminAnalytics,
} from "../controllers/analytics.controller.js";
import {
  verifyToken,
  verifyOwner,
  verifyAdmin,
} from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

router.get("/owner", verifyOwner, getOwnerAnalytics);
router.get("/admin", verifyAdmin, getAdminAnalytics);

export default router;
