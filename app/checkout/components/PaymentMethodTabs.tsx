import {
  CreditCard,
  Wallet,
  Smartphone,
  Landmark,
  Banknote,
  LucideIcon,
} from "lucide-react";

// 1. Define the shape of a single Payment Method
interface PaymentMethod {
  id: string;
  label: string;
  icon: LucideIcon;
}

const methods: PaymentMethod[] = [
  { id: "card", label: "Debit & Credit Card", icon: CreditCard },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "netbanking", label: "Net Banking", icon: Landmark },
  { id: "cod", label: "Cash on Delivery", icon: Banknote },
];

// 2. Define the Props for the Component
interface PaymentMethodTabsProps {
  activeTab: string;
  // This type represents a React State Dispatch function
  setActiveTab: (id: string) => void;
}

export const PaymentMethodTabs = ({
  activeTab,
  setActiveTab,
}: PaymentMethodTabsProps) => (
  <div className="w-1/3 border-r border-gray-200 py-4">
    {methods.map((method) => {
      const Icon = method.icon;
      return (
        <button
          key={method.id}
          onClick={() => setActiveTab(method.id)}
          className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-semibold transition-colors ${
            activeTab === method.id
              ? "text-blue-600 bg-blue-50/50 border-r-2 border-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Icon size={20} />
          {method.label}
        </button>
      );
    })}
  </div>
);
