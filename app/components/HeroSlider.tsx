"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Truck, ShieldCheck, BadgeDollarSign, Headphones } from "lucide-react";

const services = [
  {
    icon: <Truck size={32} strokeWidth={1.5} />,
    label: "Free Shipping",
    description: "On All Orders Over ₹99",
  },
  {
    icon: <ShieldCheck size={32} strokeWidth={1.5} />,
    label: "Secure Payment",
    description: "We ensure secure payment",
  },
  {
    icon: <BadgeDollarSign size={32} strokeWidth={1.5} />,
    label: "100% Money Back",
    description: "30 Days Return Policy",
  },
  {
    icon: <Headphones size={32} strokeWidth={1.5} />,
    label: "Online Support",
    description: "24/7 Dedicated Support",
  },
];

export function ServiceFeatures() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
        {services.map((item, index) => (
          <div key={index} className="flex items-center gap-4 group">
            <div className="text-blue-500 shrink-0 transition-transform group-hover:scale-110">
              {item.icon}
            </div>

            <div className="flex flex-col">
              <span className="text-gray-900 font-bold text-sm md:text-base leading-tight">
                {item.label}
              </span>
              <span className="text-gray-500 text-xs md:text-sm mt-0.5">
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
      <div className="relative h-[220px] rounded-lg overflow-hidden mx-4 my-8">
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
      <ServiceFeatures />
    </section>
  );
}
