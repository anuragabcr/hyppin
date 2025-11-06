"use client";

import React from "react";

// --- 1. Define the Data Structure (TypeScript) ---
interface ShopInfoProps {
  knownFor: string[];
  averageCost: {
    price: number;
    people: number;
    details: string; // e.g., "Without alcohol"
    notes: string; // e.g., "Exclusive of applicable taxes..."
  };
  paymentMethods: string[];
}

// --- 2. Create Dummy Data from the Image ---
const dummyShopData: ShopInfoProps = {
  knownFor: [
    "Trendy and Affordable Styles",
    "Premium Fabric Quality",
    "Wide Size Range",
    "Friendly Staff & Great Ambience",
    "Sustainable Materials",
    "Frequent New Arrivals",
  ],
  averageCost: {
    price: 2500,
    people: 1,
    details: "Approximate cost for a complete outfit",
    notes: "Prices may vary based on brand and seasonal offers",
  },
  paymentMethods: [
    "All major cards accepted",
    "UPI and digital wallets supported",
    "Cash on delivery available",
    "Easy returns and exchanges",
  ],
};

// --- 3. The Main Component ---
const ShopInfo: React.FC = () => {
  // We'll use the dummy data directly in this example
  const data = dummyShopData;

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(data.averageCost.price);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col space-y-8">
        {/* Section 1: People Say This Place Is Known For */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            People Say This Place Is Known For
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            {data.knownFor.join(", ")}
          </p>
        </div>

        {/* Section 2: Average Cost */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">Average Cost</h2>

          {/* Price Details */}
          <p className="text-lg text-gray-900">
            <span className="font-semibold">{formattedPrice}</span>
            <span className="text-gray-700">
              {" "}
              for {data.averageCost.people} people (approx.){" "}
              {data.averageCost.details}
            </span>
          </p>

          {/* Notes */}
          <p className="text-sm text-gray-500">{data.averageCost.notes}</p>

          {/* Helper Link */}
          <div>
            <a
              href="#"
              className="text-sm text-gray-400 border-b border-gray-400 border-dashed hover:text-gray-600 hover:border-gray-600 transition-colors"
            >
              How do we calculate cost for two?
            </a>
          </div>

          {/* Payment Methods */}
          <div className="pt-4 space-y-1">
            {data.paymentMethods.map((method, index) => (
              <p key={index} className="text-base text-gray-700">
                {method}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
