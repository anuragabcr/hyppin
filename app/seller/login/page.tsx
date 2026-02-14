/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { app } from "../../lib/firebaseConfig";
import { toast } from "sonner";
import SellerSidebar from "./components/SellerSidebar";
import LoginCard from "./components/LoginCard";

type LoginStep = "PHONE" | "OTP" | "MAGIC_LINK";

export default function SellerLoginPage() {
  const [step, setStep] = useState<LoginStep>("PHONE");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const auth = getAuth(app);

  // --- Handlers ---

  const handleSendOTP = async () => {
    if (!phone) return toast.error("Please enter a phone number");
    setIsLoading(true);
    try {
      // Initialize reCAPTCHA
      const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      const result = await signInWithPhoneNumber(auth, `+91${phone}`, verifier);
      setConfirmationResult(result);
      setStep("OTP");
      toast.success("OTP sent successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await confirmationResult.confirm(otp);
      toast.success("Login successful!");
      // Redirect to seller dashboard here
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };

  const handleMagicLink = async () => {
    if (!email) return toast.error("Please enter your email");
    setIsLoading(true);
    try {
      await sendSignInLinkToEmail(auth, email, {
        url: window.location.origin + "/login/finish-signup",
        handleCodeInApp: true,
      });
      window.localStorage.setItem("emailForSignIn", email);
      toast.success("Magic link sent to your email!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[90vh] font-sans">
      <SellerSidebar />

      <div className="bg-[#F9F5FB] flex flex-col w-full">
        <div className="text-center pt-12 px-4 space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#1B254B]">
            Grow your local business{" "}
            <span className="text-blue-600">with Hyppin</span>
          </h1>

          <p className="text-gray-500">
            Create your seller account to start managing your local business
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <LoginCard
                onSendOtp={async () => {}}
                onVerifyOtp={async () => {}}
                onSendMagicLink={async () => {}}
              />
            </div>

            <div className="hidden md:flex justify-center">
              <Image
                src="/images/login_cart.svg"
                alt="Seller Illustration"
                width={520}
                height={420}
                priority
              />
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 pb-6 px-4 flex items-center justify-center gap-2">
          <span>🔒</span>
          <span>
            We never ask for payment or OTP. Reach out for support only from{" "}
            <span className="text-blue-600">support@hyppin.com</span>
          </span>
        </div>
      </div>
    </div>
  );
}
