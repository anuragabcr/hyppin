"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryCard from "./CategoryCard";

export interface Product {
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

interface ProductCarouselProps {
  title: string;
  products: Product[];
  actionPath: string;
  isBrandCentered?: boolean;
}

export default function ProductCarousel({
  title,
  products,
  actionPath,
  isBrandCentered = false,
}: ProductCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability, {
        passive: true,
      });
    }
    window.addEventListener("resize", checkScrollability, { passive: true });

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollability);
      }
      window.removeEventListener("resize", checkScrollability);
    };
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.75;
      const newScrollLeft =
        direction === "left"
          ? containerRef.current.scrollLeft - scrollAmount
          : containerRef.current.scrollLeft + scrollAmount;

      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black tracking-tight">
            {title}
          </h2>
          <Link
            href={actionPath}
            className="text-sm font-bold text-[#4F7CF2] hover:underline transition"
          >
            VIEW ALL
          </Link>
        </div>

        <div className="relative group/carousel">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={`hidden md:flex absolute left-0 top-1/3 -translate-y-1/2 -translate-x-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer ${
              canScrollLeft
                ? "opacity-0 group-hover/carousel:opacity-100 hover:scale-110 hover:bg-gray-50"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
          </button>

          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => (
              <div key={product.id} className="shrink-0 w-[280px] sm:w-[300px]">
                <CategoryCard {...product} isBrandCentered={isBrandCentered} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={`hidden md:flex absolute right-0 top-1/3 -translate-y-1/2 translate-x-1/2 z-10 bg-white text-gray-800 p-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer ${
              canScrollRight
                ? "opacity-0 group-hover/carousel:opacity-100 hover:scale-110 hover:bg-gray-50"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
