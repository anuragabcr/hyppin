import { OrderCard } from "./OrderCard";
import { OrdersHeader } from "./OrdersHeader";

const DUMMY_ORDERS = [
  {
    status: "Delivered" as const,
    date: "Wed, 10 Dec",
    brand: "MANIAC",
    name: "Men Round Neck",
    size: "XS",
    image: "/p1.jpg",
    returnWindowDate: "12th December",
  },
  {
    status: "Cancelled" as const,
    date: "Wed, 10 Dec",
    brand: "MANIAC",
    name: "Men Round Neck",
    size: "XS",
    image: "/p2.jpg",
    returnWindowDate: "12th December",
  },
];

export default function OrderSection() {
  return (
    <div className="flex-1 max-w-5xl">
      <OrdersHeader />

      <div className="space-y-4">
        {DUMMY_ORDERS.map((order, index) => (
          <OrderCard key={index} {...order} />
        ))}
      </div>
    </div>
  );
}
