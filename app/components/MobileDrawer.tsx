"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function MobileDrawer({
  open,
  onClose,
  title,
  children,
}: MobileDrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div
        className="
          absolute right-0 top-0 h-full
          w-[85%] max-w-sm
          bg-white
          shadow-xl
          flex flex-col
          animate-slide-in
        "
      >
        <div className="flex items-center justify-between px-4 py-3 ">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
