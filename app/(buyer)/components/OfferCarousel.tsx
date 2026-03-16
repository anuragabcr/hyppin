"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface OfferCard {
  id: number;
  title: string;
  subtitle: string;
  discount: string;
  bgColor: string;
  brands: string[];
}

const offers: OfferCard[] = [
  {
    id: 1,
    title: "Classic Styles",
    subtitle: "MIN. 55% OFF",
    discount: "Levi’s | M&S",
    bgColor: "bg-gradient-to-t from-gray-800 to-gray-400",
    brands: ["Levi’s", "M&S"],
  },
  {
    id: 2,
    title: "Fresh Finds",
    subtitle: "UNDER ₹699",
    discount: "AAYU | PURVAJA",
    bgColor: "bg-gradient-to-t from-pink-500 to-rose-300",
    brands: ["AAYU", "PURVAJA"],
  },
  {
    id: 3,
    title: "Ethnic Chic",
    subtitle: "MIN. 80% OFF",
    discount: "Anouk | Sangria",
    bgColor: "bg-gradient-to-t from-red-800 to-red-400",
    brands: ["Anouk", "Sangria"],
  },
  {
    id: 4,
    title: "Traditional Wear",
    subtitle: "MIN. 65% OFF",
    discount: "House of Pataudi | Taavi",
    bgColor: "bg-gradient-to-t from-green-700 to-emerald-400",
    brands: ["House of Pataudi", "Taavi"],
  },
  {
    id: 5,
    title: "Soft Bedsheets",
    subtitle: "MIN. 40% OFF",
    discount: "Haus & Kinder | Mush",
    bgColor: "bg-gradient-to-t from-yellow-600 to-amber-300",
    brands: ["Haus & Kinder", "Mush"],
  },
  {
    id: 6,
    title: "Sportswear Blitz",
    subtitle: "UPTO 70% OFF",
    discount: "Nike | Adidas",
    bgColor: "bg-gradient-to-t from-blue-800 to-blue-400",
    brands: ["Nike", "Adidas"],
  },
  {
    id: 7,
    title: "Essential Kitchenware",
    subtitle: "BUY 2 GET 1 FREE",
    discount: "Prestige | Hawkins",
    bgColor: "bg-gradient-to-t from-purple-800 to-fuchsia-400",
    brands: ["Prestige", "Hawkins"],
  },
];

const CARD_WIDTH_WITH_MARGIN = 260 + 16;

const OfferCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState<number>(CARD_WIDTH_WITH_MARGIN);
  const [maxIndex, setMaxIndex] = useState(offers.length - 1);

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

      const totalTrackWidth = cw * offers.length;

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
        <h2 className="text-3xl font-extrabold text-gray-900">
          🔥 Top Deals of the Day
        </h2>
        <Link
          href="/products"
          className="text-sm font-medium text-yellow-600 hover:text-yellow-700 hidden sm:block"
        >
          View All Products &rarr;
        </Link>
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
            {offers.map((offer, i) => (
              <div
                key={i}
                className="shrink-0 w-[260px] h-[420px] mx-2 rounded-2xl border-[3px] border-yellow-400 bg-white shadow-lg overflow-hidden hover:scale-[1.03] transition-transform duration-300 m-3"
              >
                <div
                  className={`${offer.bgColor} h-[75%] relative flex items-end justify-center`}
                >
                  <div className="absolute inset-0 opacity-30 bg-black"></div>
                  <div className="absolute bottom-0 p-4 text-center text-white z-10">
                    <p className="text-sm sm:text-base font-medium">
                      {offer.title}
                    </p>
                    <p className="text-lg sm:text-xl font-bold">
                      {offer.subtitle}
                    </p>
                  </div>
                </div>

                <div className="h-[25%] flex flex-col items-center justify-center bg-white text-gray-800 px-4 py-3">
                  <div className="flex flex-wrap justify-center gap-2 text-sm font-semibold">
                    {offer.brands.map((brand, j) => (
                      <span
                        key={j}
                        className="px-2 py-1 border border-gray-300 rounded-md"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs mt-1">& More</p>
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

export default OfferCarousel;
