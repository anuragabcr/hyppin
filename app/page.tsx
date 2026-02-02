import CategoryCarousel from "./components/CategoryCarousel";
import HeroSlider from "./components/HeroSlider";
import type { Product as UIProduct } from "./components/ProductCarousel";
import ProductGrid from "./components/ProductGrid";
import StoreSpotlight from "./components/StoreSpotlight";
import type { Product as ApiProduct } from "./types/product";
import ProductsCarousel from "./components/ProductCarousel";
import OffersGrid from "./components/OffersGrid";
import ShopListing from "./components/ShopListing";

const FASHION_BRANDS = [
  "Allen Solly",
  "Van Heusen",
  "U.S. Polo Assn.",
  "Peter England",
  "H&M",
  "ZARA",
  "Levi’s",
  "Roadster",
  "WROGN",
  "Jack & Jones",
];

const veyraStoreData = {
  subtitle: "NEW STORES",
  title: "VEYRA",
  description:
    "Explore the newest arrivals at Veyra—featuring winter-ready clothing, footwear, bags, and accessories designed for everyday style and comfort.",
  buttonText: "View Store",
  buttonLink: "/stores/veyra",
  images: ["/images/store1.svg", "/images/store1.svg", "/images/store1.svg"],
};

const getBrandByProductId = (id: number) =>
  FASHION_BRANDS[id % FASHION_BRANDS.length];

async function getCategoryProducts(categoryId: number): Promise<UIProduct[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products?categoryId=${categoryId}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ApiProduct[] = await res.json();

  return data.map((item) => ({
    id: item.id.toString(),
    brand: getBrandByProductId(item.id),
    name: item.title,
    image: item.images?.[0] ?? "/images/placeholder.png",
    price: item.price,
    originalPrice: Math.round(item.price * 1.25),
    discount: 20,
    rating: 4.5,
    href: `/product/${item.id}`,
  }));
}

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
        actionPath="/categories/1"
      />
      <CategoryCarousel
        title="Essentials"
        products={essentials}
        actionPath="/categories/2"
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
