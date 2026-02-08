import bookingModel from "../models/booking.model.js";
import listingModel from "../models/listing.model.js";
import userModel from "../models/users.model.js";

export const createBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut, totalRent } = req.body;

    if (!checkIn || !checkOut || !totalRent || totalRent <= 0) {
      return res.status(400).json({ message: "Invalid booking details" });
    }

    const listing = await listingModel.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      return res
        .status(400)
        .json({ message: "Invalid check-in or check-out date" });
    }

    if (listing.isBooked) {
      return res.status(400).json({ message: "Listing is already booked" });
    }

    const booking = await bookingModel.create({
      checkIn,
      checkOut,
      totalRent,
      host: listing.host,
      guest: req.userId,
      listing: listing._id,
    });

    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { $push: { booking: booking._id } },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    listing.guest = req.userId;
    listing.isBooked = true;
    await listing.save();

    // Populate booking with host/guest details before returning so client can show emails/names
    const populatedBooking = await bookingModel
      .findById(booking._id)
      .populate("host", "email name")
      .populate("guest", "email name")
      .populate("listing", "title");

    return res.status(200).json({
      message: "Booking created successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("BOOKING ERROR:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const cancleBooking = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the listing 
    const listing = await listingModel.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Find and delete the booking by listing ID
    const booking = await bookingModel.findOneAndDelete({ listing: id });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update listing: mark as not booked and remove guest
    await listingModel.findByIdAndUpdate(id, {
      isBooked: false,
      guest: null,
    });

    // Remove booking from user's booking array
    const user = await userModel.findByIdAndUpdate(
      booking.guest,
      { $pull: { booking: booking._id } },
      { new: true },
    );
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    return res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
