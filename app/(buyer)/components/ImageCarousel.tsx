"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define the props interface
interface ImageCarouselProps {
  images: string[];
}

// Accept images as a prop
export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    // Only set interval if there's more than one image
    if (images.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, images.length]);

  if (!images || images.length === 0) {
    return <div className="h-full w-full bg-gray-200 animate-pulse"></div>;
  }

  return (
    // Removed fixed height here, it will be controlled by the parent container
    <section className="relative w-full h-full overflow-hidden group rounded-2xl">
      {/* Top Progress Indicators - Only show if > 1 image */}
      {images.length > 1 && (
        <div className="absolute top-4 left-0 right-0 z-20 flex gap-2 px-4 md:px-6">
          {images.map((_, index) => (
            <div
              key={index}
              className="h-1 flex-1 bg-white/40 rounded-full overflow-hidden"
            >
              {index === currentIndex && (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="h-full bg-white"
                />
              )}
              {index < currentIndex && (
                <div className="h-full w-full bg-white" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main Image Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            fill
            priority={currentIndex === 0}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Only show if > 1 image */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-black transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-black transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent pointer-events-none" />
    </section>
  );
}
