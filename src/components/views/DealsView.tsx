import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { MOCK_PRODUCTS } from '../../data/mockData';
import { ProductCard } from '../product/ProductCard';

export const DealsView: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'under100' | 'big-discount'>('all');

  // Filter products with discounts or special pricing
  const dealProducts = MOCK_PRODUCTS.filter((p) => {
    const isDiscounted = p.originalPrice && p.originalPrice > p.price;
    if (selectedTab === 'under100') return p.price <= 100;
    if (selectedTab === 'big-discount') return isDiscounted && ((p.originalPrice! - p.price) / p.originalPrice!) >= 0.2;
    return isDiscounted || p.price < 150;
  });

  return (
    <div className="space-y-8 select-none">

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${
              selectedTab === 'all'
                ? 'bg-[#1F150C] text-[#E1DCC9] shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            All Hot Deals ({MOCK_PRODUCTS.length})
          </button>
          <button
            onClick={() => setSelectedTab('big-discount')}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${
              selectedTab === 'big-discount'
                ? 'bg-[#1F150C] text-[#E1DCC9] shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            🔥 Big Discounts (20%+ OFF)
          </button>
          <button
            onClick={() => setSelectedTab('under100')}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${
              selectedTab === 'under100'
                ? 'bg-[#1F150C] text-[#E1DCC9] shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            Under $100
          </button>
        </div>

        <p className="text-xs font-bold text-[#412D15] dark:text-[#E1DCC9] flex items-center gap-1.5">
          <Zap className="w-4 h-4 fill-[#412D15] dark:fill-[#E1DCC9]" /> Free Express Shipping on All Deal Orders
        </p>
      </div>

      {/* Product Deals Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {dealProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
