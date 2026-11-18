import { ObjectId } from "mongodb";
import { getCollection } from "../config/db.js";

// POST /api/reviews
export async function createReview(req, res, next) {
  try {
    const { equipmentId, bookingId, rating, comment } = req.body;

    if (!equipmentId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "equipmentId, rating (1-5), and comment are required",
      });
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be a number between 1 and 5",
      });
    }

    let equipObjId;
    try {
      equipObjId = new ObjectId(equipmentId);
    } catch {
      return res.status(400).json({ success: false, message: "Invalid equipment ID format" });
    }

    const equipmentCollection = getCollection("equipment");
    const equipment = await equipmentCollection.findOne({ _id: equipObjId });
    if (!equipment) {
      return res.status(404).json({ success: false, message: "Equipment not found" });
    }

    const reviewsCollection = getCollection("reviews");

    // Optional verification: check if bookingId was supplied, or if customer has completed booking
    if (bookingId) {
      const existing = await reviewsCollection.findOne({ bookingId });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "A review has already been submitted for this booking",
        });
      }
    }

    const newReview = {
      equipmentId,
      bookingId: bookingId || null,
      customerId: req.user.id,
      customerName: req.user.name || "Customer",
      customerEmail: req.user.email,
      rating: numRating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };

    const insertResult = await reviewsCollection.insertOne(newReview);

    // Recalculate average rating for this equipment
    const allReviews = await reviewsCollection.find({ equipmentId }).toArray();
    const totalReviews = allReviews.length;
    const avgRating =
      allReviews.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalReviews;
    const roundedRating = Math.round(avgRating * 10) / 10;

    await equipmentCollection.updateOne(
      { _id: equipObjId },
      {
        $set: {
          rating: roundedRating,
          totalReviews: totalReviews,
          updatedAt: new Date().toISOString(),
        },
      }
    );

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: { _id: insertResult.insertedId, ...newReview },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/reviews/equipment/:equipmentId
export async function getReviewsByEquipment(req, res, next) {
  try {
    const { equipmentId } = req.params;
    const reviewsCollection = getCollection("reviews");
    const reviews = await reviewsCollection
      .find({ equipmentId })
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    next(err);
  }
}
