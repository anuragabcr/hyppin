import { dashboardStats } from "@/app/constants/data/dashboardData";
import SalesChart from "./components/charts/SalesChart";
import ReturnsChart from "./components/charts/ReturnsChart";
import AgeChart from "./components/charts/AgeChart";
import TopSellingProducts from "./components/TopSellingProducts";
import TopSubcategories from "./components/TopSubcategories";
import TopRatedProducts from "./components/TopRatedProducts";

export default function Dashboard() {
  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        {/* Total Orders */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Orders</p>
          <h2 className="text-3xl font-bold">{dashboardStats.totalOrders}</h2>

          <div className="text-sm mt-3 space-y-1">
            <p>Active: {dashboardStats.activeOrders}</p>
            <p>Completed: {dashboardStats.completedOrders}</p>
            <p>Cancelled: {dashboardStats.cancelledOrders}</p>
          </div>
        </div>

        {/* Sales */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p>Total Sales</p>
          <h2 className="text-3xl font-bold">${dashboardStats.totalSales}</h2>
          <SalesChart />
        </div>

        {/* Returns */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p>Total Returns</p>
          <h2 className="text-3xl font-bold">{dashboardStats.totalReturns}</h2>
          <ReturnsChart />
        </div>

        {/* Age Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p>Customer Age</p>
          <AgeChart />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-8">
        <TopSellingProducts />

        <TopSubcategories />

        <TopRatedProducts />
      </div>
    </div>
  );
}
