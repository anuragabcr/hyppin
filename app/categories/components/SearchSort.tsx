"use client";

import { Search, ArrowUpDown, SlidersHorizontal } from "lucide-react";

export const sortOptions = [
  { label: "Recent", value: "recent" },
  { label: "Popular", value: "popular" },
  { label: "Price low to high", value: "price_asc" },
  { label: "Price high to low", value: "price_desc" },
  { label: "Top Discount", value: "discount" },
];

interface SearchSortProps {
  search: string;
  sort: string;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  setIsMobileFilterOpen: () => void;
}

export default function SearchSort({
  search,
  sort,
  onSearchChange,
  onSortChange,
  setIsMobileFilterOpen,
}: SearchSortProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* <div className="relative w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
        <input
          type="text"
          placeholder="Search items here"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            w-full
            pl-10 pr-4 py-2.5
            rounded-lg
            border border-border
            bg-background
            placeholder:text-muted
          "
        />
      </div> */}
      <div></div>

      <div className="flex gap-2 justify-between">
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="
            w-full
            appearance-none
            pl-10 pr-10 py-2.5
            rounded-lg
            border border-border
            bg-background
            font-medium
          "
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                Sort by: {option.label}
              </option>
            ))}
          </select>

          <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
        </div>
        <button
          onClick={setIsMobileFilterOpen}
          className="flex md:hidden lg:hidden p-2 border rounded-lg"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filters
        </button>
      </div>
    </div>
  );
}
