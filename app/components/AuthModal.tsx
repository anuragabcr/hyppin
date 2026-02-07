import React, { useState } from "react";
import { useUI } from "../context/UIContext";
import { toast } from "sonner";

const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useUI();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = async () => {
    setIsLoading(true);
    const localUser = JSON.parse(localStorage.getItem("hyppin_user") || "{}");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: localUser.token,
          name: name,
          phone: phone,
        }),
      });

      const profileRes = await fetch("/api/auth/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: localUser.token }),
      });

      const profile = await profileRes.json();

      const userData = {
        token: localUser.token,
        ...profile,
      };

      localStorage.setItem("hyppin_user", JSON.stringify(userData));

      if (response.ok) {
        toast.success("Profile updated successfully!");
        setIsAuthModalOpen(false);
      } else {
        setIsLoading(false);
        alert("Failed to create profile. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred. Check console for details.");
      setError("An unexpected error occurred. Please try again.");
      console.error(error);
    }
  };

  const renderInitialForm = () => (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-800">
        Additional User Details
      </h3>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
      />
      <input
        type="number"
        placeholder="Phone Number (e.g., +919876543210)"
        maxLength={10}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
      />

      <button
        type="submit"
        disabled={isLoading}
        onClick={handleSubmit}
        className="w-full p-3 text-white font-semibold bg-linear-to-r from-[#ffce1d] to-[#ffa500] rounded-lg transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
      >
        {isLoading ? "Saving Details..." : "Save Details"}
      </button>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div
        className="relative w-full max-w-sm p-6 bg-white rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {error && (
          <div className="p-3 mb-4 text-sm font-medium text-red-800 bg-red-100 border border-red-400 rounded-lg">
            {error}
          </div>
        )}
        {renderInitialForm()}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute p-1 text-gray-400 transition duration-150 ease-in-out rounded-full top-2 right-2 hover:bg-gray-100 hover:text-gray-600"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
