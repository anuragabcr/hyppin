"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "../lib/utils";
import { MdOutlineAllInclusive } from "react-icons/md";
import { GiLargeDress } from "react-icons/gi";
import { IoShirt } from "react-icons/io5";
import { GiRunningShoe } from "react-icons/gi";
import { PiWatchFill } from "react-icons/pi";
import { FaStore } from "react-icons/fa";

const categories = [
  { label: "All", icon: <MdOutlineAllInclusive />, id: "all" },
  { label: "Men", icon: <IoShirt />, id: "men" },
  { label: "Women", icon: <GiLargeDress />, id: "women" },
  { label: "Footwear", icon: <GiRunningShoe />, id: "footwear" },
  { label: "Watches", icon: <PiWatchFill />, id: "kids" },
  { label: "Stores", icon: <FaStore />, id: "stores" },
];

export default function FilterTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = pathname.split("/").pop() || "all";

  const handleNavigation = (id: string) => {
    router.push(id === "all" ? "/" : `/categories/${id}`);
  };

  return (
    <div className="w-full bg-white">
      <div className="flex items-center gap-3 md:gap-10 overflow-x-auto no-scrollbar px-4 sm:px-6 md:px-8">
        {categories.map((cat) => {
          const isActive = activeTab === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleNavigation(cat.id)}
              className={cn(
                "flex flex-col items-center justify-center py-3 min-w-16",
                "transition-colors duration-200 cursor-pointer",
                isActive
                  ? "text-[#FFCE1D]"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              <div className="flex flex-col md:flex-row gap-2 items-center">
                <span className="text-xl leading-none">{cat.icon}</span>

                <span className="mt-1 text-xs font-semibold uppercase">
                  {cat.label}
                </span>
              </div>

              <span
                className={cn(
                  "mt-2 h-[3px] w-full rounded-full transition-all",
                  isActive ? "bg-[#FFCE1D]" : "bg-transparent",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
