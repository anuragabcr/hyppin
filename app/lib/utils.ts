// lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import productsData from "@/app/data/products.json";
import type { Product as ApiProduct } from "../types/product";

/**
 * A utility to combine conditional Tailwind class names safely
 */
export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

const FASHION_BRANDS = [
  "Allen Solly",
  "Van Heusen",
  "U.S. Polo Assn.",
  "Peter England",
  "H&M",
  "ZARA",
  "Levi’s",
  "Roadster",
  "WROGN",
  "Jack & Jones",
];

const getBrandByProductId = (id: number) =>
  FASHION_BRANDS[id % FASHION_BRANDS.length];

export function getCategoryProducts(categoryId: number) {
  const products = productsData as ApiProduct[];

  return products
    .filter((p) => p.category?.id === categoryId)
    .map((item) => ({
      id: item.id.toString(),
      brand: getBrandByProductId(item.id),
      name: item.title,
      image: item.images?.[0],
      price: item.price,
      originalPrice: Math.round(item.price * 1.25),
      discount: 20,
      rating: 4.5,
      href: `/product/${item.id}`,
    }));
}
