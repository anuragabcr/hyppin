"use client";

import { FilterProvider } from "./FilterContext";
import { CartProvider } from "./CartContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <FilterProvider>
      <CartProvider>{children}</CartProvider>
    </FilterProvider>
  );
};
