/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useMemo } from "react";
import FiltersSidebar from "../components/FiltersSidebar";
import SearchSort from "../components/SearchSort";
import ProductGrid from "../../components/ProductGrid";
import { Product } from "../../components/ProductCarousel";
import MobileDrawer from "../../components/MobileDrawer";
import { CategoryId, FILTERS_BY_CATEGORY } from "@/app/constants";

interface ProductListingPageProps {
  categoryId: CategoryId;
}

export default function ProductListingPage({
  categoryId,
}: ProductListingPageProps) {
  const filtersConfig = FILTERS_BY_CATEGORY[categoryId];
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await res.json();

        const mappedData = data.map(
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

    Object.keys(filters).forEach((key) => {
      const selectedValues = filters[key];

      if (
        !selectedValues ||
        (Array.isArray(selectedValues) && selectedValues.length === 0)
      ) {
        return;
      }

      if (key === "price") {
        result = result.filter(
          (p) => p.price >= selectedValues.min && p.price <= selectedValues.max,
        );
      } else if (key === "discount") {
        result = result.filter((p) =>
          selectedValues.some((val: string) => {
            const threshold = parseInt(val);
            return p.discount >= threshold;
          }),
        );
      } else {
        result = result.filter((p: any) => {
          const productValue = p[key];
          return selectedValues.includes(productValue);
        });
      }
    });

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
          cardType={categoryId === "stores" ? "store" : "product"}
        />
        <ProductGrid
          products={filteredProducts}
          title="Pantaloons"
          actionPath=""
          cardType={categoryId === "stores" ? "store" : "product"}
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
