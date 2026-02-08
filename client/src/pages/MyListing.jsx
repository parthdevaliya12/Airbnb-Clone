import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import Card from "../components/Card";

const MyListing = () => {
  const navigate = useNavigate();
  const { userdata } = useContext(userDataContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-x-hidden">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            My Listings
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage all properties you have listed
          </p>
        </div>

        {/* Back to Home Button */}
        <div
          onClick={() => navigate("/")}
          className="
            px-5 py-2.5
            rounded-xl
            bg-white/10
            border border-white/10
            text-white text-sm font-medium
            hover:bg-white/20
            transition
            cursor-pointer
            self-start sm:self-auto
          "
        >
          ← Back to Home
        </div>
      </div>

      {/* LISTINGS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {userdata?.listing?.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            No listings found
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-5
              sm:gap-6
            "
          >
            {userdata.listing.map((list) => (
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListing;
