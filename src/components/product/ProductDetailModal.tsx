import React, { useState } from 'react';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForModal,
    closeProductModal,
    addToCart,
    buyNow,
    wishlist,
    toggleWishlist,
  } = useShop();

  const product = selectedProductForModal;

  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  const isSaved = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(
      product,
      { size: selectedSize, color: selectedColor },
      quantity
    );
  };

  const handleBuyNow = () => {
    buyNow(product, { size: selectedSize, color: selectedColor });
    closeProductModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-y-auto flex flex-col md:flex-row scrollbar-thin select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-gray-50 dark:bg-gray-800/50">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-inner flex items-center justify-center">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Heart / Wishlist */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                isSaved
                  ? 'bg-[#1F150C] text-[#E1DCC9] shadow-md scale-105'
                  : 'bg-white/80 dark:bg-gray-900/80 text-[#412D15] hover:text-[#1F150C]'
              }`}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current text-[#E1DCC9]' : ''}`} />
            </button>
          </div>

          {/* Thumbnails Carousel */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1 scrollbar-none">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#412D15] ring-2 ring-[#412D15]/20 scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="mt-6 pt-4 border-t border-gray-200/60 dark:border-gray-700/60 grid grid-cols-3 gap-2 text-center text-[10px] text-gray-500 dark:text-gray-400 font-medium">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-[#412D15]" />
              <span>Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#412D15]" />
              <span>Official Warranty</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-[#412D15]" />
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Details & Purchase Actions */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div>
              <span className="px-2.5 py-1 bg-[#E1DCC9] text-[#1F150C] rounded-md text-[11px] font-extrabold tracking-wider uppercase inline-block mb-2">
                {product.brand}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#000000] dark:text-gray-100 leading-snug">
                {product.name}
              </h2>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-xs text-gray-400">({product.reviewCount} reviews)</span>
            </div>

            {/* Price Banner */}
            <div className="flex items-baseline gap-3 p-3 bg-[#412D15]/10 rounded-2xl border border-[#412D15]/20">
              <span className="text-2xl font-black text-[#1F150C] dark:text-gray-100">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through font-medium">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Variant Selectors */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Select Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedSize === sz
                          ? 'bg-[#412D15] text-[#E1DCC9] shadow-md'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Select Color:
                </label>
                <div className="flex gap-2">
                  {product.colors.map((col, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(col)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        selectedColor === col ? 'border-[#412D15] scale-110' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                Quantity:
              </label>
              <div className="flex items-center gap-3 w-fit bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 shadow-sm"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-extrabold text-sm text-gray-800 dark:text-gray-200 px-3">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-8 h-8 rounded-xl bg-white dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tabs (Description, Specs) */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <div className="flex gap-4 border-b border-gray-100 dark:border-gray-800 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-2 transition-colors ${
                    activeTab === 'description'
                      ? 'border-b-2 border-[#412D15] text-[#412D15]'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 transition-colors ${
                    activeTab === 'specs'
                      ? 'border-b-2 border-[#412D15] text-[#412D15]'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Specifications
                </button>
              </div>

              <div className="py-3 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {activeTab === 'description' && <p>{product.description}</p>}
                {activeTab === 'specs' && (
                  <ul className="space-y-1 font-mono">
                    <li>• Brand: {product.brand}</li>
                    <li>• Category: {product.category}</li>
                    <li>• SKU: TRD-PROD-{product.id}</li>
                    <li>• Stock: {product.stock} units available</li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              title="Add to Cart"
              className="p-3.5 bg-[#E1DCC9]/40 dark:bg-gray-800 hover:bg-[#412D15] hover:text-[#E1DCC9] active:scale-95 text-[#1F150C] dark:text-gray-200 rounded-2xl transition-all flex items-center justify-center min-w-[52px] border border-[#412D15]/20 dark:border-gray-700"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-3.5 px-4 bg-[#412D15] hover:bg-[#1F150C] active:scale-95 text-[#E1DCC9] rounded-2xl font-bold text-xs sm:text-sm shadow-lg shadow-[#412D15]/25 transition-all"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
