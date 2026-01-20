import CategoryCarousel from "./components/CategoryCarousel";
import HeroSlider from "./components/HeroSlider";
// import OfferBanners from "./components/OfferBanners";
import ProductsCarousel, { Product } from "./components/ProductCarousel";
import ProductGrid from "./components/ProductGrid";
import StoreSpotlight from "./components/StoreSpotlight";

const veyraStoreData = {
  subtitle: "NEW STORES",
  title: "VEYRA",
  description:
    "Explore the newest arrivals at Veyra—featuring winter-ready clothing, footwear, bags, and accessories designed for everyday style and comfort.",
  buttonText: "View Store",
  buttonLink: "/stores/veyra",
  images: ["/images/store1.svg", "/images/store1.svg", "/images/store1.svg"],
};

async function getCategoryProducts(catid: number = 39) {
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

  const getBrandByProductId = (id: number | string) => {
    const index = Number(id) % FASHION_BRANDS.length;
    return FASHION_BRANDS[index];
  };
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/categories/${catid}/products`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return data.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any): Product => ({
      id: item.id.toString(),
      brand: getBrandByProductId(item.id),
      name: item.title,
      image: item.images[0].replace(/[\[\]"]/g, ""),
      price: item.price,
      originalPrice: Math.round(item.price * 1.25),
      discount: 20,
      rating: 4.5,
      href: `/product/${item.id}`,
    }),
  );
}

export default async function Home() {
  const deals = await getCategoryProducts(1);
  const essentials = await getCategoryProducts(2);
  const stores = await getCategoryProducts(3);
  const categories = await getCategoryProducts(4);

  return (
    <>
      <HeroSlider />
      {/* <OfferBanners
        leftImage="/images/offer_banner1.svg"
        rightImage="/images/offer_banner2.svg"
        leftHref="/categories/men"
        rightHref="/categories/women"
      /> */}
      <ProductsCarousel
        title="Deals of the day"
        products={deals}
        actionPath="/categories/39"
      />
      <CategoryCarousel
        title="Essentials"
        products={essentials}
        actionPath="/categories/39"
      />
      <ProductGrid
        title="Shop by Category"
        products={categories}
        actionPath="/categories/39"
        cardType="category"
      />
      <StoreSpotlight {...veyraStoreData} />
      <ProductGrid
        title="Shop by Stores"
        products={stores}
        actionPath="/stores"
        cardType="store"
        showLoadMore={true}
      />
    </>
  );
}
