import { Product, PincodeInfo } from '../types';
import { PRODUCT_IMAGES } from './productImages';

export const PINCODE_DIRECTORY: Record<string, PincodeInfo> = {
  '110001': { city: 'Connaught Place, New Delhi', state: 'Delhi', days: 2, cod: true },
  '400001': { city: 'Fort, Mumbai', state: 'Maharashtra', days: 2, cod: true },
  '560001': { city: 'M.G. Road, Bengaluru', state: 'Karnataka', days: 2, cod: true },
  '600001': { city: 'George Town, Chennai', state: 'Tamil Nadu', days: 3, cod: true },
  '700001': { city: 'BBD Bagh, Kolkata', state: 'West Bengal', days: 3, cod: true },
  '500001': { city: 'Abids, Hyderabad', state: 'Telangana', days: 2, cod: true },
  '380001': { city: 'Bhadra, Ahmedabad', state: 'Gujarat', days: 3, cod: true },
  '302001': { city: 'Pink City, Jaipur', state: 'Rajasthan', days: 3, cod: true },
  '226001': { city: 'Hazratganj, Lucknow', state: 'Uttar Pradesh', days: 3, cod: true },
  '411001': { city: 'Camp, Pune', state: 'Maharashtra', days: 2, cod: true },
  '682001': { city: 'Ernakulam, Kochi', state: 'Kerala', days: 3, cod: true },
  '160017': { city: 'Sector 17, Chandigarh', state: 'Punjab', days: 2, cod: true },
  '462001': { city: 'Arera Hills, Bhopal', state: 'Madhya Pradesh', days: 3, cod: true },
  '781001': { city: 'Pan Bazaar, Guwahati', state: 'Assam', days: 4, cod: false },
  '800001': { city: 'Frazer Road, Patna', state: 'Bihar', days: 3, cod: true },
  '201301': { city: 'Sector 18, Noida', state: 'Uttar Pradesh', days: 1, cod: true },
  '122001': { city: 'Cyber City, Gurugram', state: 'Haryana', days: 1, cod: true }
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'sm-ortho-01',
    title: 'SpineAlign Pro 5-Zone Orthopedic Mattress',
    category: 'MATTRESSES',
    subCategory: 'Orthopedic Mattress',
    basePrice: 14999,
    originalPrice: 22999,
    firmness: 'Firm',
    material: 'High-Density Bonded Foam + Memory Foam Cushioning',
    rating: 4.9,
    reviewCount: 684,
    isBestSeller: true,
    isNew: false,
    warrantyYears: 10,
    trialNights: 100,
    inStock: true,
    images: [
      PRODUCT_IMAGES.orthoSpinealign,
      PRODUCT_IMAGES.hero
    ],
    description: 'Clinically calibrated spine support with 5 distinct ergonomic zones that adjust to the natural contours of your cervical, thoracic, and lumbar spine.',
    benefits: [
      'Doctor & Physiotherapist Recommended for Lower Back Pain',
      'Advanced 5-Zone Pressure Distribution System',
      'Anti-Sagging High-Density Orthopedic Bonded Core',
      'Breathable Anti-Microbial Quilted Knitted Fabric'
    ],
    specifications: {
      'Core Material': 'High Density Rebonded Foam + Visco Elastic Foam',
      'Firmness Grade': '7.5 / 10 (Firm Support)',
      'Cover Material': '350 GSM Organic Knitted Fabric with Quilted Foam',
      'Certification': 'OEKO-TEX Standard 100 & ISO 9001:2015',
      'Dispatch Time': '24-48 Hours from Regional Fulfillment Hub'
    }
  },
  {
    id: 'sm-latex-02',
    title: 'Eco-Pure 100% Natural Dunlop Latex Mattress',
    category: 'MATTRESSES',
    subCategory: 'Latex Mattress',
    basePrice: 22499,
    originalPrice: 34999,
    firmness: 'Medium Soft',
    material: '100% Organic Pincore Tree Latex',
    rating: 4.8,
    reviewCount: 392,
    isBestSeller: true,
    isNew: true,
    warrantyYears: 12,
    trialNights: 100,
    inStock: true,
    images: [
      PRODUCT_IMAGES.naturalLatex,
      PRODUCT_IMAGES.pocketSpring
    ],
    description: 'Harvested from sustainably farmed rubber trees, this 100% natural latex mattress offers resilient, buoyant comfort with zero synthetic off-gassing and pin-core air channels.',
    benefits: [
      '100% Biodegradable & Chemical-Free Natural Tree Latex',
      'Thousands of Pincore Air Channels for Constant Cooling',
      'Natural Allergen, Dust Mite, and Mold Resistance',
      'Instant Responsive Bounce without Partner Disturbance'
    ],
    specifications: {
      'Core Material': '100% Certified Dunlop Natural Rubber Latex',
      'Firmness Grade': '5.5 / 10 (Balanced Responsive Soft)',
      'Cover Material': 'Organic GOTS-Certified Cotton Zipper Cover',
      'Certification': 'eco-INSTITUT & GOLS Certified',
      'Dispatch Time': '48 Hours Express Transit'
    }
  },
  {
    id: 'sm-pocket-03',
    title: 'Zero Partner Disturbance Pocket Spring Mattress',
    category: 'MATTRESSES',
    subCategory: 'Pocket Spring Mattress',
    basePrice: 17999,
    originalPrice: 27999,
    firmness: 'Medium Firm',
    material: 'Individually Encased Carbon-Steel Coils + Euro Top Foam',
    rating: 4.7,
    reviewCount: 518,
    isBestSeller: false,
    isNew: true,
    warrantyYears: 10,
    trialNights: 100,
    inStock: true,
    images: [
      PRODUCT_IMAGES.pocketSpring,
      PRODUCT_IMAGES.hero
    ],
    description: 'Each carbon-steel coil is individually wrapped in non-woven fabric pockets, ensuring targeted local support and absolute zero motion transfer across the bed.',
    benefits: [
      'Independent Motion Isolation - Sleep Peaceful When Partner Moves',
      'Reinforced High-Gauge Perimeter Edge Guard',
      'Plush Euro-Top Quilted Layer for Hotel-Like Cloud Comfort',
      'Anti-Roll Off Foam Encasing Technology'
    ],
    specifications: {
      'Core Material': 'Tempered High-Tensile Pocket Spring Coils (800+ count)',
      'Firmness Grade': '6.5 / 10 (Medium Firm Hotel Plush)',
      'Cover Material': 'Luxury Jacquard Damask with Bamboo Charcoal Infusion',
      'Certification': 'ISO 9001:2015 Quality Verified',
      'Dispatch Time': '24-48 Hours'
    }
  },
  {
    id: 'sm-dual-04',
    title: 'Flip-Dual Comfort Reversible 2-in-1 Mattress',
    category: 'MATTRESSES',
    subCategory: 'Dual Comfort Mattress',
    basePrice: 10999,
    originalPrice: 16999,
    firmness: 'Dual (Soft / Hard)',
    material: 'Ultra-Resilient High Density Foam + Soft PU Foam',
    rating: 4.8,
    reviewCount: 724,
    isBestSeller: true,
    isNew: false,
    warrantyYears: 7,
    trialNights: 100,
    inStock: true,
    images: [
      PRODUCT_IMAGES.orthoSpinealign,
      PRODUCT_IMAGES.naturalLatex
    ],
    description: 'Experience the freedom of choice in one mattress. One side is soft and cloud-like for plush sleeping; flip it over for a firm, orthotropic spine alignment surface.',
    benefits: [
      'Two Comfort Levels in a Single Mattress - Simply Flip Over',
      'Soft Side: Gentle Cloud Support for Side Sleepers',
      'Firm Side: Sturdy Ortho Support for Back & Stomach Sleepers',
      'Ultra-Light Core for Easy Seasonal Flipping'
    ],
    specifications: {
      'Core Material': 'Dual Sided High-Resilience PU Foam Combination',
      'Firmness Grade': 'Side A: 4/10 (Soft) | Side B: 7.5/10 (Firm)',
      'Cover Material': 'Dual-Tone Breathable Knitted Fabric',
      'Certification': 'CertiPUR-US Foam Standards',
      'Dispatch Time': 'Same Day Dispatch Available'
    }
  },
  {
    id: 'sm-memory-05',
    title: 'AeroGel Cooling Memory Foam Mattress',
    category: 'MATTRESSES',
    subCategory: 'Memory Foam Mattress',
    basePrice: 15499,
    originalPrice: 23999,
    firmness: 'Medium Soft',
    material: 'Cooling Gel-Infused Memory Foam + HR Support Core',
    rating: 4.9,
    reviewCount: 412,
    isBestSeller: false,
    isNew: true,
    warrantyYears: 10,
    trialNights: 100,
    inStock: true,
    images: [
      PRODUCT_IMAGES.memoryCooling,
      PRODUCT_IMAGES.hero
    ],
    description: 'Infused with millions of thermal-regulating cooling gel beads that dissipate body heat throughout humid Indian summers while gently hugging your body contours.',
    benefits: [
      'Thermal Phase Change Cooling Technology',
      'Zero Pressure Points on Shoulders, Hips, and Knees',
      'Conforms to Your Exact Body Temperature and Weight',
      'Removable & Machine Washable Breathable Zipper Cover'
    ]
  },
  {
    id: 'sm-coir-06',
    title: 'Natural Coconut Coir Ortho Balance Mattress',
    category: 'MATTRESSES',
    subCategory: 'Coir Mattress',
    basePrice: 8999,
    originalPrice: 13999,
    firmness: 'Hard',
    material: 'Rubberised Coconut Coir + High Density PU Foam',
    rating: 4.6,
    reviewCount: 341,
    isBestSeller: false,
    isNew: false,
    warrantyYears: 5,
    trialNights: 100,
    inStock: true,
    images: [
      PRODUCT_IMAGES.orthoSpinealign
    ],
    description: 'Traditional solid Indian firmness engineered with natural organic coconut coir fibers bonded with natural rubber for ultimate breathability and rigid spine support.'
  },
  {
    id: 'sm-spring-07',
    title: 'Bonnell High-Tensile Spring Bounce Mattress',
    category: 'MATTRESSES',
    subCategory: 'Spring Mattress',
    basePrice: 12499,
    originalPrice: 18999,
    firmness: 'Medium Firm',
    material: 'Hourglass Bonnell Steel Springs + High-Density Foam',
    rating: 4.5,
    reviewCount: 289,
    isBestSeller: false,
    isNew: false,
    warrantyYears: 7,
    trialNights: 100,
    inStock: true,
    images: [
      PRODUCT_IMAGES.pocketSpring,
      PRODUCT_IMAGES.hero
    ],
    description: 'Durable hourglass Bonnell spring interconnecting system providing long-lasting buoyant resilience and robust edge seating support.'
  },
  {
    id: 'sm-recovery-08',
    title: 'Active Recovery Athletic Ergonomic Mattress',
    category: 'MATTRESSES',
    subCategory: 'Active Recovery Mattress',
    basePrice: 24999,
    originalPrice: 38999,
    firmness: 'Medium Firm',
    material: 'Cellular Copper-Infused Foam + Natural Latex Layer',
    rating: 4.9,
    reviewCount: 198,
    isBestSeller: false,
    isNew: true,
    warrantyYears: 10,
    trialNights: 100,
    inStock: true,
    images: [
      PRODUCT_IMAGES.memoryCooling,
      PRODUCT_IMAGES.naturalLatex
    ],
    description: 'Engineered for athletes and active lifestyles. Copper ions promote micro-circulation and muscle recovery while you sleep.'
  },
  {
    id: 'sm-kids-09',
    title: 'Sprout Pediatric Gentle Spine Kids Mattress',
    category: 'MATTRESSES',
    subCategory: 'Kids Mattress',
    basePrice: 7999,
    originalPrice: 11999,
    firmness: 'Medium Soft',
    material: 'Non-Toxic Chemical-Free Organic Foam',
    rating: 4.9,
    reviewCount: 310,
    isBestSeller: false,
    isNew: false,
    warrantyYears: 5,
    trialNights: 100,
    inStock: true,
    images: [
      PRODUCT_IMAGES.naturalLatex
    ],
    description: 'Specifically engineered for growing bone structures. Hypoallergenic, zero fiberglass, and 100% waterproof organic washable protective top.'
  },
  {
    id: 'sm-pediatric-10',
    title: 'Crib & Toddler Breathable Pediatric Mattress',
    category: 'MATTRESSES',
    subCategory: 'Pediatric Mattress',
    basePrice: 6499,
    originalPrice: 9499,
    firmness: 'Firm',
    material: 'Food-Grade Polymer Mesh + Organic Cotton',
    rating: 4.9,
    reviewCount: 175,
    isBestSeller: false,
    isNew: true,
    warrantyYears: 5,
    trialNights: 100,
    inStock: true,
    images: [
      PRODUCT_IMAGES.naturalLatex
    ],
    description: 'Pediatrician certified anti-suffocation porous air core. 100% washable from inside out with running water.'
  },
  {
    id: 'sm-pillow-cervical',
    title: 'Ergonomic Cervical Spine Relief Contour Pillow',
    category: 'SLEEP ACCESSORIES',
    subCategory: 'Cervical Pillows',
    basePrice: 1899,
    originalPrice: 2999,
    firmness: 'Medium Firm',
    material: 'Pressure-Relief Molded Visco Foam + Bamboo Cover',
    rating: 4.8,
    reviewCount: 945,
    isBestSeller: true,
    isNew: false,
    warrantyYears: 2,
    trialNights: 30,
    inStock: true,
    images: [
      PRODUCT_IMAGES.cervicalPillow
    ],
    description: 'Dual-height ergonomic cervical curve designed to support neck curvature, eliminate morning stiffness, and open airways to reduce snoring.'
  },
  {
    id: 'sm-pillow-latex',
    title: 'Natural Breathable Pincore Latex Pillow',
    category: 'SLEEP ACCESSORIES',
    subCategory: 'Latex Pillows',
    basePrice: 2199,
    originalPrice: 3499,
    firmness: 'Medium Soft',
    material: '100% Natural Dunlop Latex Core',
    rating: 4.9,
    reviewCount: 480,
    isBestSeller: true,
    isNew: false,
    warrantyYears: 3,
    trialNights: 30,
    inStock: true,
    images: [
      PRODUCT_IMAGES.cervicalPillow
    ],
    description: 'Instantly responsive bounce with thousands of micro-air channels. Dust-mite resistant and naturally cooling.'
  },
  {
    id: 'sm-prot-waterproof',
    title: '100% Bamboo Waterproof Breathable Mattress Protector',
    category: 'SLEEP ACCESSORIES',
    subCategory: 'Mattress Protectors',
    basePrice: 1299,
    originalPrice: 2199,
    firmness: 'Ultra Soft',
    material: 'Organic Bamboo Terry + Breathable TPU Membrane',
    rating: 4.9,
    reviewCount: 1280,
    isBestSeller: true,
    isNew: false,
    warrantyYears: 3,
    trialNights: 30,
    inStock: true,
    images: [
      PRODUCT_IMAGES.mattressTopper
    ],
    description: 'No plastic crinkle sound! Ultra-soft organic bamboo terry cloth with noiseless 100% waterproof TPU barrier against liquid spills and sweat.'
  },
  {
    id: 'sm-topper-memory',
    title: 'AeroCloud 2-Inch Orthopedic Mattress Topper',
    category: 'SLEEP ACCESSORIES',
    subCategory: 'Mattress Toppers',
    basePrice: 3999,
    originalPrice: 6499,
    firmness: 'Medium Soft',
    material: 'Pure Visco Elastic Memory Foam + Elastic Corner Straps',
    rating: 4.8,
    reviewCount: 612,
    isBestSeller: false,
    isNew: true,
    warrantyYears: 3,
    trialNights: 30,
    inStock: true,
    images: [
      PRODUCT_IMAGES.mattressTopper,
      PRODUCT_IMAGES.hero
    ],
    description: 'Revitalize any old or hard bed frame without replacing the whole mattress. Adds 2 inches of pure pressure-relieving hotel luxury.'
  },
  {
    id: 'sm-bedsheet-sateen',
    title: '400 Thread-Count Egyptian Cotton Sateen Bedsheet Set',
    category: 'SLEEP ACCESSORIES',
    subCategory: 'Bedsheets',
    basePrice: 2499,
    originalPrice: 3999,
    firmness: 'Silky Soft',
    material: '100% Long-Staple Combed Egyptian Cotton',
    rating: 4.7,
    reviewCount: 420,
    isBestSeller: false,
    isNew: false,
    warrantyYears: 1,
    trialNights: 30,
    inStock: true,
    images: [
      PRODUCT_IMAGES.hero
    ],
    description: 'Includes 1 Fitted Fitted Elastic King Bedsheet + 2 Pillow Covers. Silky luminous sateen weave that stays cool and soft with every wash.'
  },
  {
    id: 'sm-sofa-bed',
    title: 'Grandeur Convertible Velvet Luxury Sofa Cum Bed',
    category: 'OTHER PRODUCTS',
    subCategory: 'Sofa Cum Bed',
    basePrice: 21999,
    originalPrice: 34999,
    firmness: 'Medium Firm',
    material: 'Solid Teak Finish Frame + High-Resilience Fold Core',
    rating: 4.8,
    reviewCount: 290,
    isBestSeller: true,
    isNew: true,
    warrantyYears: 5,
    trialNights: 30,
    inStock: true,
    images: [
      PRODUCT_IMAGES.sofaBed
    ],
    description: 'Transforms from a sophisticated 3-seater living room sofa into an expansive plush guest queen bed in under 5 seconds with zero strain.'
  }
];

export const STANDARD_SIZES = [
  { name: 'Single (72 x 36 in)', label: 'Single', dimensions: '72" × 36"', multiplier: 1.0 },
  { name: 'Double (72 x 48 in)', label: 'Double', dimensions: '72" × 48"', multiplier: 1.35 },
  { name: 'Queen (78 x 60 in)', label: 'Queen', dimensions: '78" × 60"', multiplier: 1.65 },
  { name: 'King (78 x 72 in)', label: 'King', dimensions: '78" × 72"', multiplier: 1.95 }
];

export const THICKNESS_OPTIONS = [
  { label: '5 Inch (12.7 cm)', short: '5"', addedPrice: 0, desc: 'Slim ergonomic profile' },
  { label: '6 Inch (15.2 cm)', short: '6"', addedPrice: 2400, desc: 'Most recommended standard' },
  { label: '8 Inch (20.3 cm)', short: '8"', addedPrice: 4800, desc: 'Luxury hotel plushness' },
  { label: '10 Inch (25.4 cm)', short: '10"', addedPrice: 7500, desc: 'Grand suite pillowtop' }
];
