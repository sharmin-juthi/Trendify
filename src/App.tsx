import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

import { HomeView } from './components/views/HomeView';
import { ShopView } from './components/views/ShopView';
import { CategoriesView } from './components/views/CategoriesView';
import { CategoryView } from './components/views/CategoryView';
import { DealsView } from './components/views/DealsView';
import { NewArrivalsView } from './components/views/NewArrivalsView';
import { BrandsView } from './components/views/BrandsView';
import { AboutView } from './components/views/AboutView';
import { SearchView } from './components/views/SearchView';
import { WishlistView } from './components/views/WishlistView';
import { CartView } from './components/views/CartView';

import { ProductDetailModal } from './components/product/ProductDetailModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrdersModal } from './components/account/OrdersModal';
import { AuthModal } from './components/auth/AuthModal';

const MainContent: React.FC = () => {
  const { activeView, toastMessage } = useShop();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-200">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-gray-900/90 dark:bg-white/90 text-white dark:text-gray-900 rounded-2xl font-extrabold text-xs shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-300 border border-gray-700/50">
          ✨ {toastMessage}
        </div>
      )}

      {/* 2. Main Navigation Header */}
      <Header />

      {/* 3. Main Content Container (Pure White Background) */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-4 bg-white dark:bg-gray-950">
        <main className="w-full">
          {activeView === 'home' && <HomeView />}
          {activeView === 'shop' && <ShopView />}
          {activeView === 'categories' && <CategoriesView />}
          {activeView === 'category' && <CategoryView />}
          {activeView === 'deals' && <DealsView />}
          {activeView === 'new-arrivals' && <NewArrivalsView />}
          {activeView === 'brands' && <BrandsView />}
          {activeView === 'about' && <AboutView />}
          {activeView === 'search' && <SearchView />}
          {activeView === 'wishlist' && <WishlistView />}
          {activeView === 'cart' && <CartView />}
          {activeView === 'orders' && <HomeView />}
          {activeView === 'account' && <HomeView />}
        </main>
      </div>

      {/* 4. Footer (Rendered strictly on HomeView only) */}
      {activeView === 'home' && <Footer />}

      {/* 5. Modals */}
      <ProductDetailModal />
      <CheckoutModal />
      <OrdersModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
