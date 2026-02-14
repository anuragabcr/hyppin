import React from "react";
import Image from "next/image";
import { LuPower } from "react-icons/lu";

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  onLogout: () => void;
}

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  currentStep,
  totalSteps,
  onLogout,
}) => {
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <header className="flex w-full items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center border-r border-gray-200 pr-6">
          <Image
            src="/images/logo.svg"
            alt="Hyppin Logo"
            width={100}
            height={30}
            className="h-auto w-auto"
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="whitespace-nowrap text-sm font-medium text-gray-600">
            Step {currentStep} of {totalSteps}
          </span>

          <div className="relative h-2 w-48 overflow-hidden rounded-full bg-gray-100 md:w-64 lg:w-96">
            <div
              className="absolute h-full bg-blue-600 transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
            <div
              className="absolute h-full bg-amber-400 transition-all duration-500 ease-in-out"
              style={{
                width: "15%",
                left: `${Math.max(0, progressPercentage - 15)}%`,
              }}
            />
          </div>

          <span className="whitespace-nowrap text-sm font-semibold text-amber-500">
            {progressPercentage}% done
          </span>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
      >
        <LuPower className="text-lg" />
        Logout
      </button>
    </header>
  );
};

export default OnboardingHeader;
