import { OrderFinalSummary } from "./components/OrderFinalSummary";
import { OrderStoreSection } from "./components/OrderStoreSection";
import { OrderSuccessHeader } from "./components/OrderSuccessHeader";

const DUMMY_ORDER = {
  pantaloons: [
    {
      id: "1",
      name: "MANIAC",
      category: "Men Round Neck",
      size: "XS",
      price: 720,
      image: "/images/cart1.svg",
    },
    {
      id: "2",
      name: "MANIAC",
      category: "Men Round Neck",
      size: "XS",
      price: 720,
      image: "/images/cart2.svg",
    },
  ],
  westside: [
    {
      id: "3",
      name: "MANIAC",
      category: "Men Round Neck",
      size: "XS",
      price: 720,
      image: "/images/cart2.svg",
    },
    {
      id: "4",
      name: "MANIAC",
      category: "Men Round Neck",
      size: "XS",
      price: 720,
      image: "/images/cart1.svg",
    },
  ],
};

export default function OrderConfirmationPage() {
  return (
    <main className="min-h-screen bg-white">
      <OrderSuccessHeader />

      <OrderStoreSection
        storeName="Pantaloons"
        products={DUMMY_ORDER.pantaloons}
      />
      <div className="w-full max-w-5xl mx-auto border-t border-gray-100 my-8" />
      <OrderStoreSection storeName="Westside" products={DUMMY_ORDER.westside} />

      <OrderFinalSummary shipping={720} taxes={20} total={20} />
    </main>
  );
}
