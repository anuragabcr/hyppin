import Image from "next/image";

interface Product {
  id: string;
  name: string;
  category: string;
  size: string;
  price: number;
  image: string;
}

export const OrderStoreSection = ({
  storeName,
  products,
}: {
  storeName: string;
  products: Product[];
}) => (
  <div className="w-full max-w-5xl mx-auto mt-8 px-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-800">{storeName}</h2>
      <span className="text-blue-600 text-sm">Delivery within 40 mins</span>
    </div>

    <div className="grid grid-cols-2 text-[10px] font-bold text-gray-400 uppercase mb-4 border-b border-gray-50 pb-2">
      <span>Products</span>
      <span className="text-right">Sub-Total</span>
    </div>

    <div className="space-y-6">
      {products.map((product) => (
        <div key={product.id} className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-sm uppercase">{product.name}</p>
              <p className="text-xs text-gray-500">{product.category}</p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase">
                Size: {product.size}
              </p>
            </div>
          </div>
          <span className="font-bold text-sm">₹ {product.price}</span>
        </div>
      ))}
    </div>
  </div>
);
