import express from "express";
import {
  createCheckoutSession,
  verifyPaymentSession,
} from "../controllers/payments.controller.js";
import { verifyToken, verifyRenter } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-checkout-session", verifyToken, verifyRenter, createCheckoutSession);
router.get("/verify-session/:sessionId", verifyToken, verifyPaymentSession);

export default router;
