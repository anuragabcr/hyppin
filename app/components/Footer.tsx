import PromoFooter from "./PromoFooter";

const footerLinks = [
  {
    title: "Company info",
    links: [
      "About Hyppin",
      "Affiliate Program",
      "Contact us",
      "Careers",
      "Press",
    ],
  },
  {
    title: "Customer service",
    links: [
      "Return and refund policy",
      "Intellectual property policy",
      "Shipping info",
      "Report suspicious activity",
    ],
  },
  {
    title: "Help",
    links: [
      "Support center & FAQ",
      "Safety center",
      "Hyppin purchase protection",
      "Sitemap",
      "How to order",
      "How to track",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 px-6 md:px-12">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
          {/* Section 1-3: Navigation Links (2/3 width) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="font-bold text-sm mb-6 uppercase tracking-wider text-gray-200">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-[#f0bd49] text-xs transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section 4: PromoFooter (1/3 width) */}
          <div className="lg:col-span-4">
            <PromoFooter />
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-gray-500 mb-4">
            © 2022 - 2026 Hyppin Inc.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
            <a href="#" className="hover:underline">
              Terms of use
            </a>
            <a href="#" className="hover:underline">
              Privacy policy
            </a>
            <a href="#" className="hover:underline">
              Ad Choices
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
