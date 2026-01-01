import { Search, Mic } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative flex w-full items-center">
      <div className="absolute left-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-skybolt-blue" strokeWidth={2.5} />
      </div>

      <input
        type="text"
        placeholder="Search here"
        className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-12 text-base font-sans outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400"
      />

      <button
        type="button"
        className="absolute right-4 flex items-center hover:opacity-70 transition-opacity"
        aria-label="Voice Search"
      >
        <Mic className="h-5 w-5 text-skybolt-blue" strokeWidth={2.5} />
      </button>
    </div>
  );
}
