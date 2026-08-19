import React from 'react';
import { Heart } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { MOCK_PRODUCTS } from '../../data/mockData';
import { ProductCard } from '../product/ProductCard';

export const WishlistView: React.FC = () => {
  const { wishlist, navigateTo } = useShop();

  const savedProducts = MOCK_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="space-y-6">
      {savedProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
          <div className="w-16 h-16 rounded-full bg-[#412D15]/10 dark:bg-gray-800 text-[#412D15] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-base">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Tap the heart icon on any product to save it here.
            </p>
          </div>
          <button
            onClick={() => navigateTo('home')}
            className="px-6 py-2.5 bg-[#412D15] text-[#E1DCC9] rounded-xl text-xs font-bold shadow-md hover:bg-[#1F150C] transition-colors"
          >
            Explore Trending Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {savedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};
