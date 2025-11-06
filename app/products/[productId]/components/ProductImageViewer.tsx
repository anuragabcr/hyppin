"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import LightboxModal from "@/app/components/LightboxModal";

interface GalleryImage {
  id: number;
  url: string;
  alt: string;
}

const IMAGE_URLS = [
  "https://placehold.co/400x400/8B5CF6/ffffff?text=Main+Clock",
  "https://placehold.co/400x400/3B82F6/ffffff?text=Angle+1",
  "https://placehold.co/400x400/10B981/ffffff?text=Angle+2",
  "https://placehold.co/400x400/F59E0B/ffffff?text=Context",
  "https://placehold.co/400x400/EF4444/ffffff?text=Zoom",
];

const ProductImageViewer = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [mainImage, setMainImage] = useState(IMAGE_URLS[0]);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full bg-transparent">
      {/* --- A. Thumbnail List --- */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-hidden p-1 md:self-start">
        {IMAGE_URLS.map((url, index) => (
          <button
            key={index}
            className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
              mainImage === url
                ? "border-orange-500 shadow-md"
                : "border-gray-200 hover:border-gray-400"
            }`}
            onClick={() => setMainImage(url)}
          >
            <Image
              width={96}
              height={96}
              src={url}
              alt={`Thumbnail ${index + 1}`}
              unoptimized
              className="w-full h-full object-cover rounded-md"
            />
          </button>
        ))}
      </div>

      {/* --- B. Main Image Viewer + Actions --- */}
      <div className="flex flex-col flex-grow">
        {/* Image Viewer */}
        <div
          className="relative w-full bg-gray-50 rounded-md border border-gray-100 overflow-hidden cursor-zoom-in"
          onClick={() =>
            setSelectedImage({
              id: 0,
              url: mainImage,
              alt: "Main Product View",
            })
          }
        >
          <Image
            width={500}
            height={500}
            src={mainImage}
            alt="Main Product View"
            unoptimized
            className="w-full h-auto object-contain mx-auto"
          />

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/70 backdrop-blur-md shadow-sm hover:scale-105 transition-transform"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`w-6 h-6 ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        </div>

        {/* --- Action Buttons --- */}
        <div className="mt-4 flex gap-4 w-full">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 font-semibold text-base rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors">
            🛒 ADD TO CART
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 font-semibold text-base rounded-md bg-orange-600 text-white hover:bg-red-700 transition-colors">
            ⚡ BUY NOW
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default ProductImageViewer;
