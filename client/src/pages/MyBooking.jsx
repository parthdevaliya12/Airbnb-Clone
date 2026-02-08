import React, { useContext } from "react";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import Card from "../components/Card";

const MyBooking = () => {
  const navigate = useNavigate();
  const { userdata } = useContext(userDataContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 sm:px-6 py-8">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            My Bookings
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            View all your booked properties
          </p>
        </div>

        {/* BACK TO HOME */}
        <button
          onClick={() => navigate("/")}
          className="
            flex items-center gap-2
            px-4 py-2 rounded-xl
            text-white font-semibold
            bg-white/10 border border-white/10
            hover:bg-white/20 transition
          "
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>
      </div>

      {/* BOOKINGS GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* {userdata.booking?.map((list) => (
                      <Card
                        key={list._id}
                        title={list.title}
                        landMark={list.landMark}
                        city={list.city}
                        rent={list.rent}
                        image1={list.image1}
                        image2={list.image2}
                        image3={list.image3}
                        id={list._id}
                        isBooked={list.isBooked}
                        host ={list.host} 
                        ratings={list.ratings}
                      />
                    ))} */}
        {userdata?.booking?.length > 0 ? (
          userdata.booking.map((b) => (
             <Card
              key={b._id}
              title={b.listing.title}
              landMark={b.listing.landMark}
              city={b.listing.city}
              rent={b.listing.rent}
              image1={b.listing.image1}
              image2={b.listing.image2}
              image3={b.listing.image3}
              id={b.listing._id}
              ratings={b.listing.ratings}
              isBooked={b.listing.isBooked}
              host={b.listing.host}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-12">
            You have no bookings yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
