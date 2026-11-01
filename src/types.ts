export type CategoryType = 'MATTRESSES' | 'SLEEP ACCESSORIES' | 'OTHER PRODUCTS';

export interface Product {
  id: string;
  title: string;
  category: CategoryType;
  subCategory: string;
  basePrice: number;
  originalPrice: number;
  firmness: string;
  material: string;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  warrantyYears: number;
  trialNights: number;
  images: string[];
  description: string;
  benefits?: string[];
  specifications?: Record<string, string>;
  inStock?: boolean;
}

export interface CartItem {
  cartKey: string;
  product: Product;
  size: string;
  thickness: string;
  unitPrice: number;
  qty: number;
  isCustom?: boolean;
  customDetails?: {
    lengthInches: number;
    widthInches: number;
    thicknessInches: number;
    cornerType: string;
    estimatedWeightKg?: number;
    estimatedWeightLbs?: number;
  };
}

export interface Address {
  name: string;
  mobile: string;
  email: string;
  houseNo: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  gstAmount: number;
  shippingFee: number;
  couponDiscount: number;
  couponCode?: string;
  address: Address;
  paymentMethod: string;
  date: string;
  status: 'CONFIRMED' | 'DISPATCHED' | 'IN_TRANSIT' | 'DELIVERED';
  awbNumber: string;
  courierPartner: string;
}

export interface PincodeInfo {
  city: string;
  state: string;
  days: number;
  cod: boolean;
  unserviceable?: boolean;
}
