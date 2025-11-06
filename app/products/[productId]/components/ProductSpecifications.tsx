"use client";

import React from "react";

// --- 1. Define Data Structure ---
interface SpecItem {
  label: string;
  value: string;
}

interface SpecCategory {
  title: string;
  items: SpecItem[];
}

// --- 2. Dummy Data (Structured from the image) ---
const SPEC_DATA: SpecCategory[] = [
  {
    title: "General",
    items: [
      { label: "Sales Package", value: "1 wall clock" },
      { label: "Model Number", value: "SAA" },
      {
        label: "Model Name",
        value:
          "Beautiful 3D designer decorative attractive wall elegant premium wall clock",
      },
      { label: "Pack of", value: "1" },
      { label: "Dial Color", value: "White" },
      { label: "Net Quantity", value: "1" },
    ],
  },
  {
    title: "Warranty",
    items: [{ label: "Warranty Summary", value: "No Warranty Applicable" }],
  },
  // Add more categories if needed, e.g., 'Dimensions', 'Power Features'
];

// --- 3. Component to Render a Single Category Table ---
const SpecTable: React.FC<{ category: SpecCategory }> = ({ category }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">
      {category.title}
    </h2>
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {category.items.map((item, index) => (
        <div
          key={item.label}
          className={`flex text-sm p-3 ${
            index % 2 === 0 ? "bg-white" : "bg-gray-50" // Alternating row colors
          } border-b border-gray-200 last:border-b-0`}
        >
          {/* Label (Left Column) */}
          <div className="w-1/3 font-medium text-gray-500 pr-4">
            {item.label}
          </div>
          {/* Value (Right Column) */}
          <div className="w-2/3 text-gray-800">{item.value}</div>
        </div>
      ))}
    </div>
  </div>
);

// --- 4. Main Product Specifications Component ---
const ProductSpecifications: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 bg-white w-full max-w-4xl mx-auto">
      {/* Main Heading */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Specifications</h1>

      {/* Render all specification categories */}
      {SPEC_DATA.map((category, index) => (
        <SpecTable key={index} category={category} />
      ))}

      {/* Footer Link */}
      <div className="pt-4 border-t border-gray-200">
        <a
          href="#"
          className="text-blue-600 font-semibold hover:underline text-base"
        >
          Manufacturing, Packaging and Import Info
        </a>
      </div>
    </div>
  );
};

export default ProductSpecifications;
