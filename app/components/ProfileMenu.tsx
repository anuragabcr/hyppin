"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useUI } from "../context/UIContext";

interface User {
  name: string;
  phone: string;
  email: string;
}

export default function ProfileMenu() {
  const { isProfileOpen, setIsProfileOpen } = useUI();
  const menuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser) as User);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error reading user from localStorage:", error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen, setIsProfileOpen]);

  if (!isProfileOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-[-30px] top-[30px] mt-3 w-48 bg-white shadow-lg rounded-lg border border-gray-200 py-2 z-50"
    >
      {!user ? (
        <>
          <Link
            href={"/login"}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            onClick={() => {
              // setIsAuthModalOpen(true);
              setIsProfileOpen(false);
            }}
          >
            Login
          </Link>
          <Link
            href="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setIsProfileOpen(false)}
          >
            My Profile
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setIsProfileOpen(false)}
          >
            My Profile
          </Link>

          <button
            onClick={() => setIsProfileOpen(false)}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
