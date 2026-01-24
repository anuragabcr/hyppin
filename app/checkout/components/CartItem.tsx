import React from "react";
import Image from "next/image";
import { X, Star, ChevronDown } from "lucide-react";

export interface CartItemProps {
  brand: string;
  productName: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  rating: number;
  imageSrc: string;
  size: string | number;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({
  brand,
  productName,
  originalPrice,
  discountedPrice,
  discountPercentage,
  rating,
  imageSrc,
  size,
  quantity,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header Info */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
          {brand}
        </h2>
        <span className="text-blue-600 font-medium">
          Delivery within 40 mins
        </span>
      </div>

      {/* Card Container */}
      <div className="relative border border-gray-200 rounded-2xl p-4 flex gap-4 bg-white shadow-sm">
        {/* Product Image */}
        <div className="relative w-32 h-40 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={imageSrc}
            alt={productName}
            fill
            className="object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-black uppercase">
                {brand}
              </h3>
              <p className="text-gray-600 text-lg">{productName}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-green-700 text-white px-2 py-1 rounded-md flex items-center gap-1 text-sm font-bold">
                <Star size={14} fill="currentColor" />
                {rating.toFixed(1)}
              </div>
              <button className="text-gray-400 hover:text-black transition-colors">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Selectors */}
          <div className="flex gap-3 mt-4">
            <button className="flex items-center justify-between gap-2 bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200 text-sm font-medium min-w-[100px]">
              Size : {size} <ChevronDown size={16} />
            </button>
            <button className="flex items-center justify-between gap-2 bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200 text-sm font-medium min-w-20">
              Qty : {quantity} <ChevronDown size={16} />
            </button>
          </div>

          {/* Pricing */}
          <div className="mt-auto flex items-center gap-3">
            <span className="text-gray-500 line-through text-lg">
              ₹ {originalPrice}
            </span>
            <span className="text-black font-bold text-xl">
              ₹ {discountedPrice}
            </span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              {discountPercentage}% OFF
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
