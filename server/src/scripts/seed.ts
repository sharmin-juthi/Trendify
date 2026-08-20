import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from '../config/db';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { User } from '../models/User';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const CATEGORIES = [
  { name: 'Backpacks', slug: 'backpacks', iconName: 'Package', itemCount: 120, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80' },
  { name: 'Headphones', slug: 'headphones', iconName: 'Headphones', itemCount: 150, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80' },
  { name: 'Watches', slug: 'watches', iconName: 'Watch', itemCount: 80, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80' },
  { name: 'Wallets', slug: 'wallets', iconName: 'CreditCard', itemCount: 90, imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=300&q=80' },
  { name: 'Gaming', slug: 'gaming', iconName: 'Gamepad2', itemCount: 110, imageUrl: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=300&q=80' },
  { name: 'Sunglasses', slug: 'sunglasses', iconName: 'Glasses', itemCount: 70, imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=80' },
  { name: 'Travel', slug: 'travel', iconName: 'Briefcase', itemCount: 60, imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=300&q=80' },
  { name: 'Accessories', slug: 'accessories', iconName: 'Grid', itemCount: 200, imageUrl: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=300&q=80' }
];

const PRODUCTS = [
  {
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
    stock: 35,
    isFlashSale: true,
    isFeatured: true,
    description: 'Active Noise Cancellation with Transparency mode, Personalized Spatial Audio, and MagSafe Charging Case for immersive studio sound.'
  },
  {
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
    stock: 20,
    isFlashSale: true,
    isFeatured: true,
    description: 'Rotating bezel styling, advanced sleep coaching, BIA body composition sensor, and durable Sapphire Crystal glass display.'
  },
  {
    name: 'Classic Heritage Backpack',
    slug: 'classic-heritage-backpack',
    category: 'Backpacks',
    categorySlug: 'backpacks',
    brand: 'Herschel',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    price: 64.99,
    originalPrice: 85.00,
    discountPercent: 24,
    rating: 4.7,
    reviewCount: 520,
    stock: 45,
    isFlashSale: false,
    isFeatured: true,
    description: 'Durable 600D fabric, 15-inch padded laptop sleeve, key clip, and signature striped fabric liner.'
  },
  {
    name: 'Mechanical RGB Keyboard',
    slug: 'mechanical-rgb-keyboard',
    category: 'Gaming',
    categorySlug: 'gaming',
    brand: 'Keychron',
    images: [
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80'
    ],
    price: 99.00,
    originalPrice: 129.00,
    discountPercent: 23,
    rating: 4.9,
    reviewCount: 630,
    stock: 18,
    isFlashSale: true,
    isFeatured: true,
    description: 'Wireless mechanical keyboard with hot-swappable tactile switches, South-facing RGB lighting, and Mac/Windows compatibility.'
  },
  {
    name: 'Sony WH-1000XM5 Noise-Canceling Headphones',
    slug: 'sony-wh-1000xm5',
    category: 'Headphones',
    categorySlug: 'headphones',
    brand: 'Sony',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    price: 348.00,
    originalPrice: 399.00,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 2150,
    stock: 14,
    isFlashSale: true,
    isFeatured: true,
    description: 'Industry-leading noise canceling with two processors and 8 microphones for unparalleled clarity and 30-hour battery life.'
  },
  {
    name: 'Leather Minimalist Bifold Wallet',
    slug: 'leather-minimalist-wallet',
    category: 'Wallets',
    categorySlug: 'wallets',
    brand: 'Bellroy',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'
    ],
    price: 79.00,
    originalPrice: 99.00,
    discountPercent: 20,
    rating: 4.6,
    reviewCount: 310,
    stock: 30,
    isFlashSale: false,
    isFeatured: true,
    description: 'Premium environmentally certified leather, RFID protection, holds 4-12 cards with flat bill section.'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🧹 Clearing existing database collections...');
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});

    console.log('🌱 Seeding Categories...');
    await Category.insertMany(CATEGORIES);

    console.log('🌱 Seeding Products...');
    await Product.insertMany(PRODUCTS);

    console.log('🌱 Seeding Default Demo User...');
    await User.create({
      name: 'Sharmin Juthi',
      email: 'demo@trendify.com',
      password: 'password123',
      role: 'user',
      addresses: [
        {
          street: '742 Evergreen Terrace',
          city: 'Springfield',
          state: 'OR',
          zipCode: '97477',
          country: 'United States',
          isDefault: true
        }
      ]
    });

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
