"use client";

import { useState } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

interface FiltersSidebarProps {
  onChange: (filters: ProductFilters) => void;
}

export interface ProductFilters {
  sizes: string[];
  discounts: string[];
  colors: string[];
  prices: string[];
}

const SIZES = ["XXL", "XL", "MD", "S"];

const DISCOUNTS = ["5-10%", "10-20%", "20-30%", "30%+"];

const COLORS = [
  { label: "Black", value: "black" },
  { label: "White", value: "white" },
  { label: "Blue", value: "blue" },
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
];

const PRICES = ["Below ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "Above ₹2000"];

function Section({
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
    <div className="py-4 border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-base font-semibold">{title}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 text-sm text-muted cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-brand"
      />
      {label}
    </label>
  );
}

export default function FiltersSidebar({ onChange }: FiltersSidebarProps) {
  const [open, setOpen] = useState({
    size: true,
    discount: false,
    color: false,
    price: false,
  });

  const [filters, setFilters] = useState<ProductFilters>({
    sizes: [],
    discounts: [],
    colors: [],
    prices: [],
  });

  const toggleSection = (key: keyof typeof open) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleFilter = (type: keyof ProductFilters, value: string) => {
    setFilters((prev) => {
      const updated = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];

      const newFilters = { ...prev, [type]: updated };
      onChange(newFilters);
      return newFilters;
    });
  };

  return (
    <aside className="w-full p-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-border">
        <SlidersHorizontal className="h-5 w-5 text-muted" />
        <h2 className="text-lg font-semibold">Filter</h2>
      </div>

      {/* Size */}
      <Section
        title="Size"
        isOpen={open.size}
        onToggle={() => toggleSection("size")}
      >
        {SIZES.map((size) => (
          <Checkbox
            key={size}
            label={size}
            checked={filters.sizes.includes(size)}
            onChange={() => toggleFilter("sizes", size)}
          />
        ))}
      </Section>

      {/* Discount */}
      <Section
        title="Discount"
        isOpen={open.discount}
        onToggle={() => toggleSection("discount")}
      >
        {DISCOUNTS.map((d) => (
          <Checkbox
            key={d}
            label={d}
            checked={filters.discounts.includes(d)}
            onChange={() => toggleFilter("discounts", d)}
          />
        ))}
      </Section>

      {/* Color */}
      <Section
        title="Color"
        isOpen={open.color}
        onToggle={() => toggleSection("color")}
      >
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => toggleFilter("colors", c.value)}
              className={`
                h-7 w-7 rounded-full border
                ${
                  filters.colors.includes(c.value)
                    ? "ring-2 ring-brand"
                    : "border-border"
                }
              `}
              style={{ backgroundColor: c.value }}
            />
          ))}
        </div>
      </Section>

      {/* Price */}
      <Section
        title="Price"
        isOpen={open.price}
        onToggle={() => toggleSection("price")}
      >
        {PRICES.map((p) => (
          <Checkbox
            key={p}
            label={p}
            checked={filters.prices.includes(p)}
            onChange={() => toggleFilter("prices", p)}
          />
        ))}
      </Section>
    </aside>
  );
}
