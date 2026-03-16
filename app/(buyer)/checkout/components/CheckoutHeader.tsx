interface CheckoutHeaderProps {
  currentStep: "bag" | "address" | "payment";
}

export const CheckoutHeader = ({ currentStep }: CheckoutHeaderProps) => {
  const steps = [
    { id: "bag", label: "Bag" },
    { id: "address", label: "Address" },
    { id: "payment", label: "Payment" },
  ];

  return (
    <header className="pt-6">
      <div className="max-w-7xl mx-auto px-4 h-16 flex flex-col md:flex-row items-center justify-between">
        <div className="text-2xl font-black tracking-tighter"></div>

        <nav className="flex items-center gap-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <span
                className={`text-sm font-bold ${
                  currentStep === step.id
                    ? "text-blue-600 underline underline-offset-8"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className="mx-4 w-10 h-px bg-gray-200" />
              )}
            </div>
          ))}
        </nav>

        <div className="text-green-600 font-bold text-xs tracking-widest uppercase">
          100% Secure
        </div>
      </div>
    </header>
  );
};
