import type { Product, Category, Coupon, User, NotificationItem, Order } from '../types';

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Backpacks', slug: 'backpacks', iconName: 'Package', color: 'bg-blue-50 text-blue-600', itemCount: 120 },
  { id: 'cat-2', name: 'Headphones', slug: 'headphones', iconName: 'Headphones', color: 'bg-orange-50 text-[#412D15]', itemCount: 150 },
  { id: 'cat-3', name: 'Watches', slug: 'watches', iconName: 'Watch', color: 'bg-slate-100 text-[#1F150C]', itemCount: 80 },
  { id: 'cat-4', name: 'Wallets', slug: 'wallets', iconName: 'CreditCard', color: 'bg-amber-50 text-amber-600', itemCount: 90 },
  { id: 'cat-5', name: 'Gaming', slug: 'gaming', iconName: 'Gamepad2', color: 'bg-rose-50 text-rose-600', itemCount: 110 },
  { id: 'cat-6', name: 'Sunglasses', slug: 'sunglasses', iconName: 'Glasses', color: 'bg-emerald-50 text-emerald-600', itemCount: 70 },
  { id: 'cat-7', name: 'Travel', slug: 'travel', iconName: 'Briefcase', color: 'bg-cyan-50 text-cyan-600', itemCount: 60 },
  { id: 'cat-8', name: 'Accessories', slug: 'accessories', iconName: 'Grid', color: 'bg-gray-100 text-gray-700', itemCount: 200 },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-airpods',
    name: 'AirPods Pro 2',
    slug: 'airpods-pro-2',
    category: 'Headphones',
    categorySlug: 'headphones',
    brand: 'Apple',
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=800&q=80'
    ],
    price: 189.00,
    originalPrice: 239.00,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 1248,
    colors: ['#FFFFFF', '#111827'],
    stock: 35,
    isFlashSale: true,
    isBestSeller: true,
    description: 'Active Noise Cancellation with Transparency mode, Personalized Spatial Audio, and MagSafe Charging Case for immersive studio sound.',
    createdAt: '2026-08-01T10:00:00Z'
  },
  {
    id: 'prod-watch6',
    name: 'Galaxy Watch 6 Classic',
    slug: 'galaxy-watch-6-classic',
    category: 'Watches',
    categorySlug: 'watches',
    brand: 'Samsung',
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    ],
    price: 299.00,
    originalPrice: 349.00,
    discountPercent: 15,
    rating: 4.8,
    reviewCount: 892,
    colors: ['#111827', '#E5E7EB'],
    stock: 20,
    isFlashSale: true,
    isBestSeller: true,
    description: 'Rotating bezel styling, advanced sleep coaching, BIA body composition sensor, and durable Sapphire Crystal glass display.',
    createdAt: '2026-08-05T12:00:00Z'
  },
  {
    id: 'prod-backpack',
    name: 'Classic Backpack',
    slug: 'classic-backpack',
    category: 'Backpacks',
    categorySlug: 'backpacks',
    brand: 'Herschel',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    price: 89.00,
    rating: 4.7,
    reviewCount: 664,
    colors: ['#111827', '#78350F', '#1E3A8A'],
    stock: 45,
    isNewArrival: true,
    description: 'Timeless silhouette featuring signature striped fabric liner, 15-inch padded laptop sleeve, and front storage pocket with key clip.',
    createdAt: '2026-08-10T09:00:00Z'
  },
  {
    id: 'prod-sony-wh',
    name: 'WH-1000XM5 Headphones',
    slug: 'wh-1000xm5-headphones',
    category: 'Headphones',
    categorySlug: 'headphones',
    brand: 'Sony',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    price: 299.00,
    originalPrice: 369.00,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 1365,
    colors: ['#111827', '#D1D5DB'],
    stock: 18,
    isFlashSale: true,
    isBestSeller: true,
    description: 'Industry-leading noise canceling with two processors and 8 microphones. Crystal clear hands-free calling with precise voice pickup.',
    createdAt: '2026-08-12T14:00:00Z'
  },
  {
    id: 'prod-jbl-go3',
    name: 'Go 3 Portable Bluetooth Speaker',
    slug: 'go-3-speaker',
    category: 'Audio',
    categorySlug: 'headphones',
    brand: 'JBL',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80'
    ],
    price: 49.00,
    rating: 4.8,
    reviewCount: 2365,
    colors: ['#111827', '#DC2626', '#2563EB'],
    stock: 60,
    isNewArrival: true,
    description: 'JBL Pro Sound delivers surprisingly big audio and punchy bass from Go 3’s ultra-compact size with IP67 waterproof construction.',
    createdAt: '2026-08-15T11:00:00Z'
  },
  {
    id: 'prod-keychron',
    name: 'K2 Wireless Mechanical Keyboard',
    slug: 'k2-keyboard',
    category: 'Gaming',
    categorySlug: 'gaming',
    brand: 'Keychron',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
    ],
    price: 89.00,
    rating: 4.9,
    reviewCount: 892,
    colors: ['#1F2937'],
    stock: 25,
    isNewArrival: true,
    description: 'Tactile Gateron switches, Mac & Windows compatibility, Bluetooth 5.1 multi-device connectivity, and RGB backlight.',
    createdAt: '2026-08-16T15:00:00Z'
  },
  {
    id: 'prod-fossil-gen6',
    name: 'Gen 6 Touchscreen Smartwatch',
    slug: 'gen-6-smartwatch',
    category: 'Watches',
    categorySlug: 'watches',
    brand: 'Fossil',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    price: 199.00,
    rating: 4.7,
    reviewCount: 785,
    colors: ['#111827', '#78350F'],
    stock: 19,
    isNewArrival: true,
    description: 'Powered with Snapdragon Wear 4100+ platform for 30% faster performance. Fast charging up to 80% in 30 minutes.',
    createdAt: '2026-08-13T10:00:00Z'
  }
];

export const MOCK_COUPONS: Coupon[] = [
  {
    id: 'c-1',
    code: 'SUMMER50',
    discountType: 'percent',
    discountValue: 15,
    minOrderValue: 50,
    expiryDate: '2026-09-30',
    description: 'Get 15% OFF on orders over $50'
  },
  {
    id: 'c-2',
    code: 'WELCOME10',
    discountType: 'fixed',
    discountValue: 10,
    minOrderValue: 30,
    expiryDate: '2026-12-31',
    description: '$10 OFF your first order over $30'
  }
];

export const MOCK_USER: User = {
  id: 'usr-101',
  name: 'Alina Putri',
  email: 'alina.putri@trendify.com',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  wishlist: [],
  addresses: [
    {
      id: 'addr-1',
      label: 'Home',
      street: '124 Design Avenue, Apt 4B',
      city: 'San Francisco',
      postalCode: '94107',
      country: 'United States',
      isDefault: true
    }
  ]
};

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Order Shipped! 📦',
    message: 'Your order #ACC-92810 with AirPods Pro 2 is on the way.',
    time: '5 mins ago',
    isRead: false,
    type: 'order'
  },
  {
    id: 'n-2',
    title: 'Flash Sale Live 🔥',
    message: 'Save up to 70% off on Sony Headphones & Keychron keyboards.',
    time: '1 hour ago',
    isRead: false,
    type: 'promo'
  }
];

export const MOCK_ORDERS: Order[] = [];
