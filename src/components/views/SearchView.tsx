import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ApiService } from '../../services/apiService';
import type { Product } from '../../types';
import { ProductCard } from '../product/ProductCard';

export const SearchView: React.FC = () => {
  const { searchQuery } = useShop();
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    ApiService.getProducts({ search: searchQuery }).then((res) => {
      if (isMounted) {
        setResults(res);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1F150C] text-[#E1DCC9] flex items-center justify-center font-bold">
            <Search className="w-5 h-5 text-[#E1DCC9]" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 dark:text-gray-100">
              Search Results for "{searchQuery}"
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              Found {results.length} matching products
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm font-bold text-gray-400 animate-pulse">
          Searching catalog...
        </div>
      ) : results.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
          <Search className="w-12 h-12 text-gray-300 mx-auto" />
          <p className="font-bold text-gray-700 dark:text-gray-300 text-sm">
            No products found matching "{searchQuery}"
          </p>
          <p className="text-xs text-gray-400">
            Try searching for "sneakers", "headphones", "serum", or "watch".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};

