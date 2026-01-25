"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { AddressForm } from "./AddressForm";
import { AddressCard } from "./AddressCard";

export default function AddressSection() {
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState("sarah");

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-black mb-8">Select Address</h2>

      {showForm ? (
        <AddressForm onCancel={() => setShowForm(false)} />
      ) : (
        <div className="space-y-4">
          <AddressCard
            name="Sarah"
            address="Tharika gowda nilaya, kothanure"
            isSelected={selectedId === "sarah"}
            onSelect={() => setSelectedId("sarah")}
            onEdit={() => setShowForm(true)}
          />
          <AddressCard
            name="Johan"
            address="Tharika gowda nilaya, kothanure"
            isSelected={selectedId === "johan"}
            onSelect={() => setSelectedId("johan")}
            onEdit={() => setShowForm(true)}
          />

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 text-blue-600 font-bold text-sm mt-8 hover:opacity-80 transition-opacity"
          >
            <Plus size={20} />
            Add Address
          </button>
        </div>
      )}
    </div>
  );
}
