import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Tag,
  Lock,
  ArrowRight,
  Gift,
  CheckCircle2,
  Eye
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { MOCK_PRODUCTS } from '../../data/mockData';

export const CartPanel: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTotal,
    cartItemCount,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    addToCart,
    openProductModal,
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

  // Cross-sell items (products not currently in cart)
  const crossSellProducts = MOCK_PRODUCTS.filter(
    (p) => !cart.some((ci) => ci.productId === p.id)
  ).slice(0, 2);

  // Recently viewed items preview
  const recentlyViewed = MOCK_PRODUCTS.slice(2, 5);

  return (
    <>
      {/* Backdrop overlay for drawer mode */}
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 xl:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed xl:sticky top-0 xl:top-24 right-0 z-50 xl:z-20 h-screen xl:h-[calc(100vh-6rem)] w-full sm:w-[420px] bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800 shadow-2xl xl:shadow-sm transition-all duration-300 transform xl:transform-none ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0'
        } flex flex-col justify-between overflow-hidden select-none`}
      >
        {/* Panel Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1F150C] text-[#E1DCC9] p-1.5 flex items-center justify-center font-bold">
              <img src="/icon.png" alt="Cart" className="w-5 h-5 object-contain" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-gray-900 dark:text-gray-100">
                My Cart
              </h3>
              <p className="text-xs text-gray-400 font-medium">
                {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Panel Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin">
          {/* Free Shipping Progress */}
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl p-3 text-xs text-emerald-800 dark:text-emerald-300">
            {cartSubtotal >= 50 ? (
              <p className="font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Congratulations! You unlocked FREE Shipping 🎉
              </p>
            ) : (
              <div>
                <div className="flex justify-between font-medium mb-1.5">
                  <span>Add <strong>${(50 - cartSubtotal).toFixed(2)}</strong> more for Free Shipping</span>
                  <span className="font-bold">{Math.min(100, Math.round((cartSubtotal / 50) * 100))}%</span>
                </div>
                <div className="w-full h-2 bg-emerald-200 dark:bg-emerald-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (cartSubtotal / 50) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Line Items */}
          {cart.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E1DCC9]/40 dark:bg-gray-800 text-[#412D15] p-3 flex items-center justify-center mx-auto">
                <img src="/icon.png" alt="Cart Empty" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                  Your cart is empty
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Discover trending fashion, tech & beauty products.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-gray-100 dark:divide-gray-800">
              {cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-3 group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-2xl object-cover bg-gray-100 border border-gray-100 dark:border-gray-800 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate pr-2">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {item.variantDetails && (
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {item.variantDetails.size && `Size: ${item.variantDetails.size}`}
                        {item.variantDetails.color && ` • Color: ${item.variantDetails.color}`}
                      </p>
                    )}

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-xl p-0.5 bg-gray-50 dark:bg-gray-800">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center shadow-xs text-xs font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200 px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center shadow-xs text-xs font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-black text-[#1F150C] dark:text-gray-100">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Coupon Code Section */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
            <label className="text-xs font-extrabold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#412D15]" />
              Promo / Coupon Code
            </label>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 bg-[#412D15]/10 border border-[#412D15]/30 rounded-2xl text-xs">
                <div>
                  <span className="font-bold text-[#1F150C] dark:text-[#E1DCC9]">
                    {appliedCoupon.code}
                  </span>
                  <span className="text-[11px] text-[#412D15] dark:text-gray-300 block">
                    {appliedCoupon.discountType === 'percent'
                      ? `${appliedCoupon.discountValue}% OFF`
                      : `$${appliedCoupon.discountValue} OFF`}
                  </span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter code (e.g. WELCOME10)"
                  className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs outline-none focus:border-[#412D15]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#412D15] text-[#E1DCC9] text-xs font-bold rounded-xl hover:bg-[#1F150C] transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
            {couponError && <p className="text-[11px] text-red-500 font-medium">{couponError}</p>}
          </div>

          {/* Recommended Cross-Sell Products */}
          {crossSellProducts.length > 0 && (
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                You Might Also Like
              </h4>
              <div className="space-y-2">
                {crossSellProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-2.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center gap-3"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-11 h-11 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">
                        {prod.name}
                      </p>
                      <p className="text-[11px] font-extrabold text-[#412D15]">
                        ${prod.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => addToCart(prod)}
                      className="w-8 h-8 rounded-full bg-[#412D15] text-[#E1DCC9] flex items-center justify-center hover:bg-[#1F150C] transition-colors shadow-sm"
                      title="Add to cart"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recently Viewed Strip */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> Recently Viewed
              </h4>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {recentlyViewed.map((rv) => (
                <div
                  key={rv.id}
                  onClick={() => openProductModal(rv)}
                  className="w-14 flex-shrink-0 cursor-pointer group"
                >
                  <img
                    src={rv.images[0]}
                    alt={rv.name}
                    className="w-14 h-14 rounded-xl object-cover border border-gray-200 dark:border-gray-700 group-hover:scale-105 transition-transform"
                  />
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate mt-1 text-center font-medium">
                    ${rv.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Membership Card */}
          <div className="rounded-2xl p-4 bg-gradient-to-r from-[#1F150C] to-[#412D15] text-[#E1DCC9] shadow-lg space-y-2">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 animate-bounce text-[#E1DCC9]" />
              <h4 className="text-xs font-black uppercase tracking-wider">Join Trendify Club</h4>
            </div>
            <p className="text-[11px] text-[#E1DCC9]/90 leading-relaxed font-medium">
              Get 10% cash back on every order, early flash sale access & free gift wraps.
            </p>
            <button
              onClick={() => alert('Welcome to Trendify VIP Club!')}
              className="w-full py-2 bg-[#E1DCC9] text-[#1F150C] rounded-xl text-xs font-extrabold hover:bg-white transition-colors shadow-sm"
            >
              Join Free Now
            </button>
          </div>
        </div>

        {/* Panel Footer & Summary */}
        <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-4">
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-gray-500 dark:text-gray-400 font-medium">
              <span>Subtotal</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">${cartSubtotal.toFixed(2)}</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-red-500 font-semibold">
                <span>Discount ({appliedCoupon?.code})</span>
                <span>-${cartDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-500 dark:text-gray-400 font-medium">
              <span>Shipping Fee</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">
                {cartShippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${cartShippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between text-base font-black text-gray-900 dark:text-gray-100">
              <span>Total</span>
              <span className="text-[#412D15]">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={() => {
              setIsCartOpen(false);
              setIsCheckoutModalOpen(true);
            }}
            className="w-full py-3.5 px-4 bg-[#412D15] hover:bg-[#1F150C] text-[#E1DCC9] rounded-2xl font-black text-sm shadow-xl shadow-[#412D15]/25 hover:shadow-[#412D15]/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <Lock className="w-4 h-4" />
            <span>Checkout ({cartItemCount})</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Payment Method Badges */}
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
      </aside>
    </>
  );
};
