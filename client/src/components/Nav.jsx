import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Search,
  Menu,
  UserCircle,
  Flame,
  Home,
  Building2,
  Waves,
  BedDouble,
  Hotel,
  GraduationCap,
  MountainSnow,
  Store,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { listingDataContext } from "../context/ListingContext";
import toast from "react-hot-toast";

const Nav = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [input, setInput] = useState("");
  const popupRef = useRef(null);
  const [cat, setCat] = useState();
  const navigate = useNavigate();
  const {
    listingData,
    setListingData,
    newListData,
    setNewListData,
    handleSearch,
    searchData,
  } = useContext(listingDataContext);

  const { serverUrl } = useContext(authDataContext);

  const { userdata, setUserData } = useContext(userDataContext);

  const handlelogout = async () => {
    try {
      const result = await axios.post(serverUrl + "/auth/logout", {
        withCredentials: true,
      });

      setUserData(null);
      navigate("/login");
      toast.success("Logout successful!");
      console.log(result.data);
    } catch (error) {
      console.log(error);
      toast.error("Logout failed!");
    }
  };

  const handleCategory = async (category) => {
    try {
      setCat(category);
      if (category == "Trending") {
        setNewListData(listingData);
      } else {
        setNewListData(listingData.filter((list) => list.category == category));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch(input);
  }, [input]);

  // When search results change, update the displayed list
  useEffect(() => {
    if (!input || input.trim() === "") {
      setNewListData(listingData);
    } else if (searchData && Array.isArray(searchData)) {
      setNewListData(searchData);
    }
  }, [searchData, input, listingData]);
  // close popup when click outside
  useEffect(() => {
    const handleOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpenPopup(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <header className="w-full bg-gradient-to-br from-black via-gray-900 to-black border-b border-white/10">
      {/* TOP NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Left Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
            E
          </div>
          <h1 className="text-white font-extrabold text-2xl tracking-wide">
            Estate<span className="text-pink-400">X</span>
          </h1>
        </div>

        {/* Center Search (Desktop only) */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="w-full max-w-xl flex items-center justify-between gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-lg shadow-lg">
            <div className="flex items-center gap-3 text-gray-200 text-sm font-medium">
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Search property..."
                className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-sm px-2"
              />
            </div>

            <button className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center text-white">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 relative" ref={popupRef}>
          {/* <button onClick={()=>navigate('/addlistin')} className="hidden sm:block text-white/90 font-medium text-sm hover:bg-white/10 px-4 py-2 rounded-full transition">
            List your home
          </button> */}

          {/* ✅ CLICK BUTTON FOR POPUP */}
          <button
            onClick={() => setOpenPopup(!openPopup)}
            className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 py-2 hover:bg-white/20 transition"
          >
            <Menu size={18} className="text-white" />
            {userdata == null && ""}
            {userdata != null && (
              <span className="rounded-full text-white mb-1 text-md font-bold">
                {userdata?.name.slice(0, 1).toUpperCase()}
              </span>
            )}
          </button>

          {/* ✅ POPUP MENU */}
          {openPopup && (
            <div
              className="
                absolute right-0 top-12 z-50 w-60
                rounded-xl overflow-hidden
                bg-white shadow-xl border border-gray-200
              "
            >
              {!userdata && (
                <button
                  onClick={() => navigate("/login")}
                  className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-100 transition text-sm font-medium"
                >
                  Login
                </button>
              )}

              {userdata && (
                <button
                  onClick={handlelogout}
                  className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-100 transition text-sm font-medium"
                >
                  Logout
                </button>
              )}

              <div className="h-[1px] bg-gray-200"></div>

              <button
                onClick={() => navigate("/listingpage1")}
                className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-100 transition text-sm font-medium"
              >
                Add Listing
              </button>

              <button
                onClick={() => navigate("/mylisting")}
                className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-100 transition text-sm font-medium"
              >
                My Listing
              </button>

              <button
                onClick={() => navigate("/mybooking")}
                className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-100 transition text-sm font-medium"
              >
                My Booking
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 sm:px-6 pb-4">
        <div className="w-full flex items-center justify-between gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-lg">
          <div className="flex items-center gap-2 text-gray-200 text-sm font-medium">
            <input
              type="text"
                onChange={(e) => setInput(e.target.value)}
              placeholder="Search property..."
              className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-sm px-2"
            />
          </div>

          
        </div>
      </div>

      {/* CATEGORY ROW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
        <div className="flex items-center justify-between gap-6 overflow-x-auto scrollbar-hide">
          {/* Category 1 */}
          <div
            onClick={() => { handleCategory("Trending"); setCat(""); }}
            className="flex flex-col items-center min-w-[70px] text-white/70 hover:text-white cursor-pointer transition"
          >
            <Flame size={20} />
            <p className="text-xs mt-1 font-medium">Trending</p>
          </div>

          {/* Category 2 */}
          <div
            onClick={() => handleCategory("Villa")}
            className={`flex flex-col items-center min-w-[70px] text-white/70 hover:text-white cursor-pointer transition ${cat == "Villa" ? "border-b-[1px] border-purple-500" : ""}`}
          >
            <Home size={20} />
            <p className="text-xs mt-1 font-medium">Villa</p>
          </div>

          {/* Category 3 */}
          <div
            onClick={() => handleCategory("FarmHouse")}
            className={`flex flex-col items-center min-w-[70px] text-white/70 hover:text-white cursor-pointer transition ${cat == "FarmHouse" ? "border-b-[1px] border-purple-500" : ""}`}
          >
            <Building2 size={20} />
            <p className="text-xs mt-1 font-medium">Farm House</p>
          </div>

          {/* Category 4 */}
          <div
            onClick={() => handleCategory("PoolHouse")}
            className={`flex flex-col items-center min-w-[70px] text-white/70 hover:text-white cursor-pointer transition ${cat == "PoolHouse" ? "border-b-[1px] border-purple-500" : ""}`}
          >
            <Waves size={20} />
            <p className="text-xs mt-1 font-medium">Pool House</p>
          </div>

          {/* Category 5 */}
          <div
            onClick={() => handleCategory("Rooms")}
            className={`flex flex-col items-center min-w-[70px] text-white/70 hover:text-white cursor-pointer transition ${cat == "Rooms" ? "border-b-[1px] border-purple-500" : ""}`}
          >
            <BedDouble size={20} />
            <p className="text-xs mt-1 font-medium">Rooms</p>
          </div>

          {/* Category 6 */}
          <div
            onClick={() => handleCategory("FarmHouse")}
            className={`flex flex-col items-center min-w-[70px] text-white/70 hover:text-white cursor-pointer transition ${cat == "Flat" ? "border-b-[1px] border-purple-500" : ""}`}
          >
            <Hotel size={20} />
            <p className="text-xs mt-1 font-medium">Flat</p>
          </div>

          {/* Category 7 */}
          <div
            onClick={() => handleCategory("PG")}
            className={`flex flex-col items-center min-w-[70px] text-white/70 hover:text-white cursor-pointer transition ${cat == "PG" ? "border-b-[1px] border-purple-500" : ""}`}
          >
            <GraduationCap size={20} />
            <p className="text-xs mt-1 font-medium">PG</p>
          </div>

          {/* Category 8 */}
          <div
            onClick={() => handleCategory("Cabin")}
            className={`flex flex-col items-center min-w-[70px] text-white/70 hover:text-white cursor-pointer transition ${cat == "Cabin" ? "border-b-[1px] border-purple-500" : ""}`}
          >
            <MountainSnow size={20} />
            <p className="text-xs mt-1 font-medium">Cabins</p>
          </div>

          {/* Category 9 */}
          <div
            onClick={() => handleCategory("Shops")}
            className={`flex flex-col items-center min-w-[70px] text-white/70 hover:text-white cursor-pointer transition ${cat == "Shops" ? "border-b-[1px] border-purple-500" : ""}`}
          >
            <Store size={20} />
            <p className="text-xs mt-1 font-medium">Shops</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
