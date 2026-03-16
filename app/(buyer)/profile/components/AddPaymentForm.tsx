import { CreditCard } from "lucide-react";

export const AddPaymentForm = () => {
  return (
    <div className="mt-6 border border-gray-100 rounded-2xl p-6 bg-gray-50/50">
      <h3 className="text-sm font-black uppercase tracking-tight mb-4">
        Add New Method
      </h3>

      <div className="space-y-4">
        {/* Card Input Example */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-600 ml-1">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-blue-500"
            />
            <CreditCard
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
              size={18}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 ml-1">
              Expiry
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 ml-1">CVV</label>
            <input
              type="password"
              placeholder="***"
              className="w-full border border-gray-200 rounded-xl p-3 text-sm"
            />
          </div>
        </div>

        <button className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-black transition-all">
          Securely Save Card
        </button>
      </div>
    </div>
  );
};
