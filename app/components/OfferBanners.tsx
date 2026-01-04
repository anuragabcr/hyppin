import Image from "next/image";
import Link from "next/link";

interface OfferBannerProps {
  leftImage: string;
  rightImage: string;
  leftHref?: string;
  rightHref?: string;
}

export default function OfferBanners({
  leftImage,
  rightImage,
  leftHref = "#",
  rightHref = "#",
}: OfferBannerProps) {
  return (
    <section className="w-full p-4">
      {/* 1. Mobile: grid-cols-1 (stacks everything)
          2. Desktop: lg:grid-cols-3 (creates 3 columns)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Banner: 1/3 width on desktop */}
        <Link
          href={leftHref}
          className="relative block w-full aspect-[4/3] lg:aspect-auto lg:h-[400px] overflow-hidden rounded-xl lg:col-span-1"
        >
          <Image
            src={leftImage}
            alt="Left Promotion"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-500"
            priority
          />
        </Link>

        {/* Right Banner: 2/3 width on desktop */}
        <Link
          href={rightHref}
          className="relative block w-full aspect-[4/3] lg:aspect-auto lg:h-[400px] overflow-hidden rounded-xl lg:col-span-2"
        >
          <Image
            src={rightImage}
            alt="Right Promotion"
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover hover:scale-105 transition-transform duration-500"
            priority
          />
        </Link>
      </div>
    </section>
  );
}
