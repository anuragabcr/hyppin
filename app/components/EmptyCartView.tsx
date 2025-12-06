import Image from "next/image";
import React from "react";
import { useUI } from "../context/UIContext";

export default function EmptyCartView() {
  const { setIsCartModalOpen } = useUI();

  return (
    <div className="p-8 text-center flex flex-col items-center justify-center h-[calc(100%-64px)]">
      <Image
        src="/images/empty_cart.png"
        alt="Empty Cart"
        width={250}
        height={250}
        className="w-50 h-50 mb-6 opacity-80"
      />
      <h3 className="text-2xl font-bold text-gray-700 mb-2">
        Your Cart is Empty!
      </h3>
      <p className="text-gray-500 mb-8">
        Looks like you haven&apos;t added anything to your cart yet.
      </p>
      <button
        onClick={() => setIsCartModalOpen(false)}
        className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition cursor-pointer"
      >
        Start Shopping Now
      </button>
    </div>
  );
}
