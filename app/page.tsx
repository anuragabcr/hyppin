import DynamicPromoCarousel from "./components/DynamicPromoCarousel";
import OfferCarousel from "./components/OfferCarousel";
import ProductsCarousel from "./components/ProductsCarousel";
import ShopListing from "./components/ShopListing";

export default function Home() {
  return (
    <>
      <DynamicPromoCarousel />
      <OfferCarousel />
      <ProductsCarousel />
      <ShopListing />
    </>
  );
}
