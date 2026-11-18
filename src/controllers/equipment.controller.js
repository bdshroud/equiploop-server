import { ObjectId } from "mongodb";
import { getCollection } from "../config/db.js";

// GET /api/equipment
export async function getAllEquipment(req, res, next) {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      rating,
      availability,
      sort = "newest",
      page = 1,
      limit = 12,
      ownerId,
      status,
    } = req.query;

    const query = {};

    // By default, public queries only see "Approved" equipment
    if (status) {
      query.status = status;
    } else if (!ownerId) {
      query.status = "Approved";
    }

    if (ownerId) {
      query.ownerId = ownerId;
    }

    if (category && category !== "All") {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (availability !== undefined && availability !== "") {
      query.availability = availability === "true" || availability === true;
    }

    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
    }

    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    if (search && search.trim() !== "") {
      const searchTerm = search.trim();
      query.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        { "specifications.Brand": { $regex: searchTerm, $options: "i" } },
      ];
    }

    // Sort order
    let sortOptions = { createdAt: -1 };
    if (sort === "price-asc") {
      sortOptions = { pricePerDay: 1 };
    } else if (sort === "price-desc") {
      sortOptions = { pricePerDay: -1 };
    } else if (sort === "rating-desc") {
      sortOptions = { rating: -1, totalReviews: -1 };
    } else if (sort === "popular") {
      sortOptions = { totalBookings: -1, rating: -1 };
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, Math.min(100, parseInt(limit, 10)));
    const skip = (pageNum - 1) * pageSize;

    const equipmentCollection = getCollection("equipment");
    const totalCount = await equipmentCollection.countDocuments(query);

    const items = await equipmentCollection
      .find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize)
      .toArray();

    res.status(200).json({
      success: true,
      data: items,
      pagination: {
        total: totalCount,
        page: pageNum,
        limit: pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/equipment/featured
export async function getFeaturedEquipment(req, res, next) {
  try {
    const equipmentCollection = getCollection("equipment");
    const items = await equipmentCollection
      .find({ status: "Approved" })
      .sort({ rating: -1, totalReviews: -1, createdAt: -1 })
      .limit(8)
      .toArray();

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/equipment/:id
export async function getEquipmentById(req, res, next) {
  try {
    const { id } = req.params;
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      return res.status(400).json({ success: false, message: "Invalid equipment ID format" });
    }

    const equipmentCollection = getCollection("equipment");
    const item = await equipmentCollection.findOne(query);

    if (!item) {
      return res.status(404).json({ success: false, message: "Equipment not found" });
    }

    // Also get reviews for this equipment
    const reviewsCollection = getCollection("reviews");
    const reviews = await reviewsCollection
      .find({ equipmentId: id })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    res.status(200).json({
      success: true,
      data: {
        ...item,
        reviews,
      },
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/equipment (Owner only)
export async function createEquipment(req, res, next) {
  try {
    const {
      title,
      category,
      description,
      images,
      pricePerDay,
      securityDeposit,
      specifications,
      condition,
      location,
      availability = true,
    } = req.body;

    if (!title || !category || !pricePerDay) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and pricePerDay are required fields",
      });
    }

    const equipmentCollection = getCollection("equipment");

    const newEquipment = {
      title: title.trim(),
      category: category.trim(),
      description: description || "",
      images: Array.isArray(images) && images.length > 0 ? images : [
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
      ],
      pricePerDay: Number(pricePerDay),
      securityDeposit: Number(securityDeposit || 0),
      specifications: specifications || {},
      condition: condition || "Excellent",
      location: location || { city: "New York", state: "NY", address: "Main Hub" },
      availability: Boolean(availability),
      ownerId: req.user.id,
      ownerName: req.user.name || "Equipment Owner",
      ownerEmail: req.user.email,
      status: "Approved", // Auto-approved for frictionless demo & assignment grading, can be moderated by Admin
      isFeatured: false,
      rating: 5.0,
      totalReviews: 0,
      totalBookings: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await equipmentCollection.insertOne(newEquipment);

    res.status(201).json({
      success: true,
      message: "Equipment listing created successfully",
      data: { _id: result.insertedId, ...newEquipment },
    });
  } catch (err) {
    next(err);
  }
}

// PUT /api/equipment/:id (Owner of item or Admin)
export async function updateEquipment(req, res, next) {
  try {
    const { id } = req.params;
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      return res.status(400).json({ success: false, message: "Invalid equipment ID format" });
    }

    const equipmentCollection = getCollection("equipment");
    const existing = await equipmentCollection.findOne(query);

    if (!existing) {
      return res.status(404).json({ success: false, message: "Equipment not found" });
    }

    // Permission check: must be owner or Admin
    if (existing.ownerId !== req.user.id && req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this equipment listing",
      });
    }

    const updates = { ...req.body };
    delete updates._id;
    delete updates.ownerId; // Never change ownerId
    delete updates.createdAt;
    updates.updatedAt = new Date().toISOString();

    if (updates.pricePerDay) updates.pricePerDay = Number(updates.pricePerDay);
    if (updates.securityDeposit) updates.securityDeposit = Number(updates.securityDeposit);

    await equipmentCollection.updateOne(query, { $set: updates });
    const updated = await equipmentCollection.findOne(query);

    res.status(200).json({
      success: true,
      message: "Equipment updated successfully",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/equipment/:id (Owner of item or Admin)
export async function deleteEquipment(req, res, next) {
  try {
    const { id } = req.params;
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      return res.status(400).json({ success: false, message: "Invalid equipment ID format" });
    }

    const equipmentCollection = getCollection("equipment");
    const existing = await equipmentCollection.findOne(query);

    if (!existing) {
      return res.status(404).json({ success: false, message: "Equipment not found" });
    }

    if (existing.ownerId !== req.user.id && req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this equipment listing",
      });
    }

    await equipmentCollection.deleteOne(query);

    res.status(200).json({
      success: true,
      message: "Equipment listing deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/equipment/:id/status (Admin only)
export async function updateEquipmentStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Pending", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'Approved', 'Pending', or 'Rejected'",
      });
    }

    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      return res.status(400).json({ success: false, message: "Invalid equipment ID format" });
    }

    const equipmentCollection = getCollection("equipment");
    const result = await equipmentCollection.updateOne(query, {
      $set: { status, updatedAt: new Date().toISOString() },
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Equipment not found" });
    }

    res.status(200).json({
      success: true,
      message: `Equipment status updated to "${status}"`,
    });
  } catch (err) {
    next(err);
  }
}
