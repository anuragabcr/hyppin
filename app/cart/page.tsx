"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import Link from "next/link";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalAmount, clearCart } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-gray-600">
        <p className="text-lg font-medium mb-4">Your cart is empty 🛍️</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-sm my-6">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {/* --- Cart Items --- */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-gray-200 pb-4"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md border object-cover"
                unoptimized
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  ₹{item.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center border rounded-md text-lg font-bold hover:bg-gray-100"
              >
                -
              </button>
              <span className="text-gray-700 font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center border rounded-md text-lg font-bold hover:bg-gray-100"
              >
                +
              </button>
            </div>

            {/* Subtotal + Remove */}
            <div className="flex items-center gap-4">
              <p className="text-gray-800 font-semibold">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Cart Footer --- */}
      <div className="mt-8 flex items-center justify-between border-t pt-4">
        <button
          onClick={clearCart}
          className="text-sm text-red-600 hover:underline"
        >
          Clear Cart
        </button>
        <div className="flex flex-col items-end">
          <p className="text-lg font-bold">Total: ₹{totalAmount.toFixed(2)}</p>
          <button className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
