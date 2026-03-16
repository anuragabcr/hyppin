"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { BusinessData } from "../types";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

interface BusinessDetailsProps {
  initial: BusinessData;
  onChange: (data: Partial<BusinessData>) => void;
  onValidChange: (isValid: boolean) => void;
}

export default function BusinessDetails({
  initial,
  onChange,
  onValidChange,
}: BusinessDetailsProps) {
  // Initialize state from props (important for "Edit Mode")
  const [gstin, setGstin] = useState(initial.gstin || "");
  const [gstVerified, setGstVerified] = useState(initial.gstVerified || false);
  const [error, setError] = useState("");
  const [storeName, setStoreName] = useState(initial.storeName || "");
  const [address, setAddress] = useState(initial.address || "");
  const [entityType, setEntityType] = useState(
    initial.entityType || "Sole proprietorship",
  );
  const [phone, setPhone] = useState(initial.phone || "");
  const [inventoryModel, setInventoryModel] = useState(
    initial.inventoryModel || "Hyppin inventory system",
  );
  const [days, setDays] = useState<number[]>(initial.days || [0, 1, 2, 3, 4]);
  const [openAllDays, setOpenAllDays] = useState(initial.openAllDays || false);
  const [from, setFrom] = useState(initial.from || "09:00");
  const [to, setTo] = useState(initial.to || "22:00");

  // VALIDATION LOGIC
  useEffect(() => {
    const validate = () => {
      const isGstValid = gstVerified;
      const isStoreNameValid = storeName.trim().length > 2;
      const isAddressValid = address.trim().length > 5;
      const isPhoneValid = phone.trim().length === 10;
      const isHoursValid = days.length > 0 && from !== "" && to !== "";

      const isValid =
        isGstValid &&
        isStoreNameValid &&
        isAddressValid &&
        isPhoneValid &&
        isHoursValid;

      // Update parent validity
      onValidChange(isValid);

      // Send data back to parent for storage
      onChange({
        gstin,
        gstVerified,
        storeName,
        address,
        entityType,
        phone,
        inventoryModel,
        days,
        openAllDays,
        from,
        to,
      });
    };

    validate();
  }, [
    gstin,
    gstVerified,
    storeName,
    address,
    entityType,
    phone,
    inventoryModel,
    days,
    openAllDays,
    from,
    to,
    onChange,
    onValidChange,
  ]);

  const checkGST = () => {
    if (gstin.length !== 15) {
      setError("GST number should be 15 characters long");
      setGstVerified(false);
      return;
    }
    setError("");
    setTimeout(() => setGstVerified(true), 600);
  };

  const toggleDay = (i: number) => {
    setDays((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  };

  return (
    <div className="max-w-2xl space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Business Details</h2>
        <p className="text-sm text-gray-500">
          Details fetched from your GSTIN will be verified automatically.
        </p>
      </div>

      {/* GSTIN Field */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">GSTIN</label>
        <div className="flex gap-3">
          <input
            value={gstin}
            onChange={(e) => {
              setGstin(e.target.value.toUpperCase());
              setGstVerified(false); // Reset verification if they change the input
            }}
            placeholder="Enter your GSTIN"
            className={`flex-1 border rounded-xl px-4 py-3 outline-none transition-all ${
              gstVerified
                ? "border-green-400 ring-2 ring-green-50"
                : "border-gray-300 focus:border-blue-400"
            }`}
          />
          <button
            onClick={checkGST}
            type="button"
            className={`px-6 rounded-xl font-bold transition-colors ${
              gstVerified
                ? "bg-green-500 text-white"
                : "bg-[#FFD644] text-gray-900 hover:bg-[#F2C938]"
            }`}
          >
            {gstVerified ? "Verified" : "Check"}
          </button>
        </div>
        {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
        {gstVerified && (
          <div className="flex items-center gap-2 text-green-600 text-xs font-bold">
            <CheckCircle2 size={14} /> Verified successfully
          </div>
        )}
      </div>

      {/* Other Inputs */}
      <Input
        label="Store Name"
        value={storeName}
        onChange={setStoreName}
        placeholder="Enter store name"
      />
      <Input
        label="Store Full Address"
        value={address}
        onChange={setAddress}
        placeholder="Enter full address"
      />

      <Select
        label="Entity Type"
        value={entityType}
        onChange={setEntityType}
        options={["Sole proprietorship", "Partnership", "Private Limited"]}
      />

      <Input
        label="Store Contact Number"
        value={phone}
        onChange={(val) => setPhone(val.replace(/\D/g, "").slice(0, 10))} // Only numbers, max 10
        prefix="+91"
        placeholder="9876543210"
      />

      <Select
        label="Inventory Model"
        value={inventoryModel}
        onChange={setInventoryModel}
        options={["Hyppin inventory system", "Own inventory"]}
      />

      {/* Working Hours */}
      <div className="space-y-4 pt-2">
        <label className="text-sm font-semibold text-gray-700">
          Working Hours
        </label>
        <div className="flex gap-2 bg-gray-50 p-2 rounded-xl w-fit">
          {DAYS.map((d, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggleDay(i)}
              className={`w-6 h-6 rounded-2xl font-bold text-xs transition-all ${
                days.includes(i)
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-400 border border-gray-100"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 ring-blue-50"
            />
            <span className="text-gray-400">—</span>
            <input
              type="time"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 ring-blue-50"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={openAllDays}
              onChange={(e) => setOpenAllDays(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Open all days
          </label>
        </div>
      </div>
    </div>
  );
}

// Helper components remain largely the same, just ensure they are clean.

type InputProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  prefix?: React.ReactNode;
};
function Input({ label, value, onChange, prefix, placeholder }: InputProps) {
  return (
    <div className="space-y-2">
      <label className="font-medium">{label}</label>

      <div className="flex border rounded-xl overflow-hidden">
        {prefix && (
          <div className="px-3 flex items-center bg-gray-50 border-r">
            {prefix}
          </div>
        )}

        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-3 outline-none"
        />
      </div>
    </div>
  );
}

type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};
function Select({ label, value, onChange, options }: SelectProps) {
  return (
    <div className="space-y-2">
      <label className="font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-xl px-4 py-3"
      >
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
