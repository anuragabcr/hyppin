import { Search, ListFilter, ChevronDown } from "lucide-react";

export const OrdersHeader = () => (
  <div className="flex gap-4 mb-8">
    <div className="relative flex-1">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
        size={20}
      />
      <input
        type="text"
        placeholder="Search here"
        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>

    <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl bg-white text-sm font-bold">
      <span className="text-gray-400 font-medium">Sort by :</span> Popularity
      <ChevronDown size={16} className="text-gray-400" />
    </button>

    <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl bg-white text-sm font-bold">
      <ListFilter size={20} className="text-gray-800" />
      Filter
    </button>
  </div>
);
