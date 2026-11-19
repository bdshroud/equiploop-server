import cron from "node-cron";
import { getCollection } from "../config/db.js";
import { sendBookingCompletedEmail } from "../services/email.service.js";

/**
 * Requirement 3: Automated Booking Status Update (Cron Job)
 * Scheduled cron job using node-cron to automatically update booking statuses
 * when the rental end date has passed.
 * Also triggers Requirement 4: Automated Email Notifications to Renters & Owners.
 */
export function initBookingCron() {
  // Run once every hour at minute 0: "0 * * * *"
  cron.schedule("0 * * * *", async () => {
    try {
      const now = new Date();
      const bookingsCollection = getCollection("bookings");

      // Find Confirmed bookings whose endDate has passed
      const overdueBookings = await bookingsCollection
        .find({
          status: "Confirmed",
          endDate: { $lt: now.toISOString() },
        })
        .toArray();

      if (overdueBookings.length > 0) {
        const ids = overdueBookings.map((b) => b._id);
        await bookingsCollection.updateMany(
          { _id: { $in: ids } },
          {
            $set: {
              status: "Completed",
              completedAt: now.toISOString(),
              updatedAt: now.toISOString(),
            },
          }
        );

        console.log(`[Cron] Automatically completed ${overdueBookings.length} overdue confirmed booking(s).`);

        // Send automated email notification to Renters and Equipment Owners
        for (const booking of overdueBookings) {
          sendBookingCompletedEmail(booking).catch((err) =>
            console.error(`[Cron] Email dispatch failed for booking ${booking._id}:`, err.message)
          );
        }
      }
    } catch (err) {
      console.error("[Cron] Error running booking completion job:", err.message);
    }
  });

  console.log("[Cron] Automated booking completion scheduled job initialized (hourly)");
}
