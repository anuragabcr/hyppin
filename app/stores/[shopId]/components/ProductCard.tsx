"use client";

import { useCart } from "@/app/context/CartContext";
import { Plus } from "lucide-react";
import Image from "next/image";

interface MenuItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  discount: string;
  isSponsored: boolean;
  isAssured: boolean;
  isHotDeal: boolean;
}

const AssuredBadge = () => (
  <span className="ml-1 text-blue-500 text-xs" title="Verified Assurance">
    🛡️Assured
  </span>
);

const ProductCard: React.FC<{ product: MenuItem }> = ({ product }) => {
  const { addToCart } = useCart();
  const formatCurrency = (amount: number) =>
    `₹${amount.toLocaleString("en-IN")}`;

  const renderAddToCartButton = () => {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();

          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1,
          });
        }}
        className="bg-white text-green-600 border border-green-600 text-sm font-semibold rounded-lg shadow-md hover:bg-green-50 transition duration-150 flex items-center px-3 py-1.5 cursor-pointer"
      >
        <Plus className="w-4 h-4 ml-1" />
      </button>
    );
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer h-full flex flex-col group">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          unoptimized={true}
          className="transition duration-500 ease-in-out transform group-hover:scale-105"
        />

        {/* Top-Right "Add" Button Overlay */}
        <div className="absolute bottom-2 right-2 z-10">
          {renderAddToCartButton()}
        </div>

        {/* Hot Deal Banner (Bottom-Left) */}
        {product.isHotDeal && (
          <div className="absolute bottom-2 left-2 bg-green-100 text-green-600 text-xs font-semibold px-2 py-0.5 rounded">
            Hot Deal
          </div>
        )}
      </div>

      {/* Product Details Area */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Sponsored/Brand Tag */}
        <p className="text-xs text-gray-500 mb-1">
          {product.isSponsored && "Sponsored "}
          {product.isSponsored && product.name.split(" ")[0]}{" "}
          {/* Placeholder for Brand Name */}
        </p>

        {/* Title */}
        <h3 className="text-base font-medium text-gray-800 line-clamp-2 mb-2 flex-grow">
          {product.name}
          {product.isAssured && <AssuredBadge />}
        </h3>

        {/* Pricing */}
        <div className="flex items-center mt-auto">
          <span className="text-xl font-bold text-gray-900 mr-2">
            {formatCurrency(product.price)}
          </span>
          <span className="text-sm text-gray-500 line-through mr-2">
            {formatCurrency(product.originalPrice)}
          </span>
          <span className="text-sm font-semibold text-green-600">
            {product.discount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
