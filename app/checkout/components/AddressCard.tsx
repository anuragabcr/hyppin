"use client";
import { useState } from "react";
import { Plus, ChevronDown, ChevronLeft } from "lucide-react";
import AddressCardItem from "./AddressCardItem";

const DUMMY_ADDRESSES = [
  { id: "1", name: "Sarah", details: "Tharika gowda nilaya, kothanure" },
  { id: "2", name: "Johan", details: "Tharika gowda nilaya, kothanure" },
  { id: "3", name: "Jessy", details: "Tharika gowda nilaya, kothanure" },
];

export default function AddressCard({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [selectedId, setSelectedId] = useState("1");

  return (
    <main className="max-w-7xl mx-auto p-4 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Section: Address List */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Select Address</h2>

          <div className="space-y-4">
            {DUMMY_ADDRESSES.map((addr) => (
              <AddressCardItem
                key={addr.id}
                address={addr}
                isSelected={selectedId === addr.id}
                onSelect={setSelectedId}
              />
            ))}
          </div>

          <button className="flex items-center gap-2 text-blue-600 font-bold text-sm mt-4 hover:opacity-80 transition-opacity">
            <Plus size={20} strokeWidth={3} />
            Add Address
          </button>
        </div>

        {/* Right Section: Order/Payment Summary */}
        <aside className="space-y-4">
          {/* Order Details Accordion */}
          <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center bg-white">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm text-gray-900">
                Order Details
              </span>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-md">
                2 items
              </span>
            </div>
            <ChevronDown size={20} className="text-gray-500" />
          </div>

          {/* Payment Details Accordion */}
          <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center bg-white">
            <span className="font-bold text-sm text-gray-900">
              Payment Details
            </span>
            <ChevronDown size={20} className="text-gray-500" />
          </div>

          {/* Submit Button */}
          <button
            onClick={onBack}
            className="w-full flex items-center justify-center gap-1 mt-4 py-4 bg-linear-to-r from-gray-100 to-gray-200 text-gray-900 font-bold rounded-xl shadow-md hover:brightness-105 transition-all uppercase tracking-widest text-sm cursor-pointer"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Cart
          </button>
          <button
            onClick={onNext}
            className="w-full mt-4 py-4 bg-brand-gradient text-gray-900 font-bold rounded-xl shadow-md hover:brightness-105 transition-all uppercase tracking-widest text-sm cursor-pointer"
          >
            Continue
          </button>
        </aside>
      </div>
    </main>
  );
}
