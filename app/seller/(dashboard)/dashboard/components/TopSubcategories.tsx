import { topSubcategories } from "@/app/constants/data/productStats";

export default function TopSubcategories() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Top Subcategories</h2>

      <div className="space-y-4">
        {topSubcategories.map((cat, i) => (
          <div key={i} className="flex justify-between border-b pb-2">
            <span>{cat.name}</span>
            <span className="font-semibold">${cat.sales}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
