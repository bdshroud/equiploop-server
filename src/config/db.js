import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "equiploop";

let client = null;
let db = null;

export async function connectDB() {
  if (db) return db;

  try {
    if (!client) {
      client = new MongoClient(uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
      });
    }
    await client.connect();
    db = client.db(dbName);
    console.log(`[MongoDB] Connected to database: "${dbName}"`);

    // Ensure collections and necessary indexes
    await initIndexes(db);

    return db;
  } catch (error) {
    console.error("[MongoDB] Connection error:", error);
    throw error;
  }
}

export function getDB() {
  if (!db) {
    throw new Error("[MongoDB] Database not initialized. Call connectDB() first.");
  }
  return db;
}

export function getCollection(collectionName) {
  return getDB().collection(collectionName);
}

async function initIndexes(database) {
  try {
    // Equipment indexes
    const equipment = database.collection("equipment");
    await equipment.createIndex({ category: 1 });
    await equipment.createIndex({ ownerId: 1 });
    await equipment.createIndex({ status: 1 });
    await equipment.createIndex({ pricePerDay: 1 });
    await equipment.createIndex({ title: "text", description: "text", tags: "text" });

    // Bookings indexes
    const bookings = database.collection("bookings");
    await bookings.createIndex({ equipmentId: 1 });
    await bookings.createIndex({ customerId: 1 });
    await bookings.createIndex({ ownerId: 1 });
    await bookings.createIndex({ status: 1 });
    await bookings.createIndex({ paymentStatus: 1 });
    await bookings.createIndex({ startDate: 1, endDate: 1 });

    // Reviews indexes
    const reviews = database.collection("reviews");
    await reviews.createIndex({ equipmentId: 1 });
    await reviews.createIndex({ customerId: 1 });
    await reviews.createIndex({ bookingId: 1 }, { unique: true, sparse: true });

    // Wishlist indexes
    const wishlist = database.collection("wishlist");
    await wishlist.createIndex({ userId: 1, equipmentId: 1 }, { unique: true });

    console.log("[MongoDB] Core database indexes ensured");
  } catch (err) {
    console.warn("[MongoDB] Index initialization notice:", err.message);
  }
}
