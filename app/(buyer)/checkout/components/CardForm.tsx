import Image from "next/image";

export const CardForm = () => (
  <div className="flex-1 p-8 space-y-6">
    <div className="space-y-1.5">
      <label className="text-xs text-gray-500 font-medium">Card Number</label>
      <div className="relative">
        <input
          type="text"
          placeholder="9875-9080-8686-909"
          className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-blue-500"
        />
        <Image
          src="/mastercard-logo.png"
          alt="MC"
          fill
          className="absolute right-3 top-3 h-5"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <label className="text-xs text-gray-500 font-medium">Expiry Date</label>
        <input
          type="text"
          placeholder="12/03/2028"
          className="w-full border border-gray-200 rounded-lg p-3 text-sm"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs text-gray-500 font-medium">CVV</label>
        <input
          type="password"
          placeholder="112"
          className="w-full border border-gray-200 rounded-lg p-3 text-sm"
        />
      </div>
    </div>

    <div className="space-y-1.5">
      <label className="text-xs text-gray-500 font-medium">
        Name on the card
      </label>
      <input
        type="text"
        placeholder="Sarah Johnson"
        className="w-full border border-gray-200 rounded-lg p-3 text-sm"
      />
    </div>

    <label className="flex items-start gap-3 cursor-pointer">
      <input type="checkbox" className="mt-1 accent-blue-600" defaultChecked />
      <div className="text-[11px] text-gray-500 leading-relaxed">
        <span className="font-bold text-gray-700">
          Save your card for future transactions
        </span>
        <p>
          By saving this card you can avoid entering the card details
          everytime... We don&apos;t save your CVV number.
        </p>
      </div>
    </label>
  </div>
);
