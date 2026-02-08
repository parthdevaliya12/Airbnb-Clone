import React, { useContext } from "react";
import { ImagePlus, MapPin, Home, IndianRupee, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../context/ListingContext";

const ListingPage1 = () => {
  const navigate = useNavigate();

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
  } = useContext(listingDataContext);

  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setBackendiamge1(file);
    setFrontendiamge1(URL.createObjectURL(file));
  };
  const handleImage2 = (e) => {
    const file = e.target.files[0];
    setBackendiamge2(file);
    setFrontendiamge2(URL.createObjectURL(file));
  };
  const handleImage3 = (e) => {
    const file = e.target.files[0];
    setBackendiamge3(file);
    setFrontendiamge3(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-3 sm:px-6 py-10">
      <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-10 py-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Add New Listing
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Fill all details to publish your property listing.
            </p>
          </div>

          {/* Back to Home Button */}
          <button
            onClick={() => navigate("/")}
            type="button"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>

        {/* Form */}
        <form
          className="px-6 sm:px-10 py-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault()
            navigate("/listingpage2");
          }}
        >
          {/* Title */}
          <div>
            <label className="text-gray-300 text-sm">Title</label>
            <div className="mt-2 flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus-within:border-pink-500 transition">
              <Home className="text-gray-300 w-5 h-5" />
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="e.g. Luxury 2BHK Flat near Metro"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-sm"
              required/>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-300 text-sm">Description</label>
            <div className="mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus-within:border-purple-500 transition">
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                rows="4"
                placeholder="Write property details, facilities, nearby places..."
                className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-sm resize-none"
              required></textarea>
            </div>
          </div>

          {/* Rent */}
          <div>
            <label className="text-gray-300 text-sm">Rent (₹)</label>
            <div className="mt-2 flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus-within:border-blue-500 transition">
              <IndianRupee className="text-gray-300 w-5 h-5" />
              <input
                onChange={(e) => setRent(e.target.value)}
                value={rent}
                type="number"
                placeholder="e.g. 15000"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-sm"
                required
              />
            </div>
          </div>

          {/* Landmark + City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Landmark */}
            <div>
              <label className="text-gray-300 text-sm">Landmark</label>
              <div className="mt-2 flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus-within:border-purple-500 transition">
                <MapPin className="text-gray-300 w-5 h-5" />
                <input
                  onChange={(e) => setlandmark(e.target.value)}
                  value={landmark}
                  type="text"
                  placeholder="e.g. Near Metro Station"
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-sm"
                required/>
              </div>
            </div>

            {/* City */}
            <div>
              <label className="text-gray-300 text-sm">City</label>
              <div className="mt-2 flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus-within:border-blue-500 transition">
                <MapPin className="text-gray-300 w-5 h-5" />
                <input
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  type="text"
                  placeholder="e.g. Ahmedabad"
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-sm"
                required/>
              </div>
            </div>
          </div>

          {/* Images Upload */}
          <div>
            <label className="text-gray-300 text-sm">
              Upload Property Images (3)
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3">
              {/* Image 1 */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 hover:border-pink-500 transition">
                <div className="flex items-center gap-2 text-gray-200 font-semibold">
                  <ImagePlus size={18} />
                  <span>Image 1</span>
                </div>
                <input
                  type="file"
                  onChange={handleImage1}
                  className="mt-3 w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-pink-500 file:via-purple-500 file:to-blue-500 file:text-white hover:file:opacity-90 cursor-pointer"
                required/>
              </div>

              {/* Image 2 */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 hover:border-purple-500 transition">
                <div className="flex items-center gap-2 text-gray-200 font-semibold">
                  <ImagePlus size={18} />
                  <span>Image 2</span>
                </div>
                <input
                  onChange={handleImage2}
                  type="file"
                  className="mt-3 w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-pink-500 file:via-purple-500 file:to-blue-500 file:text-white hover:file:opacity-90 cursor-pointer"
                required/>
              </div>

              {/* Image 3 */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 hover:border-blue-500 transition">
                <div className="flex items-center gap-2 text-gray-200 font-semibold">
                  <ImagePlus size={18} />
                  <span>Image 3</span>
                </div>
                <input
                  onChange={handleImage3}
                  type="file"
                  className="mt-3 w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-pink-500 file:via-purple-500 file:to-blue-500 file:text-white hover:file:opacity-90 cursor-pointer"
                required/>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90 transition shadow-lg"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListingPage1;
