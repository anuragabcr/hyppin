import { ClipboardList, CheckCircle2, Box, Truck, MapPin } from "lucide-react";

const steps = [
  { label: "Order Placed", icon: ClipboardList, status: "completed" },
  { label: "Accepted", icon: CheckCircle2, status: "completed" },
  { label: "In Progress", icon: Box, status: "current" },
  { label: "On the way", icon: Truck, status: "pending" },
  { label: "Delivered", icon: MapPin, status: "pending" },
];

export const TrackingStepper = () => (
  <div className="w-full max-w-5xl mx-auto my-10 p-8 border border-gray-100 rounded-2xl bg-white shadow-sm">
    <div className="flex items-center justify-between relative">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={step.label}
            className="flex flex-col items-center flex-1 relative"
          >
            {/* Connector Line */}
            {!isLast && (
              <div className="absolute top-5 left-1/2 w-full h-px bg-gray-200 z-0" />
            )}

            {/* Icon Circle */}
            <div
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 transition-colors ${
                step.status === "pending"
                  ? "border-gray-200 text-gray-300"
                  : "border-gray-800 text-gray-800"
              }`}
            >
              <Icon size={20} />
            </div>

            <span
              className={`mt-3 text-[10px] font-bold uppercase tracking-tight ${
                step.status === "pending" ? "text-gray-400" : "text-gray-900"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);
