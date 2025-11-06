"use client";

import React from "react";
// Using lucide-react for the background icons
import { Percent, Cloud } from "lucide-react";

// --- 1. Define the Data Structure (TypeScript) ---

// This interface is designed to be flexible and handle all card variations
interface Offer {
  id: number;
  // The small blue/dark blue text, e.g., "PRE-BOOK OFFER"
  title: string;
  // The main large text, e.g., "Flat 10% OFF"
  mainText: string;
  // An optional bold part of the main text, e.g., "₹5000"
  mainTextHighlight?: string;
  // The text appearing below the main text, e.g., "Valid from..." or "on Solitaire..."
  subText?: string;
  // The smallest text at the bottom, e.g., "Booking required"
  finePrint: string;
  // 'primary' is the solid blue, 'secondary' is the white card
  variant: "primary" | "secondary";
  // The faint background graphic
  bgGraphic?: "percent" | "cloud";
}

// --- 2. Create Dummy Data from the Image ---
const dummyOffers: Offer[] = [
  {
    id: 1,
    title: "NEW SEASON SALE",
    mainText: "Flat 40% OFF",
    subText: "on Summer Collection",
    finePrint: "Limited time offer",
    variant: "primary",
    bgGraphic: "percent",
  },
  {
    id: 2,
    title: "FIRST PURCHASE REWARD",
    mainText: "Get ₹500 OFF",
    subText: "on your first order above ₹2499",
    finePrint: "Use code WELCOME500",
    variant: "secondary",
    bgGraphic: "cloud",
  },
  {
    id: 3,
    title: "FESTIVE OFFER",
    mainText: "Buy 2 Get 1 Free",
    subText: "across all ethnic wear",
    finePrint: "Add 3 items to cart to avail offer",
    variant: "secondary",
    bgGraphic: "cloud",
  },
  {
    id: 4,
    title: "BANK CASHBACK",
    mainText: "15% Instant Cashback",
    mainTextHighlight: "up to ₹2000",
    subText: "on HDFC and ICICI credit cards",
    finePrint: "Applicable on orders above ₹2999",
    variant: "secondary",
    bgGraphic: "percent",
  },
];

// --- 3. Create the Reusable OfferCard Component ---

const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => {
  // Base styles for all cards
  const baseClasses =
    "relative w-full p-5 rounded-2xl shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 overflow-hidden min-h-[220px] text-left";

  // Variant-specific styles
  const variantClasses = {
    primary: "bg-blue-600 text-white",
    secondary: "bg-white text-gray-900 border border-gray-200",
  };

  const titleClasses = {
    primary: "text-blue-100 font-semibold",
    secondary: "text-blue-600 font-bold",
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses[offer.variant]}`}
    >
      {/* Background Graphic */}
      {offer.bgGraphic === "percent" && (
        <Percent className="absolute -right-10 -bottom-8 w-48 h-48 text-white/5" />
      )}
      {offer.bgGraphic === "cloud" && (
        <Cloud className="absolute -right-6 bottom-4 w-40 h-40 text-gray-500/5" />
      )}

      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Title */}
        <span className={`text-sm uppercase ${titleClasses[offer.variant]}`}>
          {offer.title}
        </span>

        {/* Main Text */}
        <div className="mt-3 mb-2">
          <p className="text-2xl font-bold">
            {offer.mainText}{" "}
            {offer.mainTextHighlight && (
              <span className="text-3xl">{offer.mainTextHighlight}</span>
            )}
          </p>
          {offer.subText && (
            <p
              className={`text-sm mt-1 ${
                offer.variant === "primary" ? "text-blue-50" : "text-gray-700"
              }`}
            >
              {offer.subText}
            </p>
          )}
        </div>

        {/* Fine Print (pushed to bottom) */}
        <p
          className={`mt-auto text-sm ${
            offer.variant === "primary" ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {offer.finePrint}
        </p>
      </div>
    </button>
  );
};

// --- 4. Create the Main Offers Component ---
const DiningOffers: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 rounded-lg shadow-sm border border-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Dining Offers</h2>
        <p className="text-gray-600 mt-1">Tap on any offer to know more</p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
};

export default DiningOffers;
