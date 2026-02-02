import CategoryCarousel from "./components/CategoryCarousel";
import HeroSlider from "./components/HeroSlider";
import ProductGrid from "./components/ProductGrid";
import StoreSpotlight from "./components/StoreSpotlight";

import ProductsCarousel from "./components/ProductCarousel";
import OffersGrid from "./components/OffersGrid";
import ShopListing from "./components/ShopListing";
import { getCategoryProducts } from "./lib/utils";

const veyraStoreData = {
  subtitle: "NEW STORES",
  title: "VEYRA",
  description:
    "Explore the newest arrivals at Veyra—featuring winter-ready clothing, footwear, bags, and accessories designed for everyday style and comfort.",
  buttonText: "View Store",
  buttonLink: "/stores/veyra",
  images: ["/images/store1.svg", "/images/store1.svg", "/images/store1.svg"],
};

export default async function Home() {
  const [deals, essentials, categories] = await Promise.all([
    getCategoryProducts(1),
    getCategoryProducts(2),
    getCategoryProducts(4),
  ]);

  return (
    <>
      <HeroSlider />
      <OffersGrid />
      <ProductsCarousel
        title="Deals of the day"
        products={deals}
        actionPath="/categories/men"
      />
      <CategoryCarousel
        title="Essentials"
        products={essentials}
        actionPath="/categories/women"
      />
      <ProductGrid
        title="Shop by Category"
        products={categories}
        actionPath="/categories"
        cardType="category"
      />
      <StoreSpotlight {...veyraStoreData} />
      <ShopListing />
    </>
  );
}
