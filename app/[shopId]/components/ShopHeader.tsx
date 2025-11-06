"use client";

import React from "react";
import Image from "next/image";
import {
  Star,
  MapPin,
  Share2,
  MessageSquareText,
  CalendarPlus,
  Info,
  Phone,
} from "lucide-react";

// --- 1. Define the Data Structure (TypeScript) ---
interface ShopDetails {
  name: string;
  categories: string[];
  address: string;
  timings: {
    status: string;
    hours: string;
  };
  phone: string;
  morePhoneCount: number;
  ratings: {
    inStore: {
      score: number;
      count: number;
    };
    online: {
      score: number;
      count: number;
    };
  };
  images: string[]; // Expecting 3 images: [main, thumb1, thumb2]
}

// --- 2. Dummy Data based on the image ---
// Using placeholder images
const dummyShopData: ShopDetails = {
  name: "Urban Vogue Studio",
  categories: ["Women's Fashion", "Men's Wear", "Accessories", "Footwear"],
  address: "21, Indiranagar Main Road, Bengaluru, Karnataka",
  timings: {
    status: "Open now",
    hours: "10am – 9pm (Today)",
  },
  phone: "+919845612390",
  morePhoneCount: 2,
  ratings: {
    inStore: {
      score: 4.5,
      count: 1123,
    },
    online: {
      score: 4.6,
      count: 8720,
    },
  },
  images: [
    "https://placehold.co/800x600/F3E8FF/333?text=Store+Front",
    "https://placehold.co/400x300/93C5FD/333?text=Showroom+Interior",
    "https://placehold.co/400x300/F9A8D4/333?text=New+Collection",
  ],
};

// --- 3. Reusable Helper Components ---

// Green Rating Pill
const RatingPill: React.FC<{ score: number }> = ({ score }) => (
  <div className="bg-green-700 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
    <span className="font-bold text-sm">{score.toFixed(1)}</span>
    <Star className="w-3 h-3 fill-white" />
  </div>
);

// Rating Block (e.g., "Dining Ratings")
const RatingBlock: React.FC<{
  score: number;
  count: number;
  label: string;
}> = ({ score, count, label }) => (
  <div className="flex items-center gap-3">
    <RatingPill score={score} />
    <div>
      <p className="font-semibold text-gray-800">{count.toLocaleString()}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
);

// Action Button (e.g., "Direction")
const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
}> = ({ icon, label }) => (
  <button
    type="button"
    className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all"
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

// --- 4. Main ShopHeader Component ---
const ShopHeader: React.FC = () => {
  const shop = dummyShopData; // Using dummy data

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 bg-white">
      {/* Top Section: Info & Ratings */}
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
        {/* Left Side: Info */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {shop.name}
          </h1>
          <p className="text-gray-600 text-base">
            {shop.categories.join(", ")}
          </p>
          <p className="text-gray-500 text-sm">{shop.address}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="text-green-600 font-semibold">
              {shop.timings.status}
            </span>
            <div className="flex items-center gap-1 text-gray-600">
              <span>{shop.timings.hours}</span>
              <Info className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
            <div className="flex items-center gap-2 text-red-500">
              <Phone className="w-4 h-4" />
              <a href={`tel:${shop.phone}`} className="font-medium">
                {shop.phone}
              </a>
              {shop.morePhoneCount > 0 && (
                <span className="text-red-400 text-xs">
                  +{shop.morePhoneCount} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Ratings */}
        <div className="flex-shrink-0 flex items-center gap-6 pt-2">
          <RatingBlock
            score={shop.ratings.inStore.score}
            count={shop.ratings.inStore.count}
            label="In Store Ratings"
          />
          <RatingBlock
            score={shop.ratings.online.score}
            count={shop.ratings.online.count}
            label="Delivery Ratings"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <ActionButton icon={<MapPin className="w-5 h-5" />} label="Direction" />
        <ActionButton icon={<Share2 className="w-5 h-5" />} label="Share" />
        <ActionButton
          icon={<MessageSquareText className="w-5 h-5" />}
          label="Reviews"
        />
        <ActionButton
          icon={<CalendarPlus className="w-5 h-5" />}
          label="Book a table"
        />
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
        {/* Main Image */}
        <div className="md:col-span-2 w-full h-full">
          <Image
            height={450}
            width={800}
            src={shop.images[0]}
            alt={`${shop.name} main view`}
            unoptimized
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Side Images */}
        <div className="hidden md:grid grid-rows-2 gap-2 h-full">
          <Image
            height={225}
            width={400}
            src={shop.images[1]}
            alt={`${shop.name} dining area`}
            unoptimized
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="relative w-full h-full">
            <Image
              height={225}
              width={400}
              src={shop.images[2]}
              alt={`${shop.name} interior`}
              unoptimized
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              type="button"
              className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg group"
            >
              <span className="text-white text-lg font-semibold group-hover:underline">
                View Gallery
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;
