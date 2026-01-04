"use client";

import React from "react";
import Link from "next/link";
import ShopCard from "../stores/components/ShopCard";

interface Brand {
  id: number;
  name: string;
  categories: string[];
  avgPrice: number;
  deliveryTime: number;
  rating: number;
  imageUrl: string;
  discount?: string; // e.g., "50% OFF"
  isPromoted?: boolean;
}

// --- 2. Create Dummy Data from the Image ---
// Using placeholder images for demonstration
const fashionBrands: Brand[] = [
  {
    id: 1,
    name: "H&M",
    categories: ["Casual Wear", "Jeans", "Shirts"],
    avgPrice: 1200,
    deliveryTime: 3,
    rating: 4.3,
    imageUrl: "https://placehold.co/400x300/F2C744/FFF?text=H%26M",
    discount: "Flat 20% OFF",
    isPromoted: true,
  },
  {
    id: 2,
    name: "ZARA",
    categories: ["Formal", "Casual", "Accessories"],
    avgPrice: 2500,
    deliveryTime: 4,
    rating: 4.4,
    imageUrl: "https://placehold.co/400x300/000000/FFF?text=ZARA",
    discount: "Up to 30% OFF",
    isPromoted: false,
  },
  {
    id: 3,
    name: "Levi’s",
    categories: ["Denim", "T-Shirts", "Jackets"],
    avgPrice: 2000,
    deliveryTime: 3,
    rating: 4.5,
    imageUrl: "https://placehold.co/400x300/2E2E2E/FFF?text=Levi%27s",
    discount: "Flat 25% OFF",
    isPromoted: true,
  },
  {
    id: 4,
    name: "Nike",
    categories: ["Sportswear", "Shoes", "Accessories"],
    avgPrice: 3000,
    deliveryTime: 2,
    rating: 4.6,
    imageUrl: "https://placehold.co/400x300/111111/FFF?text=NIKE",
    discount: "Flat 15% OFF",
    isPromoted: true,
  },
  {
    id: 5,
    name: "Adidas",
    categories: ["Athleisure", "Sneakers", "Tracksuits"],
    avgPrice: 2800,
    deliveryTime: 2,
    rating: 4.5,
    imageUrl: "https://placehold.co/400x300/0A50B0/FFF?text=ADIDAS",
    discount: "Up to 40% OFF",
    isPromoted: false,
  },
  {
    id: 6,
    name: "Calvin Klein",
    categories: ["Luxury", "Perfumes", "Innerwear"],
    avgPrice: 3500,
    deliveryTime: 5,
    rating: 4.7,
    imageUrl: "https://placehold.co/400x300/202020/FFF?text=Calvin+Klein",
    discount: "Flat 10% OFF",
    isPromoted: true,
  },
];

// --- 3. Create the Reusable ShopCard Component ---

// Helper function for dynamic rating color

// --- 4. Create the Main Listing Page Component ---
const ShopListing: React.FC = () => {
  return (
    <div className="bg-gray-100 w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
            Fashion brands in Bengaluru
          </h2>
          <Link
            href="/shops"
            className="text-sm font-medium text-yellow-600 hover:text-yellow-700 hidden sm:block"
          >
            View All Shops &rarr;
          </Link>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fashionBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/shops/${brand.id}`}
              className="block hover:scale-[1.02] transition-transform duration-300"
            >
              <ShopCard brand={brand} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopListing;
