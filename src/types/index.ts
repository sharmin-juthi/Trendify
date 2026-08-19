export interface ProductVariant {
  id: string;
  productId: string;
  size?: string;
  color?: string;
  sku: string;
  stock: number;
  priceOverride?: number;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  brand: string;
  brandLogo?: string;
  images: string[];
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  colors?: string[];
  sizes?: string[];
  stock: number;
  isFlashSale?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  description: string;
  variants?: ProductVariant[];
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  variantId?: string;
  variantDetails?: {
    size?: string;
    color?: string;
  };
  unitPrice: number;
  quantity: number;
  stock: number;
}

export interface Address {
  id: string;
  label: string; // e.g. Home, Work
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  addresses: Address[];
  wishlist: string[]; // product IDs
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  variantText?: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  placedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  expiryDate: string;
  description: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'order' | 'promo' | 'system';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  color: string;
  itemCount: number;
}
