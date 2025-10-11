"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type FilterContextType = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTab, setSelectedTab] = useState("All");

  return (
    <FilterContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
