"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

// --- Dummy Dropdowns ---
const DROPDOWNS = ["Bundles", "Country of Origin", "Size"];
const SORT_OPTIONS = [
  "Recommended",
  "Price: Low to High",
  "Price: High to Low",
  "Newest First",
  "Best Rating",
];

// --- Component ---
const FilterToolbar = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "Rs. 0 To Rs. 600",
  ]);
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0]);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRemoveFilter = (filter: string) =>
    setActiveFilters(activeFilters.filter((f) => f !== filter));

  const handleClearAll = () => setActiveFilters([]);

  return (
    <div className="w-full border-b border-gray-200 bg-white py-3 px-4 flex flex-wrap items-center justify-between gap-3 text-sm">
      {/* --- Left Side: Dropdowns + Active Chips --- */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Dropdowns */}
        {DROPDOWNS.map((label) => (
          <button
            key={label}
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium"
          >
            {label}
            <ChevronDown size={16} className="text-gray-400" />
          </button>
        ))}

        {/* Active Filter Chips */}
        {activeFilters.map((filter, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-gray-100 text-gray-700 border border-gray-300 rounded-full px-3 py-1.5 text-xs font-medium"
          >
            {filter}
            <button
              onClick={() => handleRemoveFilter(filter)}
              className="ml-1 hover:text-gray-900"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {/* Clear All Button */}
        {activeFilters.length > 0 && (
          <button
            onClick={handleClearAll}
            className="ml-2 text-red-500 text-xs font-semibold hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {/* --- Right Side: Sort Dropdown --- */}
      <div className="relative flex items-center" ref={dropdownRef}>
        <button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-800 font-medium hover:bg-gray-50 transition-colors min-w-[190px]"
        >
          <span>
            Sort by:{" "}
            <span className="font-semibold text-gray-900">{sortOption}</span>
          </span>
          <ChevronDown
            size={16}
            className={`ml-2 text-gray-400 transition-transform duration-200 ${
              isSortOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isSortOpen && (
          <div className="absolute right-0 top-10 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10 overflow-hidden animate-fadeIn">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSortOption(option);
                  setIsSortOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                  option === sortOption
                    ? "bg-gray-100 font-semibold text-gray-900"
                    : "text-gray-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterToolbar;
