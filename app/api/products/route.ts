import { NextRequest, NextResponse } from "next/server";
import productsData from "@/app/data/products.json";
import type { Product } from "@/app/types/product";

// Tell TS what the JSON actually is
const products = productsData as Product[];

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const categoryId = searchParams.get("categoryId");
  const productId = searchParams.get("productId");

  let result: Product[] = products;

  if (categoryId) {
    result = result.filter((p) => p.category?.id === Number(categoryId));
  }

  if (productId) {
    result = result.filter((p) => p.id === Number(productId));
  }

  return NextResponse.json(result);
}
