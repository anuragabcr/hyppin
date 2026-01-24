import {
  LayoutGrid,
  Box,
  CreditCard,
  MapPin,
  User,
  LogOut,
  LucideIcon,
} from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  variant?: "default" | "danger";
}

const sidebarItems: SidebarItem[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "orders", label: "My Orders", icon: Box },
  { id: "payments", label: "My Payments", icon: CreditCard },
  { id: "address", label: "My Address", icon: MapPin },
  { id: "profile", label: "My Profile", icon: User },
  { id: "logout", label: "Logout", icon: LogOut, variant: "danger" },
];

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export const ProfileSidebar = ({
  activeTab,
  setActiveTab,
}: ProfileSidebarProps) => (
  <aside className="w-64 border-r border-gray-100 pr-6 space-y-2">
    {sidebarItems.map((item) => {
      const Icon = item.icon;
      const isActive = activeTab === item.id;
      const isDanger = item.variant === "danger";

      return (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
            isActive
              ? "text-blue-600 bg-blue-50/50"
              : isDanger
              ? "text-red-500 hover:bg-red-50"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
          {item.label}
        </button>
      );
    })}
  </aside>
);
