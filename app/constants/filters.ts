export type FilterUIType =
  | "checkbox"
  | "radio"
  | "toggle"
  | "range"
  | "swatch"
  | "chips";

export interface FilterOption {
  label: string;
  value: string | number;
  color?: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: FilterUIType;
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
  extra?: {
    toggleLabel?: string;
  };
}

export const WOMEN_FILTERS: FilterConfig[] = [
  {
    key: "category",
    label: "Category",
    type: "checkbox",
    options: [
      "Tops",
      "T-Shirts",
      "Shirts",
      "Dresses",
      "Kurtas & Kurtis",
      "Co-ords",
      "Jumpsuits",
      "Ethnic Sets",
      "Jeans",
      "Trousers & Pants",
      "Skirts",
      "Shorts",
      "Jackets & Shrugs",
      "Loungewear",
      "Innerwear & Sleepwear",
    ].map((v) => ({ label: v, value: v })),
  },

  {
    key: "size",
    label: "Size",
    type: "checkbox",
    options: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"].map(
      (v) => ({ label: v, value: v }),
    ),
    extra: { toggleLabel: "Only show available sizes" },
  },

  {
    key: "fit",
    label: "Fit",
    type: "checkbox",
    options: [
      "Slim Fit",
      "Regular Fit",
      "Relaxed Fit",
      "Oversized",
      "Bodycon",
      "A-Line",
    ].map((v) => ({ label: v, value: v })),
  },

  {
    key: "price",
    label: "Price",
    type: "range",
    min: 0,
    max: 5000,
    step: 100,
  },

  {
    key: "discount",
    label: "Discount",
    type: "checkbox",
    options: ["10%", "20%", "30%", "50%"].map((v) => ({
      label: `${v} & Above`,
      value: v,
    })),
  },

  {
    key: "color",
    label: "Color",
    type: "swatch",
    options: [
      "Black",
      "White",
      "Beige",
      "Blue",
      "Green",
      "Red",
      "Pink",
      "Yellow",
      "Brown",
      "Grey",
      "Multi-color",
    ].map((v) => ({ label: v, value: v.toLowerCase() })),
  },

  {
    key: "fabric",
    label: "Fabric",
    type: "checkbox",
    options: [
      "Cotton",
      "Linen",
      "Rayon",
      "Polyester",
      "Chiffon",
      "Georgette",
      "Satin",
      "Silk",
      "Denim",
      "Wool",
    ].map((v) => ({ label: v, value: v })),
  },

  {
    key: "occasion",
    label: "Occasion",
    type: "checkbox",
    options: [
      "Casual",
      "Work / Office",
      "Party",
      "Ethnic / Festive",
      "Wedding",
      "Vacation",
      "Lounge / Sleep",
    ].map((v) => ({ label: v, value: v })),
  },

  {
    key: "rating",
    label: "Ratings",
    type: "radio",
    options: [
      { label: "⭐ 4 & above", value: 4 },
      { label: "⭐ 3 & above", value: 3 },
    ],
  },
];

export const MEN_FILTERS: FilterConfig[] = [
  {
    key: "category",
    label: "Category",
    type: "checkbox",
    options: [
      "T-Shirts",
      "Shirts",
      "Jeans",
      "Trousers",
      "Shorts",
      "Jackets",
      "Hoodies & Sweatshirts",
      "Ethnic Wear",
      "Co-ords",
      "Innerwear & Sleepwear",
    ].map((v) => ({ label: v, value: v })),
  },

  {
    key: "size",
    label: "Size",
    type: "checkbox",
    options: ["XS", "S", "M", "L", "XL", "XXL", "3XL"].map((v) => ({
      label: v,
      value: v,
    })),
    extra: { toggleLabel: "Show available sizes only" },
  },

  {
    key: "fit",
    label: "Fit",
    type: "checkbox",
    options: [
      "Slim Fit",
      "Regular Fit",
      "Relaxed Fit",
      "Oversized",
      "Skinny",
    ].map((v) => ({ label: v, value: v })),
  },

  {
    key: "price",
    label: "Price",
    type: "range",
    min: 0,
    max: 5000,
    step: 100,
  },

  {
    key: "brand",
    label: "Brand",
    type: "checkbox",
    options: [
      "Roadster",
      "HRX",
      "H&M",
      "Levi’s",
      "Jack & Jones",
      "US Polo",
    ].map((v) => ({ label: v, value: v })),
  },
];

export const KIDS_FILTERS: FilterConfig[] = [
  {
    key: "ageGroup",
    label: "Age Group",
    type: "checkbox",
    options: [
      "0–6 Months",
      "6–12 Months",
      "1–2 Years",
      "2–4 Years",
      "4–6 Years",
      "6–8 Years",
      "8–12 Years",
    ].map((v) => ({ label: v, value: v })),
  },

  {
    key: "gender",
    label: "Gender",
    type: "radio",
    options: ["Boys", "Girls", "Unisex"].map((v) => ({ label: v, value: v })),
  },

  {
    key: "category",
    label: "Category",
    type: "checkbox",
    options: [
      "T-Shirts",
      "Shirts",
      "Dresses",
      "Sets & Combos",
      "Shorts",
      "Pants",
      "Ethnic Wear",
      "Sleepwear",
      "Winter Wear",
    ].map((v) => ({ label: v, value: v })),
  },
];

export const STORE_FILTERS: FilterConfig[] = [
  {
    key: "shop",
    label: "Shops",
    type: "checkbox",
    options: ["Westside", "Pantaloons"].map((v) => ({ label: v, value: v })),
  },

  {
    key: "price",
    label: "Price Range",
    type: "range",
    min: 0,
    max: 5000,
    step: 100,
  },

  {
    key: "offers",
    label: "Offers",
    type: "chips",
    options: ["Discount Available", "Free Delivery", "Deals Running"].map(
      (v) => ({ label: v, value: v }),
    ),
  },

  {
    key: "delivery",
    label: "Delivery Speed",
    type: "radio",
    options: ["Same-Day", "Next-Day", "Standard"].map((v) => ({
      label: v,
      value: v,
    })),
  },
];

export const FOOTWEAR_FILTERS: FilterConfig[] = [
  {
    key: "category",
    label: "Category",
    type: "checkbox",
    options: [
      "Casual Shoes",
      "Sports Shoes",
      "Formal Shoes",
      "Sneakers",
      "Sandals",
      "Floaters",
      "Flip-Flops",
      "Heels",
      "Flats",
      "Boots",
      "Loafers",
      "Mojaris",
      "Slippers",
      "School Shoes",
    ].map((v) => ({ label: v, value: v })),
  },

  // 2️⃣ Gender
  {
    key: "gender",
    label: "Gender",
    type: "radio",
    options: ["Men", "Women", "Kids", "Unisex"].map((v) => ({
      label: v,
      value: v,
    })),
  },

  // 3️⃣ Size (Foot Size)
  {
    key: "size",
    label: "Size",
    type: "checkbox",
    options: [
      "UK 2",
      "UK 3",
      "UK 4",
      "UK 5",
      "UK 6",
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10",
      "UK 11",
      "UK 12",
    ].map((v) => ({ label: v, value: v })),
    extra: {
      toggleLabel: "Only show available sizes",
    },
  },

  // 4️⃣ Price
  {
    key: "price",
    label: "Price",
    type: "range",
    min: 0,
    max: 10000,
    step: 100,
  },

  // 5️⃣ Discount
  {
    key: "discount",
    label: "Discount",
    type: "checkbox",
    options: ["10%", "20%", "30%", "50%"].map((v) => ({
      label: `${v} & Above`,
      value: v,
    })),
  },

  // 6️⃣ Color
  {
    key: "color",
    label: "Color",
    type: "swatch",
    options: [
      "Black",
      "White",
      "Brown",
      "Tan",
      "Blue",
      "Grey",
      "Red",
      "Green",
      "Beige",
      "Multi-color",
    ].map((v) => ({ label: v, value: v.toLowerCase() })),
  },

  // 7️⃣ Brand
  {
    key: "brand",
    label: "Brand",
    type: "checkbox",
    options: [
      "Nike",
      "Adidas",
      "Puma",
      "Reebok",
      "Skechers",
      "Woodland",
      "Bata",
      "Campus",
      "Sparx",
      "Red Tape",
    ].map((v) => ({ label: v, value: v })),
  },

  // 8️⃣ Occasion
  {
    key: "occasion",
    label: "Occasion",
    type: "checkbox",
    options: [
      "Casual",
      "Sports / Running",
      "Work / Office",
      "Party",
      "Wedding",
      "Outdoor / Trekking",
      "Daily Wear",
    ].map((v) => ({ label: v, value: v })),
  },

  // 9️⃣ Closure Type
  {
    key: "closure",
    label: "Closure",
    type: "checkbox",
    options: ["Lace-Up", "Slip-On", "Velcro", "Buckle", "Zip"].map((v) => ({
      label: v,
      value: v,
    })),
  },

  // 🔟 Sole Material
  {
    key: "sole",
    label: "Sole Material",
    type: "checkbox",
    options: ["Rubber", "PU", "TPR", "PVC", "Leather", "EVA"].map((v) => ({
      label: v,
      value: v,
    })),
  },

  // 1️⃣1️⃣ Toe Shape
  {
    key: "toeShape",
    label: "Toe Shape",
    type: "checkbox",
    options: [
      "Round Toe",
      "Pointed Toe",
      "Square Toe",
      "Open Toe",
      "Peep Toe",
    ].map((v) => ({ label: v, value: v })),
  },

  // 1️⃣2️⃣ Heel Type
  {
    key: "heelType",
    label: "Heel Type",
    type: "checkbox",
    options: [
      "Flat",
      "Low Heel",
      "Mid Heel",
      "High Heel",
      "Wedge",
      "Platform",
    ].map((v) => ({ label: v, value: v })),
  },

  // 1️⃣3️⃣ Heel Height
  {
    key: "heelHeight",
    label: "Heel Height",
    type: "radio",
    options: ["Under 1 inch", "1–2 inch", "2–3 inch", "3 inch & above"].map(
      (v) => ({ label: v, value: v }),
    ),
  },

  // 1️⃣4️⃣ Comfort & Features
  {
    key: "features",
    label: "Features",
    type: "checkbox",
    options: [
      "Lightweight",
      "Cushioned",
      "Breathable",
      "Water Resistant",
      "Slip Resistant",
      "Orthopedic",
    ].map((v) => ({ label: v, value: v })),
  },

  // 1️⃣5️⃣ Ratings
  {
    key: "rating",
    label: "Ratings",
    type: "radio",
    options: [
      { label: "⭐ 4 & above", value: 4 },
      { label: "⭐ 3 & above", value: 3 },
    ],
  },

  // 1️⃣6️⃣ Availability
  {
    key: "availability",
    label: "Availability",
    type: "checkbox",
    options: ["In Stock", "New Arrivals", "Best Sellers"].map((v) => ({
      label: v,
      value: v,
    })),
  },
];
