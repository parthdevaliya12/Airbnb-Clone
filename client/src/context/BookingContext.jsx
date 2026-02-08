import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { authDataContext } from "./AuthContext";
import { userDataContext } from "./UserContext";
import { listingDataContext } from "./ListingContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const bookingDataContext = createContext();

const BookingContext = ({ children }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [total, setTotal] = useState(0);
  const [night, setNight] = useState(0);
  const [bookingData, setBookingData] = useState(null);

  const navigate = useNavigate();

  const [booking, setBooking] = useState(false);

  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const { getListing } = useContext(listingDataContext);

  const handleBooking = async (id) => {
    setBooking(true);
    try {
      console.log("Starting booking for listing:", id);
      console.log("Booking details:", { checkIn, checkOut, totalRent: total });

      const result = await axios.post(
        serverUrl + `/booking/create/${id}`,
        { checkIn, checkOut, totalRent: total },
        { withCredentials: true },
      );

      console.log("Booking API response:", result.data);

      await getCurrentUser();
      await getListing();

      if (result.data?.booking) {
        setBookingData(result.data.booking);
        console.log("Booking data set successfully:", result.data.booking);
      } else {
        console.error("No booking object in response:", result.data);
        setBookingData(null);
      }

      setBooking(false);
      navigate("/booked");
      toast.success("Booking created successfully!");
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      setBookingData(null);
      setBooking(false);
      toast.error(error.response?.data?.message || "Failed to create booking");
    }
  };

  const cancleBooking = async (id) => {
    try {
      const url = serverUrl + `/booking/delete/${id}`;
      console.log("Cancelling booking at:", url);
      const result = await axios.delete(url, { withCredentials: true });
      await getCurrentUser();
      await getListing();
      console.log("Booking cancelled:", result.data);
      toast.success("Booking cancelled successfully!");
    } catch (error) {
      console.error(
        "Cancel booking error:",
        error.response?.status,
        error.response?.data || error.message,
        toast.error(error.response?.data?.message || "Failed to cancel booking"),
      );
    }
  };

  const value = {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    bookingData,
    setBookingData,
    handleBooking,
    cancleBooking,
    booking,
    setBooking,
  };
  return (
    <div>
      <bookingDataContext.Provider value={value}>
        {children}
      </bookingDataContext.Provider>
    </div>
  );
};

export default BookingContext;
