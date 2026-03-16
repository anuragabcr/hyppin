"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Boxes,
  BarChart3,
  Megaphone,
  Settings,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const [openInventory, setOpenInventory] = useState(false);
  const [openPromotions, setOpenPromotions] = useState(false);
  const [openAnalytics, setOpenAnalytics] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/seller/inventory")) {
      setOpenInventory(true);
    }

    if (pathname.startsWith("/seller/promotions")) {
      setOpenPromotions(true);
    }

    if (
      pathname.startsWith("/seller/reports") ||
      pathname.startsWith("/seller/reviews")
    ) {
      setOpenAnalytics(true);
    }
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-72 bg-linear-to-b from-[#1e3caa] to-[#2a5298] text-white flex flex-col shadow-xl">
      {/* Logo */}
      <div className="px-6 py-6 text-2xl font-bold tracking-wide">Hyppin</div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {/* Dashboard */}
        <NavItem
          href="/seller/dashboard"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          active={isActive("/seller/dashboard")}
        />

        {/* Orders */}
        <NavItem
          href="/seller/orders"
          icon={<ShoppingCart size={18} />}
          label="Orders"
          active={isActive("/seller/orders")}
        />

        {/* Returns */}
        <NavItem
          href="/seller/returns"
          icon={<Package size={18} />}
          label="Returns"
          active={isActive("/seller/returns")}
        />

        {/* Inventory */}
        <DropdownItem
          label="Inventory"
          icon={<Boxes size={18} />}
          open={openInventory}
          setOpen={setOpenInventory}
        >
          <SubItem
            href="/seller/inventory/products"
            label="Products"
            active={isActive("/seller/inventory/products")}
          />

          <SubItem
            href="/seller/inventory/category"
            label="Category"
            active={isActive("/seller/inventory/category")}
          />
        </DropdownItem>

        {/* Analytics */}
        <DropdownItem
          label="Analytics"
          icon={<BarChart3 size={18} />}
          open={openAnalytics}
          setOpen={setOpenAnalytics}
        >
          <SubItem
            href="/seller/reports"
            label="Reports"
            active={isActive("/seller/reports")}
          />

          <SubItem
            href="/seller/reviews"
            label="Reviews"
            active={isActive("/seller/reviews")}
          />
        </DropdownItem>

        {/* Promotions */}
        <DropdownItem
          label="Promotions"
          icon={<Megaphone size={18} />}
          open={openPromotions}
          setOpen={setOpenPromotions}
        >
          <SubItem
            href="/seller/promotions/coupons"
            label="Coupons"
            active={isActive("/seller/promotions/coupons")}
          />

          <SubItem
            href="/seller/promotions/advertise"
            label="Advertise"
            active={isActive("/seller/promotions/advertise")}
          />

          <SubItem
            href="/seller/promotions/payments"
            label="Payments"
            active={isActive("/seller/promotions/payments")}
          />
        </DropdownItem>

        {/* Help */}
        <NavItem
          href="/seller/help"
          icon={<HelpCircle size={18} />}
          label="Help & Support"
          active={isActive("/seller/help")}
        />

        {/* Settings */}
        <NavItem
          href="/seller/settings"
          icon={<Settings size={18} />}
          label="Settings"
          active={isActive("/seller/settings")}
        />
      </nav>
    </aside>
  );
}

function NavItem({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
      ${
        active
          ? "bg-yellow-400 text-black font-semibold shadow-md"
          : "hover:bg-white/10"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function DropdownItem({
  label,
  icon,
  open,
  setOpen,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={() => {
          setOpen(!open);
          console.log("Toggling dropdown for", label);
        }}
        className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-white/10 transition-all"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>

        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && <div className="ml-6 mt-1 space-y-1">{children}</div>}
    </div>
  );
}

function SubItem({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all
      ${
        active ? "bg-yellow-400 text-black font-semibold" : "hover:bg-white/10"
      }`}
    >
      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
      {label}
    </Link>
  );
}
