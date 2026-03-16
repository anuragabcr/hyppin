import { NextResponse } from "next/server";
import productsData from "@/app/(buyer)/data/products.json";
import type { Category, Product } from "@/app/(buyer)/types/product";

const products = productsData as Product[];

export async function GET() {
  const categoryMap = new Map<number, Category>();

  products.forEach((product) => {
    if (product.category) {
      categoryMap.set(product.category.id, product.category);
    }
  });

  return NextResponse.json([...categoryMap.values()]);
}
