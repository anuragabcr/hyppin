import Image from "next/image";
import { useState } from "react";

export const OtpVerifyForm = ({
  phoneNumber,
  onVerify,
  isLoading,
}: {
  phoneNumber: string;
  onVerify: (otp: string) => void;
  isLoading: boolean;
}) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-gray-900">
          We just sent an SMS
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          Enter the security sent to +91 {phoneNumber}
        </p>
      </div>

      <div className="space-y-6 pt-4">
        <div className="flex justify-between gap-2">
          {otp.map((val, idx) => (
            <input
              key={idx}
              type="text"
              value={val}
              onChange={(e) => handleChange(e.target, idx)}
              className="w-12 h-12 text-center border border-gray-200 rounded-lg text-lg font-bold focus:border-blue-500 focus:outline-none"
            />
          ))}
        </div>

        <button
          onClick={() => onVerify(otp.join(""))}
          disabled={isLoading || otp.join("").length < 6}
          className="w-full py-4 bg-linear-to-r from-yellow-400 to-yellow-500 rounded-xl font-bold text-sm text-gray-900 shadow-md hover:brightness-105 transition-all"
        >
          {isLoading ? "Verifying..." : "Login"}
        </button>

        <div className="relative py-2 text-center">
          <span className="bg-white px-4 text-xs font-bold text-gray-400 relative z-10">
            Or
          </span>
          <div className="absolute top-1/2 left-0 w-full h-1px bg-gray-100 z-0" />
        </div>

        <button className="w-full flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-xl font-bold text-sm text-gray-800 hover:bg-gray-50 transition-colors">
          <Image src="/google-icon.svg" fill alt="Google" className="w-5 h-5" />
          Log In with Google
        </button>
      </div>
    </>
  );
};
