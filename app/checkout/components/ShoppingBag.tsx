import CartItem, { CartItemProps } from "./CartItem";

const cartItems: CartItemProps[] = [
  {
    brand: "LEVI",
    productName: "Men's Black Polo T-shirt",
    originalPrice: 900,
    discountedPrice: 720,
    discountPercentage: 20,
    rating: 4.8,
    imageSrc: "/images/cart1.svg",
    size: 30,
    quantity: 1,
  },
  {
    brand: "LEVI",
    productName: "Women's Graphic Print Tee",
    originalPrice: 1200,
    discountedPrice: 840,
    discountPercentage: 30,
    rating: 4.5,
    imageSrc: "/images/cart2.svg",
    size: "M",
    quantity: 1,
  },
];

export default function ShoppingBag({ onNext }: { onNext: () => void }) {
  return (
    <main className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT COLUMN: Cart Items (2/3 width) */}
        <div className="lg:col-span-1 space-y-8">
          <div className="flex justify-between items-end">
            <h1 className="text-xl font-bold">My bag</h1>
            <button className="text-blue-600 text-xs font-semibold uppercase underline">
              Remove all
            </button>
          </div>

          {/* Westide Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">Westide</h2>
              <span className="text-blue-600 text-sm">
                Delivery within 40 mins
              </span>
            </div>
            <CartItem {...cartItems[0]} />
          </div>

          {/* Pantaloons Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">Pantaloons</h2>
              <span className="text-blue-600 text-sm">
                Delivery within 40 mins
              </span>
            </div>
            <CartItem {...cartItems[1]} />
          </div>
        </div>

        {/* RIGHT COLUMN: Checkout Details (1/3 width) */}
        <aside className="space-y-6">
          {/* Address Card */}
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex justify-between items-start">
            <div className="text-xs space-y-1">
              <p className="text-gray-500">
                Deliver to :{" "}
                <span className="font-bold text-gray-900">
                  Diya Sharma, 560773
                </span>
              </p>
              <p className="text-gray-400">
                St Mary&apos;s Hostel, Number 6, Kothanur, Bengaluru
              </p>
            </div>
            <button className="text-[10px] font-bold border border-gray-300 px-3 py-1 rounded bg-white">
              Change Address
            </button>
          </div>

          {/* Coupons */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold">Coupons</span>
              <button className="text-blue-600 text-xs font-bold">
                View Coupon
              </button>
            </div>
            <input
              type="text"
              placeholder="XXXXXXX"
              className="w-full border border-gray-200 p-3 rounded-lg bg-white text-sm"
            />
          </div>

          {/* Price Details */}
          <div className="space-y-4 pt-4">
            <h3 className="font-bold text-sm uppercase tracking-wider">
              Price Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Total MRP</span> <span>1800</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Discount on MRP</span>{" "}
                <span className="text-blue-600 font-bold">- ₹ 900</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Coupon Discount</span>{" "}
                <button className="text-red-500 font-bold underline">
                  Apply Coupon
                </button>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Platform Fee</span> <span>10</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total Amount</span> <span>₹ 910</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onNext}
              className="w-full py-4 bg-brand-gradient text-gray-900 font-bold rounded-xl shadow-lg hover:brightness-105 transition-all uppercase tracking-widest text-sm cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
