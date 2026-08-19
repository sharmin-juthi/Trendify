import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface BentoItem {
  id: string;
  title: string;
  subtitle: string;
  categorySlug: string;
  imageUrl: string;
  tag?: string;
  dark?: boolean;
}

const BENTO_ITEMS: BentoItem[] = [
  {
    id: 'b1',
    title: 'Tech Essentials',
    subtitle: 'Keyboards · Audio · Power',
    categorySlug: 'headphones',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    tag: 'Trending',
    dark: true,
  },
  {
    id: 'b2',
    title: 'Travel Collection',
    subtitle: 'Backpacks · Luggage · Wallets',
    categorySlug: 'backpacks',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    tag: 'New',
  },
  {
    id: 'b3',
    title: 'Smart Wearables',
    subtitle: 'Watches · Fitness Bands',
    categorySlug: 'watches',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    tag: 'Popular',
    dark: true,
  },
  {
    id: 'b4',
    title: 'Gaming Zone',
    subtitle: 'Keyboards · Mice · Headsets',
    categorySlug: 'gaming',
    imageUrl: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80',
    tag: 'Hot Deal',
  },
  {
    id: 'b5',
    title: 'Style & Accessories',
    subtitle: 'Sunglasses · Wallets · Gifts',
    categorySlug: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    tag: 'Exclusive',
    dark: true,
  },
];

export const FeaturedCollections: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="space-y-4 select-none">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-[#1F150C] dark:text-gray-100">
          Featured Collections
        </h2>
        <button
          onClick={() => navigateTo('category', 'all')}
          className="text-xs font-bold text-[#412D15] hover:text-[#1F150C] hover:underline flex items-center gap-1"
        >
          <span>View All Collections</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 5-Panel Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px]">
        {/* Panel 1 — large, spans 2 cols + 2 rows */}
        <BentoCard item={BENTO_ITEMS[0]} className="col-span-2 row-span-2" navigateTo={navigateTo} large />

        {/* Panel 2 — top-right, 1 col × 1 row */}
        <BentoCard item={BENTO_ITEMS[1]} className="col-span-1 row-span-1" navigateTo={navigateTo} />

        {/* Panel 3 — top-right 2nd col, 1 col × 1 row */}
        <BentoCard item={BENTO_ITEMS[2]} className="col-span-1 row-span-1" navigateTo={navigateTo} />

        {/* Panel 4 — bottom-right wide, 2 cols × 1 row */}
        <BentoCard item={BENTO_ITEMS[3]} className="col-span-1 row-span-1" navigateTo={navigateTo} />

        {/* Panel 5 — bottom-right 2nd col */}
        <BentoCard item={BENTO_ITEMS[4]} className="col-span-1 row-span-1" navigateTo={navigateTo} />
      </div>
    </div>
  );
};

interface BentoCardProps {
  item: BentoItem;
  className?: string;
  navigateTo: (view: 'category', slug: string) => void;
  large?: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({ item, className = '', navigateTo, large }) => {
  return (
    <div
      onClick={() => navigateTo('category', item.categorySlug)}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${className}`}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        {/* Tag Badge */}
        {item.tag && (
          <span className="mb-2 self-start inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[10px] font-bold tracking-wider uppercase">
            {item.tag}
          </span>
        )}

        <h3 className={`font-black text-white leading-tight ${large ? 'text-2xl lg:text-3xl' : 'text-base'}`}>
          {item.title}
        </h3>
        <p className={`text-white/70 font-medium mt-0.5 ${large ? 'text-sm' : 'text-xs'}`}>
          {item.subtitle}
        </p>

        {/* CTA */}
        <button
          className={`mt-3 self-start inline-flex items-center gap-1.5 rounded-full bg-[#E1DCC9] text-[#1F150C] font-bold hover:bg-white transition-colors ${
            large ? 'px-5 py-2 text-sm' : 'px-3.5 py-1.5 text-xs'
          }`}
        >
          Shop Now
          <ArrowRight className={large ? 'w-4 h-4' : 'w-3 h-3'} />
        </button>
      </div>
    </div>
  );
};

