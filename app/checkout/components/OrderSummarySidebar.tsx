import { ChevronLeft, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const OrderSummarySidebar = ({ onBack }: { onBack: () => void }) => (
  <aside className="space-y-4">
    {/* Delivery To Section */}
    <div className="border border-gray-200 rounded-xl p-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-sm">Delivery to</span>
        <ChevronUp size={18} className="text-gray-400" />
      </div>
      <p className="font-bold text-xs">Sarah</p>
      <p className="text-[11px] text-gray-400">
        Tharika gowda nilaya, kothanure
      </p>
    </div>

    {/* Order Details Accordion */}
    <div className="border border-gray-200 rounded-xl p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-sm">Order Details</span>
        <ChevronUp size={18} className="text-gray-400" />
      </div>
      <div className="space-y-4">
        {/* Sample Item */}
        <div className="flex gap-3">
          <div className="w-12 h-16 bg-gray-100 rounded overflow-hidden relative">
            <Image src="/polo.jpg" className="object-cover" fill alt="item" />
          </div>
          <div>
            <p className="font-bold text-[10px]">LEVI</p>
            <p className="text-[10px] text-gray-500">
              Men&apos;s Black Polo T-shirt
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Price Details */}
    <div className="border border-gray-200 rounded-xl p-6 bg-white space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-bold text-sm">Payment Details</span>
        <ChevronUp size={18} className="text-gray-400" />
      </div>
      <div className="text-xs space-y-3">
        <div className="flex justify-between text-gray-500">
          <span>Total MRP</span>
          <span>1800</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Discount on MRP</span>
          <span className="text-blue-600 font-bold">₹ 900</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Coupon Discount</span>
          <span className="underline font-bold">Apply Coupon</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Platform Fee</span>
          <span>10</span>
        </div>
      </div>
      <div className="pt-4 border-t flex justify-between font-bold text-sm">
        <span>Total Amount</span>
        <span>₹ 910</span>
      </div>
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
      <Link href="/confirmation">
        <button className="w-full py-4 bg-linear-to-r from-yellow-400 to-yellow-500 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg cursor-pointer">
          Place Order
        </button>
      </Link>
    </div>
  </aside>
);
