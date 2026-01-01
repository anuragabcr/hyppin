import Link from "next/link";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const footerSections = [
    {
      title: "SHOP BY CATEGORY",
      links: ["WOMAN", "MAN", "KIDS", "HOME"],
    },
    {
      title: "SHOP BY USE",
      links: ["Holidays", "Beach"],
    },
    {
      title: "OFFERS",
      links: ["Anniversary Sale", "Student Discount", "Limited Stock"],
    },
    {
      title: "HELP & SUPPORT",
      links: [
        "Contact Us",
        "Track Order",
        "Return & Exchange",
        "FAQ",
        "Care Guide",
      ],
    },
    {
      title: "POLICY",
      links: [
        "Return & Exchange",
        "Privacy Policy",
        "Cookie Policy",
        "Terms And Conditions",
      ],
    },
    {
      title: "ABOUT US",
      links: ["Store Reviews", "Blogs"],
    },
    {
      title: "CONTACT US",
      links: ["+91 9876543210", "info@hyppin.com"],
    },
  ];

  return (
    <footer className="bg-[#ECEEF2] py-6 px-4 sm:px-8 lg:px-12 font-sans text-black">
      <div className="mb-4">
        <h2 className="text-5xl font-black tracking-tighter">HYPPIN</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
        {footerSections.map((section) => (
          <div key={section.title} className="pr-4">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <span className="whitespace-nowrap">{section.title}</span>
              <div className="h-px w-full bg-gray-300"></div>
            </h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-gray-700 hover:text-black transition"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-8 mb-6">
        <div>
          <h3 className="text-lg font-bold mb-4">Social</h3>
          <div className="flex gap-4">
            {[FaXTwitter, FaFacebookF, FaInstagram].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-sm hover:bg-white cursor-pointer transition"
              >
                <Icon className="text-lg" />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl">
          <h3 className="text-lg font-bold mb-2">About Us</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Recent Searches</h3>
          <div className="flex flex-wrap gap-4 text-xs font-bold underline decoration-gray-400">
            {["WOMAN", "MAN", "KIDS", "HOME"].map((tag) => (
              <Link
                key={tag}
                href="#"
                className="hover:text-primary transition"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-2 text-center text-xs text-gray-500">
        © 2025 HYPPIN - All rights Reserved
      </div>
    </footer>
  );
}
