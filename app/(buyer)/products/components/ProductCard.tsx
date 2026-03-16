"use client";

import React, { useState } from "react";
import { Star, ChevronDown, ShoppingCart } from "lucide-react";
import Image from "next/image";

// --- 1. Define Types ---
interface ColorOption {
  name: string;
  code: string;
  hex: string; // Tailwind color class
  border: string; // Tailwind border color class
}

export interface Product {
  id?: string;
  imageUrl: string;
  brand: string;
  title: string;
  rating: number;
  reviewCount: number;
  quantityBought: string;
  dealText: string;
  currentPrice: number;
  mrp: number;
  discountPercent: number;
  bankOffer: string;
  deliveryDate: string;
  colorOptions: ColorOption[];
}

// --- 2. Component ---
const ProductCard: React.FC<Product> = ({
  imageUrl,
  brand,
  title,
  rating,
  reviewCount,
  quantityBought,
  dealText,
  currentPrice,
  mrp,
  discountPercent,
  bankOffer,
  deliveryDate,
  colorOptions,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    colorOptions?.[0]?.code ?? "",
  );

  const formattedPrice = (price: number): string =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(price);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300">
      {/* --- A. Image Area --- */}
      <div className="relative aspect-[3/4] bg-gray-50 flex items-center justify-center">
        <Image
          height={400}
          width={300}
          src={imageUrl}
          alt={title || "Product image"}
          className="w-full h-full object-cover"
          unoptimized
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.src =
              "https://placehold.co/600x800/cccccc/000000?text=Product+Image";
          }}
        />

        {/* Optional Overlay Tag */}
        {dealText && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm uppercase">
            {dealText}
          </div>
        )}
      </div>

      {/* --- B. Content Area --- */}
      <div className="p-4 space-y-3">
        {/* Color Options */}
        {colorOptions?.length > 0 && (
          <div className="flex items-center space-x-2">
            {colorOptions.map((color) => (
              <button
                key={color.code}
                onClick={() => setSelectedColor(color.code)}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  selectedColor === color.code
                    ? color.border
                    : "border-gray-300"
                } flex items-center justify-center p-0.5`}
                aria-label={`Select color ${color.name}`}
              >
                <span
                  className={`w-full h-full rounded-full ${color.hex} border border-gray-100`}
                ></span>
              </button>
            ))}
          </div>
        )}

        {/* Brand and Title */}
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-tight">
          {brand}
        </p>
        <h2 className="text-base font-medium text-gray-900 leading-snug line-clamp-2">
          {title}
        </h2>

        {/* Ratings and Quantity */}
        <div className="flex flex-col space-y-1">
          <div className="flex items-center text-sm space-x-2">
            <div className="flex items-center text-blue-600 font-semibold">
              {rating.toFixed(1)}
              <Star className="w-4 h-4 fill-blue-600 stroke-none ml-1" />
              <ChevronDown className="w-3 h-3 ml-1" />
            </div>
            <span className="text-gray-500">({reviewCount})</span>
          </div>
          <p className="text-green-600 text-sm font-medium">
            {quantityBought} bought in past month
          </p>
        </div>

        {/* Pricing */}
        <div>
          <div className="flex items-baseline space-x-2 mb-1">
            <span className="text-2xl font-extrabold text-gray-900">
              {formattedPrice(currentPrice).replace(".00", "")}
            </span>
            <span className="text-sm text-gray-500 line-through">
              M.R.P: {formattedPrice(mrp)}
            </span>
            <span className="text-sm font-bold text-red-500">
              ({discountPercent}% off)
            </span>
          </div>
          <p className="text-sm text-gray-700">{bankOffer}</p>
          <p className="text-sm font-semibold text-green-600">
            FREE delivery {deliveryDate}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 bg-yellow-400 text-gray-900 font-semibold rounded-md shadow hover:bg-yellow-500 transition-colors">
          <ShoppingCart className="w-5 h-5" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
