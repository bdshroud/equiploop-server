import express from "express";
import { createReview, getReviewsByEquipment } from "../controllers/reviews.controller.js";
import { verifyToken, verifyRenter } from "../middleware/auth.js";

const router = express.Router();

router.get("/equipment/:equipmentId", getReviewsByEquipment);
router.post("/", verifyToken, verifyRenter, createReview);

export default router;
