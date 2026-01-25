"use client";
import { useState } from "react";
import { Box, CreditCard, MapPin, User, Headphones } from "lucide-react";
import { OverviewCard } from "./components/OverviewCard";
import OrderSection from "./components/OrderSection";
import PaymentSection from "./components/PaymentSection";
import AddressSection from "./components/AddressSection";
import { ProfileForm } from "./components/ProfileForm";
import { ProfileSidebar } from "./components/ProfileSidebar";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const quickActions = [
    { id: "orders", label: "My Orders", icon: Box },
    { id: "payments", label: "My Payments", icon: CreditCard },
    { id: "address", label: "My Address", icon: MapPin },
    { id: "profile", label: "My Profile", icon: User },
    { id: "support", label: "Help & Support", icon: Headphones },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <OverviewCard
                key={action.id}
                {...action}
                onClick={() => setActiveTab(action.id)}
              />
            ))}
          </div>
        );
      case "orders":
        return <OrderSection />;
      case "payments":
        return <PaymentSection />;
      case "address":
        return <AddressSection />;
      case "profile":
        return <ProfileForm />;
      default:
        return (
          <div className="bg-gray-50 rounded-2xl h-96 flex items-center justify-center text-gray-400 font-medium italic">
            {activeTab.toUpperCase()} content is currently unavailable.
          </div>
        );
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row gap-12">
      <div className="w-full md:w-64">
        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <section className="flex-1">
        <h2 className="text-2xl font-black mb-8 capitalize">
          {activeTab === "overview" ? "Account Overview" : activeTab}
        </h2>

        {renderContent()}
      </section>
    </main>
  );
}
