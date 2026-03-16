import { Check } from "lucide-react";
import Link from "next/link";

export const OrderSuccessHeader = () => (
  <div className="flex flex-col items-center py-10 bg-white">
    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
      <Check className="text-blue-600" size={32} strokeWidth={3} />
    </div>
    <h1 className="text-3xl font-bold text-gray-900 mb-8">
      Your Order Is Completed
    </h1>

    <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-6 border-y border-gray-100">
      <div>
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
          Estimated Delivery Details
        </p>
        <p className="text-xs font-bold mt-1">24 March 2026</p>
      </div>
      <div>
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
          Transaction ID
        </p>
        <p className="text-xs font-bold mt-1">1234322121</p>
      </div>
      <div>
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
          Payment Method
        </p>
        <p className="text-xs font-bold mt-1">#FD34322133</p>
      </div>
      <div className="flex gap-2 items-center justify-end">
        <Link href={"/track/123"}>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold cursor-pointer">
            Track Order
          </button>
        </Link>
        <button className="px-4 py-2 bg-linear-to-r from-yellow-400 to-yellow-500 rounded-lg text-xs font-bold shadow-sm">
          Download Invoice
        </button>
      </div>
    </div>
  </div>
);
