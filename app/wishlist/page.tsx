"use client";

import { WishlistItem } from "./components/WishlistItem";

const WISHLIST_DATA = [
  {
    store: "Westside",
    items: [
      {
        id: "w1",
        brand: "LEVI",
        name: "Men's Black Polo T-shirt",
        price: 720,
        originalPrice: 900,
        discount: "20 % off",
        rating: 4.8,
        image: "/images/cart1.svg",
      },
    ],
  },
  {
    store: "Pantaloons",
    items: [
      {
        id: "p1",
        brand: "LEVI",
        name: "Men's Black Polo T-shirt",
        price: 720,
        originalPrice: 900,
        discount: "20 % off",
        rating: 4.8,
        image: "/images/cart2.svg",
      },
    ],
  },
];

export default function WishlistPage() {
  return (
    <main className="max-w-4xl mx-auto p-10">
      <div className="flex justify-between items-end mb-10">
        <h1 className="text-2xl font-black">My Wishlist</h1>
        <button className="text-blue-600 text-xs font-bold hover:underline">
          Remove all
        </button>
      </div>

      {WISHLIST_DATA.map((group) => (
        <div key={group.store} className="mb-12">
          <h2 className="text-lg font-bold text-gray-800 mb-6">
            {group.store}
          </h2>
          <div className="space-y-4">
            {group.items.map((item) => (
              <WishlistItem
                key={item.id}
                {...item}
                onRemove={() => console.log("Remove", item.id)}
                onAddToCart={() => console.log("Add to Cart", item.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
