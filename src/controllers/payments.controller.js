import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { getCollection } from "../config/db.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2024-06-20",
});

// POST /api/payments/create-checkout-session
export async function createCheckoutSession(req, res, next) {
  try {
    const { bookingId } = req.body;
    if (!bookingId) {
      return res.status(400).json({ success: false, message: "bookingId is required" });
    }

    let bookingObjId;
    try {
      bookingObjId = new ObjectId(bookingId);
    } catch {
      return res.status(400).json({ success: false, message: "Invalid booking ID format" });
    }

    const bookingsCollection = getCollection("bookings");
    const booking = await bookingsCollection.findOne({ _id: bookingObjId });

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (booking.customerId !== req.user.id && req.user.role !== "Admin") {
      return res.status(403).json({ success: false, message: "Unauthorized access to this booking" });
    }

    if (booking.paymentStatus === "Paid") {
      return res.status(400).json({ success: false, message: "Booking has already been paid" });
    }

    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

    // If Stripe secret key is test placeholder, allow mock checkout URL for seamless testing
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === "sk_test_placeholder") {
      const mockSessionId = `mock_sess_${Date.now()}`;
      await bookingsCollection.updateOne(
        { _id: bookingObjId },
        {
          $set: {
            stripeSessionId: mockSessionId,
            updatedAt: new Date().toISOString(),
          },
        }
      );

      return res.status(200).json({
        success: true,
        sessionId: mockSessionId,
        url: `${clientUrl}/payment-success?session_id=${mockSessionId}&bookingId=${bookingId}`,
        isMock: true,
      });
    }

    // Real Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Rental: ${booking.equipmentTitle}`,
              description: `${booking.totalDays} day(s) rental (${booking.startDate} to ${booking.endDate}) + Security Deposit & Service Fee`,
              images: booking.equipmentImage ? [booking.equipmentImage] : [],
            },
            unit_amount: Math.round(Number(booking.totalAmount) * 100), // in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      client_reference_id: bookingId,
      customer_email: req.user.email,
      metadata: {
        bookingId: bookingId,
        customerId: req.user.id,
        equipmentId: booking.equipmentId,
      },
      success_url: `${clientUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}&bookingId=${bookingId}`,
      cancel_url: `${clientUrl}/dashboard/rentals?payment=cancelled&bookingId=${bookingId}`,
    });

    await bookingsCollection.updateOne(
      { _id: bookingObjId },
      {
        $set: {
          stripeSessionId: session.id,
          updatedAt: new Date().toISOString(),
        },
      }
    );

    res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url,
      isMock: false,
    });
  } catch (err) {
    console.error("[Stripe Session Error]", err);
    next(err);
  }
}

// GET /api/payments/verify-session/:sessionId
export async function verifyPaymentSession(req, res, next) {
  try {
    const { sessionId } = req.params;
    const { bookingId } = req.query;

    const bookingsCollection = getCollection("bookings");
    const paymentsCollection = getCollection("payments");

    // Handle mock payment for local development
    if (sessionId.startsWith("mock_sess_") && bookingId) {
      let query;
      try {
        query = { _id: new ObjectId(bookingId) };
      } catch {
        return res.status(400).json({ success: false, message: "Invalid booking ID" });
      }

      const booking = await bookingsCollection.findOne(query);
      if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
      }

      const paidAt = new Date().toISOString();
      await bookingsCollection.updateOne(query, {
        $set: {
          paymentStatus: "Paid",
          status: "Confirmed",
          paidAt,
          updatedAt: paidAt,
        },
      });

      // Record in payments collection
      await paymentsCollection.updateOne(
        { stripeSessionId: sessionId },
        {
          $set: {
            bookingId: booking._id.toString(),
            customerId: booking.customerId,
            customerName: booking.customerName,
            customerEmail: booking.customerEmail,
            ownerId: booking.ownerId,
            equipmentId: booking.equipmentId,
            equipmentTitle: booking.equipmentTitle,
            amount: booking.totalAmount,
            rentalFee: booking.rentalFee,
            serviceFee: booking.serviceFee,
            securityDeposit: booking.securityDeposit,
            stripeSessionId: sessionId,
            stripePaymentIntentId: `pi_mock_${sessionId}`,
            paymentMethod: "card",
            status: "succeeded",
            paidAt,
            createdAt: paidAt,
          },
        },
        { upsert: true }
      );

      return res.status(200).json({
        success: true,
        message: "Payment successfully verified and recorded in payments collection",
        paymentStatus: "Paid",
        booking: { ...booking, paymentStatus: "Paid", status: "Confirmed" },
      });
    }

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === "sk_test_placeholder") {
      return res.status(400).json({ success: false, message: "Stripe key not configured" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const bId = session.metadata?.bookingId || bookingId || session.client_reference_id;
      if (bId) {
        const query = { _id: new ObjectId(bId) };
        const booking = await bookingsCollection.findOne(query);

        const paidAt = new Date().toISOString();
        await bookingsCollection.updateOne(query, {
          $set: {
            paymentStatus: "Paid",
            status: "Confirmed",
            stripePaymentIntentId: session.payment_intent,
            paidAt,
            updatedAt: paidAt,
          },
        });

        // Record in payments collection
        if (booking) {
          await paymentsCollection.updateOne(
            { stripeSessionId: session.id },
            {
              $set: {
                bookingId: booking._id.toString(),
                customerId: booking.customerId,
                customerName: booking.customerName,
                customerEmail: booking.customerEmail,
                ownerId: booking.ownerId,
                equipmentId: booking.equipmentId,
                equipmentTitle: booking.equipmentTitle,
                amount: booking.totalAmount,
                rentalFee: booking.rentalFee,
                serviceFee: booking.serviceFee,
                securityDeposit: booking.securityDeposit,
                stripeSessionId: session.id,
                stripePaymentIntentId: session.payment_intent,
                paymentMethod: "card",
                status: "succeeded",
                paidAt,
                createdAt: paidAt,
              },
            },
            { upsert: true }
          );
        }
      }

      return res.status(200).json({
        success: true,
        message: "Payment successfully verified and confirmed",
        paymentStatus: "Paid",
      });
    }

    res.status(200).json({
      success: false,
      message: `Payment status is ${session.payment_status}`,
      paymentStatus: session.payment_status,
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/payments/webhook
export async function handleStripeWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    if (webhookSecret && webhookSecret !== "whsec_placeholder") {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      event = req.body;
    }
  } catch (err) {
    console.error("[Stripe Webhook Signature Error]:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId || session.client_reference_id;

    if (bookingId) {
      try {
        const bookingsCollection = getCollection("bookings");
        const paymentsCollection = getCollection("payments");
        const booking = await bookingsCollection.findOne({ _id: new ObjectId(bookingId) });

        const paidAt = new Date().toISOString();
        await bookingsCollection.updateOne(
          { _id: new ObjectId(bookingId) },
          {
            $set: {
              paymentStatus: "Paid",
              status: "Confirmed",
              stripePaymentIntentId: session.payment_intent,
              paidAt,
              updatedAt: paidAt,
            },
          }
        );

        if (booking) {
          await paymentsCollection.updateOne(
            { stripeSessionId: session.id },
            {
              $set: {
                bookingId: booking._id.toString(),
                customerId: booking.customerId,
                customerName: booking.customerName,
                customerEmail: booking.customerEmail,
                ownerId: booking.ownerId,
                equipmentId: booking.equipmentId,
                equipmentTitle: booking.equipmentTitle,
                amount: booking.totalAmount,
                rentalFee: booking.rentalFee,
                serviceFee: booking.serviceFee,
                securityDeposit: booking.securityDeposit,
                stripeSessionId: session.id,
                stripePaymentIntentId: session.payment_intent,
                paymentMethod: "card",
                status: "succeeded",
                paidAt,
                createdAt: paidAt,
              },
            },
            { upsert: true }
          );
        }

        console.log(`[Stripe Webhook] Booking ${bookingId} confirmed & recorded in payments collection.`);
      } catch (dbErr) {
        console.error("[Stripe Webhook DB Error]:", dbErr.message);
      }
    }
  }

  res.status(200).json({ received: true });
}
