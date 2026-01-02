"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

interface StoreCardProps {
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

export default function StoreCard({
  brand,
  name,
  image,
  discount,
  rating,
  href,
}: StoreCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col w-full max-w-sm overflow-hidden rounded-xl bg-white transition-all duration-300"
    >
      <div className="relative w-full aspect-3/4 bg-gray-100 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-4 right-4 z-10 bg-[#4F7CF2] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
          {discount}% off
        </div>
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-between mt-3">
          <div>
            <h3 className="text-xl font-bold text-black">{brand}</h3>
            <p className="text-gray-600 mt-1">{name}</p>
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
