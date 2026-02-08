import React, { useContext, useEffect, useState } from "react";
import { CheckCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { bookingDataContext } from "../context/BookingContext";
import { authDataContext } from "../context/AuthContext";
import Stars from "../components/Stars";
import axios from "axios";
import { listingDataContext } from "../context/ListingContext";
import { userDataContext } from "../context/UserContext";

const Booked = () => {
  const navigate = useNavigate();
  const { bookingData } = useContext(bookingDataContext);
  const [stars, setStars] = useState(0);
  const { serverUrl } = useContext(authDataContext)
  const { getListing } = useContext(listingDataContext)
  const { getCurrentUser } = useContext(userDataContext)

  useEffect(() => {
    console.log("Booked page - bookingData:", bookingData);
    if (!bookingData) {
      console.warn(
        "No booking data found, redirecting to home in 3 seconds...",
      );
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [bookingData, navigate]);

  const handleStar = async (value) => {
    setStars(value);
    console.log(value);
  };

  const handleRating = async (id) => {
    try {
        const result = await axios.post(serverUrl + `/listing/rating/${id}`, { rating: stars }, { withCredentials: true });
        await getListing()
        await getCurrentUser()
        console.log(result.data);
        navigate("/");   
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      {/* CARD */}
      <div
        className="
          w-full max-w-md
          bg-white/10 backdrop-blur-xl
          border border-white/10
          rounded-2xl shadow-2xl
          p-6 sm:p-8
          text-center
        "
      >
        {/* ICON */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-500/10 p-4 rounded-full">
            <CheckCircle size={56} className="text-green-500" />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Booking Confirmed
        </h2>

        <p className="text-gray-400 text-sm mb-6">
          Your booking has been successfully completed
        </p>

        {!bookingData && (
          <div className="mb-6 p-3 bg-yellow-500/20 border border-yellow-500 rounded-lg">
            <p className="text-yellow-300 text-xs">
              Loading booking details...
            </p>
          </div>
        )}

        {/* DETAILS */}
        <div className="space-y-3 text-left text-sm sm:text-base">
          <div className="flex justify-between text-gray-300">
            <span>Booking ID</span>
            <span className="text-white font-semibold text-xs sm:text-sm break-all">
              {bookingData?._id || "—"}
            </span>
          </div>

          <div className="flex justify-between text-gray-300">
            <span>Owner Email</span>
            <span className="text-white font-semibold break-all">
              {bookingData?.host?.email || bookingData?.host?.name || "—"}
            </span>
          </div>

          <div className="flex justify-between text-gray-300">
            <span>Check-In</span>
            <span className="text-white font-semibold">
              {bookingData?.checkIn
                ? new Date(bookingData.checkIn).toLocaleDateString()
                : "—"}
            </span>
          </div>

          <div className="flex justify-between text-gray-300">
            <span>Check-Out</span>
            <span className="text-white font-semibold">
              {bookingData?.checkOut
                ? new Date(bookingData.checkOut).toLocaleDateString()
                : "—"}
            </span>
          </div>

          <div className="flex justify-between text-gray-300">
            <span>Total Rent</span>
            <span className="text-white font-semibold">
              ₹{bookingData?.totalRent || "—"}
            </span>
          </div>

          <div className="flex justify-between text-gray-300">
            <span>Status</span>
            <span className="text-green-400 font-semibold">Confirmed</span>
          </div>
        </div>

        {/* ⭐⭐⭐⭐ RATING UI (ADDED ONLY) */}
        <div className="mt-8 border-t border-white/10 pt-6 text-left">
          <h3 className="text-white font-semibold mb-3">
            {stars} out of 5 stars
          </h3>

          {/* STARS */}
          <div className="flex gap-2 mb-4">
            <Stars
              onRate={handleStar}
              size={22}
              className="transition hover:scale-125 cursor-pointer"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
          onClick={()=>handleRating(bookingData?.listing?._id)}
            className="
              mt-4 w-full py-3
              rounded-xl font-semibold text-white
              bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500
              hover:opacity-90 transition
            "
          >
            Submit Rating
          </button>
        </div>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="
            mt-6 w-full py-3
            rounded-xl font-semibold text-white
            bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
            hover:opacity-90 transition
          "
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Booked;
