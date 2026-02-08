// import React from "react";
// import Nav from "../components/Nav";
// import { useContext } from "react";
// import { listingDataContext } from "../context/ListingContext";
// import Card from "../components/Card";

// const Home = () => {
//   const { listingData, setListingData, getListing } =
//     useContext(listingDataContext);
//   return (
//     <div>
//       <Nav />
//       <div className="">
//         {listingData.map((list) => (
//           <Card
//             title={list.title}
//             landMark={list.landMark}
//             city={list.city}
//             rent={list.rent}
//             image1={list.image1}
//             image2={list.image2}
//             image3={list.image3}
//             id={list._id}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import Nav from "../components/Nav";
import { useContext } from "react";
import { listingDataContext } from "../context/ListingContext";
import Card from "../components/Card";

const Home = () => {
  const { listingData, newListData, setNewListData } =
    useContext(listingDataContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Nav />

      {/* Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Heading */}
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-6">
          Explore <span className="text-pink-400">Properties</span>
        </h1>

        {/* Grid */}
        <div
          className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            place-items-center
          "
        >
          {newListData.map((list) => (
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
              ratings={list.ratings}
              isBooked={list.isBooked}
              host={list.host}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
