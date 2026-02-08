import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { authDataContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const listingDataContext = createContext();

const ListingContext = ({ children }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rent, setRent] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setlandmark] = useState("");
  const [category, setCategory] = useState("");
  const [frontendiamge1, setFrontendiamge1] = useState(null);
  const [frontendiamge2, setFrontendiamge2] = useState(null);
  const [frontendiamge3, setFrontendiamge3] = useState(null);
  const [backendiamge1, setBackendiamge1] = useState(null);
  const [backendiamge2, setBackendiamge2] = useState(null);
  const [backendiamge3, setBackendiamge3] = useState(null);
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [listingData, setListingData] = useState([]);
  const [newListData, setNewListData] = useState([]);
  const [cardDetails, setCardDetails] = useState(null);
  const [searchData, setSearchData] = useState([]);

  const { serverUrl } = useContext(authDataContext);

  const navigate = useNavigate();

  const handleaddListing = async () => {
    setAdding(true);
    try {
      if (!title || !desc || !rent || !city || !landmark || !category) {
        alert("Please fill all fields and select category!");
        return;
      }

      if (!backendiamge1 || !backendiamge2 || !backendiamge3) {
        alert("Please upload all 3 images!");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landMark", landmark);
      formData.append("category", category);

      if (backendiamge1) {
        formData.append("image1", backendiamge1);
      }
      if (backendiamge2) {
        formData.append("image2", backendiamge2);
      }
      if (backendiamge3) {
        formData.append("image3", backendiamge3);
      }

      const result = await axios.post(serverUrl + "/listing/add", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAdding(false);
      // alert("✅ Listing Added Successfully!");
      toast.success("Listing added successfully!");
      console.log(result.data);
      navigate("/");
      setTitle("");
      setDesc("");
      setRent("");
      setCity("");
      setlandmark("");
      setCategory("");
      setFrontendiamge1(null);
      setFrontendiamge2(null);
      setFrontendiamge3(null);
      setBackendiamge1(null);
      setBackendiamge2(null);
      setBackendiamge3(null);
    } catch (error) {
      console.log(error.response?.data?.message);
      setAdding(false);
      toast.error(error.response?.data?.message || "Failed to add listing");
    }
  };

  const getListing = async () => {
    try {
      const result = await axios.get(serverUrl + "/listing/get", {
        withCredentials: true,
      });
      setListingData(result.data);
      setNewListData(result.data);
      // console.log(result.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch listings");
    }
  };

  const handleSearch = async (data) => {
    try {
      const result = await axios.get(
        serverUrl + `/listing/search?query=${data}`,
        {
          withCredentials: true,
        },
      );
      setSearchData(result.data);
      console.log("Search results:", result.data);
    } catch (error) {
      console.log(error);
      setSearchData(null);
    }
  };

  const handleViewCard = async (id) => {
    try {
      const result = await axios.get(
        serverUrl + `/listing/findlistingbyid/${id}`,
        { withCredentials: true },
      );
      console.log(result);
      setCardDetails(result.data);
      navigate("/viewcard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListing();
  }, [adding, updating, deleting]);

  const value = {
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
    setAdding,
    listingData,
    setListingData,
    getListing,
    newListData,
    setNewListData,
    handleViewCard,
    cardDetails,
    setCardDetails,
    updating,
    setUpdating,
    deleting,
    setDeleting,
    handleSearch,
    searchData,
  };

  return (
    <listingDataContext.Provider value={value}>
      {children}
    </listingDataContext.Provider>
  );
};

export default ListingContext;
