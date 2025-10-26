import Link from "next/link";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import { IconType } from "react-icons";

interface SocialLink {
  Icon: IconType;
  href: string;
}

const socialLinks: SocialLink[] = [
  { Icon: FaInstagram, href: "#instagram" },
  { Icon: FaTwitter, href: "#twitter" },
  { Icon: FaFacebookF, href: "#facebook" },
  { Icon: FaLinkedinIn, href: "#linkedin" },
];

const companyLinks = [
  { name: "Home", href: "/" },
  { name: "Delivery Areas", href: "/delivery-areas" },
  { name: "Careers", href: "/careers" },
  { name: "Customer Support", href: "/support" },
  { name: "Press", href: "/press" },
  { name: "Hyppin Blog", href: "/blog" },
];

const policyLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Use", href: "/terms" },
  { name: "Responsible Disclosure Policy", href: "/disclosure" },
  { name: "Sell on Hyppin", href: "/sell" },
  { name: "Deliver with Hyppin", href: "/deliver" },
  { name: "Franchise with Hyppin", href: "/franchise" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1: Branding & Social */}
          <div className="col-span-2 md:col-span-1">
            {/* Replace with your actual logo component or image */}
            <h1 className="text-4xl font-extrabold text-[#e0406d] mb-6">
              hyppin
            </h1>

            {/* Social Icons */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#e0406d] transition"
                >
                  <link.Icon className="h-6 w-6" />
                </a>
              ))}
            </div>

            {/* Copyright and Legal Info */}
            <p className="text-sm text-gray-500 mt-8">
              &copy; {new Date().getFullYear()} Hyppin Marketplace Private
              Limited
            </p>
            <p className="text-sm text-gray-500">
              FSSAI Lic No: 1122499000872 (Example)
            </p>
          </div>

          {/* Column 2: Company Links */}
          <div className="col-span-1">
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-700 hover:text-gray-900 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Policy Links */}
          <div className="col-span-1">
            <ul className="space-y-4">
              {policyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-700 hover:text-gray-900 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Download App */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start md:items-end">
            <p className="text-lg font-semibold text-gray-900 mb-4">
              Download App
            </p>
            <div className="space-y-4 w-full max-w-xs md:max-w-[170px]">
              {/* Google Play Button */}
              <a
                href="#google-play"
                className="flex items-center justify-center p-3 border border-gray-300 rounded-lg text-gray-700 hover:border-gray-500 transition shadow-sm bg-white w-full"
              >
                <FaGooglePlay className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">
                  Get it on play store
                </span>
              </a>

              {/* Apple App Store Button */}
              <a
                href="#app-store"
                className="flex items-center justify-center p-3 border border-gray-300 rounded-lg text-gray-700 hover:border-gray-500 transition shadow-sm bg-white w-full"
              >
                <FaApple className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Get it on app store</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
