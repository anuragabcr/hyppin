"use client";

import { useState, useEffect, useMemo } from "react";
import FiltersSidebar, { ActiveFilters } from "./components/FiltersSidebar";
import SearchSort from "./components/SearchSort";
import ProductGrid from "../components/ProductGrid";
import { Product } from "../components/ProductCarousel";
import MobileDrawer from "../components/MobileDrawer";
import { FILTERS_BY_CATEGORY } from "../constants";

export default function ProductListingPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const filtersConfig = FILTERS_BY_CATEGORY["men"];
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ActiveFilters>({
    sizes: [],
    discounts: [],
    colors: [],
    prices: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await res.json();

        const mappedData = data.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any): Product => ({
            id: item.id.toString(),
            brand: "Highlander",
            name: item.title,
            image: item.images[0].replace(/[\[\]"]/g, ""),
            price: item.price,
            originalPrice: Math.round(item.price * 1.25),
            discount: 20,
            rating: 4.8,
            href: `/product/${item.id}`,
          }),
        );

        setProducts(mappedData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q),
      );
    }

    if (filters.discounts.length) {
      result = result.filter((p) =>
        filters.discounts.some((range: unknown) => {
          if (range === "5-10%") return p.discount >= 5 && p.discount <= 10;
          if (range === "10-20%") return p.discount > 10 && p.discount <= 20;
          if (range === "20-30%") return p.discount > 20 && p.discount <= 30;
          if (range === "30%+") return p.discount > 30;
          return false;
        }),
      );
    }

    if (filters.prices.length) {
      result = result.filter((p) =>
        filters.prices.some((range: unknown) => {
          if (range === "Below ₹500") return p.price < 500;
          if (range === "₹500 - ₹1000")
            return p.price >= 500 && p.price <= 1000;
          if (range === "₹1000 - ₹2000")
            return p.price > 1000 && p.price <= 2000;
          if (range === "Above ₹2000") return p.price > 2000;
          return false;
        }),
      );
    }

    switch (sortOrder) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        result.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }

    return result;
  }, [products, searchQuery, sortOrder, filters]);

  return (
    <div className="flex w-full mx-auto p-4 bg-white">
      <aside className="hidden md:block lg:block w-48 relative">
        <div className="md:sticky md:top-24">
          <FiltersSidebar
            filters={filters}
            setFilters={setFilters}
            filtersConfig={filtersConfig}
          />
        </div>
      </aside>

      <main className="flex-1 space-y-8 overflow-y-auto max-h-[calc(100vh-6rem)] pr-2 relative">
        <div className="sticky top-0 z-10 bg-white px-1 sm:px-2 md:px-4 lg:px-8 pb-2">
          <SearchSort
            search={searchQuery}
            sort={sortOrder}
            onSearchChange={setSearchQuery}
            onSortChange={setSortOrder}
            setIsMobileFilterOpen={() => setIsMobileFilterOpen(true)}
          />
        </div>

        <ProductGrid
          products={filteredProducts}
          title="Westside"
          actionPath=""
        />
        <ProductGrid
          products={filteredProducts}
          title="Pantaloons"
          actionPath=""
        />
      </main>
      <MobileDrawer
        open={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title=""
      >
        <FiltersSidebar
          filters={filters}
          setFilters={setFilters}
          filtersConfig={filtersConfig}
        />
      </MobileDrawer>
    </div>
  );
}
