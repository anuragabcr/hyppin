import FilterSidebar from "./components/FilterSidebar";
import FilterToolbar from "./components/FilterToolbar";
import ProductList from "./components/ProductList";

export default async function ProductsPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto p-4 bg-white min-h-screen">
      {/* --- LEFT: Filter Sidebar --- */}
      <aside className="w-full lg:w-3/12">
        <div className="lg:sticky lg:top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 custom-scrollbar">
          <FilterSidebar />
        </div>
      </aside>

      {/* --- RIGHT: Product Content --- */}
      <main className="w-full lg:w-9/12 space-y-6">
        <FilterToolbar />
        <ProductList />
      </main>
    </div>
  );
}
