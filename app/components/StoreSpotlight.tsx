import Link from "next/link";
import ImageCarousel from "./ImageCarousel";

interface StoreSpotlightProps {
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  images: string[];
}

export default function StoreSpotlight({
  subtitle,
  title,
  description,
  buttonText,
  buttonLink,
  images,
}: StoreSpotlightProps) {
  return (
    <section className="m-4 sm:m-6">
      <div className="mx-auto bg-[#F7F9FF] rounded-2xl p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white rounded-2xl overflow-hidden">
          <div className="order-2 md:order-1 flex flex-col space-y-4 p-4 sm:p-6">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                {subtitle}
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                {title}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
              {description}
            </p>

            <Link href={buttonLink} className="w-fit">
              <button className="bg-brand-gradient hover:opacity-95 text-black text-sm font-semibold py-2.5 px-6 rounded-full transition-all active:scale-95">
                {buttonText}
              </button>
            </Link>
          </div>

          <div className="order-1 md:order-2 h-64 sm:h-72 md:h-80 w-full">
            <ImageCarousel images={images} />
          </div>
        </div>
      </div>
    </section>
  );
}
