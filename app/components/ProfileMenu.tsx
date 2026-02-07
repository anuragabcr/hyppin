"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useUI } from "../context/UIContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../lib/firebaseConfig";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface User {
  name?: string;
  phone?: string;
  email: string;
}

export default function ProfileMenu() {
  const { isProfileOpen, setIsProfileOpen } = useUI();
  const menuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("hyppin_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser) as User);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
        toast.error("Failed to load user data. Please log in again.");
        console.log("Error loading user from localStorage:", error);
      }
    };

    if (isProfileOpen) {
      loadUser();
    }
  }, [isProfileOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("hyppin_user");
      setUser(null);
      setIsProfileOpen(false);
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Error logging out");
      console.error(error);
    }
  };

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
      className="absolute right-0 top-10 mt-3 w-56 bg-white shadow-xl rounded-xl border border-gray-100 py-2 z-50 overflow-hidden"
    >
      {user ? (
        <>
          <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Account
            </p>
            <p className="text-sm font-bold text-gray-900 truncate">
              {user.name || "Hyppin User"}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          <div className="py-1">
            <Link
              href="/profile"
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              onClick={() => setIsProfileOpen(false)}
            >
              My Profile
            </Link>
            <Link
              href="/orders"
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              onClick={() => setIsProfileOpen(false)}
            >
              My Orders
            </Link>
          </div>

          <div className="border-t border-gray-50 pt-1">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="py-1">
          <Link
            href="/login"
            className="block px-4 py-2.5 text-sm font-bold text-gray-900 hover:bg-gray-50 transition"
            onClick={() => setIsProfileOpen(false)}
          >
            Login / Signup
          </Link>
          <div className="px-4 py-2">
            <p className="text-[10px] text-gray-400 leading-tight">
              Join the Hyppin family to start shopping!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
