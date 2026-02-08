// import React, { useContext } from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ListingPage1 from "./pages/ListingPage1";
// import ListingPage2 from "./pages/ListingPage2";
// import ListingPage3 from "./pages/ListingPage3";
// import { userDataContext } from "./context/UserContext";

// const App = () => {
//   const { userdata } = useContext(userDataContext);

//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/listingpage1"
//           element={
//             userdata != null ? <ListingPage1 /> : <Navigate to={"/login"} />
//           }
//         />
//         <Route
//           path="/listingpage2"
//           element={
//             userdata != null ? <ListingPage2 /> : <Navigate to={"/login"} />
//           }
//         />
//         <Route
//           path="/listingpage3"
//           element={
//             userdata != null ? <ListingPage3 /> : <Navigate to={"/login"} />
//           }
//         />
//       </Routes>
//     </>
//   );
// };

// export default App;
import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ListingPage1 from "./pages/ListingPage1";
import ListingPage2 from "./pages/ListingPage2";
import ListingPage3 from "./pages/ListingPage3";
import { userDataContext } from "./context/UserContext";
import MyListing from "./pages/MyListing";
import VIewCard from "./pages/VIewCard";
import MyBooking from "./pages/MyBooking";
import Booked from "./pages/Booked";
import { Toaster } from "react-hot-toast"

const App = () => {
  const { userdata, loading } = useContext(userDataContext);
  <Toaster/>
  // ✅ Stop redirect before user loads
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/listingpage1"
        element={userdata ? <ListingPage1 /> : <Navigate to="/" />}
      />
      <Route
        path="/listingpage2"
        element={userdata ? <ListingPage2 /> : <Navigate to="/" />}
      />
      <Route
        path="/listingpage3"
        element={userdata ? <ListingPage3 /> : <Navigate to="/" />}
      />
      <Route
        path="/mylisting"
        element={userdata ? <MyListing /> : <Navigate to="/" />}
      />
       <Route
        path="/viewcard"
        element={userdata ? <VIewCard /> : <Navigate to="/" />}
      />
      <Route
        path="/mybooking"
        element={userdata ? <MyBooking /> : <Navigate to="/" />}
      />
       <Route
        path="/booked"
        element={userdata ? <Booked /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
