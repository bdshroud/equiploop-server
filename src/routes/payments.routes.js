import express from "express";
import {
  createCheckoutSession,
  verifyPaymentSession,
} from "../controllers/payments.controller.js";
import { verifyAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-checkout-session", verifyAuth, createCheckoutSession);
router.get("/verify-session/:sessionId", verifyAuth, verifyPaymentSession);

export default router;
