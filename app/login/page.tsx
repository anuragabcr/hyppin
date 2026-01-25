"use client";
import { useState } from "react";
import { AuthLayout } from "./components/AuthLayout";
import { PhoneInputForm } from "./components/PhoneInputForm";
import { OtpVerifyForm } from "./components/OtpVerifyForm";

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");

  const handleContinue = (val: string) => {
    setPhone(val);
    setStep("otp");
  };

  return (
    <AuthLayout>
      {step === "phone" ? (
        <PhoneInputForm onContinue={handleContinue} />
      ) : (
        <OtpVerifyForm phoneNumber={phone} />
      )}
    </AuthLayout>
  );
}
