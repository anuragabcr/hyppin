import Image from "next/image";

interface TrackedProduct {
  id: string;
  brand: string;
  name: string;
  size: string;
  price: number;
  image: string;
}

interface TrackingStoreListProps {
  storeName: string;
  orderId: string | number;
  products: TrackedProduct[];
}

export const TrackingStoreList = ({
  storeName,
  orderId,
  products,
}: TrackingStoreListProps) => (
  <div className="w-full max-w-5xl mx-auto px-6 mt-12">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-800">
        {storeName}{" "}
        <span className="text-gray-400 font-medium ml-2">(#{orderId})</span>
      </h2>
      <span className="text-blue-600 text-sm font-medium">
        Delivery within 40 mins
      </span>
    </div>

    <div className="grid grid-cols-2 text-[11px] font-bold text-gray-400 uppercase border-b border-gray-50 pb-3 mb-6">
      <span>Products</span>
      <span className="text-right">Sub-Total</span>
    </div>

    <div className="space-y-8">
      {products.map((item: TrackedProduct) => (
        <div key={item.id} className="flex justify-between items-start">
          <div className="flex gap-5">
            <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-gray-50">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="py-1">
              <h3 className="font-black text-sm uppercase tracking-tight">
                {item.brand}
              </h3>
              <p className="text-gray-500 text-sm mt-0.5">{item.name}</p>
              <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase">
                Size: {item.size}
              </p>
            </div>
          </div>
          <span className="font-bold text-sm py-1">₹ {item.price}</span>
        </div>
      ))}
    </div>
  </div>
);
