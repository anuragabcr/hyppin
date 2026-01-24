import Image from "next/image";
import { Star } from "lucide-react";

interface OrderProps {
  status: "Delivered" | "Cancelled";
  date: string;
  brand: string;
  name: string;
  size: string;
  image: string;
  returnWindowDate: string;
}

export const OrderCard = ({
  status,
  date,
  brand,
  name,
  size,
  image,
  returnWindowDate,
}: OrderProps) => {
  const isCancelled = status === "Cancelled";

  return (
    <div className="border border-gray-100 rounded-2xl p-6 mb-6 bg-white hover:shadow-sm transition-shadow">
      {/* Status Header */}
      <div className="mb-4">
        <h3
          className={`font-bold text-lg ${
            isCancelled ? "text-red-500" : "text-green-600"
          }`}
        >
          {status}
        </h3>
        <p className="text-xs text-gray-500 font-medium mt-0.5">On {date}</p>
      </div>

      <div className="flex justify-between items-start">
        <div className="flex gap-6">
          <div className="relative w-24 h-32 rounded-xl overflow-hidden bg-gray-50">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>

          <div className="flex flex-col justify-between py-1">
            <div>
              <h4 className="font-black text-sm uppercase tracking-tight text-gray-900">
                {brand}
              </h4>
              <p className="text-gray-600 text-sm mt-1">{name}</p>
              <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase">
                Size: {size}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-[11px] text-gray-400 font-medium mb-2">
                Exchange/ Return window Closes on {returnWindowDate}
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-gray-300 cursor-pointer hover:text-yellow-400 transition-colors"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <button className="text-blue-600 text-xs font-bold hover:underline">
          View Details
        </button>
      </div>
    </div>
  );
};
