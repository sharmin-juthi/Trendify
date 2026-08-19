import React, { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, CheckCircle2 } from 'lucide-react';
import { ApiService } from '../../services/apiService';
import type { Product } from '../../types';
import { ProductCard } from '../product/ProductCard';
import { MOCK_CATEGORIES } from '../../data/mockData';

export const ShopView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<'popular' | 'price-low' | 'price-high' | 'rating' | 'newest'>('popular');
  const [maxPrice, setMaxPrice] = useState<number>(350);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    ApiService.getProducts({
      category: selectedCategoryFilter,
      sort: sortOption
    }).then((res) => {
      if (isMounted) {
        let filtered = res.filter((p) => p.price <= maxPrice);
        if (minRating > 0) {
          filtered = filtered.filter((p) => p.rating >= minRating);
        }
        if (inStockOnly) {
          filtered = filtered.filter((p) => p.stock > 0);
        }
        setProducts(filtered);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedCategoryFilter, sortOption, maxPrice, minRating, inStockOnly]);

  return (
    <div className="space-y-6 select-none">

      {/* Main Layout: Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Filter (3 cols) */}
        <aside className="lg:col-span-3 space-y-6 bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
            <h3 className="font-extrabold text-sm text-[#1F150C] dark:text-gray-100 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#412D15]" />
              Filter Products
            </h3>
            <button
              onClick={() => {
                setSelectedCategoryFilter('all');
                setMaxPrice(350);
                setMinRating(0);
                setInStockOnly(false);
                setSortOption('popular');
              }}
              className="text-[11px] font-bold text-[#412D15] hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider block">
              Category
            </label>
            <div className="space-y-1.5">
              <button
                onClick={() => setSelectedCategoryFilter('all')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  selectedCategoryFilter === 'all'
                    ? 'bg-[#1F150C] text-[#E1DCC9] shadow-md'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                <span>All Categories</span>
                {selectedCategoryFilter === 'all' && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>
              {MOCK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryFilter(cat.slug)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    selectedCategoryFilter === cat.slug
                      ? 'bg-[#1F150C] text-[#E1DCC9] shadow-md'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <span>{cat.name}</span>
                  {selectedCategoryFilter === cat.slug && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-gray-700 dark:text-gray-300">Max Price</span>
              <span className="text-[#1F150C] dark:text-[#E1DCC9]">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="30"
              max="350"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#412D15] cursor-pointer"
            />
          </div>

          {/* Minimum Rating Filter */}
          <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider block">
              Minimum Rating
            </label>
            <div className="flex gap-2">
              {[0, 4.0, 4.5].map((star) => (
                <button
                  key={star}
                  onClick={() => setMinRating(star)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    minRating === star
                      ? 'border-[#1F150C] bg-[#E1DCC9]/40 text-[#1F150C]'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                  }`}
                >
                  {star === 0 ? 'Any' : `${star}★+`}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Checkbox */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#1F150C] accent-[#1F150C] cursor-pointer"
              />
              In Stock Items Only
            </label>
          </div>
        </aside>

        {/* Right Product Grid Area (9 cols) */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Control Bar */}
          <div className="p-4 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p className="font-bold text-gray-600 dark:text-gray-400">
              Showing <span className="text-[#1F150C] dark:text-gray-100 font-extrabold">{products.length}</span> Products
            </p>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <ArrowUpDown className="w-4 h-4 text-[#412D15]" />
              <span className="font-bold text-gray-700 dark:text-gray-300">Sort By:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold px-3 py-1.5 rounded-xl border-none outline-none cursor-pointer focus:ring-2 focus:ring-[#412D15]"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-72 bg-gray-100 dark:bg-gray-800 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center space-y-3 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
              <Filter className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-extrabold text-base text-[#1F150C]">No Products Found</h3>
              <p className="text-xs text-gray-500">Try adjusting your filters or price slider to see more items.</p>
              <button
                onClick={() => {
                  setSelectedCategoryFilter('all');
                  setMaxPrice(350);
                  setMinRating(0);
                  setInStockOnly(false);
                }}
                className="mt-2 px-5 py-2.5 bg-[#1F150C] text-[#E1DCC9] rounded-full text-xs font-bold hover:bg-[#412D15] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
