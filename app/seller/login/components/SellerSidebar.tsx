import Image from "next/image";

export default function SellerSidebar() {
  return (
    <div className="relative hidden md:flex w-60 overflow-hidden">
      <Image
        src="/images/seller_bg.svg"
        alt="Hyppin background"
        fill
        priority
        className="object-cover"
      />

      <div className="relative z-10 flex flex-col items-start px-8 py-10 text-white">
        <Image
          src="/images/logo.svg"
          alt="Hyppin Logo"
          width={140}
          height={40}
          className="mb-10"
        />

        <h1 className="text-2xl font-semibold leading-snug tracking-wide">
          Grow your <br />
          local business <br />
          with Hyppin
        </h1>
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/20" />
    </div>
  );
}
