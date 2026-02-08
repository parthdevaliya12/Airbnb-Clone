import React, { useContext } from "react";
import {
  Home,
  Building2,
  Waves,
  BedDouble,
  Hotel,
  GraduationCap,
  MountainSnow,
  Store,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../context/ListingContext";

const ListingPage2 = () => {
  const navigate = useNavigate();

  const { category, setCategory } = useContext(listingDataContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-3 sm:px-6 py-10">
      <div className="w-full max-w-4xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-10">
        {/* Back to Home Button */}
        <div className="mb-6 flex justify-start">
          <div
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back to Home
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-lg sm:text-2xl md:text-3xl font-bold text-white leading-snug">
          Which of these best describes your place?
        </h1>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Villa */}
          <div
            onClick={() => setCategory("Villa")}
            className={`rounded-2xl p-4 sm:p-6 transition flex flex-col items-center justify-center cursor-pointer
              bg-white/10 border border-white/10 hover:bg-white/15 hover:border-pink-500 hover:scale-[1.02]
              ${category == "Villa" ? "border-2 border-blue-500 bg-white/15 shadow-lg shadow-blue-500/20" : ""}
            `}
          >
            <Home className="text-white" size={26} />
            <p className="text-white mt-2 font-semibold text-sm sm:text-base">
              Villa
            </p>
          </div>

          {/* Farm House */}
          <div
            onClick={() => setCategory("FarmHouse")}
            className={`rounded-2xl p-4 sm:p-6 transition flex flex-col items-center justify-center cursor-pointer
              bg-white/10 border border-white/10 hover:bg-white/15 hover:border-purple-500 hover:scale-[1.02]
              ${category == "FarmHouse" ? "border-2 border-blue-500 bg-white/15 shadow-lg shadow-blue-500/20" : ""}
            `}
          >
            <Building2 className="text-white" size={26} />
            <p className="text-white mt-2 font-semibold text-sm sm:text-base">
              Farm House
            </p>
          </div>

          {/* Pool House */}
          <div
            onClick={() => setCategory("PoolHouse")}
            className={`rounded-2xl p-4 sm:p-6 transition flex flex-col items-center justify-center cursor-pointer
              bg-white/10 border border-white/10 hover:bg-white/15 hover:border-blue-500 hover:scale-[1.02]
              ${category == "PoolHouse" ? "border-2 border-blue-500 bg-white/15 shadow-lg shadow-blue-500/20" : ""}
            `}
          >
            <Waves className="text-white" size={26} />
            <p className="text-white mt-2 font-semibold text-sm sm:text-base">
              Pool House
            </p>
          </div>

          {/* Rooms */}
          <div
            onClick={() => setCategory("Rooms")}
            className={`rounded-2xl p-4 sm:p-6 transition flex flex-col items-center justify-center cursor-pointer
              bg-white/10 border border-white/10 hover:bg-white/15 hover:border-pink-500 hover:scale-[1.02]
              ${category == "Rooms" ? "border-2 border-blue-500 bg-white/15 shadow-lg shadow-blue-500/20" : ""}
            `}
          >
            <BedDouble className="text-white" size={26} />
            <p className="text-white mt-2 font-semibold text-sm sm:text-base">
              Rooms
            </p>
          </div>

          {/* Flat */}
          <div
            onClick={() => setCategory("Flat")}
            className={`rounded-2xl p-4 sm:p-6 transition flex flex-col items-center justify-center cursor-pointer
              bg-white/10 border border-white/10 hover:bg-white/15 hover:border-purple-500 hover:scale-[1.02]
              ${category == "Flat" ? "border-2 border-blue-500 bg-white/15 shadow-lg shadow-blue-500/20" : ""}
            `}
          >
            <Hotel className="text-white" size={26} />
            <p className="text-white mt-2 font-semibold text-sm sm:text-base">
              Flat
            </p>
          </div>

          {/* PG */}
          <div
            onClick={() => setCategory("PG")}
            className={`rounded-2xl p-4 sm:p-6 transition flex flex-col items-center justify-center cursor-pointer
              bg-white/10 border border-white/10 hover:bg-white/15 hover:border-blue-500 hover:scale-[1.02]
              ${category == "PG" ? "border-2 border-blue-500 bg-white/15 shadow-lg shadow-blue-500/20" : ""}
            `}
          >
            <GraduationCap className="text-white" size={26} />
            <p className="text-white mt-2 font-semibold text-sm sm:text-base">
              PG
            </p>
          </div>

          {/* Cabin */}
          <div
            onClick={() => setCategory("Cabin")}
            className={`rounded-2xl p-4 sm:p-6 transition flex flex-col items-center justify-center cursor-pointer
              bg-white/10 border border-white/10 hover:bg-white/15 hover:border-pink-500 hover:scale-[1.02]
              ${category == "Cabin" ? "border-2 border-blue-500 bg-white/15 shadow-lg shadow-blue-500/20" : ""}
            `}
          >
            <MountainSnow className="text-white" size={26} />
            <p className="text-white mt-2 font-semibold text-sm sm:text-base">
              Cabin
            </p>
          </div>

          {/* Shops */}
          <div
            onClick={() => setCategory("Shops")}
            className={`rounded-2xl p-4 sm:p-6 transition flex flex-col items-center justify-center cursor-pointer
              bg-white/10 border border-white/10 hover:bg-white/15 hover:border-purple-500 hover:scale-[1.02]
              ${category == "Shops" ? "border-2 border-blue-500 bg-white/15 shadow-lg shadow-blue-500/20" : ""}
            `}
          >
            <Store className="text-white" size={26} />
            <p className="text-white mt-2 font-semibold text-sm sm:text-base">
              Shops
            </p>
          </div>
        </div>

        {/* Next Button UI */}
        <div className="mt-10 flex justify-center">
          <button disabled={!category} onClick={()=>navigate('/listingpage3')}  className="w-full sm:w-80 text-center py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90 transition shadow-lg cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingPage2;
