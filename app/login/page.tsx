/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { app } from "../lib/firebaseConfig";
import { AuthLayout } from "./components/AuthLayout";
import { PhoneInputForm } from "./components/PhoneInputForm";
import { OtpVerifyForm } from "./components/OtpVerifyForm";

const auth = getAuth(app);

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        },
      );
    }
  }, []);

  const handleSendOtp = async (phoneNumber: string) => {
    setLoading(true);
    try {
      const formattedPhone = `+91${phoneNumber}`;
      const appVerifier = (window as any).recaptchaVerifier;

      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier,
      );
      setConfirmationResult(result);
      setPhone(phoneNumber);
      setStep("otp");
    } catch (error) {
      console.error("SMS Error:", error);
      alert("Failed to send SMS. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    if (!confirmationResult) return;
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      alert("Login Successful!");
    } catch (error) {
      console.error("OTP Error:", error);
      alert("Invalid OTP code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {step === "phone" ? (
        <PhoneInputForm onContinue={handleSendOtp} isLoading={loading} />
      ) : (
        <OtpVerifyForm
          phoneNumber={phone}
          onVerify={handleVerifyOtp}
          isLoading={loading}
        />
      )}
      <div id="recaptcha-container"></div>
    </AuthLayout>
  );
}
