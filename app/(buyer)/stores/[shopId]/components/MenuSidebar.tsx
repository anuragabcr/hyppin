"use client";

import React, { useState, useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";

// --- 1. Define the Data Structure (TypeScript) ---
interface Category {
  id: string; // Used for anchor linking (e.g., #bowl-biryani)
  name: string;
  count: number; // Number of items in this category
}

// --- 2. Dummy Data from the Image ---
const dummyCategories: Category[] = [
  { id: "new-arrivals", name: "New Arrivals", count: 24 },
  { id: "mens-clothing", name: "Men's Clothing", count: 58 },
  { id: "womens-clothing", name: "Women's Clothing", count: 74 },
  { id: "kids-fashion", name: "Kids' Fashion", count: 28 },
  { id: "ethnic-wear", name: "Ethnic Wear", count: 32 },
  { id: "western-wear", name: "Western Wear", count: 47 },
  { id: "footwear", name: "Footwear", count: 38 },
  { id: "accessories", name: "Fashion Accessories", count: 44 },
  { id: "sportswear", name: "Activewear & Sports", count: 27 },
  { id: "winterwear", name: "Winterwear", count: 21 },
];

// --- 3. The Main Component ---
const MenuSidebar: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("bowl-biryani");
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Function to handle smooth scrolling to a section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Use offset for better visibility beneath a fixed header (like top-24)
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  // Effect for setting the active category based on scroll (IntersectionObserver)
  useEffect(() => {
    // 1. Initial sticky check
    const handleScroll = () => {
      const offset = 300; // Adjust based on your page layout
      setIsSticky(window.scrollY > offset);
    };

    window.addEventListener("scroll", handleScroll);

    // 2. Intersection Observer setup
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the section is intersecting and coming into view from the top
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -60% 0px", // Use a top margin to trigger when section is in upper-middle screen
        threshold: 0,
      },
    );

    observerRef.current = observer;

    // 3. Observe all content sections
    dummyCategories.forEach((category) => {
      const element = document.getElementById(category.id);
      if (element) {
        observer.observe(element);
      }
    });

    // 4. Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []); // Empty dependency array means this runs only on mount

  return (
    // The wrapper ensures the component can be placed anywhere in your layout.
    // The 'lg:sticky lg:top-24' makes it stick below a typical header on desktop.
    <div
      className={`w-full ${
        isSticky ? "lg:sticky lg:top-24" : ""
      } hidden lg:block`}
    >
      <nav
        className="
          w-full max-w-xs
          p-4
          bg-white
          rounded-lg
          shadow-md
          border border-gray-100
        "
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-gray-500" />
          Menu Categories
        </h3>

        <ul className="space-y-1">
          {dummyCategories.map((category) => {
            const isActive = category.id === activeId;
            return (
              <li key={category.id}>
                <button
                  onClick={() => scrollToSection(category.id)}
                  className={`
                    w-full text-left
                    py-2 px-3
                    rounded-lg
                    transition-all duration-150
                    text-base
                    ${
                      isActive
                        ? "bg-red-50 text-red-600 font-semibold" // Active state
                        : "text-gray-700 hover:bg-gray-100" // Inactive state
                    }
                  `}
                >
                  {/* Category Name */}
                  <span
                    className={`${isActive ? "text-red-600" : "text-gray-900"}`}
                  >
                    {category.name}
                  </span>
                  {/* Item Count */}
                  <span
                    className={`
                      ml-2
                      ${
                        isActive
                          ? "text-red-500 font-semibold"
                          : "text-gray-500"
                      }
                    `}
                  >
                    ({category.count})
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MenuSidebar;
