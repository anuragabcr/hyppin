"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

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

  const token = JSON.parse(localStorage.getItem("hyppin_user") || "{}")?.token;

  useEffect(() => {
    const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!token) {
      setCart(guestCart);
      return;
    }

    fetch("/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(async (dbCart) => {
        const merged = mergeCarts(dbCart, guestCart);

        setCart(merged);

        await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(merged),
        });

        localStorage.removeItem("cart");
      });
  }, [token]);

  useEffect(() => {
    if (!token) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cart),
      });
    }
  }, [cart, token]);

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

function mergeCarts(a: CartItem[], b: CartItem[]) {
  const map = new Map<string, CartItem>();

  [...a, ...b].forEach((item) => {
    const existing = map.get(item.id);
    if (existing)
      map.set(item.id, {
        ...item,
        quantity: existing.quantity + item.quantity,
      });
    else map.set(item.id, item);
  });

  return Array.from(map.values());
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside provider");
  return ctx;
};
