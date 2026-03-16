"use client";

import { useEffect, useState } from "react";
import { SellerData } from "../types";

interface SellerDetailsProps {
  initial: SellerData;
  onChange: (data: Partial<SellerData>) => void;
  onValidChange: (valid: boolean) => void;
}

export default function SellerDetails({
  initial,
  onChange,
  onValidChange,
}: SellerDetailsProps) {
  const [fullName, setFullName] = useState(initial.fullName || "");
  const [phone, setPhone] = useState(initial.phone || "");
  const [email, setEmail] = useState(initial.email || "");

  // VALIDATION + PARENT SYNC
  useEffect(() => {
    const isNameValid = fullName.trim().length > 2;
    const isPhoneValid = phone.length === 10;
    const isEmailValid = /^\S+@\S+\.\S+$/.test(email);

    const isValid = isNameValid && isPhoneValid && isEmailValid;

    onValidChange(isValid);

    onChange({
      fullName,
      phone,
      email,
    });
  }, [fullName, phone, email, onChange, onValidChange]);

  return (
    <div className="max-w-2xl bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-[#1E293B]">Seller Details</h2>
        <p className="text-gray-500 mt-1">Enter the seller details below</p>
      </header>

      {/* Full Name */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Full Name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter full name"
          className="w-full p-4 border rounded-xl outline-none focus:ring-2 ring-blue-100"
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Phone Number
        </label>

        <div className="flex border rounded-xl overflow-hidden">
          <div className="px-4 flex items-center border-r bg-gray-50">+91</div>

          <input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            placeholder="9876543210"
            className="flex-1 p-4 outline-none"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seller@email.com"
          className="w-full p-4 border rounded-xl outline-none focus:ring-2 ring-blue-100"
        />
      </div>
    </div>
  );
}
