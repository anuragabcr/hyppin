import { useState } from "react";
import { ChevronLeft } from "lucide-react";

interface EmailInputFormProps {
  onContinue: (email: string) => void;
  onBack: () => void;
  isLoading: boolean;
}

export const EmailInputForm = ({
  onContinue,
  onBack,
  isLoading,
}: EmailInputFormProps) => {
  const [email, setEmail] = useState("");

  return (
    <>
      <button
        onClick={onBack}
        className="flex items-center text-gray-400 hover:text-gray-600 mb-4 transition-colors"
      >
        <ChevronLeft size={18} />{" "}
        <span className="text-sm font-bold">Back</span>
      </button>
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-gray-900">Email Login</h1>
        <p className="text-sm text-gray-500 font-medium">
          We&apos;ll send a magic link to your inbox.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#f0bd49]/20 focus:border-[#f0bd49] transition-all"
        />

        <button
          disabled={isLoading || !email.includes("@")}
          onClick={() => onContinue(email)}
          className="w-full py-4 bg-linear-to-r from-[#ffce1d] to-[#ffa500] rounded-xl font-bold text-sm text-gray-900 shadow-md hover:brightness-105 transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending Link..." : "Send Magic Link"}
        </button>
      </div>
    </>
  );
};
