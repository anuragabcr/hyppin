"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  id: string;
  brand: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  href: string;
}

export default function ProductCard({
  brand,
  name,
  image,
  price,
  originalPrice,
  discount,
  rating,
  href,
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col w-full max-w-[300px] overflow-hidden rounded-xl bg-white transition-all duration-300"
    >
      <div className="relative w-full aspect-3/4 bg-gray-100 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <button className="group/wishlist absolute top-4 left-4 z-10 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all duration-300">
          <Heart
            className="h-6 w-6 transition-colors duration-300 group-hover/wishlist:fill-red-500 group-hover/wishlist:text-red-500"
            strokeWidth={2}
            fill="currentColor"
          />
        </button>

        <div className="absolute top-4 right-4 z-10 bg-[#4F7CF2] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
          {discount}% off
        </div>

        <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
          <div className="bg-brand-gradient w-full py-3 text-center text-black font-semibold text-base">
            View Product
          </div>
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-xl font-bold text-black">{brand}</h3>
        <p className="text-gray-600 mt-1">{name}</p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 line-through">
              ₹ {originalPrice}
            </span>
            <span className="text-lg font-bold text-black">₹ {price}</span>
          </div>

          <div className="flex items-center gap-1 bg-[#4E8D3E] text-white px-2 py-1 rounded-lg font-bold text-sm">
            <Star className="h-4 w-4" fill="currentColor" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
