import { ObjectId } from "mongodb";
import { getCollection } from "../config/db.js";
import { sendBookingCompletedEmail } from "../services/email.service.js";

// POST /api/bookings
export async function createBooking(req, res, next) {
  try {
    const {
      equipmentId,
      startDate,
      endDate,
      deliveryOption = "Pickup",
      deliveryAddress = "",
      notes = "",
      customerPhone = "",
    } = req.body;

    if (!equipmentId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "equipmentId, startDate, and endDate are required",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid date format" });
    }

    if (start > end) {
      return res.status(400).json({ success: false, message: "startDate cannot be after endDate" });
    }

    // Calculate days (inclusive, minimum 1 day)
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

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

    if (!equipment.availability || equipment.status !== "Approved") {
      return res.status(400).json({
        success: false,
        message: "This equipment is currently not available for rent",
      });
    }

    // Prevent owner from renting their own equipment
    if (equipment.ownerId === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot rent your own equipment listing",
      });
    }

    // Check date collision with existing Confirmed or Active bookings
    const bookingsCollection = getCollection("bookings");
    const conflict = await bookingsCollection.findOne({
      equipmentId: equipmentId,
      status: { $in: ["Confirmed", "Active"] },
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
      ],
    });

    if (conflict) {
      return res.status(409).json({
        success: false,
        message: "Equipment is already booked for these selected dates. Please choose another date range.",
      });
    }

    const dailyRate = Number(equipment.pricePerDay || 0);
    const rentalFee = dailyRate * totalDays;
    const securityDeposit = Number(equipment.securityDeposit || 0);
    const serviceFee = Math.round(rentalFee * 0.05) || 10; // 5% marketplace service fee or min $10
    const totalAmount = rentalFee + securityDeposit + serviceFee;

    const newBooking = {
      equipmentId: equipmentId,
      equipmentTitle: equipment.title,
      equipmentImage: equipment.images?.[0] || "",
      equipmentCategory: equipment.category,
      ownerId: equipment.ownerId,
      ownerName: equipment.ownerName || "Equipment Owner",
      ownerEmail: equipment.ownerEmail || "",
      customerId: req.user.id,
      customerName: req.user.name || "Customer",
      customerEmail: req.user.email,
      customerPhone: customerPhone || req.user.phone || "",
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
      totalDays,
      dailyRate,
      rentalFee,
      securityDeposit,
      serviceFee,
      totalAmount,
      deliveryOption,
      deliveryAddress,
      notes,
      status: "Pending",
      paymentStatus: "Unpaid",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await bookingsCollection.insertOne(newBooking);

    // Increment booking counter on equipment
    await equipmentCollection.updateOne(
      { _id: equipObjId },
      { $inc: { totalBookings: 1 } }
    );

    res.status(201).json({
      success: true,
      message: "Booking request created successfully",
      data: { _id: result.insertedId, ...newBooking },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/bookings/my-bookings (Customer) with optional pagination
export async function getMyBookings(req, res, next) {
  try {
    const { page, limit } = req.query;
    const bookingsCollection = getCollection("bookings");
    const query = { customerId: req.user.id };

    if (page || limit) {
      const pageNum = Math.max(1, parseInt(page || "1", 10));
      const pageSize = Math.max(1, Math.min(100, parseInt(limit || "10", 10)));
      const skip = (pageNum - 1) * pageSize;

      const total = await bookingsCollection.countDocuments(query);
      const bookings = await bookingsCollection
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .toArray();

      return res.status(200).json({
        success: true,
        data: bookings,
        pagination: {
          total,
          page: pageNum,
          limit: pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      });
    }

    const bookings = await bookingsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/bookings/owner-bookings (Owner) with optional pagination
export async function getOwnerBookings(req, res, next) {
  try {
    const { page, limit } = req.query;
    const bookingsCollection = getCollection("bookings");
    const query = { ownerId: req.user.id };

    if (page || limit) {
      const pageNum = Math.max(1, parseInt(page || "1", 10));
      const pageSize = Math.max(1, Math.min(100, parseInt(limit || "10", 10)));
      const skip = (pageNum - 1) * pageSize;

      const total = await bookingsCollection.countDocuments(query);
      const bookings = await bookingsCollection
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .toArray();

      return res.status(200).json({
        success: true,
        data: bookings,
        pagination: {
          total,
          page: pageNum,
          limit: pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      });
    }

    const bookings = await bookingsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/bookings/admin/all (Admin)
export async function getAdminBookings(req, res, next) {
  try {
    const { status, paymentStatus, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    const pageNum = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, Math.min(100, parseInt(limit, 10)));
    const skip = (pageNum - 1) * pageSize;

    const bookingsCollection = getCollection("bookings");
    const total = await bookingsCollection.countDocuments(query);
    const bookings = await bookingsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    res.status(200).json({
      success: true,
      data: bookings,
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

// GET /api/bookings/:id
export async function getBookingById(req, res, next) {
  try {
    const { id } = req.params;
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      return res.status(400).json({ success: false, message: "Invalid booking ID format" });
    }

    const bookingsCollection = getCollection("bookings");
    const booking = await bookingsCollection.findOne(query);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Check authorization: must be customer, owner, or Admin
    if (
      booking.customerId !== req.user.id &&
      booking.ownerId !== req.user.id &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this booking",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/bookings/:id/status
export async function updateBookingStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Confirmed", "Active", "Completed", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: [${validStatuses.join(", ")}]`,
      });
    }

    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      return res.status(400).json({ success: false, message: "Invalid booking ID format" });
    }

    const bookingsCollection = getCollection("bookings");
    const booking = await bookingsCollection.findOne(query);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const isCustomer = booking.customerId === req.user.id;
    const isOwner = booking.ownerId === req.user.id;
    const isAdmin = req.user.role === "Admin";

    // Permission rules:
    // Customer can only cancel their own pending booking
    if (isCustomer && !isOwner && !isAdmin) {
      if (status !== "Cancelled" || booking.status !== "Pending") {
        return res.status(403).json({
          success: false,
          message: "Customers can only cancel pending bookings",
        });
      }
    } else if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this booking status",
      });
    }

    const updateDoc = {
      status,
      updatedAt: new Date().toISOString(),
    };

    if (status === "Completed") {
      updateDoc.completedAt = new Date().toISOString();
    }

    await bookingsCollection.updateOne(query, { $set: updateDoc });
    const updated = await bookingsCollection.findOne(query);

    // Requirement 4: Automated email notification upon booking completion
    if (status === "Completed" && updated) {
      sendBookingCompletedEmail(updated).catch((err) =>
        console.error(`[Bookings Controller] Failed to send completion email for ${updated._id}:`, err.message)
      );
    }

    res.status(200).json({
      success: true,
      message: `Booking status updated to "${status}"`,
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}
