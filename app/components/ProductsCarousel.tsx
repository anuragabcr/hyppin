"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ProductCard {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  rating: number;
  ratingCount: number;
  format: string;
  badge?: string;
  price: string;
}

const recommendedProducts: ProductCard[] = [
  {
    id: 1,
    title: "Classic White Linen Shirt",
    author: "Urban Threads",
    imageUrl: "https://placehold.co/300x300/F7F3E8/333?text=White+Linen+Shirt",
    rating: 4.8,
    ratingCount: 106992,
    format: "Men’s Casual Wear",
    badge: "#1 Best Seller",
    price: "₹1,499.00",
  },
  {
    id: 2,
    title: "Slim Fit Black Jeans",
    author: "Denim Republic",
    imageUrl: "https://placehold.co/300x300/F8F8F8/333?text=Slim+Fit+Jeans",
    rating: 4.7,
    ratingCount: 76128,
    format: "Unisex Denim",
    badge: "#1 Best Seller",
    price: "₹1,899.00",
  },
  {
    id: 3,
    title: "Classic Brown Leather Jacket",
    author: "The Rider Co.",
    imageUrl: "https://placehold.co/300x300/3680A1/FFF?text=Leather+Jacket",
    rating: 4.5,
    ratingCount: 612,
    format: "Outerwear",
    price: "₹5,499.00",
  },
  {
    id: 4,
    title: "Beige Oversized Hoodie",
    author: "CozyWear",
    imageUrl: "https://placehold.co/300x300/FDE047/333?text=Beige+Hoodie",
    rating: 4.5,
    ratingCount: 15648,
    format: "Casual Wear",
    price: "₹1,299.00",
  },
  {
    id: 5,
    title: "Cotton Chino Shorts - Khaki",
    author: "StyleSmith",
    imageUrl: "https://placehold.co/300x300/F8F8F8/333?text=Chino+Shorts",
    rating: 4.6,
    ratingCount: 273,
    format: "Men’s Bottomwear",
    price: "₹899.00",
  },
  {
    id: 6,
    title: "Women’s Floral Summer Dress",
    author: "Bella Mode",
    imageUrl: "https://placehold.co/300x300/01B0F1/FFF?text=Floral+Dress",
    rating: 4.4,
    ratingCount: 77,
    format: "Women’s Apparel",
    price: "₹1,799.00",
  },
  {
    id: 7,
    title: "White Sneakers with Minimal Design",
    author: "StrideLab",
    imageUrl: "https://placehold.co/300x300/FBBF24/333?text=White+Sneakers",
    rating: 4.5,
    ratingCount: 16170,
    format: "Footwear",
    badge: "#1 Best Seller",
    price: "₹2,499.00",
  },
];

const CARD_WIDTH_WITH_MARGIN = 220 + 16;

const ProductsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState<number>(CARD_WIDTH_WITH_MARGIN);
  const [maxIndex, setMaxIndex] = useState(recommendedProducts.length - 1);
  const [maxTranslate, setMaxTranslate] = useState(0);

  const scrollLeft = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === maxIndex;

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const firstCard = container?.querySelector<HTMLElement>(
        ":scope > div > div:first-child",
      );
      if (!container || !firstCard) return;

      const cardRect = firstCard.getBoundingClientRect();
      const style = window.getComputedStyle(firstCard);
      const marginLeft = parseFloat(style.marginLeft || "0");
      const marginRight = parseFloat(style.marginRight || "0");

      const measuredCardWidth = Math.round(
        cardRect.width + marginLeft + marginRight,
      );

      const containerWidth = Math.round(container.offsetWidth);

      const cw = Math.max(1, measuredCardWidth);
      setCardWidth(cw);

      const totalTrackWidth = cw * recommendedProducts.length;

      const newMaxTranslate = Math.max(0, totalTrackWidth - containerWidth);
      setMaxTranslate(newMaxTranslate);

      const newMaxIndex = Math.max(0, Math.ceil(newMaxTranslate / cw));
      setMaxIndex(newMaxIndex);

      setCurrentIndex((prev) => Math.min(prev, newMaxIndex));
    };

    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => measure());
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  const translateAmount = Math.min(currentIndex * cardWidth, maxTranslate);

  return (
    <div className="w-full py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Hot Fashion Trends</h2>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 hidden sm:block"
        >
          View All &rarr;
        </a>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={scrollLeft}
          disabled={isAtStart}
          className={`absolute left-0 top-1/2 -translate-y-1/2 rounded-full p-3 shadow z-20 transition-all ${
            isAtStart
              ? "bg-gray-100/70 text-gray-400 cursor-not-allowed"
              : "bg-white/90 hover:bg-white text-gray-700"
          } hidden md:flex`}
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>

        <div className="overflow-hidden w-full" ref={containerRef}>
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${translateAmount}px)`,
            }}
          >
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[260px] mx-2 rounded-2xl border-[3px] border-yellow-400 bg-white shadow-lg overflow-hidden hover:scale-[1.03] transition-transform duration-300 m-3"
              >
                <a href="#" className="block">
                  <Image
                    width={220}
                    height={220}
                    src={product.imageUrl}
                    alt={product.title}
                    unoptimized
                    className="w-full h-[220px] object-cover"
                  />
                </a>

                <div className="pt-2 flex flex-col gap-0.5 mx-4 mb-2">
                  <a href="#">
                    <h3 className="text-sm font-medium text-gray-800 hover:text-blue-600 truncate">
                      {product.title}
                    </h3>
                  </a>

                  <p className="text-xs text-gray-500">{product.author}</p>

                  <p className="text-xs text-gray-500">{product.format}</p>

                  <p className="text-base font-bold text-gray-900 mt-1">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollRight}
          disabled={isAtEnd}
          className={`absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-3 shadow z-20 transition-all ${
            isAtEnd
              ? "bg-gray-100/70 text-gray-400 cursor-not-allowed"
              : "bg-white/90 hover:bg-white text-gray-700"
          } hidden md:flex`}
        >
          <FaChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductsCarousel;
