import React from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { wishlist, toggleWishlist, addToCart, buyNow, openProductModal } = useShop();

  const isSaved = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    buyNow(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => openProductModal(product)}
      className="bg-white dark:bg-gray-900 rounded-2xl p-3.5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-[#412D15] transition-all duration-300 flex flex-col justify-between group cursor-pointer select-none"
    >
      <div>
        {/* Product Image Container — Compact aspect ratio (decreased area) */}
        <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 mb-2.5 flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Discount / New Badge */}
          {product.discountPercent ? (
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-600 text-white font-extrabold text-[10px] rounded-md shadow-sm">
              -{product.discountPercent}%
            </span>
          ) : product.isNewArrival ? (
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#1F150C] text-[#E1DCC9] font-extrabold text-[10px] rounded-md shadow-sm">
              New
            </span>
          ) : null}

          {/* Wishlist Heart Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isSaved
                ? 'bg-[#1F150C] text-[#E1DCC9] scale-110 shadow-md'
                : 'bg-white/80 dark:bg-gray-900/80 text-[#412D15] hover:text-[#1F150C] hover:bg-white'
            }`}
            title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-[#E1DCC9]' : ''}`} />
          </button>
        </div>

        {/* Metadata, Title & Shifted-Up Price */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-[#412D15] dark:text-[#E1DCC9] block tracking-wide">
            {product.brand}
          </span>
          <h3 className="font-semibold text-xs sm:text-sm text-[#000000] dark:text-gray-100 line-clamp-1 leading-snug group-hover:text-[#412D15] transition-colors">
            {product.name}
          </h3>

          {/* Price — Shifted Up directly below Title */}
          <div className="flex items-baseline gap-1.5 pt-0.5">
            <span className="text-sm sm:text-base font-black text-[#1F150C] dark:text-gray-100">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through font-normal">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating Stars */}
          <div className="flex items-center gap-1 text-[11px] text-amber-500 font-extrabold pt-0.5">
            <div className="flex">
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="text-[#412D15] dark:text-gray-400 font-medium">({product.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Actions Bar: Buy Now Button before Cart Icon Button */}
      <div className="mt-3 pt-2.5 flex items-center gap-2 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={handleBuyNow}
          title="Direct Payment Checkout"
          className="flex-1 py-2 px-3 bg-[#412D15] hover:bg-[#1F150C] active:scale-[0.98] text-[#E1DCC9] rounded-xl font-bold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center"
        >
          <span>Buy Now</span>
        </button>

        <button
          onClick={handleAddToCart}
          title="Add to Cart"
          className="p-2 bg-[#E1DCC9]/40 dark:bg-gray-800 hover:bg-[#412D15] hover:text-[#E1DCC9] active:scale-95 text-[#1F150C] dark:text-gray-200 rounded-xl transition-all flex items-center justify-center border border-[#412D15]/20 dark:border-gray-700"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
