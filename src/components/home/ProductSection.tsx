import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import type { Product } from '../../types';
import { ProductCard } from '../product/ProductCard';
import { useShop } from '../../context/ShopContext';

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  categorySlug?: string;
  rows?: number; // how many rows per page (default: 1 = 4 items, 2 = 8 items, 4 = 16 items)
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  subtitle,
  products,
  categorySlug = 'all',
  rows = 1,
}) => {
  const { navigateTo } = useShop();
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4 * rows;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const visibleProducts = products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-black text-[#1F150C] dark:text-gray-100 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-gray-400 font-medium mt-0.5">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('category', categorySlug)}
            className="text-xs font-bold text-[#412D15] hover:text-[#1F150C] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Carousel Arrows */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#E1DCC9]/60 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#E1DCC9]/60 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1.5 pt-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentPage === idx
                  ? 'w-6 bg-[#412D15]'
                  : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-[#412D15]/60'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
