// app/checkout/page.tsx
"use client";
import { useState } from "react";
import { CheckoutHeader } from "./components/CheckoutHeader";
import ShoppingBag from "./components/ShoppingBag";
import PaymentSection from "./components/PaymentSection";
import AddressCard from "./components/AddressCard";

type Step = "bag" | "address" | "payment";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>("bag");

  // Helper to move forward
  const handleNext = () => {
    if (currentStep === "bag") setCurrentStep("address");
    else if (currentStep === "address") setCurrentStep("payment");
  };

  // Helper to move back (if user clicks header or back button)
  const goToStep = (step: Step) => setCurrentStep(step);

  return (
    <div className="min-h-screen bg-gray-50/30">
      <CheckoutHeader currentStep={currentStep} />

      <main className="py-8">
        {/* We pass the handleNext function to your components 
            so their "Place Order" or "Continue" buttons can trigger the switch */}

        {currentStep === "bag" && <ShoppingBag onNext={handleNext} />}

        {currentStep === "address" && (
          <AddressCard onNext={handleNext} onBack={() => goToStep("bag")} />
        )}

        {currentStep === "payment" && (
          <PaymentSection onBack={() => goToStep("address")} />
        )}
      </main>
    </div>
  );
}
