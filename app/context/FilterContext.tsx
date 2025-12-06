"use client";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";

type FilterContextType = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const contextValue = useMemo(
    () => ({
      selectedTab,
      setSelectedTab,
      searchTerm,
      setSearchTerm,
    }),
    [selectedTab, searchTerm],
  );

  return (
    <FilterContext.Provider value={contextValue}>
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
