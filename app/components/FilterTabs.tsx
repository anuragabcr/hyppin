"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "../lib/utils";

const categories = [
  { label: "All", icon: "🛍️", id: "all" },
  { label: "Men", icon: "👔", id: "men" },
  { label: "Women", icon: "👗", id: "women" },
  { label: "Kids", icon: "🧒", id: "kids" },
  { label: "Footwear", icon: "👟", id: "footwear" },
  { label: "Stores", icon: "🕶️", id: "stores" },
];

export default function FilterTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const getActiveTab = () => {
    const segments = pathname.split("/");
    return segments[segments.length - 1] || "all";
  };

  const activeTab = getActiveTab();

  const handleNavigation = (id: string) => {
    if (id === "all") {
      router.push(`/`);
      return;
    }
    router.push(`/categories/${id}`);
  };

  return (
    <div className="w-full bg-white">
      <div className="flex items-center gap-8 overflow-x-auto py-3 px-4 sm:px-6 md:px-8 flex-nowrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleNavigation(cat.id)}
            className={cn(
              "flex items-center gap-2 pb-2 text-sm font-medium transition-colors duration-200 cursor-pointer",
              "whitespace-nowrap",
              activeTab === cat.id
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-black hover:text-gray-800",
            )}
          >
            {/* <span>{cat.icon}</span> */}
            <span className="uppercase font-semibold">{cat.label}</span>
          </button>
        ))}
        <div className="shrink-0 w-4 sm:w-6 md:w-8" aria-hidden="true" />
      </div>
    </div>
  );
}
