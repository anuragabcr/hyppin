"use client";

import { FilterProvider } from "./FilterContext";
import { CartProvider } from "./CartContext";
import { UIProvider } from "./UIContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <FilterProvider>
      <CartProvider>
        <UIProvider>{children}</UIProvider>
      </CartProvider>
    </FilterProvider>
  );
};
