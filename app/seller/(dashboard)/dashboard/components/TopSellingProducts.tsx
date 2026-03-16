import { topSellingProducts } from "@/app/constants/data/productStats";

export default function TopSellingProducts() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>

      <table className="w-full text-sm">
        <thead className="text-gray-500">
          <tr>
            <th className="text-left">Products</th>
            <th>Quantity</th>
            <th className="text-right">Sales</th>
          </tr>
        </thead>

        <tbody>
          {topSellingProducts.map((product, i) => (
            <tr key={i} className="border-t">
              <td className="py-2">{product.name}</td>
              <td className="text-center">{product.quantity}</td>
              <td className="text-right">${product.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
