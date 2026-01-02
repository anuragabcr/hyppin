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
    <section className="m-4 sm:m-6 lg:m-8">
      <div className=" mx-auto p-4 sm:p-6 lg:p-8 bg-[#F7F9FF] rounded-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-xl">
          <div className="flex flex-col items-start pl-4 sm:pl-6 lg:pl-8 space-y-6 order-2 lg:order-1">
            <div>
              <p className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-2">
                {subtitle}
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight leading-none">
                {title}
              </h2>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              {description}
            </p>

            <Link href={buttonLink} className="inline-block mt-4">
              <button className="bg-brand-gradient hover:opacity-95 text-black font-bold py-4 px-10 rounded-full shadow-sm transition-all active:scale-95">
                {buttonText}
              </button>
            </Link>
          </div>
          <div className="order-1 lg:order-2 h-[500px] lg:h-[650px] w-full shadow-xl rounded-2xl overflow-hidden">
            <ImageCarousel images={images} />
          </div>
        </div>
      </div>
    </section>
  );
}
