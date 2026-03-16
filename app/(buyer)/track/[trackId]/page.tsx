import { Package } from "lucide-react";
import { TrackingStepper } from "../components/TrackingStepper";
import { TrackingStoreList } from "../components/TrackingStoreList";

const TRACKING_DATA = [
  {
    id: "3243",
    store: "Pantaloons",
    items: [
      {
        id: "1",
        brand: "MANIAC",
        name: "Men Round Neck",
        size: "XS",
        price: 720,
        image: "/images/cart1.svg",
      },
      {
        id: "2",
        brand: "MANIAC",
        name: "Men Round Neck",
        size: "XS",
        price: 720,
        image: "/images/cart2.svg",
      },
    ],
  },
];

export default function TrackOrderPage() {
  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Page Header */}
      <div className="flex flex-col items-center pt-12">
        <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
          <Package className="text-gray-800" size={28} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Track your Order</h1>
      </div>

      <TrackingStepper />

      {TRACKING_DATA.map((group) => (
        <TrackingStoreList
          key={group.id}
          storeName={group.store}
          orderId={group.id}
          products={group.items}
        />
      ))}
    </main>
  );
}
