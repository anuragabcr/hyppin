"use client";

import React, { useCallback, useState } from "react";

import OnboardingHeader from "./components/OnboardingHeader";
import OnboardingSidebar from "./components/OnboardingSidebar";
import BusinessDetails from "./components/BusinessDetails";
import SellerDetails from "./components/SellerDetails";
import BankDetails from "./components/BankDetails";
import DigitalSignature from "./components/DigitalSignature";
import VerifySubmit from "./components/VerifySubmit";
import {
  BankData,
  BusinessData,
  OnboardingData,
  SellerData,
  SignatureData,
} from "./types";

const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    business: {
      gstin: "",
      storeName: "",
      address: "",
      entityType: "Sole proprietorship",
      phone: "",
      inventoryModel: "Hyppin inventory system",
      days: [0, 1, 2, 3, 4],
      openAllDays: false,
      from: "09:00",
      to: "22:00",
      gstVerified: false,
    },
    seller: { fullName: "", phone: "", email: "" },
    bank: { accountNumber: "", ifsc: "", bankType: "" },
    signature: {
      type: "draw",
      image: null,
      isAgreed: false,
    },
  });

  const [isStepValid, setIsStepValid] = useState(false);

  const updateData = <K extends keyof OnboardingData>(
    section: K,
    newData: Partial<OnboardingData[K]>,
  ) => {
    setOnboardingData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...newData },
    }));
  };

  const handleBusinessChange = useCallback(
    (d: Partial<BusinessData>) => updateData("business", d),
    [],
  );

  const handleBusinessValid = useCallback(
    (v: boolean) => setIsStepValid(v),
    [],
  );

  const handleSellerChange = useCallback(
    (d: Partial<SellerData>) => updateData("seller", d),
    [],
  );

  const handleSellerValid = useCallback((v: boolean) => {
    setIsStepValid(v);
  }, []);

  const handleBankChange = useCallback(
    (d: Partial<BankData>) => updateData("bank", d),
    [],
  );

  const handleSignatureChange = useCallback(
    (d: Partial<SignatureData>) => updateData("signature", d),
    [],
  );

  const handleSignatureValid = useCallback(
    (v: boolean) => setIsStepValid(v),
    [],
  );

  const handleBankValid = useCallback((v: boolean) => setIsStepValid(v), []);

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BusinessDetails
            initial={onboardingData.business}
            onChange={handleBusinessChange}
            onValidChange={handleBusinessValid}
          />
        );
      case 2:
        return (
          <SellerDetails
            initial={onboardingData.seller}
            onChange={handleSellerChange}
            onValidChange={handleSellerValid}
          />
        );
      case 3:
        return (
          <BankDetails
            initial={onboardingData.bank}
            onChange={handleBankChange}
            onValidChange={handleBankValid}
          />
        );
      case 4:
        return (
          <DigitalSignature
            initial={onboardingData.signature}
            onChange={handleSignatureChange}
            onValidChange={handleSignatureValid}
          />
        );
      case 5:
        return (
          <VerifySubmit
            data={onboardingData}
            onEdit={(step) => setCurrentStep(step)}
            onSubmit={() => console.log("Final Submission", onboardingData)}
          />
        );
      default:
        return (
          <BusinessDetails
            initial={onboardingData.business}
            onChange={(d) => updateData("business", d)}
            onValidChange={setIsStepValid}
          />
        );
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
    console.log("Data at Step", currentStep, onboardingData);
  };

  return (
    <div
      className="flex h-screen w-full flex-col bg-[#F8FAFF] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/seller_onboard_bg.svg')",
      }}
    >
      {/* 1. Global Header */}
      <OnboardingHeader
        currentStep={currentStep}
        totalSteps={totalSteps}
        onLogout={() => console.log("Logging out...")}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* 2. Sticky Sidebar */}
        <OnboardingSidebar currentStep={currentStep} />

        {/* 3. Main Content Area with Background Image */}
        <main className="relative flex-1 overflow-y-auto">
          {/* Background Illustration from directory */}

          <div className="relative z-10 mx-auto p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* LEFT — Form */}
              <div className="min-h-[60vh]">{renderStepComponent()}</div>

              {/* RIGHT — Illustration + CTA */}
              <div className="relative flex flex-col items-end justify-end h-full">
                {/* Save Button */}
                {currentStep < totalSteps && (
                  <button
                    onClick={handleNext}
                    disabled={!isStepValid}
                    className="mt-10 rounded-xl bg-[#FFD644] px-10 py-3 text-sm font-bold text-gray-900 shadow-lg shadow-amber-200/50 transition-all hover:bg-[#F2C938] active:scale-95 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
                  >
                    Save & Continue
                  </button>
                )}
              </div>
            </div>

            {/* Footer Support */}
            <div className="mt-12 border-t border-gray-100 pt-6 text-xs text-gray-400 flex items-center gap-2">
              <span className="text-base">🔒</span>
              Have any questions? Reach out to{" "}
              <span className="font-semibold text-blue-600">
                support@hyppin.com
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OnboardingPage;
