import { topRatedProducts } from "@/app/constants/data/productStats";

export default function TopRatedProducts() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Top Rated Products</h2>

      <div className="space-y-4">
        {topRatedProducts.map((product, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span>{product.name}</span>
            </div>

            <div className="flex items-center gap-2">
              ⭐⭐⭐⭐
              <span className="font-semibold">{product.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
