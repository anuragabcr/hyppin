"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

// --- 1. Define the Data Structure ---
// Based on the info in each card
interface Brand {
  id: number;
  name: string;
  categories: string[];
  avgPrice: number;
  deliveryTime: number;
  rating: number;
  imageUrl: string;
  discount?: string; // e.g., "50% OFF"
  isPromoted?: boolean;
}

// --- 2. Create Dummy Data from the Image ---
// Using placeholder images for demonstration
const fashionBrands: Brand[] = [
  {
    id: 1,
    name: "H&M",
    categories: ["Casual Wear", "Jeans", "Shirts"],
    avgPrice: 1200,
    deliveryTime: 3,
    rating: 4.3,
    imageUrl: "https://placehold.co/400x300/F2C744/FFF?text=H%26M",
    discount: "Flat 20% OFF",
    isPromoted: true,
  },
  {
    id: 2,
    name: "ZARA",
    categories: ["Formal", "Casual", "Accessories"],
    avgPrice: 2500,
    deliveryTime: 4,
    rating: 4.4,
    imageUrl: "https://placehold.co/400x300/000000/FFF?text=ZARA",
    discount: "Up to 30% OFF",
    isPromoted: false,
  },
  {
    id: 3,
    name: "Levi’s",
    categories: ["Denim", "T-Shirts", "Jackets"],
    avgPrice: 2000,
    deliveryTime: 3,
    rating: 4.5,
    imageUrl: "https://placehold.co/400x300/2E2E2E/FFF?text=Levi%27s",
    discount: "Flat 25% OFF",
    isPromoted: true,
  },
  {
    id: 4,
    name: "Nike",
    categories: ["Sportswear", "Shoes", "Accessories"],
    avgPrice: 3000,
    deliveryTime: 2,
    rating: 4.6,
    imageUrl: "https://placehold.co/400x300/111111/FFF?text=NIKE",
    discount: "Flat 15% OFF",
    isPromoted: true,
  },
  {
    id: 5,
    name: "Adidas",
    categories: ["Athleisure", "Sneakers", "Tracksuits"],
    avgPrice: 2800,
    deliveryTime: 2,
    rating: 4.5,
    imageUrl: "https://placehold.co/400x300/0A50B0/FFF?text=ADIDAS",
    discount: "Up to 40% OFF",
    isPromoted: false,
  },
  {
    id: 6,
    name: "Calvin Klein",
    categories: ["Luxury", "Perfumes", "Innerwear"],
    avgPrice: 3500,
    deliveryTime: 5,
    rating: 4.7,
    imageUrl: "https://placehold.co/400x300/202020/FFF?text=Calvin+Klein",
    discount: "Flat 10% OFF",
    isPromoted: true,
  },
];

// --- 3. Create the Reusable ShopCard Component ---

// Helper function for dynamic rating color
const getRatingColor = (rating: number) => {
  if (rating >= 4.0) return "bg-green-600";
  if (rating >= 3.0) return "bg-yellow-500";
  return "bg-red-600"; // For ratings below 3
};

const ShopCard: React.FC<{ brand: Brand }> = ({ brand }) => {
  return (
    // Card Wrapper
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      {/* Image Section with Overlays */}
      <div className="relative w-full h-52">
        {/* The Image */}
        <Image
          height={200}
          width={200}
          src={brand.imageUrl}
          alt={brand.name}
          unoptimized
          className="w-full h-full object-cover"
        />

        {/* Discount Tag */}
        {brand.discount && (
          <span className="absolute bottom-4 left-4 bg-blue-600 text-white text-base font-bold px-3 py-1 rounded-md">
            {brand.discount}
          </span>
        )}

        {/* Rating Tag */}
        <div
          className={`absolute bottom-4 right-4 ${getRatingColor(
            brand.rating,
          )} text-white px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md`}
        >
          <span className="text-sm font-bold">{brand.rating.toFixed(1)}</span>
          <FaStar className="w-3 h-3" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 truncate">
          {brand.name}
        </h3>

        {/* Cuisines */}
        <p className="text-base text-gray-600 truncate">
          {brand.categories.join(", ")}
        </p>

        {/* Price & Time */}
        <div className="flex justify-between items-center text-sm text-gray-500 mt-3 border-t pt-3">
          <span>₹{brand.avgPrice} for one</span>
          <span>{brand.deliveryTime} min</span>
        </div>
      </div>
    </div>
  );
};

// --- 4. Create the Main Listing Page Component ---
const ShopListing: React.FC = () => {
  return (
    <div className="bg-gray-100 w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Fashion brands in Bengaluru
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fashionBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/${brand.id}`}
              className="block hover:scale-[1.02] transition-transform duration-300"
            >
              <ShopCard brand={brand} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopListing;
