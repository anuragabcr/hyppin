"use client";

import { Check } from "lucide-react";

interface Props {
  currentStep: number;
}

const STEPS = [
  "Business Details",
  "Seller Details",
  "Bank Details",
  "Digital Signature",
  "Verify & Submit",
];

export default function OnboardingSidebar({ currentStep }: Props) {
  return (
    <div className="w-72 p-6 ">
      <div className="relative space-y-6">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gray-200" />

        <div
          className="absolute left-4 top-2 w-px bg-yellow-400 transition-all"
          style={{
            height: `${(currentStep - 1) * 64}px`,
          }}
        />

        {STEPS.map((label, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isDone = step < currentStep;

          return (
            <div key={label} className="relative flex items-center gap-4">
              <div
                className={`z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                  ${
                    isActive
                      ? "bg-blue-600 text-white w-10"
                      : isDone
                      ? "bg-green-300 border-2 border-green-400 text-green-600"
                      : "bg-white border-2 border-gray-300 text-gray-400"
                  }
                `}
              >
                {!isDone ? step : <Check />}
              </div>

              {/* Label */}
              {isActive ? (
                <div className="bg-blue-600 text-white px-4 py-2 rounded-xl w-full shadow-sm">
                  <div className="font-semibold">{label}</div>
                  <div className="text-xs opacity-80">{label}</div>
                </div>
              ) : (
                <div
                  className={`text-sm font-medium ${
                    isDone ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {label}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
