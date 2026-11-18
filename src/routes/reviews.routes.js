import express from "express";
import { createReview, getReviewsByEquipment } from "../controllers/reviews.controller.js";
import { verifyAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/equipment/:equipmentId", getReviewsByEquipment);
router.post("/", verifyAuth, createReview);

export default router;
