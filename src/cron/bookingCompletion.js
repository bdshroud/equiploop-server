import cron from "node-cron";
import { getCollection } from "../config/db.js";

export function initBookingCron() {
  // Run once every hour at minute 0: "0 * * * *"
  cron.schedule("0 * * * *", async () => {
    try {
      const now = new Date();
      const bookingsCollection = getCollection("bookings");

      // Find Confirmed bookings whose endDate has passed
      const result = await bookingsCollection.updateMany(
        {
          status: "Confirmed",
          endDate: { $lt: now.toISOString() },
        },
        {
          $set: {
            status: "Completed",
            completedAt: now.toISOString(),
            updatedAt: now.toISOString(),
          },
        }
      );

      if (result.modifiedCount > 0) {
        console.log(`[Cron] Automatically completed ${result.modifiedCount} overdue confirmed bookings.`);
      }
    } catch (err) {
      console.error("[Cron] Error running booking completion job:", err.message);
    }
  });

  console.log("[Cron] Booking completion scheduled job initialized (hourly)");
}
