"use client";
import { useFilter } from "../context/FilterContext";
import { useEffect } from "react";
import { cn } from "../lib/utils";

const categories = [
  { label: "All", icon: "🛍️" },
  { label: "Men's Wear", icon: "👔" },
  { label: "Women's Wear", icon: "👗" },
  { label: "Footwear", icon: "👟" },
  { label: "Accessories", icon: "🕶️" },
  { label: "Bags & Wallets", icon: "👜" },
  { label: "Jewellery", icon: "💍" },
  { label: "Watches", icon: "⌚" },
  { label: "Kids' Fashion", icon: "🧒" },
  { label: "Winter Wear", icon: "🧥" },
  { label: "Sportswear", icon: "🏃‍♂️" },
  { label: "Ethnic Wear", icon: "🥻" },
  { label: "Lingerie & Sleepwear", icon: "🩱" },
  { label: "Beauty & Grooming", icon: "💄" },
];

export default function FilterTabs() {
  const { selectedTab, setSelectedTab } = useFilter();

  useEffect(() => {
    console.log("Filter changed:", selectedTab);
  }, [selectedTab]);

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div
        // 1. Change: Ensure tabs use 'flex-nowrap' and padding is applied to the edges
        className="flex items-center gap-8 overflow-x-auto py-3 px-4 sm:px-6 md:px-8 flex-nowrap"
      >
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setSelectedTab(cat.label)}
            className={cn(
              "flex items-center gap-2 pb-2 text-sm font-medium transition-colors duration-200",
              // 2. Change: Add whitespace-nowrap to button to prevent text wrapping
              "whitespace-nowrap",
              selectedTab === cat.label
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-600 hover:text-gray-800",
            )}
          >
            {/* The icon is an emoji, so no need for an extra span */}
            <span>{cat.icon}</span>
            <span className="text">{cat.label}</span>
          </button>
        ))}
        {/* 3. Optional: Add a simple spacer at the end for clean scrolling */}
        <div className="flex-shrink-0 w-4 sm:w-6 md:w-8" aria-hidden="true" />
      </div>
    </div>
  );
}
