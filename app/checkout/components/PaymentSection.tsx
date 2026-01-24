"use client";
import { useState } from "react";
import { PaymentMethodTabs } from "./PaymentMethodTabs";
import { CardForm } from "./CardForm";
import { OrderSummarySidebar } from "./OrderSummarySidebar";

export default function PaymentSection({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("card");

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Payment Method Selection (2/3 width) */}
        <div className="lg:col-span-2 border border-gray-200 rounded-2xl bg-white flex min-h-[500px]">
          <PaymentMethodTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {activeTab === "card" ? (
            <CardForm />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              {activeTab.toUpperCase()} Integration Coming Soon
            </div>
          )}
        </div>

        {/* Right: Summary (1/3 width) */}
        <OrderSummarySidebar onBack={onBack} />
      </div>
    </div>
  );
}
