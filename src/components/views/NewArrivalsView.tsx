import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { MOCK_PRODUCTS } from '../../data/mockData';
import { ProductCard } from '../product/ProductCard';

export const NewArrivalsView: React.FC = () => {
  const { navigateTo } = useShop();

  // Highlight products marked as new or newly added
  const newProducts = MOCK_PRODUCTS.slice(0, 8);

  return (
    <div className="space-y-8 select-none">
      

      {/* Grid Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-[#1F150C] dark:text-gray-100">
            Latest Additions ({newProducts.length} items)
          </h2>
          <p className="text-xs text-gray-500">Handpicked new arrivals updated weekly</p>
        </div>
        <button
          onClick={() => navigateTo('shop')}
          className="text-xs font-bold text-[#412D15] hover:underline flex items-center gap-1"
        >
          <span>View All Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* New Arrivals Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {newProducts.map((product) => (
          <div key={product.id} className="relative">
            <div className="absolute top-3 left-3 z-10 bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md tracking-wider">
              NEW DROP
            </div>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
