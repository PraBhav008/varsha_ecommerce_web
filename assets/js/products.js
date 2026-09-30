// Varsha Furniture - Official Product Catalog Data
// Ahmedabad Workshop | Handcrafted Quality Furniture
const VARSHA_DEFAULT_PRODUCTS = [
  {
    id: "vf-01",
    title: "Aria Quilted Mustard Dining Armchair",
    category: "Dining Chairs",
    price: 4200,
    originalPrice: 5500,
    image: "assets/images/catalog/varsha-prod-01.jpg",
    desc: "Ergonomic mustard leatherette dining armchair with diamond quilting and matte black legs.",
    badge: "Bestseller",
    status: "In Stock"
  },
  {
    id: "vf-02",
    title: "Modena Tan Leather Dining Chair",
    category: "Dining Chairs",
    price: 3900,
    originalPrice: 4900,
    image: "assets/images/catalog/varsha-prod-02.jpg",
    desc: "Contoured tan faux-leather dining chair with high-resilience foam and tapered steel legs.",
    badge: "Popular",
    status: "In Stock"
  },
  {
    id: "vf-03",
    title: "Elysian Onyx Marble Dining Suite",
    category: "Dining Sets",
    price: 34500,
    originalPrice: 42000,
    image: "assets/images/catalog/varsha-prod-03.jpg",
    desc: "Complete composite marble dining set with upholstered chairs and luxury booth seating.",
    badge: "Signature",
    status: "In Stock"
  },
  {
    id: "vf-04",
    title: "Sienna Duo-Tone Dining Chair",
    category: "Dining Chairs",
    price: 4400,
    originalPrice: 5800,
    image: "assets/images/catalog/varsha-prod-04.jpg",
    desc: "Two-tone quilted back dining chair crafted with premium leatherette and steel frame.",
    badge: "Featured",
    status: "In Stock"
  },
  {
    id: "vf-05",
    title: "Carrara 4-Seater Marble Dining Ensemble",
    category: "Dining Sets",
    price: 28900,
    originalPrice: 35000,
    image: "assets/images/catalog/varsha-prod-05.jpg",
    desc: "Polished marble-finish 4-seater dining table paired with four grey leatherette chairs.",
    badge: "Bestseller",
    status: "In Stock"
  },
  {
    id: "vf-06",
    title: "Verona Tufted High-Back Chair",
    category: "Dining Chairs",
    price: 4600,
    originalPrice: 5900,
    image: "assets/images/catalog/varsha-prod-06.jpg",
    desc: "Tall cushioned dining chair featuring diamond-quilted upholstery and black powder-coated legs.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-07",
    title: "Milano Camel Accent Armchair",
    category: "Accent & Lounge",
    price: 4800,
    originalPrice: 6200,
    image: "assets/images/catalog/varsha-prod-07.jpg",
    desc: "Smooth camel-tone upholstered chair with curved barrel back and minimalist metal frame.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-08",
    title: "Napoli Curved Grey Dining Chair",
    category: "Dining Chairs",
    price: 4100,
    originalPrice: 5200,
    image: "assets/images/catalog/varsha-prod-08.jpg",
    desc: "Contemporary curved-back grey leatherette chair designed for hospitality and home dining.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-09",
    title: "Crown Sovereign Dining Chair",
    category: "Dining Chairs",
    price: 4750,
    originalPrice: 6000,
    image: "assets/images/catalog/varsha-prod-09.jpg",
    desc: "Architectural high-density dining chair engineered for lasting comfort and durability.",
    badge: "Exclusive",
    status: "In Stock"
  },
  {
    id: "vf-10",
    title: "Vanguard Executive Duo Office Chair",
    category: "Executive Chairs",
    price: 11800,
    originalPrice: 15000,
    image: "assets/images/catalog/varsha-prod-10.jpg",
    desc: "High-back ergonomic executive chair with chrome finish accents and heavy-duty swivel base.",
    badge: "Top Rated",
    status: "In Stock"
  },
  {
    id: "vf-11",
    title: "Regent Mid-Back Workstation Chair",
    category: "Ergonomic Workstations",
    price: 7800,
    originalPrice: 9800,
    image: "assets/images/catalog/varsha-prod-11.jpg",
    desc: "Supportive mid-back ergonomic task chair with pneumatic height adjustment and smooth casters.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-12",
    title: "Apex Dual-Tone Boss Chair",
    category: "Executive Chairs",
    price: 12500,
    originalPrice: 16000,
    image: "assets/images/catalog/varsha-prod-12.jpg",
    desc: "Dual-tone luxury boss chair with integrated lumbar support and polished chrome armrests.",
    badge: "Signature",
    status: "In Stock"
  },
  {
    id: "vf-13",
    title: "Capri Low-Back Task Chair",
    category: "Ergonomic Workstations",
    price: 6900,
    originalPrice: 8900,
    image: "assets/images/catalog/varsha-prod-13.jpg",
    desc: "Compact professional task chair built with reinforced steel mechanism and padded cushions.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-14",
    title: "Senator High-Back Director Chair",
    category: "Executive Chairs",
    price: 13200,
    originalPrice: 17500,
    image: "assets/images/catalog/varsha-prod-14.jpg",
    desc: "Plush multi-layer cushioned executive chair with synchro-tilt locking mechanism.",
    badge: "Popular",
    status: "In Stock"
  },
  {
    id: "vf-15",
    title: "Blush Diamond Quilted Executive Chair",
    category: "Executive Chairs",
    price: 13800,
    originalPrice: 18000,
    image: "assets/images/catalog/varsha-prod-15.jpg",
    desc: "Rose blush designer high-back chair with diamond quilted backrest and chrome star base.",
    badge: "Designer Pick",
    status: "In Stock"
  },
  {
    id: "vf-16",
    title: "Blush Executive Ergonomic Chair",
    category: "Ergonomic Workstations",
    price: 8900,
    originalPrice: 11500,
    image: "assets/images/catalog/varsha-prod-16.jpg",
    desc: "Contemporary rose-hued office chair with padded armrests and tilt-tension adjustment.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-17",
    title: "Kobe Minimalist Modern Chair",
    category: "Accent & Lounge",
    price: 5200,
    originalPrice: 6800,
    image: "assets/images/catalog/varsha-prod-17.jpg",
    desc: "Sculptural accent armchair with seamless upholstery and industrial powder-coated legs.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-18",
    title: "Imperial Cognac Quilted Chair",
    category: "Executive Chairs",
    price: 14200,
    originalPrice: 18900,
    image: "assets/images/catalog/varsha-prod-18.jpg",
    desc: "Deep-cushioned cognac leatherette director chair with diamond cross-stitching.",
    badge: "Bestseller",
    status: "In Stock"
  },
  {
    id: "vf-19",
    title: "Monarch Director High-Back Armchair",
    category: "Executive Chairs",
    price: 15600,
    originalPrice: 20500,
    image: "assets/images/catalog/varsha-prod-19.jpg",
    desc: "Heavy-duty executive boardroom chair with reinforced steel core and premium upholstery.",
    badge: "Premium",
    status: "In Stock"
  },
  {
    id: "vf-20",
    title: "Jade Mint Curved Accent Chair",
    category: "Accent & Lounge",
    price: 4900,
    originalPrice: 6500,
    image: "assets/images/catalog/varsha-prod-20.jpg",
    desc: "Pastel jade bucket armchair with tailored rear diamond quilting and black metal legs.",
    badge: "New Arrival",
    status: "In Stock"
  },
  {
    id: "vf-21",
    title: "Artisan Ochre Velvet Accent Chair",
    category: "Accent & Lounge",
    price: 5100,
    originalPrice: 6600,
    image: "assets/images/catalog/varsha-prod-21.jpg",
    desc: "Vibrant ochre-yellow dining accent chair with curved ergonomic shell and slim legs.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-22",
    title: "Nordic Grey Leatherette Chair",
    category: "Dining Chairs",
    price: 3950,
    originalPrice: 5200,
    image: "assets/images/catalog/varsha-prod-22.jpg",
    desc: "Clean Scandinavian-style upholstered chair built for residential dining and cafes.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-23",
    title: "Moda Taupe Contoured Chair",
    category: "Dining Chairs",
    price: 4300,
    originalPrice: 5600,
    image: "assets/images/catalog/varsha-prod-23.jpg",
    desc: "Warm taupe dining armchair designed with reinforced joint fittings and soft upholstery.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-24",
    title: "Torino Slate Grey Dining Chair",
    category: "Dining Chairs",
    price: 4150,
    originalPrice: 5400,
    image: "assets/images/catalog/varsha-prod-24.jpg",
    desc: "Refined slate grey side chair featuring precision stitching and floor-protective glides.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-25",
    title: "Aura Two-Tone Tan Office Chair",
    category: "Ergonomic Workstations",
    price: 8400,
    originalPrice: 10800,
    image: "assets/images/catalog/varsha-prod-25.jpg",
    desc: "Contemporary work chair featuring dual-tone leatherette upholstery and chrome star base.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-26",
    title: "Presidential Teak-Trim High Back",
    category: "Executive Chairs",
    price: 16800,
    originalPrice: 22000,
    image: "assets/images/catalog/varsha-prod-26.jpg",
    desc: "Luxury executive throne chair with solid teak finished arm accents and high-density foam.",
    badge: "Signature",
    status: "In Stock"
  },
  {
    id: "vf-27",
    title: "Dynasty Classic Boss Chair",
    category: "Executive Chairs",
    price: 14900,
    originalPrice: 19500,
    image: "assets/images/catalog/varsha-prod-27.jpg",
    desc: "Spacious executive high-back chair with multi-stage locking mechanism and plush arm pads.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-28",
    title: "Zenith Ergonomic Workstation Chair",
    category: "Ergonomic Workstations",
    price: 7600,
    originalPrice: 9900,
    image: "assets/images/catalog/varsha-prod-28.jpg",
    desc: "Sturdy task chair engineered with lumbar contouring and Class-4 hydraulic gas lift.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-29",
    title: "Matrix High-Profile Swivel Chair",
    category: "Executive Chairs",
    price: 13500,
    originalPrice: 17800,
    image: "assets/images/catalog/varsha-prod-29.jpg",
    desc: "Modern executive swivel chair equipped with nylon dual-wheel casters and tilt-lock.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-30",
    title: "Titan Two-Tone Office Chair",
    category: "Executive Chairs",
    price: 11900,
    originalPrice: 15500,
    image: "assets/images/catalog/varsha-prod-30.jpg",
    desc: "Black and beige duo-tone ergonomic executive chair with wrapped base and cushioned arms.",
    badge: "Value Pick",
    status: "In Stock"
  },
  {
    id: "vf-31",
    title: "Solstice Studio Executive Chair",
    category: "Executive Chairs",
    price: 16200,
    originalPrice: 21000,
    image: "assets/images/catalog/varsha-prod-31.jpg",
    desc: "Editorial studio high-back chair with dual-density headrest and polished chrome armature.",
    badge: "Bestseller",
    status: "In Stock"
  },
  {
    id: "vf-32",
    title: "Sovereign Brown Leather Boss Chair",
    category: "Executive Chairs",
    price: 15800,
    originalPrice: 20800,
    image: "assets/images/catalog/varsha-prod-32.jpg",
    desc: "Hand-stitched brown leatherette director chair with deep lumbar channel quilting.",
    badge: "Exclusive",
    status: "In Stock"
  },
  {
    id: "vf-33",
    title: "Onyx Duo Executive Task Chair",
    category: "Ergonomic Workstations",
    price: 8200,
    originalPrice: 10500,
    image: "assets/images/catalog/varsha-prod-33.jpg",
    desc: "Ergonomic office chair with reinforced polymer armrests and smooth pneumatic adjustment.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-34",
    title: "Meridian Grey Mesh & Leather Chair",
    category: "Ergonomic Workstations",
    price: 9400,
    originalPrice: 12200,
    image: "assets/images/catalog/varsha-prod-34.jpg",
    desc: "Breathable ergonomic high-back task chair engineered for long working hours.",
    badge: "Popular",
    status: "In Stock"
  },
  {
    id: "vf-35",
    title: "Vintage Oak Accent Dining Chair",
    category: "Dining Chairs",
    price: 4500,
    originalPrice: 5800,
    image: "assets/images/catalog/varsha-prod-35.jpg",
    desc: "Curved profile upholstered dining chair with durable inner hardwood frame.",
    badge: "",
    status: "In Stock"
  },
  {
    id: "vf-36",
    title: "Signature Teal & Wood Executive Chair",
    category: "Executive Chairs",
    price: 17500,
    originalPrice: 23000,
    image: "assets/images/catalog/varsha-prod-36.jpg",
    desc: "Statement teal leatherette executive chair with solid wood lacquered arms and chrome base.",
    badge: "Masterpiece",
    status: "In Stock"
  }
];

// Key used for browser storage of catalog edits
const VF_STORAGE_KEY = 'varsha_furniture_catalog';

/**
 * Returns current catalog data. If changes have been saved in this browser's
 * localStorage, those are loaded. Otherwise, defaults to the factory catalog.
 */
function getVarshaProducts() {
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(VF_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    }
  } catch (err) {
    console.warn('Could not read saved Varsha Furniture catalog from localStorage:', err);
  }
  return VARSHA_DEFAULT_PRODUCTS;
}

// Active catalog reference used by storefront and admin
let VARSHA_PRODUCTS = getVarshaProducts();

if (typeof module !== "undefined") {
  module.exports = { VARSHA_PRODUCTS, VARSHA_DEFAULT_PRODUCTS, getVarshaProducts, VF_STORAGE_KEY };
}
