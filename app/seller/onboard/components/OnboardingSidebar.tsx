import React from "react";

interface OnboardingStep {
  id: number;
  title: string;
  description?: string;
}

const steps: OnboardingStep[] = [
  { id: 1, title: "Business Details", description: "Business Details" },
  { id: 2, title: "Seller Details" },
  { id: 3, title: "Bank Details" },
  { id: 4, title: "Digital Signature" },
  { id: 5, title: "Verify & Submit" },
];

interface OnboardingSidebarProps {
  currentStep: number;
}

const OnboardingSidebar: React.FC<OnboardingSidebarProps> = ({
  currentStep,
}) => {
  return (
    <aside className="w-80 min-h-screen bg-[#F8FAFF] p-8 border-r border-gray-100">
      <div className="flex flex-col gap-0">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="relative flex flex-col">
              <div
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-[#1E61F0] text-white shadow-lg"
                    : "text-gray-500"
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-semibold text-sm transition-colors ${
                    isActive
                      ? "bg-white text-[#1E61F0] border-white"
                      : isCompleted
                      ? "border-amber-400 text-amber-500 bg-white"
                      : "border-gray-300 text-gray-400 bg-white"
                  }`}
                >
                  {step.id}
                </div>

                <div className="flex flex-col">
                  <span
                    className={`font-semibold ${
                      isActive ? "text-white" : "text-[#334155]"
                    }`}
                  >
                    {step.title}
                  </span>
                  {step.description && isActive && (
                    <span className="text-xs text-blue-100">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>

              {!isLast && (
                <div className="ml-5 h-10 w-0.5 relative">
                  <div
                    className={`absolute inset-0 transition-colors duration-500 ${
                      isCompleted ? "bg-amber-400" : "bg-gray-200"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default OnboardingSidebar;
