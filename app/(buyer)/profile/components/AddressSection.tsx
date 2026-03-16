"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AddressForm } from "./AddressForm";
import { AddressCard } from "./AddressCard";

export interface Address {
  id: string;
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

const emptyAddress: Address = {
  id: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  locality: "",
  city: "",
  pincode: "",
  state: "",
  type: "Home",
  isDefault: false,
};

export default function AddressSection() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editing, setEditing] = useState<Address | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const token = JSON.parse(localStorage.getItem("hyppin_user") || "{}")?.token;

  const loadAddresses = useCallback(async () => {
    if (!token) return;

    try {
      const res = await fetch("/api/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setAddresses(data);
      }
    } catch (error) {
      console.error("Failed to load addresses:", error);
    }
  }, [token]);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  if (editing)
    return (
      <AddressForm
        initial={editing}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          loadAddresses();
        }}
      />
    );

  return (
    <div className="">
      {addresses.map((a) => (
        <AddressCard
          key={a.id}
          name={`${a.firstName} ${a.lastName}`}
          address={`${a.address}, ${a.city}`}
          isSelected={selectedId === a.id}
          onSelect={() => setSelectedId(a.id)}
          onEdit={() => setEditing(a)}
        />
      ))}

      <button
        onClick={() => setEditing(emptyAddress)}
        className="flex items-center gap-2 text-blue-600 font-bold text-sm mt-8 cursor-pointer"
      >
        <Plus size={20} /> Add Address
      </button>
    </div>
  );
}
