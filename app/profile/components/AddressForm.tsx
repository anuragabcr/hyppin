"use client";

import { Briefcase, Check, Home, MapPin, Phone, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  locality: string;
  city: string;
  pincode: string;
  state?: string;
  type: "Home" | "Office";
  isDefault: boolean;
}

export const AddressForm = ({
  initial,
  onCancel,
  onSaved,
}: {
  initial?: Address;
  onCancel: () => void;
  onSaved: () => void;
}) => {
  const [form, setForm] = useState<Address>({
    id: initial?.id,
    firstName: initial?.firstName || "",
    lastName: initial?.lastName || "",
    phone: initial?.phone || "",
    address: initial?.address || "",
    locality: initial?.locality || "",
    city: initial?.city || "",
    pincode: initial?.pincode || "",
    state: initial?.state || "",
    type: initial?.type || "Home",
    isDefault: initial?.isDefault || false,
  });

  const [touched, setTouched] = useState(false);

  const token = JSON.parse(localStorage.getItem("hyppin_user") || "{}")?.token;

  const update = <K extends keyof Address>(key: K, value: Address[K]) =>
    setForm((p) => ({ ...p, [key]: value }));

  const requiredMissing =
    !form.firstName || !form.locality || !form.pincode || !form.phone;

  const save = async () => {
    setTouched(true);
    if (requiredMissing) return;

    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `/api/addresses/${form.id}` : "/api/addresses";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save address");
      }

      toast.success(form.id ? "Address updated!" : "New address added!");
      onSaved();
    } catch (error) {
      console.error("Save Address Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className=" mx-auto border border-gray-100 rounded-3xl p-8 bg-white shadow-2xl shadow-gray-200/50 space-y-7 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-black text-gray-900">
          {form.id ? "Edit Address" : "Add New Address"}
        </h2>
        <MapPin className="text-yellow-500" size={24} />
      </div>

      <div className="space-y-5">
        <Row>
          <Input
            label="FIRST NAME"
            icon={<User size={14} />}
            value={form.firstName}
            onChange={(v) => update("firstName", v)}
            error={touched && !form.firstName}
            placeholder="Jane"
          />
          <Input
            label="LAST NAME"
            value={form.lastName}
            onChange={(v) => update("lastName", v)}
            placeholder="Doe"
          />
        </Row>

        <Row>
          <Input
            label="PHONE NUMBER"
            icon={<Phone size={14} />}
            value={form.phone}
            onChange={(v) => update("phone", v)}
            error={touched && !form.phone}
            placeholder="+91 00000 00000"
          />
          <Input
            label="PINCODE"
            value={form.pincode}
            onChange={(v) => update("pincode", v)}
            error={touched && !form.pincode}
            placeholder="110001"
          />
        </Row>

        <Input
          label="STREET ADDRESS / HOUSE NO."
          value={form.address}
          onChange={(v) => update("address", v)}
          placeholder="Flat No, Building, Street name"
        />

        <Row>
          <Input
            label="LOCALITY"
            value={form.locality}
            onChange={(v) => update("locality", v)}
            error={touched && !form.locality}
            placeholder="e.g. Near Mall"
          />
          <Input
            label="CITY"
            value={form.city}
            onChange={(v) => update("city", v)}
            placeholder="New Delhi"
          />
        </Row>

        <div className="grid grid-cols-2 gap-6 items-end">
          <Input
            label="STATE"
            value={form.state || ""}
            onChange={(v) => update("state", v)}
            placeholder="Delhi"
          />
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 tracking-widest ml-1">
              ADDRESS TYPE
            </label>
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
              {["Home", "Office"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => update("type", t as "Home" | "Office")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    form.type === t
                      ? "bg-white shadow-sm text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t === "Home" ? <Home size={14} /> : <Briefcase size={14} />}
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <label className="group flex items-center gap-3 cursor-pointer select-none">
        <div
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
            form.isDefault
              ? "bg-yellow-500 border-yellow-500"
              : "border-gray-300 group-hover:border-yellow-400"
          }`}
        >
          {form.isDefault && (
            <Check size={14} className="text-white stroke-4" />
          )}
          <input
            type="checkbox"
            className="hidden"
            checked={form.isDefault}
            onChange={(e) => update("isDefault", e.target.checked)}
          />
        </div>
        <span className="text-sm font-bold text-gray-600">
          Set as default delivery address
        </span>
      </label>

      <div className="flex gap-4 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-4 text-gray-400 font-bold text-sm hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all cursor-pointer active:scale-[0.98]"
        >
          Discard
        </button>

        <button
          onClick={save}
          className="flex-2 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-2xl font-black text-sm shadow-lg shadow-yellow-200 transition-all cursor-pointer active:scale-[0.98]"
        >
          Save Address
        </button>
      </div>
    </div>
  );
};

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 gap-6">{children}</div>
);

interface InputProps {
  label: string;
  value: string;
  placeholder?: string;
  error?: boolean;
  icon?: React.ReactNode;
  onChange: (value: string) => void;
}

const Input = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  icon,
}: InputProps) => (
  <div className="space-y-1.5 group">
    <label className="text-[10px] font-black text-gray-700 tracking-widest ml-1 group-focus-within:text-yellow-600 transition-colors">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors">
          {icon}
        </div>
      )}
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3.5 text-sm font-medium transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-400 placeholder:text-gray-300 ${
          icon ? "pl-11" : ""
        } ${error ? "border-red-400 bg-red-50/30" : ""}`}
      />
    </div>
  </div>
);
