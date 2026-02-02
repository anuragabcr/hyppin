import Image from "next/image";
import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaTiktok,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa6";
import {
  BellRing,
  MapPin,
  ShieldCheck,
  History,
  Zap,
  TicketPercent,
} from "lucide-react";

const PROMO_FEATURES = [
  { text: "Price-drop alerts", icon: <BellRing size={16} /> },
  { text: "Track orders any time", icon: <MapPin size={16} /> },
  { text: "Faster & more secure checkout", icon: <ShieldCheck size={16} /> },
  { text: "Low stock items alerts", icon: <History size={16} /> },
  { text: "Exclusive offers", icon: <Zap size={16} /> },
  { text: "Coupons & offers alerts", icon: <TicketPercent size={16} /> },
];

const socialIcons = [
  { icon: <FaInstagram />, href: "#", label: "Instagram" },
  { icon: <FaFacebookF />, href: "#", label: "Facebook" },
  { icon: <FaXTwitter />, href: "#", label: "X (Twitter)" },
  { icon: <FaTiktok />, href: "#", label: "TikTok" },
  { icon: <FaYoutube />, href: "#", label: "YouTube" },
  { icon: <FaPinterestP />, href: "#", label: "Pinterest" },
];

export function SellerActionBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-black group transition-all duration-300 hover:shadow-lg mb-10">
      <div className="absolute right-0 top-0 h-full w-full md:w-3/5 overflow-hidden">
        <Image
          src="/images/seller.jpeg"
          alt="Seller"
          fill
          className="object-cover object-right md:object-center opacity-90 transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />
      </div>

      <div className="relative z-10 flex items-center h-[180px] pl-4">
        <div className="max-w-xs md:max-w-md">
          <h2 className="text-white text-2xl md:text-[28px] font-bold leading-[1.2] tracking-tight">
            Start Selling to Millions of Buyers on Temu
          </h2>

          <button className="mt-6 bg-[#ff6b00] hover:bg-[#e66000] active:scale-95 transition-all text-white font-bold px-8 py-3 rounded-full text-sm md:text-base shadow-md">
            Start a Selling Account
          </button>
        </div>
      </div>
      <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none" />
    </div>
  );
}

export default function PromoFooter() {
  return (
    <section className="bg-[#121212] text-white">
      <SellerActionBanner />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 mb-10">
        {PROMO_FEATURES.map((item, index) => (
          <Feature key={index} text={item.text} icon={item.icon} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
        <StoreButton
          label="Download on the"
          store="App Store"
          icon={<FaApple size={24} fill="currentColor" />}
        />
        <StoreButton
          label="Get it on"
          store="Google Play"
          icon={<IoLogoGooglePlaystore size={24} fill="currentColor" />}
        />
      </div>

      <div className="flex items-center gap-6 justify-center md:justify-start text-xl text-gray-400">
        {socialIcons.map((social, index) => (
          <a
            key={index}
            href={social.href}
            aria-label={social.label}
            className="transition-colors duration-300 hover:text-[#f0bd49] active:scale-90"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </section>
  );
}

interface FeatureProps {
  text: string;
  icon: React.ReactNode;
}

function Feature({ text, icon }: FeatureProps) {
  return (
    <div className="flex items-center gap-3 group cursor-default">
      <div className="text-gray-400 group-hover:text-[#f0bd49] transition-colors duration-300">
        {icon}
      </div>

      <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-[13px] font-medium leading-none">
        {text}
      </span>
    </div>
  );
}

function StoreButton({
  label,
  store,
  icon,
}: {
  label: string;
  store: string;
  icon: React.ReactNode;
}) {
  return (
    <button className="flex items-center gap-3 border border-gray-600 rounded-xl px-4 py-2 hover:border-white hover:bg-white/5 transition group w-full sm:w-auto">
      <div className="text-white group-hover:text-[#f0bd49] transition-colors">
        {icon}
      </div>

      <div className="text-left">
        <p className="text-[10px] uppercase tracking-tight text-gray-400 leading-none">
          {label}
        </p>
        <p className="text-base font-bold text-white leading-tight">{store}</p>
      </div>
    </button>
  );
}
