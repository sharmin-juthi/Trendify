import React from 'react';
import { ArrowRight, Headphones, Watch, Backpack, Speaker, Cpu, Gamepad2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../../data/mockData';
import { ProductCard } from '../product/ProductCard';

export const CategoriesView: React.FC = () => {
  const { navigateTo } = useShop();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Headphones':
        return <Headphones className="w-8 h-8 text-[#1F150C]" />;
      case 'Watch':
        return <Watch className="w-8 h-8 text-[#1F150C]" />;
      case 'Backpack':
        return <Backpack className="w-8 h-8 text-[#1F150C]" />;
      case 'Speaker':
        return <Speaker className="w-8 h-8 text-[#1F150C]" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-8 h-8 text-[#1F150C]" />;
      default:
        return <Cpu className="w-8 h-8 text-[#1F150C]" />;
    }
  };

  return (
    <div className="space-y-8 select-none">
      {/* Category Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_CATEGORIES.map((category) => {
          const categoryProducts = MOCK_PRODUCTS.filter((p) => p.category === category.slug);
          return (
            <div
              key={category.id}
              onClick={() => navigateTo('category', category.slug)}
              className="group bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#E1DCC9] flex items-center justify-center group-hover:bg-[#1F150C] transition-colors">
                  {React.cloneElement(getCategoryIcon(category.iconName), {
                    className: 'w-7 h-7 text-[#1F150C] group-hover:text-[#E1DCC9] transition-colors'
                  })}
                </div>
                <span className="text-xs font-extrabold text-[#1F150C] bg-[#E1DCC9] px-2.5 py-1 rounded-full">
                  {categoryProducts.length} Products
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-[#1F150C] dark:text-gray-100 group-hover:text-[#412D15] transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                  Discover top-rated {category.name.toLowerCase()} with official warranty and instant shipping.
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-bold text-[#412D15] dark:text-[#E1DCC9] group-hover:underline">
                <span>Explore Category</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Highlighted Category Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#1F150C] dark:text-gray-100">
              Popular Headphones & Audio Picks
            </h2>
            <p className="text-xs text-gray-500">Top rated noise-cancelling headphones and wireless earbuds</p>
          </div>
          <button
            onClick={() => navigateTo('category', 'headphones')}
            className="text-xs font-bold text-[#412D15] hover:underline flex items-center gap-1"
          >
            <span>View All Audio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MOCK_PRODUCTS.filter((p) => p.category === 'headphones').slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
