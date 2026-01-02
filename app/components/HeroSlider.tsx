"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { RotateCcw, HandCoins, Tag } from "lucide-react";

const services = [
  {
    icon: <RotateCcw size={22} strokeWidth={2} />,
    label: "7 Days Easy Return",
  },
  {
    icon: <HandCoins size={22} strokeWidth={2} />,
    label: "Cash on delivery",
  },
  {
    icon: <Tag size={22} strokeWidth={2} />,
    label: "Lowest Price",
  },
];

const slides = [
  {
    id: 1,
    title: "HYPINN",
    subtitle: "SIGNATURES 25% OFF",
    cta: "View Stores",
    img: "/images/hero1.svg",
  },
  {
    id: 2,
    title: "WOMENS SPECIAL",
    subtitle: "NEW ARRIVALS",
    cta: "Shop Now",
    img: "/images/hero1.svg",
  },
  {
    id: 3,
    title: "WINTER SALE",
    subtitle: "UP TO 40% OFF",
    cta: "Discover",
    img: "/images/hero1.svg",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      5000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section aria-label="Hero Slider">
      <div className="relative h-[350px] rounded-lg overflow-hidden mx-4 my-8">
        <div
          className="w-full h-full flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full h-full shrink-0 relative">
              <Image
                src={slide.img}
                alt={slide.subtitle}
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#F0BD49]/40 to-transparent" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
          <h1 className="text-white text-4xl font-bold leading-tight drop-shadow-md">
            {slides[index].title}
          </h1>
          <h2 className="text-white text-4xl font-bold drop-shadow-md mb-6">
            {slides[index].subtitle}
          </h2>

          <button className="bg-white text-black px-4 py-2 w-fit rounded whitespace-nowrap text-sm font-semibold shadow-sm hover:bg-gray-200">
            {slides[index].cta}
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                index === i ? "bg-[#F0BD49] w-8" : "bg-white/60 w-3"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-10 text-skybolt-blue font-medium text-sm md:text-base select-none">
        {services.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-skybolt-blue">{item.icon}</span>
            <span className="text-skybolt-blue">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
