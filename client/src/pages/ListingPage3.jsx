import React, { useContext } from "react";
import { MapPin } from "lucide-react";
import { listingDataContext } from "../context/ListingContext";

const ListingPage3 = () => {
  const {
    title,
    setTitle,
    desc,
    setDesc,
    rent,
    setRent,
    city,
    setCity,
    landmark,
    setlandmark,
    category,
    setCategory,
    frontendiamge1,
    setFrontendiamge1,
    frontendiamge2,
    setFrontendiamge2,
    frontendiamge3,
    setFrontendiamge3,
    backendiamge1,
    setBackendiamge1,
    backendiamge2,
    setBackendiamge2,
    backendiamge3,
    setBackendiamge3,
    handleaddListing,
    adding,
    setAdding
  } = useContext(listingDataContext);
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-3 sm:px-6 py-10">
      <div className="w-full max-w-6xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Location */}
        <div className="px-6 sm:px-10 pt-8 pb-4">
          <div className="flex items-center gap-2 text-gray-200 text-sm sm:text-base font-semibold">
            <MapPin size={18} className="text-pink-400" />
            <h2 className="tracking-wide uppercase">{`In ${landmark.toUpperCase()},${city.toUpperCase()}`}</h2>
          </div>
        </div>

        {/* Main Image Grid */}
        <div className="px-6 sm:px-10 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Big Image */}
            <div className="md:col-span-2 rounded-2xl overflow-hidden border border-white/10 bg-white/10">
              <img
                className="w-full h-[240px] sm:h-[320px] md:h-[360px] object-cover"
                src={frontendiamge1}
                alt="Main Villa"
              />
            </div>

            {/* Right Small Images */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/10">
                <img
                  className="w-full h-[160px] sm:h-[170px] md:h-[170px] object-cover"
                  src={frontendiamge2}
                  alt="Kitchen"
                />
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/10">
                <img
                  className="w-full h-[160px] sm:h-[170px] md:h-[170px] object-cover"
                  src={frontendiamge3}
                  alt="Living Area"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="px-6 sm:px-10 pb-10">
          <h3 className="text-white font-bold text-lg sm:text-xl tracking-wide uppercase">
            {`${title.toUpperCase()},${category.toUpperCase()},${landmark.toLowerCase()}`}
          </h3>

          <p className="text-gray-300 mt-2 text-sm sm:text-base uppercase">
            {`${desc.toUpperCase()}`}
          </p>

          <p className="text-white mt-3 text-xl sm:text-2xl font-extrabold">
            ₹ {`${rent}`}
            <span className="text-gray-400 text-sm sm:text-base font-medium">
              /day
            </span>
          </p>

          {/* Add Listing Button */}
          <div className="mt-6">
            <button
              onClick={handleaddListing} 
              disabled={adding}
              className="w-full sm:w-80 text-center py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90 transition shadow-lg cursor-pointer"
            >
              {adding ? "Adding...": "Add Listing"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPage3;
