import React, { useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = "login" | "register";
type AuthStage = "initial" | "otp";

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  // Global State for the flow
  const [stage, setStage] = useState<AuthStage>("initial");
  const [mode, setMode] = useState<AuthMode>("register");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form Data State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationToken, setVerificationToken] = useState("");

  if (!isOpen) return null;

  const resetModal = () => {
    setStage("initial");
    setMode("register");
    setName("");
    setEmail("");
    setPhone("");
    setOtp("");
    setVerificationToken("");
    setError("");
    setIsLoading(false);
  };

  // -------------------------------------------------------------------
  // 1. OTP REQUEST HANDLER (Handles both Login and Register)
  // -------------------------------------------------------------------
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Adjust payload based on mode
      const payload = {
        phone,
        name: mode === "register" ? name : "N/A",
        email: mode === "register" ? email : "N/A",
      };

      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send OTP.");
      }

      setVerificationToken(data.verificationToken);
      setStage("otp");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Unexpected error", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------------------------------------------
  // 2. OTP VERIFICATION HANDLER
  // -------------------------------------------------------------------
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, verificationToken }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "OTP verification failed.");
      }

      // Successful Auth: Save token and close
      console.log(data.token);
      resetModal();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Unexpected error", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------------------------------------------
  // 3. RENDER LOGIC
  // -------------------------------------------------------------------

  // Render the initial form (Register or Login)
  const renderInitialForm = () => (
    <form onSubmit={handleRequestOtp} className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-800">
        {mode === "register" ? "New User Registration" : "Log In with Phone"}
      </h3>

      {/* Registration Fields (Name & Email) */}
      {mode === "register" && (
        <>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
          />
        </>
      )}

      {/* Phone Number Field (Required for both) */}
      <input
        type="tel"
        placeholder="Phone Number (e.g., +919876543210)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full p-3 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-700 transition disabled:bg-red-400"
      >
        {isLoading ? "Sending OTP..." : "Get OTP & Submit"}
      </button>

      {/* Toggle Link */}
      <p className="text-sm text-center text-gray-600">
        {mode === "register"
          ? "Already have an account? "
          : "New to the platform? "}
        <button
          type="button"
          onClick={() => {
            setMode(mode === "register" ? "login" : "register");
            setError("");
          }}
          className="font-bold text-red-600 hover:underline"
        >
          {mode === "register" ? "Log In" : "Register Now"}
        </button>
      </p>
    </form>
  );

  // Render the OTP verification form
  const renderOtpForm = () => (
    <form onSubmit={handleVerifyOtp} className="space-y-4">
      <button
        type="button"
        onClick={() => setStage("initial")}
        className="flex items-center text-sm font-medium text-gray-600 hover:text-red-600 mb-4"
      >
        <HiOutlineArrowNarrowLeft className="w-5 h-5 mr-1" />
        Change Phone Number
      </button>

      <h3 className="text-2xl font-bold text-gray-800">Verify OTP</h3>
      <p className="text-sm text-gray-600">
        We sent a 6-digit code to **{phone}**.
      </p>

      <input
        type="number"
        placeholder="Enter OTP (6 digits)"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        maxLength={6}
        className="w-full p-3 text-center text-lg tracking-widest border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full p-3 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-700 transition disabled:bg-red-400"
      >
        {isLoading ? "Verifying..." : "Verify & Proceed"}
      </button>

      <p className="text-sm text-center text-gray-600">
        Didn&apos;t receive the code?
        <button
          type="button"
          // In a real app, this would call handleRequestOtp again
          className="font-bold text-red-600 hover:underline"
        >
          Resend
        </button>
      </p>
    </form>
  );

  return (
    // Modal Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="relative w-full max-w-sm p-6 bg-white rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Error Display */}
        {error && (
          <div className="p-3 mb-4 text-sm font-medium text-red-800 bg-red-100 border border-red-400 rounded-lg">
            {error}
          </div>
        )}

        {/* Dynamic Form Rendering */}
        {stage === "initial" ? renderInitialForm() : renderOtpForm()}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute p-1 text-gray-400 transition duration-150 ease-in-out rounded-full top-2 right-2 hover:bg-gray-100 hover:text-gray-600"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
