"use client";

import React from "react";

// --- 1. Define the Data Structure (TypeScript) ---
interface ReviewHighlightsProps {
  title: string;
  // Array of strings, e.g., ["Popcorn Chicken", "Good Wifi"]
  highlights: string[];
}

// --- 2. Create Dummy Data from the Image ---
const dummyHighlightsData: ReviewHighlightsProps = {
  title: "Review Highlights",
  highlights: [
    "Premium Fabric Quality",
    "Perfect Fit",
    "Trendy Designs",
    "Value for Money",
    "Fast Delivery",
    "True to Size",
    "Comfortable to Wear",
    "Great Color Options",
    "Stylish Packaging",
    "Excellent Customer Service",
  ],
};

// --- 3. The Main Component ---
const ReviewHighlights: React.FC = () => {
  const { title, highlights } = dummyHighlightsData;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 bg-white">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>

      {/* Highlights Container */}
      {/*
        Using 'flex flex-wrap' allows the tags to flow naturally across the screen.
        'gap-3' provides the horizontal and vertical spacing seen in the image.
      */}
      <div className="flex flex-wrap gap-3">
        {highlights.map((highlight, index) => (
          // Individual Tag/Bubble Button
          <button
            key={index}
            type="button"
            className="
              px-4 py-2
              text-base font-medium text-gray-700
              bg-white
              rounded-full
              border border-gray-300
              shadow-sm
              transition-colors duration-150
              hover:bg-gray-50 hover:border-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            "
            // You can add an onClick handler here to filter reviews
            onClick={() => console.log(`Filter by: ${highlight}`)}
          >
            {highlight}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReviewHighlights;
