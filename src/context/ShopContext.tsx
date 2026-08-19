import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem, User, Order, Coupon, Address, NotificationItem } from '../types';
import { ApiService } from '../services/apiService';
import { MOCK_PRODUCTS, MOCK_NOTIFICATIONS } from '../data/mockData';

export type ViewType =
  | 'home'
  | 'shop'
  | 'categories'
  | 'category'
  | 'deals'
  | 'new-arrivals'
  | 'brands'
  | 'about'
  | 'search'
  | 'wishlist'
  | 'cart'
  | 'orders'
  | 'checkout'
  | 'account';

interface ShopContextType {
  // Navigation & Filtering
  activeView: ViewType;
  selectedCategory: string;
  searchQuery: string;
  navigateTo: (view: ViewType, categorySlug?: string, query?: string) => void;

  // Cart State
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, variant?: { size?: string; color?: string }, quantity?: number) => void;
  buyNow: (product: Product, variant?: { size?: string; color?: string }) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShippingFee: number;
  cartTotal: number;
  cartItemCount: number;

  // Coupon State
  appliedCoupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist State
  wishlist: string[];
  wishlistCount: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & Panels State
  selectedProductForModal: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;

  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  isOrdersModalOpen: boolean;
  setIsOrdersModalOpen: (open: boolean) => void;

  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;

  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationsAsRead: () => void;

  // User & Orders State
  user: User;
  orders: Order[];
  login: (email: string, name?: string) => void;
  placeOrder: (shippingAddress: Address, paymentMethod: string) => Order | null;
  addAddress: (address: Omit<Address, 'id'>) => void;

  // Theme State
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Toast Notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => ApiService.getLocalCart());
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => ApiService.getLocalWishlist());

  // Only count products that actually exist in MOCK_PRODUCTS catalog
  const validWishlist = wishlist.filter((id) => MOCK_PRODUCTS.some((p) => p.id === id));
  const wishlistCount = validWishlist.length;

  // Sanitize wishlist on mount: purge any invalid or non-existent product IDs from state & storage
  useEffect(() => {
    setWishlist((current) => {
      const valid = current.filter((id) => MOCK_PRODUCTS.some((p) => p.id === id));
      if (valid.length !== current.length) {
        ApiService.saveLocalWishlist(valid);
        return valid;
      }
      return current;
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // User & Orders
  const [user, setUser] = useState<User>(() => ApiService.getLocalUser());
  const [orders, setOrders] = useState<Order[]>(() => ApiService.getLocalOrders());

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  // Modals
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);

  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('trendify_theme') as 'light' | 'dark') || 'light';
  });

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Sync cart to local storage
  useEffect(() => {
    ApiService.saveLocalCart(cart);
  }, [cart]);

  // Sync wishlist to local storage
  useEffect(() => {
    ApiService.saveLocalWishlist(wishlist);
  }, [wishlist]);

  // Sync theme
  useEffect(() => {
    localStorage.setItem('trendify_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Navigation Helper
  const navigateTo = (view: ViewType, categorySlug?: string, query?: string) => {
    setActiveView(view);
    if (categorySlug) setSelectedCategory(categorySlug);
    if (query !== undefined) setSearchQuery(query);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percent') {
      cartDiscount = (cartSubtotal * appliedCoupon.discountValue) / 100;
    } else {
      cartDiscount = appliedCoupon.discountValue;
    }
  }

  const cartShippingFee = cartSubtotal > 50 || cart.length === 0 ? 0 : 9.99;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShippingFee);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Cart Operations
  const addToCart = (product: Product, variant?: { size?: string; color?: string }, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.variantDetails?.size === variant?.size &&
          item.variantDetails?.color === variant?.color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          productId: product.id,
          name: product.name,
          image: product.images[0],
          variantDetails: variant,
          unitPrice: product.price,
          quantity,
          stock: product.stock
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
    showToast(`Added "${product.name}" to cart!`);
  };

  const buyNow = (product: Product, variant?: { size?: string; color?: string }) => {
    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      productId: product.id,
      name: product.name,
      image: product.images[0],
      variantDetails: variant,
      unitPrice: product.price,
      quantity: 1,
      stock: product.stock
    };
    setCart([newItem]);
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
    showToast(`Proceeding to checkout for "${product.name}"`);
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item)));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Coupon Logic
  const applyCoupon = (code: string): boolean => {
    const coupon = ApiService.validateCoupon(code);
    if (!coupon) {
      setCouponError('Invalid promo code');
      return false;
    }
    if (cartSubtotal < coupon.minOrderValue) {
      setCouponError(`Minimum order value of $${coupon.minOrderValue} required for code ${coupon.code}`);
      return false;
    }
    setAppliedCoupon(coupon);
    setCouponError(null);
    showToast(`Coupon "${coupon.code}" applied successfully!`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  // Wishlist Logic
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        const p = MOCK_PRODUCTS.find((item) => item.id === productId);
        showToast(`Added ${p ? '"' + p.name + '"' : 'item'} to Wishlist!`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Modals
  const openProductModal = (product: Product) => {
    setSelectedProductForModal(product);
  };

  const closeProductModal = () => {
    setSelectedProductForModal(null);
  };

  // Notifications
  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Checkout & Order Placement
  const placeOrder = (shippingAddress: Address, paymentMethod: string): Order | null => {
    if (cart.length === 0) return null;

    const newOrder = ApiService.createOrder(
      user.id,
      cart,
      shippingAddress,
      paymentMethod,
      appliedCoupon || undefined
    );

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setAppliedCoupon(null);
    setIsCheckoutModalOpen(false);
    setIsOrdersModalOpen(true);
    showToast(`Order #${newOrder.id} placed successfully! 🎉`);

    return newOrder;
  };

  const login = (email: string, name?: string) => {
    setUser((prev) => {
      const updated: User = {
        ...prev,
        email,
        name: name || email.split('@')[0]
      };
      ApiService.saveLocalUser(updated);
      return updated;
    });
    showToast(`Signed in as ${email}`);
  };

  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    const created: Address = {
      ...newAddr,
      id: `addr-${Date.now()}`
    };
    setUser((prev) => {
      const updated = { ...prev, addresses: [...prev.addresses, created] };
      ApiService.saveLocalUser(updated);
      return updated;
    });
    showToast('New shipping address saved');
  };

  // Theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ShopContext.Provider
      value={{
        activeView,
        selectedCategory,
        searchQuery,
        navigateTo,

        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        buyNow,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartShippingFee,
        cartTotal,
        cartItemCount,

        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,

        wishlist,
        wishlistCount,
        toggleWishlist,
        isInWishlist,

        selectedProductForModal,
        openProductModal,
        closeProductModal,

        isAuthModalOpen,
        setIsAuthModalOpen,

        isOrdersModalOpen,
        setIsOrdersModalOpen,

        isCheckoutModalOpen,
        setIsCheckoutModalOpen,

        isNotificationsOpen,
        setIsNotificationsOpen,
        notifications,
        unreadNotificationCount,
        markNotificationsAsRead,

        user,
        orders,
        login,
        placeOrder,
        addAddress,

        theme,
        toggleTheme,

        toastMessage,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
