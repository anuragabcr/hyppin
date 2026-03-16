"use client";

import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  id: string;
  brand: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  href: string;
  isBrandCentered?: boolean;
}

export default function CategoryCard({
  brand,
  name,
  image,
  href,
  isBrandCentered = false,
}: CategoryCardProps) {
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
      </div>

      <div className="pt-4">
        <h3
          className={`text-lg font-semibold text-black ${
            isBrandCentered ? "text-center" : "text-left"
          }`}
        >
          {brand}
        </h3>
      </div>
    </Link>
  );
}
