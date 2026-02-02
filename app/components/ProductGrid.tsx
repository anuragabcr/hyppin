"use client";

import { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import StoreCard from "./StoreCard";
import { Product } from "./ProductCarousel";
import Link from "next/link";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  title: string;
  products: Product[];
  actionPath: string;
  showLoadMore?: boolean;
  cardType?: "product" | "store" | "category";
}

export default function ProductGrid({
  title,
  products,
  actionPath,
  showLoadMore = false,
  cardType = "category",
}: ProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(8);
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumns(1);
        setVisibleCount(4);
      } else if (width < 768) {
        setColumns(2);
        setVisibleCount(6);
      } else if (width < 1024) {
        setColumns(3);
        setVisibleCount(6);
      } else {
        setColumns(4);
        setVisibleCount(8);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + columns);
  };

  const hasMore = visibleCount < products.length;

  const renderCard = (product: Product) => {
    switch (cardType) {
      case "store":
        return <StoreCard key={product.id} {...product} />;
      case "category":
        return (
          <CategoryCard key={product.id} {...product} isBrandCentered={true} />
        );
      case "product":
      default:
        return <ProductCard key={product.id} {...product} />;
    }
  };

  return (
    <section className="py-2 bg-white">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black">{title}</h2>
          <Link
            href={actionPath}
            className="text-sm font-bold text-[#4F7CF2] hover:underline transition"
          >
            VIEW ALL
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
          {products
            .slice(0, visibleCount)
            .map((product) => renderCard(product))}
        </div>

        {showLoadMore && hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="px-10 py-3 bg-[#E1E0DD] text-black font-bold rounded-xl hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
