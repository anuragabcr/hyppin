"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
}

export default function ProfileMenu({
  isOpen,
  onClose,
  setIsAuthModalOpen,
  user,
}: ProfileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-[-30px] top-[30px] mt-3 w-48 bg-white shadow-lg rounded-lg border border-gray-200 py-2 z-50"
    >
      {!user ? (
        <>
          {/* Not Logged In */}
          <div
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            onClick={() => {
              setIsAuthModalOpen(true);
              onClose();
            }}
          >
            Login
          </div>
        </>
      ) : (
        <>
          {/* Logged In */}
          <Link
            href="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            onClick={onClose}
          >
            My Profile
          </Link>

          <Link
            href="/orders"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            onClick={onClose}
          >
            My Orders
          </Link>

          <button
            onClick={() => {
              console.log("Logout user");
              onClose();
            }}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
