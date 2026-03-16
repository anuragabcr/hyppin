"use client";

import { Search, Mic, Bell, ScanBarcode } from "lucide-react";
import Image from "next/image";

export default function TopNavbar() {
  return (
    <header className="flex items-center justify-between w-full h-20 px-8 bg-transparent">
      {/* Search Bar - Pill Design */}
      <div className="flex items-center bg-white rounded-full px-5 py-2.5 shadow-sm border border-gray-100 w-full max-w-xl">
        <Search className="text-blue-900 mr-3" size={20} />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400 font-medium"
        />
        <div className="border-l border-gray-200 pl-3 ml-2">
          <Mic
            className="text-blue-900 cursor-pointer hover:text-blue-600 transition"
            size={20}
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        {/* Status & Barcode Pill */}
        <div className="flex items-center bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-100 space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-5 bg-teal-500 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 bg-white w-3 h-3 rounded-full shadow-sm"></div>
            </div>
            <span className="text-gray-700 font-semibold text-sm">Online</span>
          </div>

          <div className="border-l border-gray-200 pl-4">
            <ScanBarcode className="text-red-500 cursor-pointer" size={24} />
          </div>
        </div>

        {/* Notifications */}
        <div className="relative p-2 bg-white rounded-full shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition">
          <Bell className="text-blue-900" size={22} />
          <span className="absolute top-0 right-0 bg-yellow-400 text-[10px] font-bold text-black w-4 h-4 flex items-center justify-center rounded-full border border-white">
            1
          </span>
        </div>

        {/* User Profile */}
        <div className="w-10 h-10 rounded-full border-2 border-yellow-400 overflow-hidden cursor-pointer">
          <Image
            src="/user-avatar.jpg" // Replace with your image path
            alt="User Profile"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}
