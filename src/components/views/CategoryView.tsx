import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Grid, Filter } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ApiService } from '../../services/apiService';
import type { Product } from '../../types';
import { ProductCard } from '../product/ProductCard';

export const CategoryView: React.FC = () => {
  const { selectedCategory } = useShop();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<'popular' | 'price-low' | 'price-high' | 'rating' | 'newest'>('popular');
  const [maxPrice, setMaxPrice] = useState<number>(300);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    ApiService.getProducts({
      category: selectedCategory,
      sort: sortOption
    }).then((res) => {
      if (isMounted) {
        const filtered = res.filter((p) => p.price <= maxPrice);
        setProducts(filtered);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, sortOption, maxPrice]);

  return (
    <div className="space-y-6">

      {/* Filter & Sort Bar */}
      <div className="p-4 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs select-none">
        {/* Price Range Slider Filter */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#412D15]" />
          <span className="font-bold text-gray-700 dark:text-gray-300 min-w-[80px]">
            Max Price: ${maxPrice}
          </span>
          <input
            type="range"
            min="30"
            max="300"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-32 accent-[#412D15] cursor-pointer"
          />
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <ArrowUpDown className="w-4 h-4 text-[#412D15]" />
          <span className="font-bold text-gray-700 dark:text-gray-300">Sort by:</span>
          <select
            value={sortOption}
            onChange={(e: any) => setSortOption(e.target.value)}
            className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-bold rounded-xl outline-none"
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
        <div className="py-20 text-center text-sm font-bold text-gray-400 animate-pulse">
          Loading catalog items...
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
          <Grid className="w-12 h-12 text-gray-300 mx-auto" />
          <p className="font-bold text-gray-700 dark:text-gray-300 text-sm">
            No products match the selected filters
          </p>
          <button
            onClick={() => setMaxPrice(300)}
            className="text-xs font-bold text-[#412D15] hover:underline"
          >
            Reset Max Price Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};

