"use client";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { SavedPaymentCard } from "./SavedPaymentCard";
import { AddPaymentForm } from "./AddPaymentForm";

export default function PaymentSection() {
  const [selectedMethod, setSelectedMethod] = useState("card_1");
  const [isAddingNew, setIsAddingNew] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-black">Payments</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
            Saved Methods
          </p>
        </div>
        {!isAddingNew && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 text-blue-600 text-sm font-bold hover:underline"
          >
            <PlusCircle size={18} />
            Add New
          </button>
        )}
      </div>

      <div className="space-y-2">
        <SavedPaymentCard
          type="Card"
          lastFour="8890"
          isSelected={selectedMethod === "card_1"}
          onSelect={() => setSelectedMethod("card_1")}
          onDelete={() => console.log("Delete Card")}
        />
        <SavedPaymentCard
          type="UPI"
          upiId="jane@oksbi"
          isSelected={selectedMethod === "upi_1"}
          onSelect={() => setSelectedMethod("upi_1")}
          onDelete={() => console.log("Delete UPI")}
        />
      </div>

      {isAddingNew ? (
        <div className="relative">
          <AddPaymentForm />
          <button
            onClick={() => setIsAddingNew(false)}
            className="mt-4 w-full text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600"
          >
            Cancel and Go Back
          </button>
        </div>
      ) : (
        <div className="mt-10 p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
          <p className="text-xs text-blue-800 leading-relaxed font-medium">
            Your payment info is encrypted and stored securely. We never share
            your card details with merchants.
          </p>
        </div>
      )}
    </div>
  );
}
