"use client";

import ProductCard from "../stores/[shopId]/components/ProductCard";

interface MenuItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  discount: string;
  isSponsored: boolean;
  isAssured: boolean;
  isHotDeal: boolean;
}

const mockProducts: MenuItem[] = [
  {
    id: "prod-001",
    name: "Men Printed Round Neck T-Shirt",
    imageUrl: "https://placehold.co/400x500?text=T-Shirt",
    price: 397,
    originalPrice: 1569,
    discount: "74% off",
    isSponsored: true,
    isAssured: true,
    isHotDeal: true,
  },
  {
    id: "prod-002",
    name: "Slim Fit Self Design Casual Shirt",
    imageUrl: "https://placehold.co/400x500?text=Casual+Shirt",
    price: 306,
    originalPrice: 999,
    discount: "69% off",
    isSponsored: true,
    isAssured: true,
    isHotDeal: false,
  },
  {
    id: "prod-003",
    name: "Men Regular Fit Solid Spread Collar Shirt",
    imageUrl: "https://placehold.co/400x500?text=Solid+Shirt",
    price: 272,
    originalPrice: 999,
    discount: "72% off",
    isSponsored: false,
    isAssured: true,
    isHotDeal: true,
  },
  {
    id: "prod-004",
    name: "Men Checkered Zip Neck Polo T-Shirt",
    imageUrl: "https://placehold.co/400x500?text=Polo+T-Shirt",
    price: 298,
    originalPrice: 999,
    discount: "70% off",
    isSponsored: false,
    isAssured: true,
    isHotDeal: true,
  },
  {
    id: "prod-005",
    name: "Slim Fit Denim Jacket",
    imageUrl: "https://placehold.co/400x500?text=Denim+Jacket",
    price: 1499,
    originalPrice: 2499,
    discount: "40% off",
    isSponsored: false,
    isAssured: true,
    isHotDeal: false,
  },
  {
    id: "prod-006",
    name: "Men's Running Sports Shoes",
    imageUrl: "https://placehold.co/400x500?text=Running+Shoes",
    price: 1099,
    originalPrice: 2599,
    discount: "58% off",
    isSponsored: true,
    isAssured: false,
    isHotDeal: true,
  },
  {
    id: "prod-007",
    name: "Casual Regular Fit Chinos",
    imageUrl: "https://placehold.co/400x500?text=Chinos",
    price: 799,
    originalPrice: 1999,
    discount: "60% off",
    isSponsored: false,
    isAssured: true,
    isHotDeal: false,
  },
  {
    id: "prod-008",
    name: "Men Slim Fit Cotton Formal Shirt",
    imageUrl: "https://placehold.co/400x500?text=Formal+Shirt",
    price: 599,
    originalPrice: 1499,
    discount: "60% off",
    isSponsored: false,
    isAssured: true,
    isHotDeal: false,
  },
  {
    id: "prod-009",
    name: "Soft Cotton Hoodie for Men",
    imageUrl: "https://placehold.co/400x500?text=Hoodie",
    price: 899,
    originalPrice: 1999,
    discount: "55% off",
    isSponsored: true,
    isAssured: true,
    isHotDeal: false,
  },
  {
    id: "prod-010",
    name: "Men Regular Fit Woolen Sweater",
    imageUrl: "https://placehold.co/400x500?text=Sweater",
    price: 1299,
    originalPrice: 2999,
    discount: "57% off",
    isSponsored: false,
    isAssured: true,
    isHotDeal: true,
  },
];

interface SimilarProductsProps {
  title?: string;
  products?: MenuItem[];
}

export default function SimilarProducts({
  title = "Similar Items",
  products = mockProducts,
}: SimilarProductsProps) {
  return (
    <section className=" mx-auto mt-10 p-2 md:p-4">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-wide">
        {title}:
        <div className="w-24 h-[3px] bg-green-300 mt-1 rounded-full"></div>
      </h2>

      {/* Horizontal Scroll Area */}
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-2">
        {products.map((product) => (
          <div key={product.id} className="min-w-60 max-w-60 shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
