"use client";

import React from "react";
// Using lucide-react for the green checkmark
import { CheckCircle2 } from "lucide-react";

// --- 1. Define the Data Structure (TypeScript) ---
interface MoreInfoProps {
  title: string;
  features: string[];
}

// --- 2. Create Dummy Data from the Image ---
const dummyInfoData: MoreInfoProps = {
  title: "More Info",
  features: [
    "Free shipping available",
    "Easy returns & exchanges",
    "Cash on delivery",
    "Secure online payment",
    "In-store pickup available",
    "Authentic branded products",
    "Seasonal discounts",
    "Size guide available",
    "Customer support 24/7",
    "Eco-friendly packaging",
  ],
};

// --- 3. Reusable Feature Item Component ---
// This component renders the icon and the text
const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-2">
    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
    <span className="text-base text-gray-700">{text}</span>
  </div>
);

// --- 4. The Main Component ---
const MoreInfo: React.FC = () => {
  // We'll use the dummy data directly in this example
  const { title, features } = dummyInfoData;

  // This logic is to make the 3-column layout "fill" correctly
  // It divides the features into 3 columns as evenly as possible.
  // Example: 10 items -> 4, 3, 3
  //   const itemsPerColumn = Math.ceil(features.length / 3);
  //   const columns: string[][] = [
  //     features.slice(0, itemsPerColumn),
  //     features.slice(itemsPerColumn, itemsPerColumn * 2),
  //     features.slice(itemsPerColumn * 2, itemsPerColumn * 3),
  //   ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
        {/* We use a trick here: we map the columns and then map the items,
          but a simpler way for a fixed 3-column layout is to just map all items.
          The grid will handle the layout.
          Let's use the simpler (and more responsive) method.
        */}

        {features.map((feature, index) => (
          <FeatureItem key={index} text={feature} />
        ))}
      </div>
    </div>
  );
};

export default MoreInfo;
