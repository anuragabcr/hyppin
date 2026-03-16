"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

// --- 1. Dummy Data ---
const CATEGORIES = [
  "Tops",
  "Tshirts",
  "Shirts",
  "Flip Flops",
  "Dresses",
  "Skirts",
  "Jeans",
  "Shorts",
];

const BRANDS = ["glitchez", "fusion by glitchez"];

const COLORS = [
  { name: "Black", hex: "#1E293B", count: 699 },
  { name: "Blue", hex: "#2563EB", count: 554 },
  { name: "White", hex: "#FFFFFF", count: 494 },
  { name: "Green", hex: "#22C55E", count: 468 },
  { name: "Pink", hex: "#F472B6", count: 449 },
  { name: "Brown", hex: "#A0522D", count: 268 },
  { name: "Beige", hex: "#F5F5DC", count: 250 },
];

const DISCOUNTS = [
  "20% and above",
  "30% and above",
  "40% and above",
  "50% and above",
  "60% and above",
  "70% and above",
  "80% and above",
];

// --- 2. Filter Sidebar Component ---
const FilterSidebar = () => {
  const [selectedGender, setSelectedGender] = useState("Women");
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 600]);
  const [expandedCategory, setExpandedCategory] = useState(false);
  const [expandedColor, setExpandedColor] = useState(false);

  return (
    <aside className="w-72 bg-white border-r border-gray-200 p-4 space-y-6 text-sm text-gray-800">
      {/* GENDER FILTER */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="Men"
            checked={selectedGender === "Men"}
            onChange={() => setSelectedGender("Men")}
            className="accent-red-500"
          />
          Men
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="Women"
            checked={selectedGender === "Women"}
            onChange={() => setSelectedGender("Women")}
            className="accent-red-500"
          />
          Women
        </label>
      </div>

      <hr className="border-gray-200" />

      {/* CATEGORIES */}
      <FilterSection title="CATEGORIES" searchable>
        <div className="space-y-1">
          {CATEGORIES.slice(0, expandedCategory ? CATEGORIES.length : 8).map(
            (cat, i) => (
              <label
                key={i}
                className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900"
              >
                <input type="checkbox" className="accent-red-500" />
                {cat}
                <span className="text-gray-400 text-xs">(123)</span>
              </label>
            ),
          )}
          <button
            className="text-red-500 text-xs font-medium mt-1 hover:underline"
            onClick={() => setExpandedCategory(!expandedCategory)}
          >
            {expandedCategory ? "- show less" : "+ 30 more"}
          </button>
        </div>
      </FilterSection>

      <hr className="border-gray-200" />

      {/* BRAND */}
      <FilterSection title="BRAND" searchable>
        {BRANDS.map((brand, i) => (
          <label
            key={i}
            className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900"
          >
            <input type="checkbox" className="accent-red-500" />
            {brand}
            <span className="text-gray-400 text-xs">(223)</span>
          </label>
        ))}
      </FilterSection>

      <hr className="border-gray-200" />

      {/* PRICE RANGE */}
      <PriceRangeFilter range={priceRange} onChange={setPriceRange} />

      <hr className="border-gray-200" />

      {/* COLOR */}
      <FilterSection title="COLOR" searchable>
        <div className="space-y-1">
          {COLORS.slice(0, expandedColor ? COLORS.length : 7).map((c, i) => (
            <label
              key={i}
              className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900"
            >
              <input type="checkbox" className="accent-red-500" />
              <span
                className="inline-block w-3 h-3 rounded-full border"
                style={{ backgroundColor: c.hex }}
              ></span>
              {c.name}
              <span className="text-gray-400 text-xs">({c.count})</span>
            </label>
          ))}
          <button
            className="text-red-500 text-xs font-medium mt-1 hover:underline"
            onClick={() => setExpandedColor(!expandedColor)}
          >
            {expandedColor ? "- show less" : "+ 37 more"}
          </button>
        </div>
      </FilterSection>

      <hr className="border-gray-200" />

      {/* DISCOUNT RANGE */}
      <FilterSection title="DISCOUNT RANGE">
        {DISCOUNTS.map((d, i) => (
          <label
            key={i}
            className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900"
          >
            <input type="radio" name="discount" className="accent-red-500" />
            {d}
          </label>
        ))}
      </FilterSection>
    </aside>
  );
};

export default FilterSidebar;

// --- 3. Filter Section Wrapper ---
interface FilterSectionProps {
  title: string;
  searchable?: boolean;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  searchable,
  children,
}) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
        {title}
      </h3>
      {searchable && (
        <button className="text-gray-400 hover:text-gray-600">
          <Search size={14} />
        </button>
      )}
    </div>
    <div className="space-y-2 pl-1">{children}</div>
  </div>
);

// --- 4. Price Range Filter ---
interface PriceRangeFilterProps {
  range: [number, number];
  onChange: (range: [number, number]) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  range,
  onChange,
}) => {
  const handleChange = (index: number, value: number) => {
    const newRange: [number, number] =
      index === 0 ? [value, range[1]] : [range[0], value];
    onChange(newRange);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
        PRICE
      </h3>
      <div className="flex items-center justify-between text-sm font-semibold">
        <span>₹{range[0]}</span> <span>₹{range[1]}</span>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="range"
          min={100}
          max={6000}
          value={range[0]}
          onChange={(e) => handleChange(0, Number(e.target.value))}
          className="w-full accent-red-500"
        />
        <input
          type="range"
          min={100}
          max={6000}
          value={range[1]}
          onChange={(e) => handleChange(1, Number(e.target.value))}
          className="w-full accent-red-500"
        />
      </div>
    </div>
  );
};
