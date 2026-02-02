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

  const activeTab = pathname.split("/").pop() || "all";

  const handleNavigation = (id: string) => {
    router.push(id === "all" ? "/" : `/categories/${id}`);
  };

  return (
    <div className="w-full bg-white">
      <div className="flex items-center gap-10 overflow-x-auto px-4 sm:px-6 md:px-8">
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
                  ? "text-purple-600"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              <div className="flex gap-2">
                <span className="text-xl leading-none">{cat.icon}</span>

                <span className="mt-1 text-xs font-semibold uppercase">
                  {cat.label}
                </span>
              </div>

              <span
                className={cn(
                  "mt-2 h-[3px] w-full rounded-full transition-all",
                  isActive ? "bg-purple-600" : "bg-transparent",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
