import { Search, ListFilter, ChevronDown } from "lucide-react";

export const OrdersHeader = () => (
  <div className="flex flex-col md:flex-row gap-4 mb-8">
    <div className="relative flex-1 group">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f0bd49] transition-colors"
        size={20}
      />
      <input
        type="text"
        placeholder="Search here"
        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f0bd49]/20 focus:border-[#f0bd49] transition-all shadow-sm"
      />
    </div>

    <div className="grid grid-cols-2 md:flex gap-3 h-full">
      <button className="flex items-center justify-center md:justify-start gap-2 px-4 md:px-6 py-3 border border-gray-200 rounded-xl bg-white text-sm font-bold shadow-sm hover:border-[#f0bd49] transition-colors">
        <span className="text-gray-400 font-medium whitespace-nowrap">
          Sort:
        </span>
        <span className="text-gray-900">Popularity</span>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      <button className="flex items-center justify-center md:justify-start gap-2 px-4 md:px-6 py-3 border border-gray-200 rounded-xl bg-white text-sm font-bold shadow-sm hover:border-[#f0bd49] transition-colors">
        <ListFilter size={20} className="text-gray-800" />
        <span className="text-gray-900">Filter</span>
      </button>
    </div>
  </div>
);
