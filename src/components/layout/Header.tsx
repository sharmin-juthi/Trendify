import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  ChevronDown,
  LogOut,
  Package,
  MapPin
} from 'lucide-react';
import { useShop, type ViewType } from '../../context/ShopContext';

export const Header: React.FC = () => {
  const {
    searchQuery,
    navigateTo,
    activeView,
    wishlistCount,
    cartItemCount,
    user,
    setIsAuthModalOpen,
    setIsOrdersModalOpen
  } = useShop();

  const [inputQuery, setInputQuery] = useState(searchQuery);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      navigateTo('search', undefined, inputQuery.trim());
    }
  };

  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);

  const navLinks: { label: string; view: ViewType; categorySlug?: string; hasDropdown?: boolean }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'Categories', view: 'categories', hasDropdown: true },
    { label: 'Deals', view: 'deals' },
    { label: 'New Arrivals', view: 'new-arrivals' },
    { label: 'Brands', view: 'brands' },
    { label: 'About Us', view: 'about' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 transition-colors select-none">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 h-16 flex items-center justify-between gap-6">
        {/* Brand Logo: Trendify */}
        <div
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1F150C] p-1.5 flex items-center justify-center shadow-md shadow-[#1F150C]/25 group-hover:scale-105 transition-transform">
            <img src="/icon.png" alt="Trendify Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-2xl font-semibold text-[#1F150C] dark:text-gray-100 tracking-tight">
            Trendify
          </span>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-gray-900 dark:text-white">
          {navLinks.map((link, idx) => {
            const isActive = activeView === link.view;

            if (link.hasDropdown) {
              return (
                <div
                  key={idx}
                  className="relative group"
                  onMouseEnter={() => setIsCategoriesHovered(true)}
                  onMouseLeave={() => setIsCategoriesHovered(false)}
                >
                  <button
                    onClick={() => navigateTo('categories')}
                    className={`flex items-center gap-1 py-1 text-gray-900 dark:text-white hover:text-[#412D15] dark:hover:text-[#E1DCC9] transition-colors relative ${
                      isActive ? 'border-b-2 border-[#412D15] text-[#1F150C]' : ''
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#412D15] dark:text-gray-300 group-hover:rotate-180 transition-transform" />
                  </button>

                  {/* Dropdown Menu */}
                  {isCategoriesHovered && (
                    <div className="absolute top-full left-0 w-56 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-2 space-y-1">
                        <button
                          onClick={() => {
                            navigateTo('categories');
                            setIsCategoriesHovered(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-[#1F150C] dark:text-[#412D15] hover:bg-[#E1DCC9]/40 rounded-xl transition-colors flex items-center justify-between"
                        >
                          <span>All Categories Directory</span>
                        </button>
                        <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />
                        {[
                          { name: 'Headphones & Audio', slug: 'headphones' },
                          { name: 'Smartwatches', slug: 'watches' },
                          { name: 'Travel Backpacks', slug: 'backpacks' },
                          { name: 'Bluetooth Speakers', slug: 'audio' },
                          { name: 'Gaming Gear', slug: 'gaming' }
                        ].map((cat) => (
                          <button
                            key={cat.slug}
                            onClick={() => {
                              navigateTo('category', cat.slug);
                              setIsCategoriesHovered(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#1F150C] rounded-xl transition-colors"
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={idx}
                onClick={() => navigateTo(link.view, link.categorySlug)}
                className={`flex items-center gap-1 py-1 text-gray-900 dark:text-white hover:text-[#412D15] dark:hover:text-[#E1DCC9] transition-colors relative ${
                  isActive ? 'border-b-2 border-[#412D15] text-[#1F150C]' : ''
                }`}
              >
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Search & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Bar Input - leftmost, more visible */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden sm:block w-44 md:w-60"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-4 pr-10 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-xl text-xs font-medium outline-none border border-gray-300 dark:border-gray-600 focus:border-[#412D15] focus:ring-2 focus:ring-[#412D15]/30 transition-all shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-3 top-2.5 text-gray-500 hover:text-[#412D15]"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Wishlist Icon + Label */}
          <button
            onClick={() => navigateTo('wishlist')}
            className="relative flex items-center gap-2 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5 text-[#1F150C] dark:text-gray-100 flex-shrink-0" />
            <span className="hidden md:inline text-xs font-semibold text-[#1F150C] dark:text-gray-100">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 left-6 w-4 h-4 bg-[#412D15] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon + Label */}
          <button
            onClick={() => navigateTo('cart')}
            className="relative flex items-center gap-2 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#1F150C] dark:text-gray-100 flex-shrink-0" />
            <span className="hidden md:inline text-xs font-semibold text-[#1F150C] dark:text-gray-100">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute top-0.5 left-6 w-4 h-4 bg-[#412D15] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Profile Icon (no label) */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Account"
            >
              <UserIcon className="w-5 h-5 text-[#1F150C] dark:text-gray-100" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                  <p className="text-sm font-bold text-[#1F150C] dark:text-gray-100 truncate">
                    {user.email}
                  </p>
                </div>
                <div className="py-1 text-xs font-semibold">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsOrdersModalOpen(true);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-[#E1DCC9]/40 hover:text-[#1F150C] flex items-center gap-2.5"
                  >
                    <Package className="w-4 h-4 text-[#412D15]" /> My Orders
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigateTo('wishlist');
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-[#E1DCC9]/40 hover:text-[#1F150C] flex items-center gap-2.5"
                  >
                    <Heart className="w-4 h-4 text-[#412D15]" /> Saved Wishlist
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-[#E1DCC9]/40 hover:text-[#1F150C] flex items-center gap-2.5"
                  >
                    <MapPin className="w-4 h-4 text-[#412D15]" /> Settings & Addresses
                  </button>
                </div>
                <div className="pt-1 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5"
                  >
                    <LogOut className="w-4 h-4 text-red-500" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

