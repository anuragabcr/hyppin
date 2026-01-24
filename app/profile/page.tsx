// app/profile/page.tsx
"use client";
import { useState } from "react";
import { Box, CreditCard, MapPin, User, Headphones } from "lucide-react";
import { ProfileSidebar } from "./components/ProfileSidebar";
import { OverviewCard } from "./components/OverviewCard";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const quickActions = [
    { id: "orders", label: "My Orders", icon: Box },
    { id: "payments", label: "My Payments", icon: CreditCard },
    { id: "address", label: "My Address", icon: MapPin },
    { id: "profile", label: "My Profile", icon: User },
    { id: "support", label: "Help & Support", icon: Headphones },
  ];

  return (
    <main className="max-w-7xl mx-auto p-10 flex gap-12">
      {/* LEFT SIDEBAR */}
      <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* RIGHT CONTENT AREA */}
      <section className="flex-1">
        {activeTab === "overview" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <OverviewCard
                key={action.id}
                {...action}
                onClick={() => setActiveTab(action.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl h-96 flex items-center justify-center text-gray-400 font-medium">
            {activeTab.toUpperCase()} View Coming Soon
          </div>
        )}
      </section>
    </main>
  );
}
