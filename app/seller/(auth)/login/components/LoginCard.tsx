"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

type Step = "phone" | "otp" | "email";

interface Props {
  onSendOtp: (phone: string) => Promise<void>;
  onVerifyOtp: (otp: string) => Promise<void>;
  onSendMagicLink: (email: string) => Promise<void>;
}

export default function LoginCard({
  onSendOtp,
  onVerifyOtp,
  onSendMagicLink,
}: Props) {
  const [step, setStep] = useState<Step>("phone");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const validPhone = /^\d{10}$/.test(phone);
  const validOtp = /^\d{6}$/.test(otp);

  const handleSendOtp = async () => {
    await onSendOtp(phone);
    setStep("otp");
  };

  const handleVerifyOtp = async () => {
    await onVerifyOtp(otp);
  };

  const handleMagicLink = async () => {
    await onSendMagicLink(email);
  };

  return (
    <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl p-8 space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-semibold text-[#1B254B]">
          Welcome to Hyppin
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Create your seller account to start
          <br />
          managing your local business
        </p>
      </div>

      {step === "phone" && (
        <>
          <PhoneInput value={phone} onChange={setPhone} />

          <button
            disabled={!validPhone}
            onClick={handleSendOtp}
            className="w-full py-3 rounded-xl font-semibold text-gray-900
              bg-linear-to-r from-yellow-300 to-yellow-400
              disabled:opacity-40 disabled:cursor-not-allowed
              hover:brightness-105 transition-all shadow-md"
          >
            Send OTP
          </button>

          <p className="text-xs text-gray-500 text-center leading-relaxed">
            We’ll send a one-time password (OTP)
            <br />
            to verify your number
          </p>

          <button
            onClick={() => setStep("email")}
            className="flex w-full items-center justify-center gap-3 border rounded-xl py-3 font-semibold text-sm hover:bg-gray-50"
          >
            <FaGoogle size={20} /> <span>Login with Google</span>
          </button>
        </>
      )}

      {step === "otp" && (
        <>
          <input
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="Enter 6 digit OTP"
            className="w-full border rounded-xl px-4 py-3 text-center tracking-widest text-lg"
          />

          <button
            disabled={!validOtp}
            onClick={handleVerifyOtp}
            className="w-full py-3 rounded-xl bg-yellow-400 font-semibold disabled:opacity-40"
          >
            Verify OTP
          </button>

          <button
            onClick={() => setStep("phone")}
            className="text-sm text-blue-600 mx-auto block"
          >
            Change number
          </button>
        </>
      )}

      {step === "email" && (
        <>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            type="email"
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            onClick={handleMagicLink}
            className="w-full py-3 rounded-xl bg-yellow-400 font-semibold"
          >
            Send Magic Link
          </button>

          <button
            onClick={() => setStep("phone")}
            className="text-sm text-blue-600 mx-auto block"
          >
            Back to phone login
          </button>
        </>
      )}

      <div className="pt-4 border-t text-center text-sm text-gray-500">
        By continuing, you agree to our
        <br />
        <span className="text-blue-600 font-medium cursor-pointer hover:underline">
          Terms & Conditions
        </span>
      </div>
    </div>
  );
}

const PhoneInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-yellow-300">
    <div className="flex items-center gap-2 px-4 py-3 border-r border-gray-200">
      +91
      <ChevronDown size={16} className="text-gray-400" />
    </div>

    <input
      type="tel"
      placeholder="Enter phone number"
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
      className="flex-1 px-4 py-3 outline-none text-sm"
    />
  </div>
);
