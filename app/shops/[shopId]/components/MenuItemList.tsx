"use client";

import React from "react";
import { Search, X, Clock, Zap, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import ProductCard from "./ProductCard";

// --- 1. Define Data Structures ---

interface MenuItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  discount: string;
  isSponsored: boolean;
  isAssured: boolean;
  isHotDeal: boolean;
}

interface ItemGroup {
  name: string; // e.g., "VEG BOWL" or "NON VEG BOWL"
  items: MenuItem[];
}

interface MenuCategory {
  id: string; // Must match the IDs in MenuSidebar.tsx (e.g., "bowl-biryani")
  title: string; // e.g., "Bowl Biryani"
  groups: ItemGroup[];
}

// --- 2. Create Dummy Data ---
const dummyMenuData: MenuCategory[] = [
  {
    id: "new-arrivals",
    title: "New Arrivals",
    groups: [
      {
        name: "Trending Now",
        items: [
          {
            id: "floral-summer-dress",
            name: "Floral Summer Dress",
            price: 1499,
            originalPrice: 2199,
            discount: "32% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: false,
            imageUrl: "https://placehold.co/100x100/FDE047/333?text=Dress",
          },
          {
            id: "denim-jacket",
            name: "Slim Fit Denim Jacket",
            price: 2499,
            originalPrice: 3499,
            discount: "29% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: false,
            imageUrl:
              "https://placehold.co/100x100/60A5FA/FFF?text=Denim+Jacket",
          },
        ],
      },
    ],
  },

  {
    id: "mens-clothing",
    title: "Men's Clothing",
    groups: [
      {
        name: "Shirts",
        items: [
          {
            id: "checked-cotton-shirt",
            name: "Checked Cotton Shirt",
            price: 1199,
            originalPrice: 1899,
            discount: "37% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: false,
            imageUrl:
              "https://placehold.co/100x100/3B82F6/FFF?text=Checked+Shirt",
          },
          {
            id: "formal-white-shirt",
            name: "Formal White Shirt",
            price: 1399,
            originalPrice: 1999,
            discount: "30% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: false,
            imageUrl:
              "https://placehold.co/100x100/F3F4F6/333?text=White+Shirt",
          },
        ],
      },
      {
        name: "Trousers & Jeans",
        items: [
          {
            id: "chino-trousers",
            name: "Blue Stretch Denim Jeans",
            price: 1999,
            originalPrice: 3499,
            discount: "43% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: true,
            imageUrl: "https://placehold.co/100x100/1E3A8A/FFF?text=Jeans",
          },
        ],
      },
    ],
  },

  {
    id: "womens-clothing",
    title: "Women's Clothing",
    groups: [
      {
        name: "Tops & Tees",
        items: [
          {
            id: "v-neck-linen-top",
            name: "V-Neck Linen Top",
            price: 899,
            originalPrice: 1399,
            discount: "36% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: false,
            imageUrl: "https://placehold.co/100x100/F9A8D4/FFF?text=Linen+Top",
          },
          {
            id: "crop-graphic-tee",
            name: "Crop Graphic Tee",
            price: 699,
            originalPrice: 1199,
            discount: "42% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: true,
            imageUrl: "https://placehold.co/100x100/F43F5E/FFF?text=Crop+Tee",
          },
        ],
      },
      {
        name: "Dresses",
        items: [
          {
            id: "maxi-floral-dress",
            name: "Maxi Floral Dress",
            price: 1599,
            originalPrice: 2599,
            discount: "38% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: false,
            imageUrl: "https://placehold.co/100x100/FDE047/333?text=Maxi+Dress",
          },
        ],
      },
    ],
  },

  {
    id: "kids-fashion",
    title: "Kids' Fashion",
    groups: [
      {
        name: "Boys",
        items: [
          {
            id: "cartoon-printed-tee",
            name: "Cartoon Printed Tee",
            price: 499,
            originalPrice: 899,
            discount: "44% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: true,
            imageUrl: "https://placehold.co/100x100/22C55E/FFF?text=Kids+Tee",
          },
        ],
      },
      {
        name: "Girls",
        items: [
          {
            id: "polka-dot-frock",
            name: "Polka Dot Frock",
            price: 899,
            originalPrice: 1499,
            discount: "40% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: true,
            imageUrl: "https://placehold.co/100x100/F472B6/FFF?text=Frock",
          },
        ],
      },
    ],
  },

  {
    id: "ethnic-wear",
    title: "Ethnic Wear",
    groups: [
      {
        name: "Women's Ethnic",
        items: [
          {
            id: "anarkali-kurta-set",
            name: "Anarkali Kurta Set",
            price: 2499,
            originalPrice: 3499,
            discount: "29% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: false,
            imageUrl: "https://placehold.co/100x100/F59E0B/FFF?text=Anarkali",
          },
          {
            id: "printed-saree",
            name: "Printed Saree",
            price: 1999,
            originalPrice: 2999,
            discount: "33% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: false,
            imageUrl: "https://placehold.co/100x100/F97316/FFF?text=Saree",
          },
        ],
      },
      {
        name: "Men's Ethnic",
        items: [
          {
            id: "silk-kurta-pyjama",
            name: "Silk Kurta Pyjama",
            price: 2199,
            originalPrice: 3199,
            discount: "31% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: false,
            imageUrl: "https://placehold.co/100x100/D97706/FFF?text=Kurta",
          },
        ],
      },
    ],
  },

  {
    id: "western-wear",
    title: "Western Wear",
    groups: [
      {
        name: "Women",
        items: [
          {
            id: "denim-jumpsuit",
            name: "Denim Jumpsuit",
            price: 1799,
            originalPrice: 2799,
            discount: "36% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: false,
            imageUrl: "https://placehold.co/100x100/60A5FA/FFF?text=Jumpsuit",
          },
          {
            id: "high-waist-shorts",
            name: "High Waist Shorts",
            price: 799,
            originalPrice: 1399,
            discount: "43% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: true,
            imageUrl: "https://placehold.co/100x100/2563EB/FFF?text=Shorts",
          },
        ],
      },
    ],
  },

  {
    id: "footwear",
    title: "Footwear",
    groups: [
      {
        name: "Men's Footwear",
        items: [
          {
            id: "running-sneakers",
            name: "Leather Loafers",
            price: 2199,
            originalPrice: 3499,
            discount: "37% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: false,
            imageUrl: "https://placehold.co/100x100/A16207/FFF?text=Loafers",
          },
        ],
      },
      {
        name: "Women's Footwear",
        items: [
          {
            id: "block-heel-sandals",
            name: "Block Heel Sandals",
            price: 1499,
            originalPrice: 2499,
            discount: "40% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: true,
            imageUrl: "https://placehold.co/100x100/FBBF24/333?text=Heels",
          },
        ],
      },
    ],
  },

  {
    id: "accessories",
    title: "Fashion Accessories",
    groups: [
      {
        name: "Essentials",
        items: [
          {
            id: "leather-belt",
            name: "Leather Belt",
            price: 899,
            originalPrice: 1499,
            discount: "40% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: true,
            imageUrl: "https://placehold.co/100x100/78350F/FFF?text=Belt",
          },
          {
            id: "aviator-sunglasses",
            name: "Sunglasses",
            price: 1299,
            originalPrice: 1999,
            discount: "35% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: false,
            imageUrl: "https://placehold.co/100x100/111827/FFF?text=Shades",
          },
        ],
      },
    ],
  },

  {
    id: "sportswear",
    title: "Activewear & Sports",
    groups: [
      {
        name: "Fitness Gear",
        items: [
          {
            id: "running-shoes",
            name: "Running Shoes",
            price: 2599,
            originalPrice: 3999,
            discount: "35% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: false,
            imageUrl: "https://placehold.co/100x100/1D4ED8/FFF?text=Shoes",
          },
          {
            id: "gym-tank-top",
            name: "Gym Tank Top",
            price: 799,
            originalPrice: 1299,
            discount: "38% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: false,
            imageUrl: "https://placehold.co/100x100/3B82F6/FFF?text=Tank+Top",
          },
        ],
      },
    ],
  },

  {
    id: "winterwear",
    title: "Winterwear",
    groups: [
      {
        name: "Men & Women",
        items: [
          {
            id: "woolen-sweater",
            name: "Woolen Sweater",
            price: 1999,
            originalPrice: 2999,
            discount: "33% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: false,
            imageUrl: "https://placehold.co/100x100/475569/FFF?text=Sweater",
          },
          {
            id: "puffer-jacket",
            name: "Puffer Jacket",
            price: 2999,
            originalPrice: 4999,
            discount: "40% off",
            isSponsored: false,
            isAssured: true,
            isHotDeal: true,
            imageUrl: "https://placehold.co/100x100/0F172A/FFF?text=Jacket",
          },
        ],
      },
    ],
  },
];

// --- 3. Reusable Item Card Component ---

// const ItemCard: React.FC<{ item: MenuItem }> = ({ item }) => {
//   const formattedPrice = new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     minimumFractionDigits: 0,
//   }).format(item.price);

//   const { addToCart } = useCart();

//   return (
//     <div className="flex justify-between items-start py-4 border-b border-gray-100 last:border-b-0 group">
//       {/* Text Content */}
//       <div className="flex flex-col pr-4">
//         {item.isRecommended && <Zap className="w-4 h-4 text-red-500 mb-1" />}

//         {/* Veg/Non-Veg Icon */}
//         <div className="flex items-center space-x-2 mb-1">
//           <div
//             className={`w-3.5 h-3.5 border-2 rounded-full flex items-center justify-center ${
//               item.isVeg ? "border-green-500" : "border-red-500"
//             }`}
//           >
//             <div
//               className={`w-1.5 h-1.5 rounded-full ${
//                 item.isVeg ? "bg-green-500" : "bg-red-500"
//               }`}
//             ></div>
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
//         </div>

//         {/* Price and Details */}
//         <p className="text-gray-700 font-medium mb-1">{formattedPrice}</p>
//         <p className="text-sm text-gray-500 mb-2">{item.sizeServes}</p>
//         <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
//       </div>

//       {/* Image and Add Button */}
//       <div className="relative flex-shrink-0 w-28 h-28 ml-2">
//         <Image
//           height={112}
//           width={112}
//           src={item.imageUrl}
//           alt={item.name}
//           unoptimized
//           className="w-full h-full object-cover rounded-lg shadow-md"
//           onError={(e) => {
//             e.currentTarget.src = item.isVeg
//               ? "https://placehold.co/100x100/A3E635/FFF?text=Veg"
//               : "https://placehold.co/100x100/EF4444/FFF?text=NonVeg";
//           }}
//         />
//         {/* Add Button - positioned over the image like in the original image */}
//         <button
//           type="button"
//           onClick={(e) => {
//             e.stopPropagation();
//             e.preventDefault();
//             addToCart({
//               id: item.id,
//               name: item.name,
//               price: item.price,
//               imageUrl: item.imageUrl,
//               quantity: 1,
//             });
//           }}
//           className="absolute bottom-1 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-white border border-gray-300 text-green-600 font-bold text-sm rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
//         >
//           ADD
//         </button>
//       </div>
//     </div>
//   );
// };

// --- 4. The Main Menu Item List Component ---

const MenuItemList: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  // Simple filtering logic (for display only, not the scroll component)
  const filteredData = dummyMenuData
    .map((category) => ({
      ...category,
      groups: category.groups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        }))
        .filter((group) => group.items.length > 0),
    }))
    .filter((category) => category.groups.length > 0);

  return (
    <div className="w-full bg-white">
      {/* Top Header Section */}
      <div className="  z-10 bg-white pt-6 pb-4 px-6 md:px-0 ">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-5">
          Order Online
        </h1>

        {/* Search Bar: Enhanced with slight inset shadow and better focus */}
        <div className="relative flex items-center mb-5">
          <Search className="w-5 h-5 text-gray-400 absolute left-4" />
          <input
            type="text"
            placeholder="Search within menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl 
                 shadow-inner transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 text-gray-500 hover:text-red-600 p-1 rounded-full transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Live Tracking & Time: Styled as small, clear badges */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1.5 font-medium text-green-600 bg-green-50 p-2 rounded-lg">
            <Clock className="w-4 h-4" />
            <span>Live track your order</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-red-600 bg-red-50 p-2 rounded-lg">
            <Zap className="w-4 h-4" />
            <span>31 min delivery</span>
          </div>
        </div>
      </div>

      {/* Menu Categories and Items */}
      <div className="mt-4 space-y-8">
        {filteredData.map((category) => (
          // IMPORTANT: This ID links to the MenuSidebar component's scroll logic
          <section key={category.id} id={category.id} className="pt-1">
            <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">
              {category.title}
            </h2>

            {/* Item Groups within the Category */}
            <div className="space-y-6">
              {category.groups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
                    {group.name}
                  </h3>
                  {/* List of Items */}
                  <div className="divide-y divide-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {group.items.map((item) => (
                      <Link
                        key={item.id}
                        href={`/products/${item.id}`}
                        className="block hover:scale-[1.02] transition-transform duration-300"
                      >
                        <ProductCard product={item} />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {filteredData.length === 0 && searchTerm && (
          <div className="text-center py-10 text-gray-500">
            No items found matching {searchTerm}.
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemList;
