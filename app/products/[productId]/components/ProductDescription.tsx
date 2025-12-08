"use client";

import React, { useState } from "react";
import { Star, CheckCircle, Info, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// --- 1. Define Types ---

interface OfferLineProps {
  text: string;
}

interface SpecListProps {
  title: string;
  items: Array<string | { label: string; available?: boolean }>;
}

interface ColorOption {
  name: string;
  hex: string;
  url: string;
}

interface ServiceItem {
  label: string;
  available?: boolean;
}

interface SellerInfo {
  name: string;
  rating: number;
  returnPolicy: string;
}

interface ProductData {
  name: string;
  rating: number;
  reviewCount: number;
  ratingCount: number;
  specialPrice: number;
  originalPrice: number;
  offPercent: number;
  availableOffers: string[];
  warranty: string;
  colorOptions: ColorOption[];
  highlights: string[];
  services: ServiceItem[];
  seller: SellerInfo;
  longDescription: string;
}

// --- 1. Define Dummy Product Data ---
const PRODUCT_DATA: ProductData = {
  name: "GrabBasket Analog 31 cm X 24 cm Wall Clock (Brown, Black, With Glass, Standard)",
  rating: 3.8,
  reviewCount: 17451,
  ratingCount: 1186,
  specialPrice: 195,
  originalPrice: 1199,
  offPercent: 83,
  availableOffers: [
    "Special Price Get extra 39% off",
    "Bank Offer 10% instant discount on SBI Credit Card EMI Transactions, up to ₹1,500 on orders of ₹5,000 and above",
    "Bank Offer 5% cashback on Axis Bank Flipkart Debit Card up to ₹750",
    "Bank Offer 5% cashback on Flipkart SBI Credit Card upto ₹4,000 per calendar quarter",
  ],
  warranty: "No Warranty Applicable",
  colorOptions: [
    {
      name: "Brown",
      hex: "#654321",
      url: "https://placehold.co/40x40/654321/fff?text=B",
    },
    {
      name: "Gold",
      hex: "#FFD700",
      url: "https://placehold.co/40x40/FFD700/000?text=G",
    },
    {
      name: "Blue",
      hex: "#1E90FF",
      url: "https://placehold.co/40x40/1E90FF/fff?text=BL",
    },
    {
      name: "Redwood",
      hex: "#8B0000",
      url: "https://placehold.co/40x40/8B0000/fff?text=R",
    },
  ],
  highlights: [
    "Size: 24 cm x 31 cm",
    "Frame Material: Plastic",
    "Clock Type: Analog",
  ],
  services: [
    { label: "No Warranty Applicable", available: true },
    { label: "Cash on Delivery available", available: true },
  ],
  seller: {
    name: "GrabBasket",
    rating: 3.8,
    returnPolicy: "7 Days Return Policy",
  },
  longDescription:
    "GrabBasket Brings you a designer 3D Look Unique wall clock to decorate your wall. This wall clock is a Standard design to decorate your wall offer a superlative way to place time on the wall. It is made of high quality material to ensure the accurate movement. These decorative wall clocks are a wonderful for your home wall. Ideal for: Room Decor, Clock For Bedroom, Clock For Hall Decor Smart and stylish addition to your home. Wall Mount, With Glass, Battery Powered ; Alarm:No, Product Specification- Product Material-Plastic, Type of Clock-Designer Specifications.",
};

// --- 2. Helper Components ---

// Component for the Green Checkmark Offer Lines
// Component for the Green Checkmark Offer Lines
const OfferLine: React.FC<OfferLineProps> = ({ text }) => (
  <div className="flex items-start mb-2 text-sm">
    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5 mr-2" />
    <p className="text-gray-700">
      {text}
      {(text.includes("Price Get extra") || text.includes("Bank Offer")) && (
        <a href="#" className="text-blue-500 font-medium hover:underline ml-1">
          T&C
        </a>
      )}
    </p>
  </div>
);

// Component for the Key-Value list (Highlights/Services)
const SpecList: React.FC<SpecListProps> = ({ title, items }) => (
  <div className="flex-1 min-w-[200px]">
    <h3 className="text-base font-semibold text-gray-800 mb-2">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center text-sm text-gray-600">
          {typeof item === "object" && "label" in item ? (
            <>
              <CheckCircle
                className={`w-4 h-4 mr-2 ${
                  item.available ? "text-blue-500" : "text-gray-400"
                }`}
              />
              {item.label}
              {item.label.includes("Cash on Delivery") && (
                <Info className="w-3 h-3 text-gray-400 ml-1" />
              )}
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 flex-shrink-0"></span>
              {item}
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
);

// --- 3. Main Product Description Component ---

const ProductDescription = () => {
  const [pincode, setPincode] = useState("");
  const [selectedColor, setSelectedColor] = useState(
    PRODUCT_DATA.colorOptions[0],
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizes = [
    {
      label: "S",
      price: 1406,
      originalPrice: 1499,
      discount: "6% OFF",
      stock: 0,
    },
    {
      label: "M",
      price: 1406,
      originalPrice: 1499,
      discount: "6% OFF",
      stock: 10,
    },
    {
      label: "L",
      price: 1406,
      originalPrice: 1499,
      discount: "6% OFF",
      stock: 5,
    },
    {
      label: "XL",
      price: 1406,
      originalPrice: 1499,
      discount: "6% OFF",
      stock: 0,
    },
  ];

  const formattedPrice = (price: number): string =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <div className="p-4 w-full bg-white space-y-8 max-w-xl mx-auto md:mx-0">
      {/* --- A. Title, Ratings & Price --- */}
      <section className="pb-4 border-b border-gray-100">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
          {PRODUCT_DATA.name}
        </h1>

        {/* Rating and Review Count */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex items-center px-2 py-0.5 text-xs font-bold text-white bg-green-600 rounded-md">
            {PRODUCT_DATA.rating} <Star className="w-3 h-3 fill-white ml-0.5" />
          </div>
          <span className="text-sm text-gray-500">
            {PRODUCT_DATA.reviewCount.toLocaleString()} Ratings &{" "}
            {PRODUCT_DATA.ratingCount.toLocaleString()} Reviews
          </span>
          <Info className="w-3 h-3 text-gray-400" />
        </div>

        {/* Pricing */}
        <div className="flex items-baseline space-x-3 mb-1">
          <span className="text-3xl font-bold text-gray-900">
            {formattedPrice(PRODUCT_DATA.specialPrice)}
          </span>
          <span className="text-lg line-through text-gray-500">
            {formattedPrice(PRODUCT_DATA.originalPrice)}
          </span>
          <span className="text-lg font-bold text-green-600">
            {PRODUCT_DATA.offPercent}% off
          </span>
        </div>
      </section>

      {/* --- B. Available Offers --- */}
      {/* <section className="pb-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Available offers
        </h2>
        <div className="space-y-2">
          {PRODUCT_DATA.availableOffers.slice(0, 4).map((offer, index) => (
            <OfferLine key={index} text={offer} />
          ))}
        </div>
        <a
          href="#"
          className="text-blue-500 font-semibold text-sm mt-3 inline-block hover:underline"
        >
          View {PRODUCT_DATA.availableOffers.length - 4} more offers
        </a>
      </section> */}

      {/* --- C. Delivery & Color Selection --- */}
      <section className="pb-4 border-b border-gray-100 space-y-6">
        {/* Prices options */}
        <div className="flex flex-wrap gap-4 mt-4">
          {sizes.map((size) => {
            const isOutOfStock = size.stock === 0;

            return (
              <button
                key={size.label}
                disabled={isOutOfStock}
                onClick={() => !isOutOfStock && setSelectedSize(size.label)}
                className={`
                  relative p-4 rounded-xl border text-left transition shadow-sm
                
                  ${
                    selectedSize === size.label
                      ? "!border-blue-500 !bg-green-100 shadow-md"
                      : ""
                  }
                
                  ${
                    isOutOfStock
                      ? "border-gray-300 text-gray-500 bg-gray-50 cursor-not-allowed"
                      : "border-gray-300 hover:shadow-md bg-white cursor-pointer"
                  }
                `}
              >
                {/* Discount Ribbon */}
                {!isOutOfStock && (
                  <span
                    className="absolute -top-2 left-2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded shadow"
                    style={{ borderRadius: "4px" }}
                  >
                    {size.discount}
                  </span>
                )}

                {/* Text Content */}
                <div>
                  <p className="text-sm font-medium">{size.label}</p>

                  {isOutOfStock ? (
                    <p className="text-gray-500 text-sm mt-1">Out of stock</p>
                  ) : (
                    <div className="mt-1">
                      <span className="font-semibold text-gray-900">
                        {formattedPrice(size.price)}
                      </span>
                      <span className="line-through ml-2 text-gray-400 text-sm">
                        {formattedPrice(size.originalPrice)}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Color Options */}
        <div className="flex items-start space-x-12">
          <h2 className="text-base font-medium text-gray-500 w-24 flex-shrink-0">
            Color
          </h2>
          <div className="flex space-x-3">
            {PRODUCT_DATA.colorOptions.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`p-1 rounded-full border-2 transition-all duration-200 ${
                  selectedColor.name === color.name
                    ? "border-blue-500 shadow-md"
                    : "border-transparent hover:border-gray-300"
                }`}
                title={color.name}
              >
                <Image
                  width={32}
                  height={32}
                  src={color.url}
                  alt={color.name}
                  unoptimized
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Warranty */}
        <div className="flex items-center space-x-12">
          <h2 className="text-base font-medium text-gray-500 w-24 flex-shrink-0">
            Warranty
          </h2>
          <span className="text-base text-gray-800">
            {PRODUCT_DATA.warranty}
          </span>
        </div>

        {/* Delivery Pincode Input */}
        {/* <div className="flex items-start space-x-12">
          <h2 className="text-base font-medium text-gray-500 w-24 flex-shrink-0">
            Delivery
          </h2>
          <div className="flex flex-col flex-grow">
            <div className="flex border border-gray-300 rounded-md overflow-hidden w-full max-w-xs">
              <input
                type="text"
                placeholder="Enter Delivery Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-grow p-2 text-sm focus:outline-none"
              />
              <button className="bg-white text-blue-500 font-semibold text-sm px-4 hover:bg-gray-50 transition-colors">
                Check
              </button>
            </div>
            <div className="text-sm mt-2">
              <p className="flex items-center text-gray-800">
                <Truck className="w-4 h-4 text-gray-600 mr-2" />
                Delivery by 13 Nov, Thursday
                <Info className="w-3 h-3 text-gray-400 ml-2" />
              </p>
              <p className="text-xs text-gray-500 ml-6">
                if ordered before 5:59 PM
              </p>
              <a
                href="#"
                className="text-blue-500 font-medium text-xs ml-6 hover:underline mt-1 inline-block"
              >
                View Details
              </a>
            </div>
          </div>
        </div> */}
      </section>

      {/* --- D. Highlights, Services, and Seller --- */}
      <section className="pb-4 border-b border-gray-100">
        <div className="flex flex-wrap gap-y-6 md:gap-x-12">
          <SpecList title="Highlights" items={PRODUCT_DATA.highlights} />
          <SpecList title="Services" items={PRODUCT_DATA.services} />
        </div>
      </section>

      {/* --- E. Full Description --- */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Description
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {PRODUCT_DATA.longDescription}
        </p>
      </section>
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Sold By</h2>

        {/* Seller Card */}
        <div className="border rounded-xl p-5 flex items-center justify-between shadow-sm bg-white">
          {/* Left: Icon + Seller Name */}
          <div className="flex items-center space-x-4">
            {/* Seller Icon */}
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9l1 11h16l1-11M3 9h18M5 9V4h3v5M9 9V4h6v5M15 9V4h3v5"
                />
              </svg>
            </div>

            {/* Seller Information */}
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {PRODUCT_DATA.seller.name}
              </p>

              <div className="flex items-center space-x-2 mt-1 text-sm">
                {/* Rating Badge (Blue like Figma) */}
                <span className="flex items-center bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-semibold rounded-md">
                  {PRODUCT_DATA.seller.rating}
                  <Star className="w-3 h-3 fill-blue-700 ml-1" />
                </span>

                <span className="text-gray-600">1256 Ratings</span>
              </div>
            </div>
          </div>

          {/* Right Side: Product count + Button */}
          <div className="text-right">
            <p className="text-xl font-semibold text-gray-900">
              {/* {PRODUCT_DATA.seller.totalProducts} */}
              23
            </p>
            <p className="text-gray-500 text-sm mb-3">Products</p>

            <Link
              href={"/shops/5"}
              className="px-5 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition"
            >
              View Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
