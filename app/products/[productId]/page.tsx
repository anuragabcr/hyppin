import { notFound } from "next/navigation";
import ProductImageViewer from "./components/ProductImageViewer";
import ProductDescription from "./components/ProductDescription";
import ProductSpecifications from "./components/ProductSpecifications";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

export default async function ShopPage({ params }: ProductPageProps) {
  const { productId } = await params;

  if (!productId) return notFound();

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto p-4 bg-white">
      {/* --- LEFT: Sticky Product Image Viewer --- */}
      <aside className="w-full lg:w-6/12 relative">
        <div className="lg:sticky lg:top-24">
          <ProductImageViewer />
        </div>
      </aside>

      {/* --- RIGHT: Scrollable Product Details --- */}
      <main className="w-full lg:w-6/12  space-y-8 overflow-y-auto max-h-[calc(100vh-6rem)] pr-2">
        <ProductDescription />
        <ProductSpecifications />
      </main>
    </div>
  );
}
