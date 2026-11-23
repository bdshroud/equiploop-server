import nodemailer from "nodemailer";
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

/**
 * EquipLoop Automated Email Notification Service
 * Sends transactional notifications to Renters and Equipment Owners.
 */

let transporter = null;

function getTransporter() {
  if (!transporter) {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort),
        secure: Number(smtpPort) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });
      console.log(`[Email Service] Configured live SMTP transport (${smtpHost}:${smtpPort})`);
    } else {
      // Mock / fallback logger transport for development & evaluation
      transporter = {
        sendMail: async (mailOptions) => {
          console.log(`[Email Service] ✉️ Notification dispatched:`);
          console.log(`  To: ${mailOptions.to}`);
          console.log(`  Subject: ${mailOptions.subject}`);
          console.log(`  Preview: ${(mailOptions.text || "").slice(0, 100)}...`);
          return { messageId: `sim_${Date.now()}` };
        },
      };
      console.log("[Email Service] No live SMTP credentials found; active in simulated logger mode.");
    }
  }
  return transporter;
}

/**
 * Requirement 4: Automated email notification to Renter and Equipment Owner upon rental completion
 */
export async function sendBookingCompletedEmail(booking) {
  const mailer = getTransporter();
  const fromAddress = process.env.SMTP_FROM || '"EquipLoop Platform" <notifications@equiploop.com>';

  let renterEmail = booking.customerEmail;
  let ownerEmail = booking.ownerEmail;
  const equipmentTitle = booking.equipmentTitle || "Commercial Equipment";
  const bookingId = booking._id?.toString() || booking.bookingId;
  const totalAmount = booking.totalAmount || 0;

  // Fallback to user collection if owner email was not embedded
  if (!ownerEmail && booking.ownerId) {
    try {
      const db = getDB();
      const ownerUser = await db.collection("user").findOne({
        $or: [
          { id: booking.ownerId },
          { _id: typeof booking.ownerId === "string" && booking.ownerId.length === 24 ? new ObjectId(booking.ownerId) : null },
        ].filter(Boolean),
      });
      if (ownerUser?.email) ownerEmail = ownerUser.email;
    } catch (err) {
      console.warn("[Email Service] Owner lookup fallback error:", err.message);
    }
  }

  // Fallback to user collection if customer email was not embedded
  if (!renterEmail && booking.customerId) {
    try {
      const db = getDB();
      const renterUser = await db.collection("user").findOne({
        $or: [
          { id: booking.customerId },
          { _id: typeof booking.customerId === "string" && booking.customerId.length === 24 ? new ObjectId(booking.customerId) : null },
        ].filter(Boolean),
      });
      if (renterUser?.email) renterEmail = renterUser.email;
    } catch (err) {
      console.warn("[Email Service] Renter lookup fallback error:", err.message);
    }
  }

  const promises = [];

  // 1. Email to Renter
  if (renterEmail) {
    const renterHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background-color: #202C35; padding: 15px; border-radius: 6px; text-align: center;">
          <h2 style="color: #E9A44C; margin: 0;">EquipLoop Rental Completed</h2>
        </div>
        <div style="padding: 20px 0;">
          <p>Hello <strong>${booking.customerName || "Valued Contractor"}</strong>,</p>
          <p>Your rental of <strong>${equipmentTitle}</strong> (Booking ID: <code>${bookingId}</code>) has concluded and is now marked <strong>Completed</strong>.</p>
          <div style="background-color: #F7F7F3; padding: 15px; border-radius: 6px; margin: 15px 0;">
            <p style="margin: 4px 0;"><strong>Rental Period:</strong> ${booking.startDate} to ${booking.endDate}</p>
            <p style="margin: 4px 0;"><strong>Total Settled Amount:</strong> $${totalAmount}</p>
            <p style="margin: 4px 0;"><strong>Status:</strong> Completed & Escrow Released</p>
          </div>
          <p>Your refundable damage deposit has been initiated for release. Please consider leaving a review for this machine on your customer dashboard to help fellow contractors!</p>
        </div>
        <div style="border-top: 1px solid #eee; padding-top: 15px; font-size: 12px; color: #888; text-align: center;">
          EquipLoop Commercial Equipment Marketplace &copy; 2026. Rent smarter. Work better.
        </div>
      </div>
    `;

    promises.push(
      mailer.sendMail({
        from: fromAddress,
        to: renterEmail,
        subject: `[EquipLoop] Rental Completed: ${equipmentTitle}`,
        text: `Your rental of ${equipmentTitle} has completed. Thank you for renting with EquipLoop.`,
        html: renterHtml,
      }).catch((err) => console.error("[Email Service] Failed sending renter completion email:", err.message))
    );
  }

  // 2. Email to Equipment Owner
  if (ownerEmail) {
    const ownerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background-color: #202C35; padding: 15px; border-radius: 6px; text-align: center;">
          <h2 style="color: #E9A44C; margin: 0;">EquipLoop Fleet Rental Concluded</h2>
        </div>
        <div style="padding: 20px 0;">
          <p>Hello <strong>${booking.ownerName || "Fleet Operator"}</strong>,</p>
          <p>The rental contract for your machine <strong>${equipmentTitle}</strong> with customer <strong>${booking.customerName}</strong> has completed.</p>
          <div style="background-color: #F7F7F3; padding: 15px; border-radius: 6px; margin: 15px 0;">
            <p style="margin: 4px 0;"><strong>Booking Ref:</strong> ${bookingId}</p>
            <p style="margin: 4px 0;"><strong>Rental Period:</strong> ${booking.startDate} to ${booking.endDate}</p>
            <p style="margin: 4px 0;"><strong>Total Gross Amount:</strong> $${totalAmount}</p>
          </div>
          <p>The rental duration has passed, and your payout has been credited to your operating account. You can verify your updated balance on your Fleet Overview dashboard.</p>
        </div>
        <div style="border-top: 1px solid #eee; padding-top: 15px; font-size: 12px; color: #888; text-align: center;">
          EquipLoop Commercial Equipment Marketplace &copy; 2026. Rent smarter. Work better.
        </div>
      </div>
    `;

    promises.push(
      mailer.sendMail({
        from: fromAddress,
        to: ownerEmail,
        subject: `[EquipLoop] Machine Rental Concluded: ${equipmentTitle}`,
        text: `The rental of ${equipmentTitle} with ${booking.customerName} has completed. Payout recorded.`,
        html: ownerHtml,
      }).catch((err) => console.error("[Email Service] Failed sending owner completion email:", err.message))
    );
  }

  await Promise.all(promises);
}
