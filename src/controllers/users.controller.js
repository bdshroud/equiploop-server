import { ObjectId } from "mongodb";
import { getCollection } from "../config/db.js";

// GET /api/users (Admin only)
export async function getAllUsers(req, res, next) {
  try {
    const { role, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (role && role !== "All") {
      query.role = role;
    }

    if (search && search.trim() !== "") {
      const s = search.trim();
      query.$or = [
        { name: { $regex: s, $options: "i" } },
        { email: { $regex: s, $options: "i" } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, Math.min(100, parseInt(limit, 10)));
    const skip = (pageNum - 1) * pageSize;

    const usersCollection = getCollection("user");
    const total = await usersCollection.countDocuments(query);
    const users = await usersCollection
      .find(query, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total,
        page: pageNum,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/users/:id/role (Admin only)
export async function updateUserRole(req, res, next) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["Customer", "Owner", "Admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be 'Customer', 'Owner', or 'Admin'",
      });
    }

    const usersCollection = getCollection("user");
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      query = { id: id };
    }

    const result = await usersCollection.updateOne(query, {
      $set: { role, updatedAt: new Date().toISOString() },
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: `User role successfully updated to "${role}"`,
    });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/users/:id/status (Admin only)
export async function updateUserStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body; // "Active" | "Suspended"

    if (!["Active", "Suspended"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'Active' or 'Suspended'",
      });
    }

    const usersCollection = getCollection("user");
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      query = { id: id };
    }

    const result = await usersCollection.updateOne(query, {
      $set: { status, updatedAt: new Date().toISOString() },
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: `User status set to "${status}"`,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/users/profile (Current User)
export async function getUserProfile(req, res, next) {
  try {
    const usersCollection = getCollection("user");
    let query;
    try {
      query = { _id: new ObjectId(req.user.id) };
    } catch {
      query = { id: req.user.id };
    }

    const user = await usersCollection.findOne(query, {
      projection: { password: 0 },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/users/profile (Current User)
export async function updateUserProfile(req, res, next) {
  try {
    const { name, phone, address, image } = req.body;
    const updates = {};
    if (name) updates.name = name.trim();
    if (phone !== undefined) updates.phone = phone.trim();
    if (address !== undefined) updates.address = address.trim();
    if (image !== undefined) updates.image = image.trim();
    updates.updatedAt = new Date().toISOString();

    const usersCollection = getCollection("user");
    let query;
    try {
      query = { _id: new ObjectId(req.user.id) };
    } catch {
      query = { id: req.user.id };
    }

    await usersCollection.updateOne(query, { $set: updates });
    const updated = await usersCollection.findOne(query, { projection: { password: 0 } });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/users/wishlist
export async function getWishlist(req, res, next) {
  try {
    const wishlistCollection = getCollection("wishlist");
    const items = await wishlistCollection.find({ userId: req.user.id }).toArray();

    if (items.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    const equipmentIds = items.map((w) => {
      try {
        return new ObjectId(w.equipmentId);
      } catch {
        return w.equipmentId;
      }
    });

    const equipmentCollection = getCollection("equipment");
    const equipmentItems = await equipmentCollection
      .find({ _id: { $in: equipmentIds } })
      .toArray();

    res.status(200).json({
      success: true,
      data: equipmentItems,
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/users/wishlist/:equipmentId (Toggle)
export async function toggleWishlist(req, res, next) {
  try {
    const { equipmentId } = req.params;
    const wishlistCollection = getCollection("wishlist");

    const existing = await wishlistCollection.findOne({
      userId: req.user.id,
      equipmentId: equipmentId,
    });

    if (existing) {
      await wishlistCollection.deleteOne({ _id: existing._id });
      return res.status(200).json({
        success: true,
        isSaved: false,
        message: "Removed from wishlist",
      });
    } else {
      await wishlistCollection.insertOne({
        userId: req.user.id,
        equipmentId: equipmentId,
        createdAt: new Date().toISOString(),
      });
      return res.status(200).json({
        success: true,
        isSaved: true,
        message: "Added to wishlist",
      });
    }
  } catch (err) {
    next(err);
  }
}
