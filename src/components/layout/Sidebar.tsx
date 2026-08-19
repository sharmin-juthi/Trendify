import React from 'react';
import {
  Home,
  Grid,
  Flame,
  Sparkles,
  Award,
  Package,
  Heart,
  HelpCircle,
  Sun,
  Moon,
  ArrowRight
} from 'lucide-react';
import { useShop, type ViewType } from '../../context/ShopContext';

interface NavItem {
  id: string;
  label: string;
  view: ViewType;
  categorySlug?: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const {
    activeView,
    selectedCategory,
    navigateTo,
    theme,
    toggleTheme,
    setIsOrdersModalOpen,
    setIsAuthModalOpen
  } = useShop();

  const navItems: NavItem[] = [
    { id: 'nav-home', label: 'Home', view: 'home', icon: Home },
    { id: 'nav-shop', label: 'Shop Catalog', view: 'shop', icon: Grid },
    { id: 'nav-categories', label: 'Categories Directory', view: 'categories', icon: Grid },
    { id: 'nav-deals', label: 'Deals & Clearance', view: 'deals', icon: Flame, badge: 'Hot', badgeColor: 'bg-red-500 text-white' },
    { id: 'nav-new', label: 'New Arrivals', view: 'new-arrivals', icon: Sparkles },
    { id: 'nav-brands', label: 'Brand Showcase', view: 'brands', icon: Award },
    { id: 'nav-orders', label: 'My Orders', view: 'orders', icon: Package },
    { id: 'nav-wishlist', label: 'Wishlist', view: 'wishlist', icon: Heart },
    { id: 'nav-about', label: 'About Trendify', view: 'about', icon: HelpCircle },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.view === 'orders') {
      setIsOrdersModalOpen(true);
      return;
    }
    if (item.view === 'account') {
      setIsAuthModalOpen(true);
      return;
    }
    navigateTo(item.view, item.categorySlug);
  };

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-4 select-none scrollbar-thin">
      <div className="space-y-6">
        {/* Navigation Section */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
          <p className="px-4 text-[11px] font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
            Menu Navigation
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeView === item.view &&
                (!item.categorySlug || selectedCategory === item.categorySlug);

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1F150C] text-[#E1DCC9] shadow-lg shadow-[#1F150C]/25 font-bold scale-[1.02]'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-[#412D15]/10 hover:text-[#412D15]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#E1DCC9]' : 'text-gray-400 dark:text-gray-500'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                        isActive ? 'bg-white/20 text-[#E1DCC9]' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Promotional Summer Sale Card */}
        <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-[#1F150C] via-[#312010] to-[#412D15] text-[#E1DCC9] shadow-xl shadow-[#1F150C]/20 group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
          <div className="relative z-10 space-y-3">
            <span className="inline-block px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-wider text-[#E1DCC9]">
              Special Offer
            </span>
            <div>
              <h3 className="text-base font-black leading-tight text-white">Summer Sale</h3>
              <p className="text-xs text-[#E1DCC9]/80 font-medium mt-1">
                Up to 50% Off on Premium Fashion & Audio Gear
              </p>
            </div>
            <button
              onClick={() => navigateTo('category', 'fashion')}
              className="w-full py-2.5 px-4 bg-[#E1DCC9] text-[#1F150C] hover:bg-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all group-hover:gap-3"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer Utilities */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 space-y-3 transition-colors">
          <a
            href="mailto:support@trendify.com"
            className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-[#412D15] transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-[#412D15]" />
            <span>24/7 Support Center</span>
          </a>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between px-4">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-2">
              {theme === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-blue-400" />}
              {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </span>

            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                theme === 'dark' ? 'bg-[#412D15]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

