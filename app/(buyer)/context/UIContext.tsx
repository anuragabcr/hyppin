"use client";

import { createContext, useContext, useState } from "react";

interface UIContextType {
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;

  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  isCartModalOpen: boolean;
  setIsCartModalOpen: (open: boolean) => void;

  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <UIContext.Provider
      value={{
        isLocationModalOpen,
        setIsLocationModalOpen,

        isAuthModalOpen,
        setIsAuthModalOpen,

        isCartModalOpen,
        setIsCartModalOpen,

        isProfileOpen,
        setIsProfileOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within a UIProvider");
  return ctx;
};
