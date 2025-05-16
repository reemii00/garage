import express from "express";
import Booking from "../models/bookingModel.js";

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Public (we’ll protect it later)
router.post("/", async (req, res) => {
  const { user, serviceType, bookingDate, price } = req.body;

  try {
    const newBooking = await Booking.create({
      user,
      serviceType,
      bookingDate,
      price,
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Booking creation error:", error.message);
    res.status(500).json({ message: "Failed to create booking" });
  }
});


// @route   GET /api/bookings/user/:userId
// @desc    Get all bookings for a specific user
// @access  Public (we’ll protect later)
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// @route   GET /api/bookings
// @desc    Get all bookings (admin only)
// @access  Public (we’ll protect it later)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all bookings" });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking status (admin only)
// @access  Public (will protect later)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: "Booking status updated successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking" });
  }
});

router.put("/:id/pay", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).send("Booking not found");

    booking.paid = true;
    await booking.save();

    res.send({ message: "Payment successful", booking });
  } catch (err) {
    res.status(500).send("Payment failed");
  }
});

// حذف حجز
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete booking" });
  }
});

// @route   PUT /api/bookings/:id/rate
// @desc    Rate a completed booking
// @access  Public (can be protected later)
router.put("/:id/rate", async (req, res) => {
  const { id } = req.params;
  const { stars, comment } = req.body;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "completed") {
      return res.status(400).json({ message: "Only completed bookings can be rated" });
    }

    booking.rating = { stars, comment };
    await booking.save();

    res.json({ message: "Rating submitted", booking });
  } catch (error) {
    console.error("Rating error:", error.message);
    res.status(500).json({ message: "Failed to submit rating" });
  }
});

router.put("/:id/confirm", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "confirmed" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Failed to confirm booking" });
  }
});






export default router;
