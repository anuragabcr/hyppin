import Image from "next/image";

import { FaStar } from "react-icons/fa";

interface Brand {
  id: number;
  name: string;
  categories: string[];
  avgPrice: number;
  deliveryTime: number;
  rating: number;
  imageUrl: string;
  discount?: string;
  isPromoted?: boolean;
}

const getRatingColor = (rating: number) => {
  if (rating >= 4.0) return "bg-green-600";
  if (rating >= 3.0) return "bg-yellow-500";
  return "bg-red-600";
};

const ShopCard: React.FC<{ brand: Brand }> = ({ brand }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      <div className="relative w-full h-52">
        <Image
          height={200}
          width={200}
          src={brand.imageUrl}
          alt={brand.name}
          unoptimized
          className="w-full h-full object-cover"
        />

        {brand.discount && (
          <span className="absolute top-4 left-4 md:top-auto lg:bottom-4 bg-blue-600 text-white text-base font-bold px-3 py-1 rounded-md shadow-sm">
            {brand.discount}
          </span>
        )}

        <div
          className={`absolute bottom-4 right-4 ${getRatingColor(
            brand.rating,
          )} text-white px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md`}
        >
          <span className="text-sm font-bold">{brand.rating.toFixed(1)}</span>
          <FaStar className="w-3 h-3" />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">
          {brand.name}
        </h3>

        <p className="text-base text-gray-600 truncate">
          {brand.categories.join(", ")}
        </p>

        {/* Price & Time */}
        {/* <div className="flex justify-between items-center text-sm text-gray-500 mt-3 border-t pt-3">
          <span>₹{brand.avgPrice} for one</span>
          <span>{brand.deliveryTime} min</span>
        </div> */}
      </div>
    </div>
  );
};

export default ShopCard;
