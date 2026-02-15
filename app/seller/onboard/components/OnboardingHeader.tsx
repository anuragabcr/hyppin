"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";

interface Props {
  currentStep: number;
  totalSteps?: number;
  onLogout?: () => void;
}

export default function OnboardingHeader({
  currentStep,
  totalSteps = 5,
  onLogout,
}: Props) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full bg-white/70 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6 w-full pr-2 md:pr-6">
        <Image src="/images/logo2.svg" alt="Hyppin" width={175} height={32} />
        <div className="hidden sm:block text-sm font-medium text-gray-600">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="flex-1">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-blue-800 to-yellow-400 transition-all duration-500 ease-in-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="hidden sm:block text-sm font-semibold text-yellow-600 whitespace-nowrap">
          {percentage}% done
        </div>
      </div>

      <button
        onClick={onLogout}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 transition"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
}
