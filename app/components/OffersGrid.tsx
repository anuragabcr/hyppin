import Image from "next/image";

interface OfferTileProps {
  title: string;
  category?: string;
  discount: string;
  image: string;
  variant: "small" | "wide";
}

export const OfferTile = ({
  title,
  category,
  discount,
  image,
  variant,
}: OfferTileProps) => (
  <div
    className={`relative rounded-2xl overflow-hidden bg-gray-200 group border border-transparent hover:border-[#f0bd49]/30 transition-all ${
      variant === "wide" ? "h-[200px]" : "h-[225px]"
    }`}
  >
    <Image
      src={image}
      alt={title}
      fill
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    />

    {/* Updated Badge: Blue -> Brand Yellow */}
    <div className="absolute top-4 left-4 z-20">
      <span className="bg-[#f0bd49] text-gray-900 text-[10px] font-black px-2.5 py-1 rounded shadow-sm uppercase tracking-wider">
        {discount}
      </span>
    </div>

    <div className="relative z-10 p-6 flex flex-col justify-end h-full bg-linear-to-t from-black/40 to-transparent">
      {category && (
        <span className="text-[#f0bd49] text-xs font-bold mb-1 drop-shadow-md">
          {category}
        </span>
      )}
      <h3 className="text-2xl font-black text-white leading-tight drop-shadow-lg">
        {title}
      </h3>
      <button className="flex items-center gap-1 mt-2 text-xs font-bold text-[#f0bd49] hover:text-white transition-colors uppercase tracking-widest">
        Shop Now <span className="text-lg">›</span>
      </button>
    </div>
  </div>
);

interface OfferHeroProps {
  title: string;
  subtitle: string;
  discount: string;
  image: string;
}

export const OfferHero = ({
  title,
  subtitle,
  discount,
  image,
}: OfferHeroProps) => (
  <div className="relative h-[450px] rounded-2xl overflow-hidden bg-gray-100 group shadow-sm">
    <Image
      src={image}
      fill
      alt={title}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-1000"
    />
    <div className="relative z-10 p-10 flex flex-col items-end text-right h-full justify-center bg-linear-to-l from-white/80 via-white/20 to-transparent">
      {/* Updated Subtitle: Blue -> Brand Yellow */}
      <span className="text-[#e0ac3e] font-black text-sm mb-2 uppercase tracking-tighter">
        {subtitle}
      </span>
      <h2 className="text-4xl font-black text-gray-900 mb-2">{title}</h2>
      <p className="text-xl font-bold text-gray-700 mb-6">{discount}</p>

      {/* Updated Button: White/Black -> Brand Gradient */}
      <button className="px-8 py-3 bg-linear-to-r from-[#ffce1d] to-[#ffa500] hover:from-[#f0bd49] hover:to-[#e0ac3e] text-gray-900 rounded-xl font-black shadow-lg hover:shadow-xl transition-all uppercase text-xs tracking-widest active:scale-95">
        Shop Now
      </button>
    </div>
  </div>
);

const OffersGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7">
          <OfferHero
            title="Women's Style"
            subtitle="New Arrivals"
            discount="Up to 70% Off"
            image="/images/women-style.webp"
          />
        </div>

        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <OfferTile
              title="Handbag"
              discount="25% OFF"
              image="/images/handbag.webp"
              variant="small"
            />
            <OfferTile
              title="Watch"
              discount="45% OFF"
              image="/images/watch.webp"
              variant="small"
            />
          </div>
          <OfferTile
            title="Backpack"
            category="Accessories"
            discount="Min. 40-80% Off"
            image="/images/backpack.webp"
            variant="wide"
          />
        </div>
      </div>
    </section>
  );
};

export default OffersGrid;
