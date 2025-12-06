"use client";

import Link from "next/link";
import {
  HiOutlineShoppingCart,
  HiOutlineMagnifyingGlass,
  HiOutlineUser,
} from "react-icons/hi2";
import { FaChevronDown } from "react-icons/fa";
import { useCart } from "@/app/context/CartContext";
import FilterTabs from "./FilterTabs";
import { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import LocationSelectionModal from "./LocationSelectionModal";
import AuthModal from "./AuthModal";
import CartDrawer from "./CartDrawer";
import { useUI } from "../context/UIContext";

export default function Header() {
  const { cart } = useCart();
  const {
    setIsLocationModalOpen,
    setIsCartModalOpen,
    isProfileOpen,
    setIsProfileOpen,
  } = useUI();
  const [selectedLocation, setSelectedLocation] = useState("Select Location");

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsLocationModalOpen(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    try {
      const location = localStorage.getItem("last_location");
      if (location) {
        setSelectedLocation(location);
      }
    } catch (error) {
      console.error("Failed to load location from local storage:", error);
      setSelectedLocation("Select Location");
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex items-center h-20 px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0 mr-8">
          <Link href="/" className="text-3xl font-bold text-indigo-600">
            hyppin
          </Link>
        </div>

        <div
          className="hidden lg:flex flex-col text-left mr-8 cursor-pointer hover:bg-gray-50 p-2 rounded transition"
          onClick={() => setIsLocationModalOpen(true)}
        >
          <p className="text-base font-bold text-gray-900">
            Delivery in 11 minutes
          </p>
          <div className="flex items-center text-sm text-gray-600">
            <p>{selectedLocation}</p>
            <FaChevronDown className="ml-1 h-4 w-4" />
          </div>
        </div>

        {/* --- Search Bar --- */}
        <div className="flex-1 max-w-2xl mr-4">
          <div className="relative flex items-center bg-gray-100 rounded-lg h-12">
            <HiOutlineMagnifyingGlass className="h-5 w-5 text-gray-500 ml-4" />
            <input
              type="search"
              placeholder='Search "Jacket" or "Dress"'
              className="flex-1 bg-transparent h-full px-3 text-base text-gray-700 placeholder-gray-500 focus:outline-none"
            />
          </div>
        </div>

        {/* --- Right Side --- */}
        <div className="flex items-center space-x-6">
          {/* Become a Seller */}
          <Link
            href="/become-seller"
            className="hidden sm:flex items-center space-x-2 text-base font-semibold text-gray-700 hover:text-indigo-600 transition"
          >
            <span className="text-xl">🏬</span> {/* Replace with proper icon */}
            <span>Become a Seller</span>
          </Link>

          {/* My Cart Button (Primary CTA) */}
          <button
            onClick={() => setIsCartModalOpen(true)}
            className="relative flex items-center justify-center h-12 px-5 bg-gray-200 text-gray-900 rounded-xl hover:bg-gray-300 transition font-semibold shadow-sm cursor-pointer"
          >
            <HiOutlineShoppingCart className="h-5 w-5 mr-2" />
            <span>My Cart</span>

            {/* Badge */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md">
                {totalItems}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition cursor-pointer"
            >
              <HiOutlineUser className="h-6 w-6" />
              <span className="font-semibold">Profile</span>
            </button>
            <ProfileMenu />
          </div>
        </div>
      </div>

      {/* --- Tabs & Modal --- */}
      <FilterTabs />
      <LocationSelectionModal onLocationSelect={handleLocationSelect} />
      <AuthModal />
      <CartDrawer />
    </header>
  );
}
