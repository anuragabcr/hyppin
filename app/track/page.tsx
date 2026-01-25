"use client";

import { Package } from "lucide-react";
import { TrackOrderItem } from "./components/TrackOrderItem";

const ACTIVE_ORDERS = [
  {
    id: "3243",
    status: "In Progress",
    brand: "MANIAC",
    name: "Men Round Neck",
    price: 720,
    image: "/p1.jpg",
  },
  {
    id: "3244",
    status: "On the way",
    brand: "LEVI",
    name: "Black Polo T-shirt",
    price: 900,
    image: "/p3.jpg",
  },
];

export default function TrackOrdersPage() {
  const handleTrack = (id: string) => {
    window.location.href = `/track-order/${id}`;
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-gray-900">Active Orders</h2>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Tracking {ACTIVE_ORDERS.length} shipments currently in transit.
        </p>
      </div>

      {ACTIVE_ORDERS.length > 0 ? (
        <div className="space-y-4">
          {ACTIVE_ORDERS.map((order) => (
            <TrackOrderItem
              key={order.id}
              orderId={order.id}
              status={order.status}
              brand={order.brand}
              productName={order.name}
              price={order.price}
              image={order.image}
              onTrack={() => handleTrack(order.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <Package className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 font-bold">
            No orders currently in progress.
          </p>
          <button className="mt-4 text-blue-600 text-sm font-bold hover:underline">
            View Order History
          </button>
        </div>
      )}
    </div>
  );
}
