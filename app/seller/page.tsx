"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SellerPage = () => {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // 1. Check Login
    if (!storedUser) {
      router.replace("/seller/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      // 2. Check Role
      if (user.role !== "seller") {
        router.replace("/login");
        return;
      }

      // 3. Check Onboarding
      if (user.isOnboarded) {
        router.replace("/seller/dashboard");
      } else {
        router.replace("/seller/onboard");
      }
    } catch (error) {
      console.error("Auth error:", error);
      router.replace("/seller/login");
    }
  }, [router]);

  // Return a clean loading state so the user doesn't see a blank white screen
  // or unwanted footer content while the browser processes the redirect.
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#F8FAFF]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="text-slate-500 font-medium animate-pulse">
          Verifying session...
        </p>
      </div>
    </div>
  );
};

export default SellerPage;
