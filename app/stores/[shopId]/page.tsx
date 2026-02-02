import { notFound } from "next/navigation";
import ShopHeader from "./components/ShopHeader";
import ShopTabs from "./components/ShopTabs";

interface ShopPageProps {
  params: Promise<{ shopId: string }>;
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { shopId } = await params;

  if (!shopId) return notFound();

  return (
    <div className="mx-auto pb-2">
      <ShopHeader />
      <ShopTabs />
    </div>
  );
}
