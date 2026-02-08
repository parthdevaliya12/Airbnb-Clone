import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { listingDataContext } from "../context/ListingContext";
import { useNavigate } from "react-router-dom";
import { Star, Lock, Unlock } from "lucide-react";
import { bookingDataContext } from "../context/BookingContext";

const Card = ({
  title,
  landMark,
  rent,
  image1,
  image2,
  image3,
  id,
  city,
  ratings,
  isBooked,
  host,
}) => {
  const { userdata } = useContext(userDataContext);
  const { handleViewCard } = useContext(listingDataContext);
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const {cancleBooking} = useContext(bookingDataContext)

  const handleClick = () => {
    if (userdata) {
      handleViewCard(id);
    } else {
      navigate("/login");
    }
  };
  return (
    <div
      onClick={() => (!isBooked ? handleClick() : null)}
      className="
        w-full max-w-[300px]
        bg-white/5 border border-white/10 backdrop-blur-xl
        rounded-2xl overflow-hidden
        cursor-pointer transition-all duration-300
        hover:scale-[1.04]
        hover:shadow-xl hover:shadow-pink-500/10
      "
    >
      {isBooked && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-20 flex items-center gap-2">
          <Lock size={14} className="text-white" />
          <span>Booked</span>
        </div>
      )}

      {isBooked && host == userdata?._id && (
        <div onClick={()=>setPopup(true)} className="absolute top-2 left-2 bg-gradient-to-r from-red-500 via-red-400-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-20 flex items-center gap-2">
          <Unlock size={14} className="text-white" />
          <span>Cancel</span>
        </div>
      )}

      {/* ================= BOOKING CANCEL POPUP (UI ONLY) ================= */}
      {popup &&<div
        className="
  absolute inset-0 z-30
  flex items-center justify-center
  bg-black/40 backdrop-blur-sm
"
      >
        <div
          className="
      w-[90%] sm:w-[320px]
      bg-white/90
      rounded-xl shadow-2xl
      border border-white/40
      overflow-hidden
      animate-fadeIn
    "
        >
          {/* TITLE */}
           <div
            className="
      px-4 py-3
      text-center
      text-lg font-bold
      text-gray-800
      border-b border-gray-300/40
    "
          >
            Booking Cancel!
          </div>

          {/* MESSAGE + ACTIONS */}
          <div
            className="
      px-4 py-4
      flex flex-col items-center gap-3
      text-gray-700
    "
          >
            <p className="text-sm sm:text-base font-semibold">Are you sure?</p>

            <div className="flex gap-3">
              <button
              onClick={()=>{cancleBooking(id);setPopup(false)}}
                className="
            px-5 py-1.5
            rounded-lg
            bg-gradient-to-r from-red-500 via-red-600 to-red-700
            text-white font-semibold text-sm
            hover:opacity-90 transition
          "
              >
                Yes
              </button>

              <button
              onClick={()=>setPopup(false)}
                className="
            px-5 py-1.5
            rounded-lg
             bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
            text-white font-semibold text-sm
            hover:opacity-90 transition
          "
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>}

      {/* Images */}
      <div className="relative w-full h-[230px] flex overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        <img
          src={image1}
          className="w-full h-full object-cover flex-shrink-0 snap-center"
        />
        <img
          src={image2}
          className="w-full h-full object-cover flex-shrink-0 snap-center"
        />
        <img
          src={image3}
          className="w-full h-full object-cover flex-shrink-0 snap-center"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <p className="text-gray-400 text-xs uppercase tracking-wide">
          In {landMark?.toUpperCase()}, {city?.toUpperCase()}
        </p>

        <p className="text-white font-semibold text-sm line-clamp-1">
          {title?.toUpperCase()}
        </p>
        <div className="flex items-center gap-1 text-sm">
          <div
            className="
            flex items-center gap-1 px-2 py-[2px]
            rounded-full
            bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
            text-white font-semibold
          "
          >
            <Star size={14} className="fill-white text-white" />
            <span>{ratings}</span>
          </div>
        </div>

        <p className="text-white font-bold text-lg">
          ₹ {rent}
          <span className="text-gray-400 text-sm font-medium"> / day</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
