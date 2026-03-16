import Image from "next/image";
import { Package, ChevronRight } from "lucide-react";

interface TrackItemProps {
  status: string;
  orderId: string;
  brand: string;
  productName: string;
  price: number;
  image: string;
  onTrack: () => void;
}

export const TrackOrderItem = ({
  status,
  orderId,
  brand,
  productName,
  price,
  image,
  onTrack,
}: TrackItemProps) => (
  <div className="border border-gray-100 rounded-2xl p-6 mb-4 bg-white hover:shadow-sm transition-all group">
    <div className="flex justify-between items-center mb-5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
          <Package size={16} className="text-blue-600" />
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Order ID: #{orderId}
          </p>
          <p className="text-sm font-bold text-blue-600 capitalize">{status}</p>
        </div>
      </div>
      <button
        onClick={onTrack}
        className="flex items-center gap-1 text-xs font-bold text-gray-900 bg-linear-to-r from-yellow-400 to-yellow-500 px-4 py-2 rounded-lg shadow-sm hover:brightness-105 transition-all"
      >
        Track Order
        <ChevronRight size={14} />
      </button>
    </div>

    <div className="flex gap-5 border-t border-gray-50 pt-5">
      <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
        <Image src={image} alt={productName} fill className="object-cover" />
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="font-black text-sm uppercase tracking-tight text-gray-900">
          {brand}
        </h4>
        <p className="text-gray-500 text-sm mt-0.5">{productName}</p>
        <p className="text-sm font-bold mt-3">₹ {price}</p>
      </div>
    </div>
  </div>
);
