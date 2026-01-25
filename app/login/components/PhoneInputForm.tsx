import Image from "next/image";

export const PhoneInputForm = ({
  onContinue,
}: {
  onContinue: (phone: string) => void;
}) => (
  <>
    <div className="space-y-2">
      <h1 className="text-2xl font-black text-gray-900">Login / Signup</h1>
      <p className="text-sm text-gray-500 font-medium">
        Join us now to be a part of Hyppin family.
      </p>
    </div>

    <div className="space-y-4 pt-4">
      <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-blue-500">
        <span className="px-4 py-3 bg-gray-50 border-r border-gray-200 text-sm font-bold text-gray-600">
          +91
        </span>
        <input
          type="tel"
          placeholder="9123548560"
          className="flex-1 px-4 py-3 text-sm focus:outline-none"
        />
      </div>

      <button
        onClick={() => onContinue("9123548560")}
        className="w-full py-4 bg-linear-to-r from-yellow-400 to-yellow-500 rounded-xl font-bold text-sm text-gray-900 shadow-md hover:brightness-105 transition-all"
      >
        Continue
      </button>

      <div className="relative py-2 text-center">
        <span className="bg-white px-4 text-xs font-bold text-gray-400 relative z-10">
          Or
        </span>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 z-0" />
      </div>

      <button className="w-full flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-xl font-bold text-sm text-gray-800 hover:bg-gray-50 transition-colors">
        <Image src="/google-icon.svg" fill alt="Google" className="w-5 h-5" />
        Log In with Google
      </button>
    </div>
  </>
);
