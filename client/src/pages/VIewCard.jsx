import React, { useContext, useState } from "react";
import { listingDataContext } from "../context/ListingContext";
import { userDataContext } from "../context/UserContext";
import { MapPin, Star } from "lucide-react";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { bookingDataContext } from "../context/BookingContext";
import toast from "react-hot-toast";

const VIewCard = () => {
  const { cardDetails, setCardDetails } = useContext(listingDataContext);
  const { userdata } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);

  const [updatePopup, setUpdatePopup] = useState(false);
  const [bookingPopup, setBookingPopup] = useState(false);

  const [title, setTitle] = useState(cardDetails?.title || "");
  const [desc, setDesc] = useState(cardDetails?.desc || "");
  const [rent, setRent] = useState(cardDetails?.rent || "");
  const [city, setCity] = useState(cardDetails?.city || "");
  const [landmark, setLandmark] = useState(cardDetails?.landMark || "");

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const {
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
    booking,
    setBooking,
  } = useContext(bookingDataContext);

  useEffect(() => {
    if (checkIn && checkOut) {
      let indate = new Date(checkIn);
      let outdate = new Date(checkOut);
      let n = (outdate - indate) / (24 * 60 * 60 * 1000);
      setNight(n);
      const estatexCharge = cardDetails.rent * (7 / 100);
      const tax = cardDetails.rent * (7 / 100);

      if (n > 0) {
        setTotal(cardDetails.rent * n + (estatexCharge + tax));
      } else {
        setTotal(0);
      }
    }
  }, [checkIn, checkOut, cardDetails, rent, total]);

  const [minDate, setMinDate] = useState("");
  const navigate = useNavigate();

  const { updating, setUpdating, deleting, setDeleting } =
    useContext(listingDataContext);

  if (!cardDetails) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        Loading listing...
      </div>
    );
  }

  const handleUpdateListing = async () => {
    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landMark", landmark);

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);

      const result = await axios.patch(
        `${serverUrl}/listing/update/${cardDetails._id}`,
        formData,
        { withCredentials: true },
      );
      setUpdating(false);
      setCardDetails(result.data);
      toast.success("Listing updated successfully!");
      setUpdatePopup(false);
      
    } catch (error) {
      setUpdating(false);
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message || "Failed to update listing");
    }
  };
  const handleDeleteListing = async () => {
    setDeleting(true);
    try {
      const result = await axios.delete(
        `${serverUrl}/listing/deletelistingbyid/${cardDetails._id}`,
        { withCredentials: true },
      );
      console.log(result.data);
      toast.success("Listing deleted successfully!");
      navigate("/");

      setDeleting(false);
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-3 sm:px-6 py-6">
      {/* ================= CARD ================= */}
      <div className="max-w-6xl mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        {/* LOCATION */}
        <div className="px-4 sm:px-8 py-4 flex items-center gap-2 text-white">
          <MapPin className="text-pink-400" size={18} />
          <span className="text-sm sm:text-base font-semibold">
            {cardDetails.landMark}, {cardDetails.city}
          </span>
        </div>

        {/* ================= IMAGES ================= */}
        <div className="px-4 sm:px-8 pb-6">
          {/* MOBILE: vertical stack */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            <img
              src={cardDetails.image1}
              className="w-full h-[220px] object-cover rounded-2xl"
            />
            <img
              src={cardDetails.image2}
              className="w-full h-[220px] object-cover rounded-2xl"
            />
            <img
              src={cardDetails.image3}
              className="w-full h-[220px] object-cover rounded-2xl"
            />
          </div>

          {/* DESKTOP */}
          <div className="hidden md:grid grid-cols-3 gap-3">
            <div className="col-span-2 rounded-2xl overflow-hidden">
              <img
                src={cardDetails.image1}
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <img
                src={cardDetails.image2}
                className="h-[205px] object-cover rounded-2xl"
              />
              <img
                src={cardDetails.image3}
                className="h-[205px] object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* ================= DETAILS ================= */}
        <div className="px-4 sm:px-8 pb-8 text-white">
          <h2 className="text-lg sm:text-xl font-bold uppercase">
            {cardDetails.title} · {cardDetails.category}
          </h2>

          <p className="text-gray-300 mt-2 text-sm sm:text-base leading-relaxed">
            {cardDetails.desc}
          </p>

          <p className="mt-4 text-xl sm:text-2xl font-extrabold">
            ₹ {cardDetails.rent}
            <span className="text-sm text-gray-400"> / day</span>
          </p>

          {/* BUTTONS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {userdata?._id === cardDetails.host && (
              <button
                onClick={() => setUpdatePopup(true)}
                className="w-full sm:w-56 py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
              >
                Edit Listing
              </button>
            )}

            {userdata?._id !== cardDetails.host && (
              <button
                onClick={() => setBookingPopup(true)}
                className="w-full sm:w-56 py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= UPDATE MODAL ================= */}
      {updatePopup && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-3">
          <div className="relative w-full max-w-lg bg-gray-900 rounded-2xl p-5 max-h-[90vh] overflow-y-auto text-white">
            <button
              onClick={() => setUpdatePopup(false)}
              className="absolute top-3 right-4 text-gray-400"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-4">Update Listing</h2>

            <div className="space-y-4">
              <input
                value={title}
                placeholder="Example: Luxury 2BHK Flat near Metro Station"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 bg-white/10 rounded-xl"
              required/>
              <textarea
                value={desc}
                placeholder="Describe your property: rooms, facilities, nearby places, rules, etc."
                onChange={(e) => setDesc(e.target.value)}
                rows="3"
                className="w-full p-3 bg-white/10 rounded-xl"
             required />
              <input
                value={rent}
                placeholder="Example: 1500 (price per day)"
                onChange={(e) => setRent(e.target.value)}
                className="w-full p-3 bg-white/10 rounded-xl"
              required/>
              <input
                value={city}
                placeholder="Example: Ahmedabad"
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 bg-white/10 rounded-xl"
              required/>
              <input
                value={landmark}
                placeholder="Example: Near ISKCON Temple / Metro Station"
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full p-3 bg-white/10 rounded-xl"
             required />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="file"
                  onChange={(e) => setImage1(e.target.files[0])}
                />
                <input
                  type="file"
                  onChange={(e) => setImage2(e.target.files[0])}
                />
                <input
                  type="file"
                  onChange={(e) => setImage3(e.target.files[0])}
                />
              </div>

              <button
                onClick={handleUpdateListing}
                disabled={updating}
                className="w-full py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
              >
                {updating ? "Updating..." : "Update Listing"}
              </button>

              <button
                onClick={handleDeleteListing}
                disabled={deleting}
                className="w-full py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-red-600 via-red-400 to-red-700"
              >
                {deleting ? "Deleting..." : "Delete Listing"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= BOOKING MODAL ================= */}
      {bookingPopup && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-3">
          <div className="w-full max-w-4xl bg-gray-900 rounded-2xl p-5 text-white">
            <button
              onClick={() => setBookingPopup(false)}
              className="absolute top-3 right-4 text-gray-400"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-6 text-center">
              Confirm & Book
            </h2>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form onSubmit={(e) => e.preventDefault()}>
                {/* LEFT — BOOKING FORM (UNCHANGED DESIGN) */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      onChange={(e) => setCheckIn(e.target.value)}
                      value={checkIn}
                      min={minDate}
                      className="w-full p-3 bg-white/10 rounded-xl"
                    required/>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      onChange={(e) => setCheckOut(e.target.value)}
                      value={checkOut}
                      min={minDate}
                      className="w-full p-3 bg-white/10 rounded-xl"
                    required/>
                  </div>

                  <button
                    disabled={booking}
                    onClick={() => {
                      handleBooking(cardDetails._id);
                    }}
                    className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"
                  >
                    {booking ? "Booking..." : "Confirm Booking"}
                  </button>
                </div>
              </form>
              {/* RIGHT — BOOKING SUMMARY */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                {/* IMAGE + BASIC INFO */}
                <div className="flex gap-4">
                  <img
                    src={cardDetails.image1}
                    alt="property"
                    className="w-24 h-20 object-cover rounded-lg"
                  />

                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-400 uppercase">
                      {cardDetails.landMark}, {cardDetails.city}
                    </p>
                    <p className="font-semibold text-sm line-clamp-2">
                      {cardDetails.title}
                    </p>

                    {/* RATING */}
                    <div className="flex  items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold">
                      <Star size={14} className="fill-white text-white" />
                      <span>{cardDetails.ratings}</span>
                    </div>
                  </div>
                </div>

                {/* PRICE BREAKDOWN */}
                <div className="border-t border-white/10 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>{`₹ ${cardDetails.rent} X ${night} nights`}</span>
                    <span>{cardDetails.rent * night}</span>
                  </div>

                  <div className="flex justify-between text-gray-300">
                    <span>EstateX Charge</span>
                    <span>₹ {(cardDetails.rent * 7) / 100}</span>
                  </div>

                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>₹ {(cardDetails.rent * 7) / 100}</span>
                  </div>

                  <div className="flex justify-between font-semibold text-white border-t border-white/10 pt-2">
                    <span>Total</span>
                    <span>₹ {total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VIewCard;
