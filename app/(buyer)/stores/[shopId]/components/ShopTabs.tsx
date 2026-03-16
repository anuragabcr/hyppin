"use client";

import React, { useState } from "react";
import {
  // LayoutDashboard,
  ShoppingCart,
  MessageSquareText,
  // Camera,
} from "lucide-react";
// import DiningOffers from "./Offers";
// import ShopInfo from "./ShopInfo";
// import MoreInfo from "./MoreInfo";
// import ReviewHighlights from "./ReviewHighlights";
import MenuSidebar from "./MenuSidebar";
import MenuItemList from "./MenuItemList";
import Reviews from "./Reviews";
// import ImageGallery from "./ImageGallery";

// --- 1. Define your tab names and icons ---
// Using an array of objects makes it easy to manage.
const tabItems = [
  // { name: "Overview", icon: LayoutDashboard },
  { name: "Order Online", icon: ShoppingCart },
  { name: "Reviews", icon: MessageSquareText },
  // { name: "Photos", icon: Camera },
];

// const OverviewComponent = () => (
//   <div className="grid gap-6">
//     <DiningOffers />
//     <ShopInfo />
//     <MoreInfo />
//     <ReviewHighlights />
//   </div>
// );

const OrderOnlineComponent = () => (
  <div className="mx-auto px-4 lg:px-8 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
      <MenuSidebar />
      <MenuItemList />
    </div>
  </div>
);

const ReviewsComponent = () => (
  <div className="p-6">
    <Reviews />
  </div>
);

// const PhotosComponent = () => (
//   <div className="p-6">
//     <ImageGallery />
//   </div>
// );

// --- 3. Create a mapping for the components ---
// This is a clean way to render the correct component.
const tabContent: Record<string, React.ReactNode> = {
  // Overview: <OverviewComponent />,
  "Order Online": <OrderOnlineComponent />,
  Reviews: <ReviewsComponent />,
  // Photos: <PhotosComponent />,
};

// --- 4. The Main Tabs Component ---
const ShopTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Order Online");

  return (
    <div className="w-full mx-auto px-4 md:px-6 lg:px-8">
      {/* Tab Navigation */}
      <nav className="relative border-b border-gray-200">
        <div className="flex space-x-8 -mb-px overflow-x-auto">
          {tabItems.map((tab) => {
            const isActive = tab.name === activeTab;
            const Icon = tab.icon;

            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                // We use Tailwind's `group` utility for a nice hover effect
                className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-all duration-200 ease-in-out group
                  ${
                    isActive
                      ? "border-red-500 text-red-500" // Active state
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300" // Inactive state
                  }
                `}
              >
                {/* Optional Icon */}
                <Icon
                  className={`w-5 h-5 ${
                    isActive
                      ? "text-red-500"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Tab Content Area */}
      <div className="py-6">
        {/* Render the active component from the map */}
        {tabContent[activeTab]}
      </div>
    </div>
  );
};

export default ShopTabs;
