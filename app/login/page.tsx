/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { app } from "../lib/firebaseConfig";
import { AuthLayout } from "./components/AuthLayout";
import { PhoneInputForm } from "./components/PhoneInputForm";
import { OtpVerifyForm } from "./components/OtpVerifyForm";
import { EmailInputForm } from "./components/EmailInputForm";

const auth = getAuth(app);

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendMagicLink = async (email: string) => {
    setLoading(true);
    const actionCodeSettings = {
      url: window.location.origin + "/login/finish-signup",
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      alert("Magic link sent! Check your inbox.");
    } catch (error: any) {
      console.error("Magic Link Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

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
      {step === "phone" && (
        <PhoneInputForm
          onContinue={handleSendOtp}
          onGoogleClick={() => setStep("email")}
          isLoading={loading}
        />
      )}
      {step === "otp" && (
        <OtpVerifyForm
          phoneNumber={phone}
          onVerify={handleVerifyOtp}
          isLoading={loading}
        />
      )}
      {step === "email" && (
        <EmailInputForm
          onContinue={handleSendMagicLink}
          onBack={() => setStep("phone")}
          isLoading={loading}
        />
      )}
      <div id="recaptcha-container"></div>
    </AuthLayout>
  );
}
