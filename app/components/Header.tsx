"use client";

import Link from "next/link";
import { MapPin, UserRound, Heart, Menu, X } from "lucide-react";
import { FaChevronDown } from "react-icons/fa";
import { useCart } from "@/app/context/CartContext";
import FilterTabs from "./FilterTabs";
import { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import LocationSelectionModal from "./LocationSelectionModal";
import AuthModal from "./AuthModal";
import CartDrawer from "./CartDrawer";
import { useUI } from "../context/UIContext";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Breadcrumbs from "./Breadcrumbs";

export default function Header() {
  const { cart } = useCart();
  const {
    setIsLocationModalOpen,
    setIsCartModalOpen,
    isProfileOpen,
    setIsProfileOpen,
  } = useUI();

  const pathname = usePathname();
  const showBreadcrumbs = pathname === "/" || pathname.includes("categories");
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsLocationModalOpen(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    try {
      const location = localStorage.getItem("last_location");
      if (location) setSelectedLocation(location);
    } catch (error) {
      console.error("Failed to load location:", error);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between h-20 px-4 sm:px-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            className="sm:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <Link href="/" className="text-2xl sm:text-3xl font-bold text-black">
            HYPPIN
          </Link>
        </div>
        <div
          className="hidden sm:flex flex-row items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 mx-1 sm:mx-2 md:mx-4 rounded transition"
          onClick={() => setIsLocationModalOpen(true)}
        >
          <MapPin className="h-6 w-6 text-skybolt-blue" />
          <div className="text-sm">
            <p className="font-bold text-gray-900 leading-none">
              Delivery in 11 mins
            </p>
            <p className="text-gray-600 truncate min-w-32 max-w-60">
              {selectedLocation}
            </p>
          </div>
          <FaChevronDown className="h-3 w-3" />
        </div>

        <div className="hidden lg:block flex-1 mx-4">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-3 sm:space-x-6">
          <Link
            href="/become-seller"
            className="hidden sm:flex bg-brand-gradient text-black 
             px-[clamp(1rem,3vw,5rem)] 
             py-2 rounded-xl font-semibold text-sm whitespace-nowrap"
          >
            Become Seller
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="hidden sm:block items-center space-x-2 text-gray-700 hover:text-indigo-600 transition cursor-pointer "
            >
              <UserRound className="h-6 w-6 text-skybolt-blue" />
            </button>
            <ProfileMenu />
          </div>

          <Link href="/wishlist" className="hidden sm:block">
            <Heart className="h-6 w-6 text-skybolt-blue" />
          </Link>

          <button
            onClick={() => setIsCartModalOpen(true)}
            className="relative p-2"
          >
            <Image
              src="/images/shopping_cart.svg"
              alt="cart"
              height={24}
              width={24}
            />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH (Visible only on mobile below header) */}
      <div className="lg:hidden px-4 py-2">
        <SearchBar />
      </div>

      {/* MOBILE HAMBURGER MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-4 space-y-4 font-sans">
            <div
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              onClick={() => {
                setIsLocationModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
            >
              <MapPin className="text-skybolt-blue" />
              <div>
                <p className="text-xs text-gray-500">Deliver to</p>
                <p className="font-bold">{selectedLocation}</p>
              </div>
            </div>

            <Link
              href="/become-seller"
              className="flex items-center gap-3 p-2 font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="w-8 h-8 flex items-center justify-center bg-brand-gradient rounded-full text-xs">
                S
              </span>
              Become a Seller
            </Link>

            <Link
              href="/profile"
              className="flex items-center gap-3 p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <UserRound className="h-5 w-5 text-gray-600" /> My Profile
            </Link>

            <Link
              href="/wishlist"
              className="flex items-center gap-3 p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Heart className="h-5 w-5 text-gray-600" /> Wishlist
            </Link>
          </div>
        </div>
      )}

      {!showBreadcrumbs ? <Breadcrumbs /> : <FilterTabs />}
      <LocationSelectionModal onLocationSelect={handleLocationSelect} />
      <AuthModal />
      <CartDrawer />
    </header>
  );
}
