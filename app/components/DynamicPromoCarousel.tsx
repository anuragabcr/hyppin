"use client";

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// --- TYPES ---
interface PromoItem {
  id: number;
  cashbackText: string;
  subOffers: string[];
  category: string;
  dealText: string;
  brandName: string;
  bgGradient: string;
  cardBg: string;
}

// --- PROMOTIONAL DATA ---
const promoData: PromoItem[] = [
  {
    id: 1,
    cashbackText: "Get up to 40% Cashback*",
    subOffers: [
      "Free Shipping",
      "Exclusive Coupons",
      "Cash on Delivery",
      "Easy Returns",
    ],
    category: "Women's Dresses",
    dealText: "Under ₹999",
    brandName: "ZARA",
    bgGradient: "from-rose-500 to-pink-400",
    cardBg: "bg-pink-100",
  },
  {
    id: 2,
    cashbackText: "Flat 25% OFF*",
    subOffers: [
      "No-Cost EMI",
      "Free Styling Guide",
      "Express Delivery",
      "Gift Wrapping",
    ],
    category: "Men's Sneakers",
    dealText: "Starting at ₹1,499",
    brandName: "Nike",
    bgGradient: "from-indigo-500 to-blue-500",
    cardBg: "bg-indigo-100",
  },
  {
    id: 3,
    cashbackText: "Buy 1 Get 1 Free",
    subOffers: [
      "Limited Edition",
      "Easy Exchange",
      "Premium Quality",
      "Online Exclusive",
    ],
    category: "Accessories",
    dealText: "Up to 60% OFF",
    brandName: "H&M",
    bgGradient: "from-amber-500 to-orange-400",
    cardBg: "bg-amber-100",
  },
];

// --- MAIN COMPONENT ---
const DynamicPromoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % promoData.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + promoData.length) % promoData.length);

  return (
    <div className="flex justify-center w-full my-8 font-sans">
      <div className="relative w-full max-w-7xl shadow-2xl rounded-xl overflow-hidden">
        {/* --- CAROUSEL SLIDES --- */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {promoData.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-full">
              <div className="relative">
                {/* --- TOP BANNER --- */}
                {/* <div className={`relative ${item.cardBg}`}>
                  <div className="h-48 flex flex-col justify-between p-4 sm:p-6 md:p-8 text-black">
                    <div className="flex justify-end items-center text-2xl sm:text-4xl font-extrabold text-gray-800 drop-shadow-lg">
                      {item.cashbackText}
                    </div>
                    <div className="flex justify-around bg-white/70 backdrop-blur-sm rounded-lg p-2 mt-2">
                      {item.subOffers.map((offer, i) => (
                        <span
                          key={i}
                          className="text-xs sm:text-sm font-semibold text-gray-700"
                        >
                          {offer}
                        </span>
                      ))}
                    </div>
                  </div>
                </div> */}

                {/* --- MAIN CONTENT --- */}
                <div
                  className={`flex flex-col md:flex-row h-[350px] sm:h-[450px] md:h-[500px] bg-gradient-to-r ${item.bgGradient}`}
                >
                  {/* LEFT: PRODUCT IMAGE PLACEHOLDER */}
                  <div className="relative flex-1 md:w-1/2 p-4 md:p-8 flex items-center justify-center">
                    <div className="relative w-full h-full bg-white/90 rounded-xl overflow-hidden shadow-xl border-4 border-yellow-400 flex items-center justify-center">
                      <div className="text-gray-600 text-xl md:text-3xl font-semibold">
                        {item.category}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: DEAL DETAILS */}
                  <div className="flex-1 md:w-1/2 flex flex-col justify-center items-center text-white p-4 md:p-10">
                    <div className="text-center">
                      <span className="bg-red-600/90 text-white text-xs sm:text-sm font-bold uppercase py-1 px-3 rounded-full mb-4 inline-block transform -rotate-3 shadow-lg">
                        Unmissable Deals
                      </span>

                      <p className="text-xl sm:text-2xl font-light mb-2">
                        {item.category}
                      </p>

                      <h2 className="text-4xl sm:text-6xl font-black mb-4 drop-shadow-lg">
                        {item.dealText}
                      </h2>

                      <div className="mt-6 flex justify-center">
                        <div className="bg-white text-gray-800 font-bold text-lg sm:text-xl rounded-lg py-2 px-6 shadow-lg">
                          {item.brandName}
                        </div>
                      </div>

                      <button className="mt-8 bg-white text-pink-600 font-bold py-3 px-8 rounded-full shadow-2xl hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- NAVIGATION BUTTONS --- */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 p-3 rounded-full shadow-lg hover:bg-white transition hidden md:flex items-center justify-center z-10"
          aria-label="Previous Slide"
        >
          <FaChevronLeft className="w-5 h-5 text-gray-800" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 p-3 rounded-full shadow-lg hover:bg-white transition hidden md:flex items-center justify-center z-10"
          aria-label="Next Slide"
        >
          <FaChevronRight className="w-5 h-5 text-gray-800" />
        </button>

        {/* --- DOT INDICATORS --- */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {promoData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-purple-600 w-5" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicPromoCarousel;
