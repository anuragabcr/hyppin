import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useUI } from "../context/UIContext";
import Link from "next/link";

interface User {
  name: string;
  phone: string;
  email: string;
}

interface CartDetailsViewProps {
  onProceedToAddress: () => void;
  totalAmount: number;
}

export default function CartDetailsView({
  onProceedToAddress,
  totalAmount,
}: CartDetailsViewProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { setIsAuthModalOpen, setIsCartModalOpen } = useUI();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser) as User);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error reading user from localStorage:", error);
      setUser(null);
    }
  }, []);

  const totalSavings = 93; // TODO: calculate using cart
  const deliveryCharge = 0; // free in this scenario
  const handlingCharge = 2;
  const grandTotal = totalAmount + deliveryCharge + handlingCharge;

  const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;

  const isAuthenticated = user !== null;
  const handleProceedClick = isAuthenticated
    ? onProceedToAddress
    : () => {
        setIsCartModalOpen(false);
        setIsAuthModalOpen(true);
      };
  const ctaText = isAuthenticated
    ? "Proceed to Address →"
    : "Login to Proceed →";

  return (
    <>
      {/* Savings Banner */}
      <div className="flex-1 overflow-y-auto pb-20 h-[90vh]">
        <div className="bg-blue-100 text-blue-700 font-semibold flex justify-between px-4 py-2 text-sm">
          <span>Your total savings</span>
          <span>{formatCurrency(totalSavings)}</span>
        </div>

        {/* Cart Items */}
        <div className="px-4 mt-4 space-y-4 pb-4">
          {/* Added pb-48 for bottom padding */}
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-md">
              {/* Item Row */}
              <div className="flex gap-3">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={80}
                  height={80}
                  unoptimized
                  className="rounded-lg object-cover border"
                />

                <div className="flex-1">
                  <p className="font-semibold leading-tight">{item.name}</p>

                  <p className="text-gray-500 text-sm mt-1">
                    {formatCurrency(item.price)}
                  </p>

                  {/* Quantity Control */}
                  <div className="flex items-center justify-between mt-3">
                    {/* Qty Controller */}
                    <div className="flex items-center bg-green-100 rounded-full px-3 py-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="text-green-700 text-lg font-bold px-2 disabled:opacity-50"
                      >
                        −
                      </button>

                      <span className="px-2 font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="text-green-700 text-lg font-bold px-2"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-gray-800">
                        {formatCurrency(item.price * item.quantity)}
                      </p>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Details */}
        <div className="mt-1 px-4 bg-gray-50">
          <h3 className="font-semibold text-lg mb-3">Bill details</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>
                Items total{" "}
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">
                  Saved {formatCurrency(totalSavings)}
                </span>
              </span>

              <span className="font-semibold">
                {formatCurrency(totalAmount)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Delivery charge</span>

              <span>
                <span className="line-through text-gray-400 mr-1">₹25</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </span>
            </div>

            <div className="flex justify-between">
              <span>Handling charge</span>
              <span>{formatCurrency(handlingCharge)}</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-lg">
              <span>Grand total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Savings Again */}
        <div className="bg-blue-100 text-blue-700 font-semibold flex justify-between px-4 py-2 text-sm mt-4">
          <span>Your total savings</span>
          <span>{formatCurrency(totalSavings)}</span>
        </div>

        {/* Cancellation Policy */}
        <div className="bg-white rounded-xl shadow-md p-4 mx-4 mt-4 text-sm text-gray-700">
          <h3 className="font-semibold mb-1">Cancellation Policy</h3>
          <p>
            Orders cannot be cancelled once packed for delivery. In case of
            unexpected delays, a refund will be provided, if applicable.
          </p>
        </div>
      </div>

      {/* Bottom CTA (Fixed) */}
      <div className="fixed bottom-0 right-0 w-full max-w-md bg-white p-4 shadow-lg flex items-center justify-between">
        <div>
          <div className="text-gray-500 text-xs">TOTAL</div>
          <div className="font-bold text-lg">{formatCurrency(grandTotal)}</div>
        </div>

        {isAuthenticated ? (
          <button
            onClick={handleProceedClick}
            className={`bg-green-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700 transition cursor-pointer ${
              isAuthenticated
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {ctaText}
          </button>
        ) : (
          <Link href={"/checkout"}>
            <button
              onClick={() => setIsCartModalOpen(false)}
              className="w-full py-4 px-8 flex items-center justify-center text-black text-xl font-bold rounded-2xl border-none bg-linear-to-r from-[#FFCE1D] to-[#FFA500] hover:from-[#F0BD49] hover:to-[#E0AC3E] shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </Link>
        )}
      </div>
    </>
  );
}
