import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface CategoryCard {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  imageUrl: string;
}

const CATEGORIES_WITH_IMAGES: CategoryCard[] = [
  {
    id: 'cat-1',
    name: 'Backpacks',
    slug: 'backpacks',
    itemCount: 120,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-2',
    name: 'Headphones',
    slug: 'headphones',
    itemCount: 150,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-3',
    name: 'Watches',
    slug: 'watches',
    itemCount: 80,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-4',
    name: 'Wallets',
    slug: 'wallets',
    itemCount: 90,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-5',
    name: 'Gaming',
    slug: 'gaming',
    itemCount: 110,
    imageUrl: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-6',
    name: 'Sunglasses',
    slug: 'sunglasses',
    itemCount: 70,
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-7',
    name: 'Travel',
    slug: 'travel',
    itemCount: 60,
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'cat-8',
    name: 'Accessories',
    slug: 'accessories',
    itemCount: 200,
    imageUrl: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=300&q=80',
  },
];

export const CategoryGrid: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="space-y-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-[#1F150C] dark:text-gray-100">
          Shop by Category
        </h2>
        <button
          onClick={() => navigateTo('category', 'all')}
          className="text-xs font-bold text-[#412D15] hover:text-[#1F150C] hover:underline flex items-center gap-1"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 8-Card Grid with Images */}
      <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {CATEGORIES_WITH_IMAGES.map((cat) => {
          return (
            <button
              key={cat.id}
              onClick={() => navigateTo('category', cat.slug)}
              className="group flex flex-col items-center gap-2 p-2 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-[#412D15]/40 hover:shadow-md hover:scale-105 transition-all duration-200"
            >
              {/* Category Image */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden ring-2 ring-transparent group-hover:ring-[#412D15]/40 transition-all">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Name & Count */}
              <div className="text-center">
                <span className="text-[11px] font-bold block leading-tight text-[#1F150C] dark:text-gray-100 group-hover:text-[#412D15] transition-colors">
                  {cat.name}
                </span>
                <span className="text-[10px] font-medium block mt-0.5 text-[#412D15] dark:text-gray-400">
                  {cat.itemCount}+ items
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

