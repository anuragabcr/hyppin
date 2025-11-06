"use client";

import Link from "next/link";
import {
  HiOutlineShoppingCart,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { FaChevronDown } from "react-icons/fa";
import { useCart } from "@/app/context/CartContext"; // ✅ Import your Cart context
import { useRouter } from "next/navigation";
import FilterTabs from "./FilterTabs";

export default function Header() {
  const { cart } = useCart();
  const router = useRouter();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex items-center h-20 px-4 sm:px-6 lg:px-8">
        {/* --- Logo --- */}
        <div className="flex-shrink-0 mr-8">
          <Link href="/" className="text-3xl font-bold text-indigo-600">
            hyppin
          </Link>
        </div>

        {/* --- Location Section (Desktop Only) --- */}
        <div className="hidden lg:flex flex-col text-left mr-8 cursor-pointer hover:bg-gray-50 p-2 rounded transition">
          <p className="text-base font-bold text-gray-900">
            Delivery in 11 minutes
          </p>
          <div className="flex items-center text-sm text-gray-600">
            <p>Bengaluru, Karnataka 560037</p>
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
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="hidden sm:flex items-center text-base font-semibold text-gray-700 hover:text-indigo-600 transition p-2"
          >
            Login
          </Link>

          {/* --- My Cart Button --- */}
          <button
            onClick={() => router.push("/cart")}
            className="relative flex items-center justify-center h-12 w-28 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition shadow-md"
          >
            <HiOutlineShoppingCart className="h-5 w-5 mr-2" />
            <span className="font-semibold">My Cart</span>

            {/* --- Badge --- */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* --- Filter Tabs --- */}
      <FilterTabs />
    </header>
  );
}
