"use client";

import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import CartDetailsView from "./CartDetailsView";
import AddressSelectionView from "./AddressSelectionView";
import EmptyCartView from "./EmptyCartView";
import { useUI } from "../context/UIContext";

type CartStage = "cart" | "address";

export default function CartDrawer() {
  const { cart, totalAmount } = useCart();
  const { isCartModalOpen, setIsCartModalOpen } = useUI();

  const [stage, setStage] = useState<CartStage>("cart");

  useEffect(() => {
    if (isCartModalOpen) {
      setStage("cart");
    }
  }, [isCartModalOpen, cart.length]);

  useEffect(() => {
    document.body.style.overflow = isCartModalOpen ? "hidden" : "";
  }, [isCartModalOpen]);

  const hasItems = cart.length > 0;

  return (
    <div
      className={`fixed inset-0 z-50 transition-all ${
        isCartModalOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isCartModalOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setIsCartModalOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-gray-50 shadow-xl transform transition-transform duration-300 rounded-l-xl overflow-y-auto ${
          isCartModalOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <h2 className="text-xl font-bold">
            {stage === "cart" ? "My Cart" : "Select Delivery Address"}
          </h2>
          <button onClick={() => setIsCartModalOpen(false)}>
            <HiX className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* --- Conditional View Rendering --- */}
        {!hasItems ? (
          <EmptyCartView />
        ) : stage === "cart" ? (
          <CartDetailsView
            onProceedToAddress={() => setStage("address")}
            totalAmount={totalAmount}
          />
        ) : (
          <AddressSelectionView
            onProceedToPayment={() => console.log("Proceed to Payment")}
            onBackToCart={() => setStage("cart")}
          />
        )}
      </div>
    </div>
  );
}
