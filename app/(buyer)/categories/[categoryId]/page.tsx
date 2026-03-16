import { notFound } from "next/navigation";
import ProductListingPage from "../components/ProductListingPage";
import { CategoryId } from "@/app/constants";

interface ProductPageProps {
  params: Promise<{ categoryId: string }>;
}

export default async function Page({ params }: ProductPageProps) {
  const { categoryId } = (await params) as { categoryId: CategoryId };

  if (!categoryId) return notFound();
  console.log(categoryId);

  return (
    <>
      <ProductListingPage categoryId={categoryId} />
    </>
  );
}
