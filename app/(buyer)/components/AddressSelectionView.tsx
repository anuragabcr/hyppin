import React from "react";

interface AddressSelectionViewProps {
  onProceedToPayment: () => void;
  onBackToCart: () => void;
}

export default function AddressSelectionView({
  onProceedToPayment,
  onBackToCart,
}: AddressSelectionViewProps) {
  // NOTE: This is a placeholder for your actual address search and selection UI

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-start">
        <button
          onClick={onBackToCart}
          className="text-sm text-red-600 font-medium hover:underline"
        >
          ← Back to Cart Details
        </button>
      </div>

      {/* Address Search Input */}
      <input
        type="text"
        placeholder="Search for a new address or landmark..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
      />

      {/* Saved Addresses List (Placeholder) */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="font-semibold mb-2">Saved Addresses</h3>
        <div className="border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
          <p className="font-medium">Home</p>
          <p className="text-sm text-gray-600">
            123 Main St, New Delhi, 110001
          </p>
        </div>
        {/* Add more saved addresses here */}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 right-0 w-full max-w-md bg-white p-4 shadow-lg">
        <button
          onClick={onProceedToPayment}
          className="w-full bg-green-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
