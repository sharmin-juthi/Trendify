import type { Product, CartItem, Order, Coupon, User, Address } from '../types';
import { MOCK_PRODUCTS, MOCK_COUPONS, MOCK_USER } from '../data/mockData';

// Simulated local storage state for client-side persistence
const CART_STORAGE_KEY = 'trendify_cart';
const WISHLIST_STORAGE_KEY = 'trendify_wishlist';
const ORDERS_STORAGE_KEY = 'trendify_orders';
const USER_STORAGE_KEY = 'trendify_user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const IS_DEV = import.meta.env.DEV;
const ALLOW_MOCK_FALLBACK = IS_DEV && import.meta.env.VITE_ENABLE_MOCK_DATA === 'true';

export class ApiService {
  // --- Products ---
  static async getProducts(params?: {
    category?: string;
    search?: string;
    sort?: 'popular' | 'price-low' | 'price-high' | 'rating' | 'newest';
    flashSaleOnly?: boolean;
    bestDealsOnly?: boolean;
  }): Promise<Product[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.append('category', params.category);
      if (params?.search) queryParams.append('search', params.search);
      if (params?.sort) queryParams.append('sort', params.sort);
      if (params?.flashSaleOnly) queryParams.append('flashSaleOnly', 'true');
      if (params?.bestDealsOnly) queryParams.append('bestDealsOnly', 'true');

      const response = await fetch(`${API_BASE_URL}/products?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Product[] = await response.json();
      return data;
    } catch (error) {
      if (ALLOW_MOCK_FALLBACK) {
        console.warn('⚠️ Server offline or unreachable. Falling back to development mock data.', error);
        return ApiService.getMockProducts(params);
      }
      throw error;
    }
  }

  static async getProductBySlug(slug: string): Promise<Product | undefined> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(slug)}`);
      if (!response.ok) {
        if (response.status === 404) return undefined;
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (ALLOW_MOCK_FALLBACK) {
        console.warn(`⚠️ Server offline. Falling back to development mock data for slug: ${slug}`);
        return MOCK_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
      }
      throw error;
    }
  }

  // --- Development Mock Data Helper ---
  private static getMockProducts(params?: {
    category?: string;
    search?: string;
    sort?: 'popular' | 'price-low' | 'price-high' | 'rating' | 'newest';
    flashSaleOnly?: boolean;
    bestDealsOnly?: boolean;
  }): Product[] {
    let result = [...MOCK_PRODUCTS];

    if (params?.category && params.category !== 'all') {
      const lowerCat = params.category.toLowerCase();
      result = result.filter(
        (p) => p.categorySlug.toLowerCase() === lowerCat || p.category.toLowerCase() === lowerCat
      );
    }

    if (params?.search && params.search.trim() !== '') {
      const q = params.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (params?.flashSaleOnly) {
      result = result.filter((p) => p.isFlashSale);
    }

    if (params?.bestDealsOnly) {
      result = result.filter((p) => p.discountPercent && p.discountPercent >= 20);
    }

    if (params?.sort) {
      switch (params.sort) {
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'popular':
        default:
          result.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
      }
    }

    return result;
  }

  // --- Cart ---
  static getLocalCart(): CartItem[] {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default initial cart items
    return [
      {
        id: 'cart-item-1',
        productId: 'prod-1',
        name: 'Air Max 270 React Sneakers',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80',
        variantDetails: { size: '9 US', color: 'Red/White' },
        unitPrice: 129.99,
        quantity: 1,
        stock: 24
      }
    ];
  }

  static saveLocalCart(items: CartItem[]): void {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }

  // --- Wishlist ---
  static getLocalWishlist(): string[] {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        const parsed: string[] = JSON.parse(saved);
        // Filter out legacy pre-seeded mock items
        const cleaned = parsed.filter((id) => id !== 'prod-airpods' && id !== 'prod-sony-wh');
        if (cleaned.length !== parsed.length) {
          localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(cleaned));
        }
        return cleaned;
      }
    } catch {
      // fallback
    }
    return [];
  }

  static saveLocalWishlist(wishlist: string[]): void {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }

  // --- Coupons ---
  static validateCoupon(code: string): Coupon | undefined {
    return MOCK_COUPONS.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
  }

  // --- Orders ---
  static getLocalOrders(): Order[] {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        const parsed: Order[] = JSON.parse(saved);
        const cleaned = parsed.filter((o) => o.id !== 'ACC-92810');
        if (cleaned.length !== parsed.length) {
          localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(cleaned));
        }
        return cleaned;
      }
    } catch {
      // fallback
    }
    return [];
  }

  static createOrder(
    userId: string,
    items: CartItem[],
    shippingAddress: Address,
    paymentMethod: string,
    appliedCoupon?: Coupon
  ): Order {
    const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percent') {
        discount = (subtotal * appliedCoupon.discountValue) / 100;
      } else {
        discount = appliedCoupon.discountValue;
      }
    }

    const shippingFee = subtotal > 100 ? 0 : 9.99;
    const total = Math.max(0, subtotal - discount + shippingFee);

    const newOrder: Order = {
      id: `TRD-${Math.floor(10000 + Math.random() * 90000)}`,
      userId,
      items: items.map((item, idx) => ({
        id: `oi-${Date.now()}-${idx}`,
        productId: item.productId,
        name: item.name,
        image: item.image,
        variantText: item.variantDetails
          ? `${item.variantDetails.size ? 'Size: ' + item.variantDetails.size : ''} ${
              item.variantDetails.color ? 'Color: ' + item.variantDetails.color : ''
            }`.trim()
          : undefined,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      })),
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      shippingFee: parseFloat(shippingFee.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      status: 'Processing',
      shippingAddress,
      paymentMethod,
      placedAt: new Date().toISOString()
    };

    const existingOrders = this.getLocalOrders();
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));

    // Clear cart on order creation
    this.saveLocalCart([]);

    return newOrder;
  }

  // --- Auth & Token Management ---
  static getAuthToken(): string | null {
    return localStorage.getItem('trendify_auth_token');
  }

  static saveAuthToken(token: string): void {
    localStorage.setItem('trendify_auth_token', token);
  }

  static removeAuthToken(): void {
    localStorage.removeItem('trendify_auth_token');
  }

  static async loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || data.error || 'Login failed');
      }
      if (data.token) {
        ApiService.saveAuthToken(data.token);
      }
      return data;
    } catch (error: any) {
      if (ALLOW_MOCK_FALLBACK && (error.name === 'TypeError' || error.message?.includes('fetch'))) {
        console.warn('⚠️ Login API unreachable or offline. Falling back to local state mock user.');
        const mockUser: User = { ...MOCK_USER, email, name: email.split('@')[0] };
        return { user: mockUser, token: 'mock-jwt-token-dev' };
      }
      throw error;
    }
  }

  static async registerUser(name: string, email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || data.error || 'Registration failed');
      }
      if (data.token) {
        ApiService.saveAuthToken(data.token);
      }
      return data;
    } catch (error: any) {
      if (ALLOW_MOCK_FALLBACK && (error.name === 'TypeError' || error.message?.includes('fetch'))) {
        console.warn('⚠️ Register API unreachable. Falling back to local state mock user.');
        const mockUser: User = { ...MOCK_USER, name, email };
        return { user: mockUser, token: 'mock-jwt-token-dev' };
      }
      throw error;
    }
  }

  // --- Auth / Profile ---
  static getLocalUser(): User {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) {
        const u: User = JSON.parse(saved);
        if (u.wishlist) {
          u.wishlist = u.wishlist.filter((id) => id !== 'prod-airpods' && id !== 'prod-sony-wh');
        } else {
          u.wishlist = [];
        }
        return u;
      }
    } catch {
      // fallback
    }
    return { ...MOCK_USER, wishlist: [] };
  }

  static saveLocalUser(user: User): void {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user', e);
    }
  }

  static async postOrderToServer(
    userId: string,
    items: CartItem[],
    shippingAddress: Address,
    paymentMethod: string,
    appliedCoupon?: Coupon
  ): Promise<Order> {
    const token = ApiService.getAuthToken();
    const localOrder = ApiService.createOrder(userId, items, shippingAddress, paymentMethod, appliedCoupon);

    if (!token) return localOrder;

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          items: localOrder.items,
          shippingAddress: localOrder.shippingAddress,
          paymentMethod: localOrder.paymentMethod,
          subtotal: localOrder.subtotal,
          discount: localOrder.discount,
          shippingFee: localOrder.shippingFee,
          total: localOrder.total
        })
      });

      if (response.ok) {
        const createdOrder = await response.json();
        return {
          ...localOrder,
          id: createdOrder._id || createdOrder.orderNumber || localOrder.id
        };
      }
    } catch (err) {
      console.warn('⚠️ Server order creation fallback to local persistence:', err);
    }

    return localOrder;
  }
}

