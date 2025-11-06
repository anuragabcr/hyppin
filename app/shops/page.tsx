"use client";

import React, { useState, useEffect } from "react";
import ShopCard from "./components/ShopCard";
import { ChevronDown, SlidersHorizontal, Loader2 } from "lucide-react";
import Link from "next/link";

// data/shops.ts
export const dummyShops = [
  {
    id: 1,
    name: "H&M Fashion Studio",
    categories: ["Men", "Women", "Accessories"],
    avgPrice: 1200,
    deliveryTime: 25,
    rating: 4.5,
    imageUrl: "https://placehold.co/600x400/F7DFAE/333?text=H%26M",
    discount: "Flat 40% OFF",
    isPromoted: true,
  },
  {
    id: 2,
    name: "Zara Premium Store",
    categories: ["Women", "Western Wear"],
    avgPrice: 1500,
    deliveryTime: 30,
    rating: 4.2,
    imageUrl: "https://placehold.co/600x400/E8EAF6/333?text=Zara",
    discount: "20% OFF",
  },
  {
    id: 3,
    name: "Nike Sports Hub",
    categories: ["Shoes", "Activewear"],
    avgPrice: 2200,
    deliveryTime: 22,
    rating: 4.6,
    imageUrl: "https://placehold.co/600x400/D0E8FF/333?text=Nike",
    discount: "Flat 15% OFF",
  },
  {
    id: 4,
    name: "Adidas Originals",
    categories: ["Shoes", "Sportswear"],
    avgPrice: 2000,
    deliveryTime: 26,
    rating: 4.4,
    imageUrl: "https://placehold.co/600x400/FFF3E0/333?text=Adidas",
  },
  {
    id: 5,
    name: "Levi’s Denim House",
    categories: ["Jeans", "Casual Wear"],
    avgPrice: 1800,
    deliveryTime: 28,
    rating: 4.3,
    imageUrl: "https://placehold.co/600x400/E3FCEC/333?text=Levi%27s",
    discount: "Buy 1 Get 1 Free",
  },
];

// --- Main Component ---
const ShopsPage: React.FC = () => {
  const [shops, setShops] = useState<typeof dummyShops>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("Recommended");

  // --- Simulate API Fetch (Replace this later) ---
  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate network delay (and mimic API call)
        await new Promise((res) => setTimeout(res, 1000));

        // Replace this with: const response = await fetch("/api/shops")
        // const data = await response.json();
        const data = dummyShops;

        setShops(data);
      } catch (err) {
        console.error("Failed to fetch shops:", err);
        setError("Unable to load shops. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  // --- Sorting Logic ---
  const handleSort = (option: string) => {
    setSortOption(option);
    const sorted = [...shops];
    if (option === "Rating: High to Low") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (option === "Price: Low to High") {
      sorted.sort((a, b) => a.avgPrice - b.avgPrice);
    } else if (option === "Fast Delivery") {
      sorted.sort((a, b) => a.deliveryTime - b.deliveryTime);
    } else {
      sorted.sort((a, b) => a.id - b.id); // default sort
    }
    setShops(sorted);
  };

  // --- Conditional UI States ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
        <p className="text-gray-600 text-sm">Fetching nearby shops...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <p className="text-red-600 font-medium mb-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  // --- Main UI ---
  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- Hero / Header --- */}
      <section className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
          Shops Near You 🏬
        </h1>
        <p className="text-gray-500">
          Explore top fashion brands & stores around your area.
        </p>
      </section>

      {/* --- Toolbar --- */}
      <div className="sticky top-0 z-20 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Filter Buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            <button
              onClick={() => handleSort("Fast Delivery")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Fast Delivery
            </button>

            <button
              onClick={() => handleSort("Rating: High to Low")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Top Rated
            </button>

            <button
              onClick={() => handleSort("Price: Low to High")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Budget Friendly
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
              className="appearance-none border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option>Recommended</option>
              <option>Rating: High to Low</option>
              <option>Price: Low to High</option>
              <option>Fast Delivery</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* --- Shops Grid --- */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        {shops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shops.map((shop) => (
              <Link
                key={shop.id}
                href={`/shops/${shop.id}`}
                className="block hover:scale-[1.02] transition-transform duration-300"
              >
                <ShopCard key={shop.id} brand={shop} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20">
            No shops available in your area 😢
          </div>
        )}
      </section>
    </div>
  );
};

export default ShopsPage;
