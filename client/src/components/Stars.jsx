import React, { useState } from "react";
import {  Star } from "lucide-react";

const Stars = ({ starValue = 5, onRate }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[...Array(starValue)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hover || rating);
        return (
          <span
            key={starValue}
            onClick={() => {
              setRating(starValue);
              onRate && onRate(starValue);
            }}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            <Star className={`cursor-pointer text-2xl ${isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}/>
          </span>
        );
      })}
    </div>
  );
};

export default Stars;
