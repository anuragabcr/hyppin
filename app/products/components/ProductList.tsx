"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import type { FC } from "react";
import Link from "next/link";

// --- 1. Define Types ---
interface ColorOption {
  name: string;
  code: string;
  hex: string;
  border: string;
}

interface Product {
  id: string;
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

const ProductList: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);

  // --- 2. Simulate API Fetch ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dummy Data (for now)
        const dummyData: Product[] = Array.from({ length: 20 }).map((_, i) => ({
          id: `p${i + 1}`,
          imageUrl: `https://placehold.co/600x800/${
            ["228B22", "1E3A8A", "8B0000", "000000"][i % 4]
          }/FFFFFF?text=Product+${i + 1}`,
          brand: ["U.S. POLO ASSN.", "Levi’s", "Roadster", "H&M"][i % 4],
          title: [
            "Men's Slim Fit Cotton Shirt",
            "Casual Denim Shirt",
            "Printed T-Shirt",
            "Linen Blend Shirt",
          ][i % 4],
          rating: 3.8 + (i % 2) * 0.3,
          reviewCount: 50 + i * 4,
          quantityBought: `${30 + i * 5}+`,
          dealText: "Limited Time Deal",
          currentPrice: 899 + i * 20,
          mrp: 1599 + i * 20,
          discountPercent: 40 - (i % 5),
          bankOffer: "5% cashback with SBI Credit Card",
          deliveryDate: "Thu, 14 Nov",
          colorOptions: [
            {
              name: "White",
              code: "white",
              hex: "bg-white",
              border: "border-gray-900",
            },
            {
              name: "Black",
              code: "black",
              hex: "bg-gray-900",
              border: "border-gray-900",
            },
            {
              name: "Blue",
              code: "blue",
              hex: "bg-blue-600",
              border: "border-blue-600",
            },
          ],
        }));

        setProducts(dummyData);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- 3. Derived State ---
  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  // --- 4. UI States ---
  if (loading) {
    return (
      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-[360px] bg-gray-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="block mx-auto mt-3 text-blue-600 hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  // --- 5. Main UI ---
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
        {visibleProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="block hoproductscale-[1.02] transition-transform duration-300"
          >
            <ProductCard key={product.id} {...product} />
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors shadow-md"
          >
            Load More
          </button>
        </div>
      )}

      {!products.length && !loading && (
        <div className="text-center text-gray-600 py-10">
          No products found.
        </div>
      )}
    </div>
  );
};

export default ProductList;
