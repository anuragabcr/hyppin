/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { FilterConfig, FilterOption } from "@/app/constants/filters";

export interface ProductFilters {
  sizes: string[];
  discounts: string[];
  colors: string[];
  prices: string[];
}

export type ActiveFilters = Record<string, any>;

interface FiltersSidebarProps {
  filtersConfig: FilterConfig[];
  filters: ActiveFilters;
  setFilters: (filters: ActiveFilters) => void;
}

function FilterSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-200 py-4 last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left group cursor-pointer"
      >
        <span className="text-sm font-bold uppercase tracking-wider text-gray-900 group-hover:text-gray-600">
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden min-h-0">
          <div
            className={cn(
              "pt-4 transition-opacity duration-300 ease-out",
              isOpen ? "flex" : "hidden",
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Checkbox Item
function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1">
      <div
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
          checked ? "border-black bg-black" : "border-gray-300 bg-white",
        )}
      >
        {checked && <Search className="h-3 w-3 text-white" />}{" "}
        {/* Using Search icon as checkmark/tick */}
      </div>
      <span
        className={cn(
          "text-sm",
          checked ? "font-medium text-black" : "text-gray-600",
        )}
      >
        {label}
      </span>
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
}

// 3. Color Swatch Item
function ColorSwatch({
  option,
  isSelected,
  onClick,
}: {
  option: FilterOption;
  isSelected: boolean;
  onClick: () => void;
}) {
  // Map basic color names to hex if needed, or assume value is CSS compatible
  // For multi-color, usually a gradient is used
  const bgStyle =
    option.value === "multi-color"
      ? { background: "linear-gradient(45deg, red, blue, green, yellow)" }
      : { backgroundColor: String(option.value) };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative h-8 w-8 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-105",
        isSelected && "ring-2 ring-black ring-offset-2",
      )}
      style={bgStyle}
      title={option.label}
    >
      {/* Only show checkmark on white/light colors for contrast, or always if you prefer */}
      {isSelected && (option.value === "white" || option.value === "beige") && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-black" />
        </div>
      )}
    </button>
  );
}

// --- MAIN COMPONENT ---

export default function FiltersSidebar({
  filtersConfig,
  filters,
  setFilters,
}: FiltersSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => {
      const defaults: Record<string, boolean> = {};
      filtersConfig.forEach((filter, index) => {
        defaults[filter.key] = index === 0;
      });
      return defaults;
    },
  );

  // Helper: Toggle Accordion
  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper: Handle Multi-Select (Checkbox, Swatch, Chips)
  const handleMultiSelect = (key: string, value: string | number) => {
    setFilters((prev: any) => {
      const current = (prev[key] as any[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      const newFilters = { ...prev, [key]: updated };
      return newFilters;
    });
  };

  // Helper: Handle Single Select (Radio)
  const handleSingleSelect = (key: string, value: string | number) => {
    setFilters((prev: any) => {
      const newFilters = { ...prev, [key]: value };
      return newFilters;
    });
  };

  // Helper: Handle Range (Price) - Simplified as Min/Max Inputs
  const handleRangeChange = (
    key: string,
    type: "min" | "max",
    value: string,
  ) => {
    setFilters((prev: any) => {
      const currentRange = prev[key] || { min: 0, max: 10000 };
      const newRange = { ...currentRange, [type]: Number(value) };

      const newFilters = { ...prev, [key]: newRange };
      return newFilters;
    });
  };

  return (
    <aside className="h-full w-full overflow-y-auto bg-white px-4 py-2 scrollbar-none">
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
        <h2 className="flex gap-2 items-center text-xl font-semibold">
          <SlidersHorizontal />
          Filters
        </h2>
        {Object.keys(filters).length > 0 && (
          <button
            onClick={() => {
              setFilters({});
            }}
            className="text-xs font-medium text-red-600 hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-1">
        {filtersConfig.map((config) => (
          <FilterSection
            key={config.key}
            title={config.label}
            isOpen={openSections[config.key]}
            onToggle={() => toggleSection(config.key)}
          >
            {config.type === "checkbox" && (
              <div className="space-y-2">
                {config.options?.map((opt) => (
                  <CheckboxItem
                    key={String(opt.value)}
                    label={opt.label}
                    checked={filters[config.key]?.includes(opt.value) || false}
                    onChange={() => handleMultiSelect(config.key, opt.value)}
                  />
                ))}
              </div>
            )}

            {config.type === "swatch" && (
              <div className="flex flex-wrap gap-3 py-1">
                {config.options?.map((opt) => (
                  <ColorSwatch
                    key={String(opt.value)}
                    option={opt}
                    isSelected={
                      filters[config.key]?.includes(opt.value) || false
                    }
                    onClick={() => handleMultiSelect(config.key, opt.value)}
                  />
                ))}
              </div>
            )}

            {config.type === "chips" && (
              <div className="flex flex-wrap gap-2">
                {config.options?.map((opt) => {
                  const isSelected = filters[config.key]?.includes(opt.value);
                  return (
                    <button
                      key={String(opt.value)}
                      onClick={() => handleMultiSelect(config.key, opt.value)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                        isSelected
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-400",
                      )}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}

            {config.type === "radio" && (
              <div className="space-y-2">
                {config.options?.map((opt) => (
                  <label
                    key={String(opt.value)}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <input
                      type="radio"
                      name={config.key}
                      className="h-4 w-4 accent-black"
                      checked={filters[config.key] === opt.value}
                      onChange={() => handleSingleSelect(config.key, opt.value)}
                    />
                    <span className="text-sm text-gray-700">{opt.label}</span>
                  </label>
                ))}
              </div>
            )}

            {config.type === "range" && (
              <div className="space-y-3 px-1">
                <div className="flex items-center justify-between gap-4">
                  <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                      Min
                    </span>
                    <input
                      type="number"
                      className="w-full rounded border border-gray-300 py-1.5 pl-10 pr-2 text-sm focus:border-black focus:outline-none"
                      placeholder={String(config.min)}
                      min={config.min}
                      onChange={(e) =>
                        handleRangeChange(config.key, "min", e.target.value)
                      }
                    />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                      Max
                    </span>
                    <input
                      type="number"
                      className="w-full rounded border border-gray-300 py-1.5 pl-10 pr-2 text-sm focus:border-black focus:outline-none"
                      placeholder={String(config.max)}
                      max={config.max}
                      onChange={(e) =>
                        handleRangeChange(config.key, "max", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </FilterSection>
        ))}
      </div>
    </aside>
  );
}
