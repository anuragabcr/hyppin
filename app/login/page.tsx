/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  sendSignInLinkToEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../lib/firebaseConfig";
import { AuthLayout } from "./components/AuthLayout";
import { PhoneInputForm } from "./components/PhoneInputForm";
import { OtpVerifyForm } from "./components/OtpVerifyForm";
import { EmailInputForm } from "./components/EmailInputForm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const auth = getAuth(app);

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const storedUser = localStorage.getItem("hyppin_user");
        if (storedUser) {
          router.replace("/");
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSendMagicLink = async (email: string) => {
    setLoading(true);
    const actionCodeSettings = {
      url: window.location.origin + "/login/finish-signup",
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      toast.success("Magic link sent! Check your inbox.");
    } catch (error: any) {
      console.error("Magic Link Error:", error);
      toast.error(error.message);
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
      toast.success("OTP sent! Check your phone.");
      setConfirmationResult(result);
      setPhone(phoneNumber);
      setStep("otp");
    } catch (error) {
      console.error("SMS Error:", error);
      toast.error("Failed to send SMS. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    if (!confirmationResult) return;
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      toast.success("Login Successful!");
    } catch (error) {
      console.error("OTP Error:", error);
      toast.error("Invalid OTP code.");
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
