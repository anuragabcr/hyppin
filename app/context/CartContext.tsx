"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../lib/firebaseConfig";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const auth = getAuth(app);

  useEffect(() => {
    const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(guestCart);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const sync = async () => {
      const user = auth.currentUser;

      if (!user) {
        localStorage.setItem("cart", JSON.stringify(cart));
        return;
      }

      const token = await user.getIdToken();

      try {
        await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cart),
        });
      } catch (err) {
        console.error("Failed to sync cart to DB", err);
      }
    };

    const timeout = setTimeout(sync, 1000);
    return () => clearTimeout(timeout);
  }, [cart, auth.currentUser, isLoaded]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing)
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p,
        );
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

  const updateQuantity = (id: string, quantity: number) =>
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, quantity } : p)));

  const clearCart = () => setCart([]);

  const totalAmount = cart.reduce((a, i) => a + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside provider");
  return ctx;
};
