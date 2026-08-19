import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '../../data/mockData';
import { ProductCard } from '../product/ProductCard';

interface BrandInfo {
  name: string;
  tagline: string;
  category: string;
  rating: number;
  logoBg: string;
  description: string;
}

const FEATURED_BRANDS: BrandInfo[] = [
  {
    name: 'Sony',
    tagline: 'World Leader in Noise-Cancelling Audio',
    category: 'Headphones & Audio',
    rating: 4.9,
    logoBg: 'bg-[#1F150C] text-[#E1DCC9]',
    description: 'Pioneering Industry-Leading ANC noise cancellation, crisp hi-res audio drivers, and ergonomic design.'
  },
  {
    name: 'Apple',
    tagline: 'Modern Wearables & Smart Innovation',
    category: 'Smartwatches & Audio',
    rating: 4.9,
    logoBg: 'bg-black text-white',
    description: 'Sleek designs, seamless ecosystem integration, titanium casing, and vibrant Retina displays.'
  },
  {
    name: 'Bose',
    tagline: 'Unmatched Acoustic Precision',
    category: 'Premium Sound Systems',
    rating: 4.8,
    logoBg: 'bg-[#312010] text-[#E1DCC9]',
    description: 'Renowned world-class acoustic engineering with spatial audio and custom sound calibration.'
  },
  {
    name: 'Samsung',
    tagline: 'Next-Gen AMOLED & Fitness Tracking',
    category: 'Smartwatches & Tech',
    rating: 4.7,
    logoBg: 'bg-blue-900 text-white',
    description: 'Advanced health sensors, ECG tracking, durable sapphire crystal glass, and long battery life.'
  },
  {
    name: 'Peak Design',
    tagline: 'Ergonomic Urban Travel Gear',
    category: 'Backpacks & Travel',
    rating: 4.8,
    logoBg: 'bg-amber-900 text-white',
    description: 'Weatherproof recycled materials, magnetic latch systems, and modular expansion compartments.'
  },
  {
    name: 'Anker',
    tagline: 'High-Speed Power & Accessories',
    category: 'Charging & Power',
    rating: 4.9,
    logoBg: 'bg-cyan-800 text-white',
    description: 'GaNPrime fast charging, ultra-durable braided cables, and compact high-capacity power banks.'
  }
];

export const BrandsView: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const filteredProducts = selectedBrand === 'all'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());

  return (
    <div className="space-y-8 select-none">

      {/* Brand Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_BRANDS.map((brand) => (
          <div
            key={brand.name}
            onClick={() => setSelectedBrand(selectedBrand === brand.name ? 'all' : brand.name)}
            className={`bg-white dark:bg-gray-900 rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-sm hover:shadow-lg ${
              selectedBrand === brand.name
                ? 'border-[#1F150C] ring-2 ring-[#1F150C]/20 bg-[#E1DCC9]/20'
                : 'border-gray-100 dark:border-gray-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`px-4 py-2.5 rounded-2xl font-black text-sm tracking-wider ${brand.logoBg}`}>
                {brand.name}
              </div>
              <span className="text-xs font-extrabold text-[#1F150C] dark:text-[#E1DCC9]">
                ★ {brand.rating} Rating
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-gray-900 dark:text-gray-100">
                {brand.tagline}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                {brand.description}
              </p>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-bold text-[#412D15] dark:text-[#E1DCC9]">
              <span>{selectedBrand === brand.name ? 'Showing Products Below ✓' : `View ${brand.name} Gear`}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Brand Products Section */}
      <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#1F150C] dark:text-gray-100">
            {selectedBrand === 'all' ? 'All Brand Products' : `Products by ${selectedBrand}`}
            <span className="text-xs text-gray-500 font-normal ml-2">({filteredProducts.length} items)</span>
          </h2>
          {selectedBrand !== 'all' && (
            <button
              onClick={() => setSelectedBrand('all')}
              className="text-xs font-bold text-[#412D15] hover:underline"
            >
              Show All Brands
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
