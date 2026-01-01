"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((item) => item !== "");

  return (
    <nav
      className="flex py-3 text-gray-500 text-sm font-sans"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-black flex items-center">
            <Home className="h-4 w-4 mr-1" />
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={href} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link
                href={href}
                className={`capitalize ${
                  isLast ? "text-black font-semibold" : "hover:text-black"
                }`}
              >
                {segment.replace(/-/g, " ")}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
