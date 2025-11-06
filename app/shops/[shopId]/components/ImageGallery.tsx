"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import LightboxModal from "@/app/components/LightboxModal";

// --- 1. Define Types ---
interface GalleryImage {
  id: number;
  url: string;
  alt: string;
}

// --- 2. Dummy Data ---
const DUMMY_IMAGES: GalleryImage[] = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  url: `https://placehold.co/400x300/FEE2E2/EF4444?text=Photo+${i + 1}`,
  alt: `Restaurant photo ${i + 1}`,
}));

const IMAGES_PER_PAGE = 15;
const TOTAL_IMAGES = DUMMY_IMAGES.length;

// --- 4. Main Gallery Component ---
const ImageGallery: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const totalPages = Math.ceil(TOTAL_IMAGES / IMAGES_PER_PAGE);

  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const endIndex = Math.min(currentPage * IMAGES_PER_PAGE, TOTAL_IMAGES);
  const currentImages = DUMMY_IMAGES.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleImageClick = (image: GalleryImage) => setSelectedImage(image);
  const handleCloseModal = () => setSelectedImage(null);

  const pageRangeText = `Showing ${
    startIndex + 1
  }-${endIndex} of ${TOTAL_IMAGES} images`;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 bg-white">
      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {currentImages.map((image) => (
          <button
            key={image.id}
            onClick={() => handleImageClick(image)}
            className="aspect-[4/3] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              width={400}
              height={300}
              src={image.url}
              alt={image.alt}
              unoptimized
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200">
        <p className="text-gray-600 text-sm mb-4 sm:mb-0">{pageRangeText}</p>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-full transition-colors ${
              currentPage === 1
                ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                : "text-gray-700 bg-white hover:bg-gray-100 border border-gray-300"
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                currentPage === i + 1
                  ? "bg-red-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full transition-colors ${
              currentPage === totalPages
                ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                : "text-gray-700 bg-white hover:bg-gray-100 border border-gray-300"
            }`}
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Modal */}
      <LightboxModal image={selectedImage} onClose={handleCloseModal} />
    </div>
  );
};

export default ImageGallery;
