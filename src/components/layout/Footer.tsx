import React from 'react';
import { useShop } from '../../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <footer className="mt-16 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors select-none">
      {/* Main Footer Links */}
      <div className="border-t border-gray-100 dark:border-gray-800 py-12 bg-gray-50/50 dark:bg-gray-950">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#1F150C] p-1 flex items-center justify-center">
                <img src="/icon.png" alt="Trendify Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-black text-[#1F150C] dark:text-gray-100">
                Trendify
              </span>
            </div>
            <p className="text-xs text-[#412D15] dark:text-gray-400 leading-relaxed font-medium">
              Discover the latest trends in high-performance electronics, luxury smartwatches, studio audio & durable travel accessories.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-[#1F150C] dark:text-gray-100 mb-4">
              Shop Categories
            </h5>
            <ul className="space-y-2.5 text-xs text-[#412D15] dark:text-gray-400 font-semibold">
              <li>
                <button onClick={() => navigateTo('category', 'headphones')} className="hover:text-[#1F150C]">
                  Headphones & Audio
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('category', 'watches')} className="hover:text-[#1F150C]">
                  Smartwatches & Accessories
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('category', 'backpacks')} className="hover:text-[#1F150C]">
                  Backpacks & Travel Bags
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('category', 'gaming')} className="hover:text-[#1F150C]">
                  Gaming Gear & Keyboards
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-[#1F150C] dark:text-gray-100 mb-4">
              Customer Support
            </h5>
            <ul className="space-y-2.5 text-xs text-[#412D15] dark:text-gray-400 font-semibold">
              <li><a href="#" className="hover:text-[#1F150C]">Track Order Status</a></li>
              <li><a href="#" className="hover:text-[#1F150C]">Shipping & Delivery Info</a></li>
              <li><a href="#" className="hover:text-[#1F150C]">Returns & Refund Policy</a></li>
              <li><a href="#" className="hover:text-[#1F150C]">Frequently Asked Questions</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-[#1F150C] dark:text-gray-100 mb-4">
              Newsletter
            </h5>
            <p className="text-xs text-[#412D15] dark:text-gray-400 mb-3 font-medium">
              Subscribe to get special discount offers and flash sale alerts.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-700 outline-none focus:border-[#412D15]"
              />
              <button
                onClick={() => alert('Thank you for subscribing to Trendify newsletter!')}
                className="px-4 py-2 bg-[#1F150C] hover:bg-[#412D15] text-[#E1DCC9] text-xs font-extrabold rounded-xl transition-colors shadow-sm"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 mt-12 pt-6 border-t border-gray-200/80 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-[#412D15] font-medium gap-4">
          <p>© 2026 Trendify E-Commerce Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookies Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
