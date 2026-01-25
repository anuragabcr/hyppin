import Image from "next/image";
import { Star, X } from "lucide-react";

interface WishlistItemProps {
  brand: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  rating: number;
  image: string;
  onRemove: () => void;
  onAddToCart: () => void;
}

export const WishlistItem = ({
  brand,
  name,
  price,
  originalPrice,
  discount,
  rating,
  image,
  onRemove,
  onAddToCart,
}: WishlistItemProps) => (
  <div className="relative border border-gray-100 rounded-2xl p-6 mb-4 bg-white hover:shadow-sm transition-shadow">
    <button
      onClick={onRemove}
      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
    >
      <X size={20} />
    </button>

    <div className="flex gap-6">
      <div className="relative w-28 h-36 rounded-xl overflow-hidden bg-gray-50 shrink-0">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      <div className="flex flex-col justify-between flex-1 py-1">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="font-black text-sm uppercase tracking-tight text-gray-900">
              {brand}
            </h4>
            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 mr-4 rounded-md text-[10px] font-bold">
              {rating} <Star size={10} fill="currentColor" />
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-1">{name}</p>

          <div className="flex items-center gap-2 mt-4">
            <span className="font-black text-sm">₹ {price}</span>
            <span className="text-gray-400 text-xs line-through">
              ₹ {originalPrice}
            </span>
            <span className="text-blue-600 text-[10px] font-bold bg-blue-50 px-2 py-0.5 rounded">
              {discount}
            </span>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onAddToCart}
            className="px-8 py-2.5 border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors uppercase tracking-wider"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  </div>
);
