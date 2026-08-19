import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartView: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTotal,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    navigateTo,
    setIsCheckoutModalOpen
  } = useShop();

  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode.trim());
      setCouponCode('');
    }
  };

  return (
    <div className="space-y-8 select-none">

      {cart.length === 0 ? (
        /* Empty Cart View */
        <div className="py-20 text-center space-y-4 bg-white dark:bg-gray-900 rounded-3xl border border-[#412D15]/20 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[#E1DCC9]/40 text-[#1F150C] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div>
            <h3 className="font-extrabold text-[#1F150C] dark:text-gray-100 text-lg">
              Your cart is currently empty
            </h3>
            <p className="text-xs text-[#412D15] dark:text-gray-400 mt-1 max-w-sm mx-auto">
              Explore our curated selection of high-performance audio gear, smartwatches, and premium accessories.
            </p>
          </div>
          <button
            onClick={() => navigateTo('category', 'all')}
            className="px-6 py-3 bg-[#1F150C] hover:bg-[#412D15] text-[#E1DCC9] rounded-full text-xs font-extrabold shadow-lg shadow-[#1F150C]/25 transition-all"
          >
            Discover Products
          </button>
        </div>
      ) : (
        /* 2-Column Full Cart Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Line Items & Free Shipping Progress (8 cols) */}
          <div className="lg:col-span-8 space-y-6">

            {/* Line Items Container */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-[#412D15]/20 shadow-sm divide-y divide-gray-100 dark:divide-gray-800 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-2xl object-cover bg-gray-50 border border-gray-100 dark:border-gray-800 flex-shrink-0"
                    />
                    <div className="space-y-1 min-w-0">
                      <h4 className="font-extrabold text-sm text-[#1F150C] dark:text-gray-100 truncate">
                        {item.name}
                      </h4>
                      {item.variantDetails && (
                        <p className="text-xs text-[#412D15] dark:text-gray-400">
                          {item.variantDetails.size && `Size: ${item.variantDetails.size}`}
                          {item.variantDetails.color && ` • Color: ${item.variantDetails.color}`}
                        </p>
                      )}
                      <p className="text-xs font-extrabold text-[#412D15]">
                        ${item.unitPrice.toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-gray-100 dark:border-gray-800">
                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-black text-gray-900 dark:text-gray-100 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-[#1F150C] dark:text-gray-100 block">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout CTA (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-[#412D15]/20 shadow-sm space-y-6">
              <h3 className="text-base font-extrabold text-[#1F150C] dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-3">
                Order Summary
              </h3>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. SUMMER50"
                      className="w-full pl-8 pr-3 py-2 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-700 outline-none uppercase"
                    />
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#412D15] hover:bg-[#1F150C] text-[#E1DCC9] rounded-xl text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {couponError && (
                  <p className="text-[11px] font-semibold text-red-500">
                    {couponError}
                  </p>
                )}

                {appliedCoupon && (
                  <div className="flex items-center justify-between p-2.5 bg-[#E1DCC9]/40 rounded-xl border border-[#412D15]/30 text-xs">
                    <span className="font-bold text-[#1F150C]">
                      Code <strong>{appliedCoupon.code}</strong> applied!
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-red-500 hover:underline text-[11px] font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs border-t border-gray-100 dark:border-gray-800 pt-4">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1F150C] dark:text-gray-100">${cartSubtotal.toFixed(2)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-red-500 font-bold">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-${cartDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-[#1F150C] dark:text-gray-100">
                    {cartShippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${cartShippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between text-base font-black text-[#1F150C] dark:text-gray-100">
                  <span>Total Amount</span>
                  <span className="text-[#1F150C] dark:text-gray-100">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full py-3.5 px-4 bg-[#412D15] hover:bg-[#1F150C] text-[#E1DCC9] rounded-2xl font-black text-sm shadow-xl shadow-[#412D15]/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Lock className="w-4 h-4 text-[#E1DCC9]" />
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#E1DCC9]" />
              </button>

              {/* Payment Methods Trust Badge */}
              <div className="pt-2 flex items-center justify-center gap-3 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                <span>VISA</span>
                <span>•</span>
                <span>MasterCard</span>
                <span>•</span>
                <span>Amex</span>
                <span>•</span>
                <span>Apple Pay</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

