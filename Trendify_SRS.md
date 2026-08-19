# Software Requirements Specification (SRS)
## Trendify — E-commerce Web Platform

**Version:** 1.0
**Date:** August 16, 2026
**Prepared for:** Frontend Development (Portfolio Project)
**Document Status:** Draft

---

## 1. Introduction

### 1.1 Purpose
This document specifies the functional and non-functional requirements for **Trendify**, a modern, Pinterest-inspired e-commerce web platform. It is intended to guide the frontend implementation (and future backend integration) of the product, based on the approved UI design. This SRS will serve as the single source of truth for scope, screens, components, and behavior during development.

### 1.2 Scope
Trendify is a multi-category e-commerce platform (Fashion, Beauty, Electronics, Home & Living, Sports, etc.) that allows users to:
- Browse and search products across categories
- View deals, flash sales, and personalized recommendations
- Manage a shopping cart and wishlist
- Apply promo codes and complete checkout
- Manage their account, orders, addresses, and coupons
- Join a loyalty/membership program

This phase of the project covers **frontend implementation only** (static/mock data or API-ready components). Backend/API integration, payment gateway integration, and admin panel are out of scope for this phase but the frontend will be architected to plug into a backend later.

### 1.3 Intended Audience
- Developer (self) — as implementation reference
- Future collaborators/reviewers
- Portfolio reviewers/recruiters evaluating the project

### 1.4 Definitions & Abbreviations
| Term | Meaning |
|---|---|
| SRS | Software Requirements Specification |
| SPA | Single Page Application |
| POM | Page Object Model (for future test automation) |
| SKU | Stock Keeping Unit |
| CTA | Call To Action |
| PDP | Product Detail Page |
| PLP | Product Listing Page |

### 1.5 References
- UI design reference: "Trendify" Pinterest-inspired e-commerce design mockup (provided image)

---

## 2. Overall Description

### 2.1 Product Perspective
Trendify is a standalone, greenfield frontend web application. It is designed mobile-first-compatible but the reference design targets a **desktop-first layout** with a 3-column structure: left sidebar navigation, center content, right cart/recommendations panel. It should be responsive down to tablet and mobile breakpoints.

### 2.2 Product Features (Summary)
1. Global header with search, wishlist, notifications, and user profile
2. Persistent left sidebar navigation
3. Hero banner carousel (promotional)
4. Category quick-access grid
5. Promotional banner cards (Flash Sale, Free Shipping, New Arrivals)
6. Product listing sections (Best Deals, Recommended for You) with carousels
7. Persistent right-side shopping cart panel
8. Cross-sell section ("You might also like")
9. Recently viewed products
10. Membership/loyalty CTA banner
11. Trust badges footer
12. Light/Dark mode toggle

### 2.3 User Classes and Characteristics
| User Class | Description |
|---|---|
| **Guest User** | Can browse products, view deals, search, but must sign in to add to cart/wishlist/checkout (business rule — configurable) |
| **Registered/Logged-in User** | Full access: cart, wishlist, orders, coupons, addresses, account settings, membership |
| *(Future) Admin* | Out of scope for this phase |

### 2.4 Operating Environment
- **Platform:** Web (browser-based)
- **Target browsers:** Latest 2 versions of Chrome, Firefox, Edge, Safari
- **Devices:** Desktop (primary), Tablet, Mobile (responsive breakpoints)
- **Frontend stack (recommended):** Next.js (App Router), React, TypeScript, Tailwind CSS
- **State management:** React Context / Zustand (for cart, wishlist, theme)
- **Data layer (this phase):** Mock JSON / local state; structured to later connect to REST/GraphQL API
- **Future backend (per your stack):** Node.js + PostgreSQL + Redis (for cart/session caching)

### 2.5 Design and Implementation Constraints
- Must visually match the approved design system (colors, spacing, typography — see Section 8)
- Must be fully responsive (desktop → mobile)
- Component-based architecture (reusable Product Card, Banner, Sidebar Item, Cart Item, etc.)
- Accessibility: semantic HTML, keyboard navigation, ARIA labels where applicable
- No backend dependency required to demo the frontend (use mock data layer that mimics future API contracts)

### 2.6 Assumptions and Dependencies
- Product, pricing, and cart data will initially be mocked via a local JSON/TS data file or mock API (e.g., JSON Server / MSW)
- Real payment processing (Stripe/SSLCommerz/etc.) is a future phase
- Images will be placeholder/stock images or self-sourced, respecting no real branded/licensed content (avoid real product photography with brand trademarks in a portfolio context — use generic/royalty-free imagery)

---

## 3. System Features & Functional Requirements

Each feature below includes: description, inputs, processing/behavior, and expected output — written so it can double as acceptance criteria.

### 3.1 Global Header
**FR-1.1 Logo & Brand**
- Display "Trendify" logo (icon + wordmark), clicking navigates to Home.

**FR-1.2 Search Bar**
- Central search input with placeholder "Search for products, brands and more..."
- Search icon button (submit on click or Enter key)
- Should support: live suggestions/autocomplete (future enhancement), search history (future), debounced input handling
- On submit → navigates to Search Results Page (`/search?q=...`)

**FR-1.3 Wishlist Icon**
- Heart icon with label "Wishlist"; navigates to `/wishlist`
- Shows item count badge if items exist (optional enhancement beyond current design)

**FR-1.4 Notifications Icon**
- Bell icon with a numeric badge (e.g., "3") indicating unread notifications
- Clicking opens a notification dropdown/panel (order updates, promo alerts, etc.)

**FR-1.5 User Profile**
- Avatar image + user name (e.g., "Alina Putri")
- Clicking opens account dropdown: Profile, Orders, Settings, Logout
- If guest: show "Sign In / Register" CTA instead

---

### 3.2 Left Sidebar Navigation
**FR-2.1 Navigation Menu Items**
Persistent vertical sidebar with icon + label for each item, active state highlighted (purple background per design):
- Home
- Categories
- Deals (with "Hot" badge)
- New Arrivals
- Best Sellers
- Brands
- Collections
- My Orders
- Wishlist
- Coupons
- Addresses
- Account Settings

**FR-2.2 Active State Indication**
- Currently active route is visually highlighted (filled rounded background + white text/icon), matching "Home" state in design.

**FR-2.3 Promotional Sidebar Card**
- Bottom-of-sidebar card: "Special Offer — Summer Sale — Up to 50% Off" with "Shop Now" CTA button and illustrative graphic.
- Dismissible or rotating with other seasonal campaigns (configurable content).

**FR-2.4 Footer Utility Links**
- "Need Help? 24/7 Support Center" link (opens support/contact page)
- "Light Mode" toggle switch (see FR-9)

**FR-2.5 Responsive Collapse**
- On smaller viewports, sidebar collapses into a hamburger/drawer menu or bottom navigation bar.

---

### 3.3 Hero Banner (Carousel)
**FR-3.1 Hero Content**
- Large promotional banner with: eyebrow tag ("New Collection"), headline ("Find Your Style, Love Your Look"), subtext, and "Shop Now" CTA button with arrow icon.
- Background: lifestyle/fashion image with decorative color blobs.

**FR-3.2 Carousel Behavior**
- Multiple slides supported (dot indicators shown at bottom center, 4 dots in design).
- Auto-rotate every ~5 seconds; pause on hover.
- Manual navigation via dot indicators (click to jump to slide); optional arrow controls.
- Swipe support on touch devices.

---

### 3.4 Category Quick Access
**FR-4.1 Category Grid**
- Horizontal row of circular icon buttons with labels: Fashion, Beauty, Electronics, Home & Living, Sports, More.
- Each icon has a distinct pastel background color.
- Clicking navigates to the respective category's PLP (`/category/:slug`).
- "More" opens full category list/menu.

---

### 3.5 Promotional Banner Cards
**FR-5.1 Three-Card Row**
Three equal-width cards below category grid:
1. **Flash Sale** — "Limited time deal", "Up to 70% OFF", live countdown timer (HH:MM:SS format shown as `02:45:18`), "Shop now" link.
2. **Free Shipping** — "On orders over $50", package icon illustration, "Shop now" link.
3. **New Arrivals** — "Check out the latest trends", "Shop now" link.

**FR-5.2 Countdown Timer Logic**
- Flash Sale card countdown must decrement in real time (client-side timer using `setInterval` or `requestAnimationFrame`, synced to a target end timestamp).
- When timer reaches zero, show "Sale Ended" state or refresh to next promotion.

---

### 3.6 Product Listing Sections (PLP-style sections on Home)

**FR-6.1 "Best Deals for You"**
- Section header with title + "View All" link (navigates to full deals page).
- Horizontal scrollable/carousel row of Product Cards (4 visible at a time in design), with pagination dots below.

**FR-6.2 "Recommended for You"**
- Same structure as Best Deals; personalization logic can be mocked (static list) for this phase, later driven by user behavior/API.

**FR-6.3 Product Card Component** (reusable across all listing sections)
Each card must display:
- Product image (with hover zoom/secondary image swap — optional enhancement)
- Discount badge (top-left, e.g., "-25%", red background) — conditional, only if on sale
- Wishlist heart icon (top-right, toggles filled/outline state, top layer over image)
- Product name (2-line max, ellipsis overflow)
- Variant/subtitle text (e.g., "Women's Shoes", "Olive Green")
- Price: current price (bold) + original price (strikethrough) if discounted
- Star rating + review count (e.g., "4.8 (124)") — shown on deal cards
- Color swatch selector (small circles) — shown on recommended cards with variants
- Add-to-cart icon button (circular, purple, bottom-right of card)
- Entire card clickable → navigates to PDP, except interactive sub-elements (wishlist icon, add-to-cart, swatches) which perform inline actions without navigating.

**FR-6.4 Carousel/Pagination**
- Each product section supports horizontal pagination (dot indicators shown under "Best Deals for You").
- Optionally support arrow/drag navigation.

---

### 3.7 Shopping Cart Panel (Right Sidebar)
**FR-7.1 Cart Header**
- Title: "My Cart (N)" where N = total item count.
- Close/collapse icon (X) — allows toggling cart panel visibility (esp. on smaller screens where it becomes a drawer).

**FR-7.2 Cart Line Items**
Each cart item row displays:
- Product thumbnail image
- Product name + variant details (size/color, e.g., "Size: 7 US")
- Unit price
- Quantity stepper (− / count / +) with min quantity = 1
- Remove/delete icon (trash can)
- Updating quantity recalculates line total and order summary in real time.

**FR-7.3 Promo Code**
- Input field: "Promo Code" + "Apply" button.
- On valid code: apply discount, update "Discount" line in summary, show success state.
- On invalid code: show inline error message.

**FR-7.4 Order Summary**
- Subtotal (sum of line items)
- Discount (if promo applied or item-level discounts), shown in red/negative
- Shipping (e.g., "Free" or calculated fee)
- Total (Subtotal − Discount + Shipping)
- All values recalculate reactively as cart changes.

**FR-7.5 Checkout CTA**
- Prominent button: "Checkout (N)" showing item count, with lock icon (indicates secure checkout) and arrow icon.
- Disabled state when cart is empty, with an empty-cart message/illustration.
- Navigates to `/checkout` flow (checkout flow itself: address → payment → review — can be a separate SRS section/phase).

**FR-7.6 Accepted Payment Icons**
- Row of payment method icons (Visa, Mastercard, Amex/PayPal, Apple Pay, Google Pay) shown for trust-signaling below checkout button. Static display only in this phase.

**FR-7.7 Empty State**
- If cart is empty, show illustration + "Your cart is empty" + "Continue Shopping" CTA.

---

### 3.8 Cross-sell & Discovery Panels (below cart)

**FR-8.1 "You might also like"**
- Compact list (2–3 items) with small thumbnail, name, subtitle, price, and a small circular "+" add-to-cart button.

**FR-8.2 "Recently Viewed"**
- Horizontal row of small square thumbnails (last N products viewed by the user), stored in local storage/session for guest users, or user profile for logged-in users.

**FR-8.3 "Join Trendify Club" Membership Banner**
- Promotional card: headline, subtext ("Get exclusive offers, early access and more"), "Join Now" CTA button, decorative icon (gift/crown).
- Clicking navigates to membership signup/details page or opens a modal.

---

### 3.9 Trust Badges Footer Strip
**FR-9.1 Badge Row**
Horizontal strip (below main product sections) with 4 icons + text pairs:
- Secure Payment — "100% secure payment"
- Easy Returns — "30-day return policy"
- 24/7 Support — "Dedicated support"
- Trusted by Thousands — "4.8 average rating"

---

### 3.10 Theme Toggle
**FR-10.1 Light/Dark Mode**
- Toggle switch in sidebar footer labeled "Light Mode" (or "Dark Mode" depending on active state).
- Persists preference in `localStorage`.
- Applies theme via CSS variables / Tailwind `dark:` class strategy across entire app.

---

### 3.11 Search & Filtering (Search Results / Category PLP — extrapolated requirement)
Although not fully shown in the home design, the following are required to make the product usable end-to-end:
- **FR-11.1** Search results page listing matched products using the same Product Card component.
- **FR-11.2** Category page with filter sidebar (price range, brand, rating, size/color) and sort dropdown (Price: Low-High, High-Low, Newest, Best Rated).
- **FR-11.3** Pagination or infinite scroll for result sets.
- **FR-11.4** "No results found" empty state with suggestions.

### 3.12 Product Detail Page (extrapolated requirement)
- **FR-12.1** Image gallery (main image + thumbnails), zoom on hover.
- **FR-12.2** Product title, brand, price, discount, rating & reviews summary.
- **FR-12.3** Variant selectors (size, color) with stock-aware disabling.
- **FR-12.4** Quantity selector + "Add to Cart" + "Buy Now" + "Add to Wishlist".
- **FR-12.5** Tabs: Description, Specifications, Reviews.
- **FR-12.6** Related products carousel.

### 3.13 Account & Order Management (extrapolated requirement)
- **FR-13.1** My Orders — list with status (Processing, Shipped, Delivered, Cancelled), order detail view.
- **FR-13.2** Wishlist page — grid of saved items with "Move to Cart" / "Remove" actions.
- **FR-13.3** Coupons page — list of available/saved coupon codes with terms.
- **FR-13.4** Addresses — CRUD for shipping addresses, default address selection.
- **FR-13.5** Account Settings — profile edit (name, email, phone, password, avatar), notification preferences.

### 3.14 Authentication (extrapolated requirement)
- **FR-14.1** Sign In / Register modal or page (email/password; optionally social login — future scope).
- **FR-14.2** Forgot Password flow.
- **FR-14.3** Session persistence (guest vs. authenticated state).

---

## 4. External Interface Requirements

### 4.1 User Interfaces
- Web responsive UI per Section 8 (Design System) below.
- Key pages/screens required:
  1. Home
  2. Category / Product Listing Page
  3. Search Results Page
  4. Product Detail Page
  5. Cart (panel + dedicated `/cart` page for mobile)
  6. Checkout (Address → Payment → Review → Confirmation)
  7. Wishlist
  8. My Orders (list + detail)
  9. Coupons
  10. Addresses
  11. Account Settings
  12. Sign In / Register
  13. 404 / Empty states

### 4.2 Hardware Interfaces
- None specific; standard consumer devices (desktop, laptop, tablet, smartphone).

### 4.3 Software Interfaces
- **Future REST/GraphQL API** for: products, categories, cart, orders, users, promotions, reviews.
- **Payment Gateway** (future): Stripe / SSLCommerz / bKash (for Bangladesh market relevance).
- **Image CDN**: Cloudinary / Vercel Image Optimization (future).

### 4.4 Communication Interfaces
- HTTPS for all client-server communication (future backend phase).
- WebSocket or polling (future) for real-time notification updates.

---

## 5. Non-Functional Requirements

### 5.1 Performance
- Initial page load (Home) should render meaningful content within ~2 seconds on a standard broadband connection (Largest Contentful Paint target < 2.5s).
- Images must be lazy-loaded (below-the-fold) and optimized (Next.js `<Image>` component, WebP format).
- Product carousels should use virtualization or windowing if product counts grow large.

### 5.2 Usability
- Consistent, predictable navigation (sidebar always accessible).
- Clear visual feedback for all interactive states (hover, active, disabled, loading).
- Cart updates should reflect instantly (optimistic UI) without full page reload.

### 5.3 Responsiveness / Compatibility
Breakpoint strategy (Tailwind defaults recommended):
| Breakpoint | Width | Layout Behavior |
|---|---|---|
| Mobile | < 640px | Sidebar → bottom nav/drawer; Cart → slide-over drawer; single-column product grid (2 cols) |
| Tablet | 640–1024px | Sidebar collapsible/icon-only; Cart → drawer; 2–3 column product grid |
| Desktop | > 1024px | Full 3-column layout as per design (Sidebar + Content + Cart) |

### 5.4 Accessibility
- WCAG 2.1 AA target: sufficient color contrast, focus-visible states, alt text on all images, semantic landmarks (`<nav>`, `<main>`, `<aside>`), ARIA labels for icon-only buttons (e.g., wishlist heart, cart trash icon).
- Full keyboard operability (tab order, Enter/Space activation, Escape to close modals/drawers).

### 5.5 Security (frontend scope)
- No sensitive data (tokens, passwords) stored in plain localStorage; use httpOnly cookies when backend is integrated.
- Input sanitization on search/promo code fields to prevent injection in future API calls.

### 5.6 Maintainability
- Component-driven architecture; each UI block in Section 3 maps to an isolated, reusable, typed React component.
- Centralized design tokens (colors, spacing, radius, shadows) via Tailwind config — no hardcoded hex values in components.
- Mock data layer abstracted behind a service/API interface so swapping to real API later requires minimal refactor.

### 5.7 Scalability (future-facing)
- Architecture should support adding new categories, promotional modules, and pages without structural rewrites.

---

## 6. Data Requirements (Frontend Data Model — Mock/Future API Shape)

### 6.1 Product
```
Product {
  id: string
  name: string
  slug: string
  category: string
  subcategory?: string
  images: string[]
  price: number
  originalPrice?: number
  discountPercent?: number
  rating: number
  reviewCount: number
  colors?: string[]
  sizes?: string[]
  stock: number
  isFlashSale?: boolean
  isNewArrival?: boolean
  isBestSeller?: boolean
  description?: string
  brand?: string
}
```

### 6.2 CartItem
```
CartItem {
  productId: string
  name: string
  image: string
  variant?: { size?: string; color?: string }
  unitPrice: number
  quantity: number
}
```

### 6.3 User
```
User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  addresses: Address[]
  wishlist: string[]  // product ids
}
```

### 6.4 Promotion / Banner
```
Promotion {
  id: string
  type: 'hero' | 'flash-sale' | 'free-shipping' | 'new-arrivals' | 'sidebar' | 'membership'
  title: string
  subtitle?: string
  ctaLabel: string
  ctaLink: string
  image?: string
  endTime?: string  // ISO timestamp for countdown
}
```

### 6.5 Coupon
```
Coupon {
  code: string
  discountType: 'percent' | 'fixed'
  discountValue: number
  minOrderValue?: number
  expiryDate: string
}
```

---

## 7. Suggested Component Architecture (Next.js + TypeScript + Tailwind)

```
/app
  /(shop)
    /page.tsx                 → Home
    /category/[slug]/page.tsx → Category PLP
    /product/[slug]/page.tsx  → PDP
    /search/page.tsx          → Search results
    /cart/page.tsx            → Mobile cart page
    /checkout/page.tsx
    /wishlist/page.tsx
    /orders/page.tsx
    /orders/[id]/page.tsx
    /coupons/page.tsx
    /addresses/page.tsx
    /account/page.tsx
  /(auth)
    /login/page.tsx
    /register/page.tsx

/components
  /layout
    Header.tsx
    Sidebar.tsx
    CartPanel.tsx
    Footer.tsx (trust badges)
  /home
    HeroCarousel.tsx
    CategoryGrid.tsx
    PromoBannerRow.tsx        (Flash Sale / Free Shipping / New Arrivals)
    FlashSaleCountdown.tsx
    ProductSection.tsx        (used for Best Deals, Recommended)
    RecentlyViewed.tsx
    MembershipBanner.tsx
  /product
    ProductCard.tsx
    ProductGrid.tsx
    RatingStars.tsx
    ColorSwatchSelector.tsx
    WishlistButton.tsx
    AddToCartButton.tsx
  /cart
    CartItemRow.tsx
    OrderSummary.tsx
    PromoCodeInput.tsx
  /ui  (design-system primitives)
    Button.tsx
    Badge.tsx
    Card.tsx
    Input.tsx
    Modal.tsx
    Drawer.tsx
    Toggle.tsx

/lib
  /data (mock JSON / TS fixtures)
  /api  (service functions — swappable for real API later)
  /hooks (useCart, useWishlist, useTheme, useCountdown)
  /store (Zustand or Context providers)

/types
  product.ts, cart.ts, user.ts, promotion.ts
```

---

## 8. Design System Reference (extracted from provided mockup)

### 8.1 Color Palette
| Token | Approx. Hex | Usage |
|---|---|---|
| Primary (Purple) | `#7C5CFC` / `#8B5CF6` | Sidebar active state, buttons, links, badges |
| Primary Gradient | Purple → Lavender/Pink | Hero banner, promo cards, membership banner |
| Accent Red | `#EF4444` | Discount badges, "Hot" tag, sale prices |
| Accent Green | `#F0FDF4` bg / `#16A34A` text | Free shipping card, "Free" shipping label |
| Neutral Background | `#F8F7FC` | Page background |
| Card Background | `#FFFFFF` | Cards, panels |
| Text Primary | `#1F2937` | Headings |
| Text Secondary | `#6B7280` | Subtext, metadata |

### 8.2 Typography
- Sans-serif font family (e.g., Inter, Poppins, or similar geometric sans)
- Headings: semi-bold/bold, larger sizes for hero (~28–32px)
- Body/labels: 13–15px
- Prices: bold weight, distinct color for discounted vs. strikethrough original price

### 8.3 Spacing & Shape
- Rounded corners throughout (cards ~16–20px radius, buttons fully rounded/pill-shaped for CTAs)
- Soft drop shadows on cards and panels
- Consistent 16–24px gutter spacing in grids

### 8.4 Iconography
- Line-style icons (outline), consistent stroke width (recommend `lucide-react` icon set)

---

## 9. Page Inventory & Priority (for phased development)

| Priority | Page/Feature | Notes |
|---|---|---|
| P0 | Home page (all sections in Section 3.1–3.10) | Core showcase page |
| P0 | Product Card + Cart Panel logic | Central interaction |
| P1 | Product Detail Page | Needed for full user flow |
| P1 | Category / Search Listing Page | Needed for browsing flow |
| P1 | Cart page (mobile) & Checkout flow | Needed to complete purchase journey |
| P2 | Wishlist, Orders, Coupons, Addresses, Account Settings | Secondary account pages |
| P2 | Auth (Login/Register) | Needed for gated features |
| P3 | Dark mode polish, animations, micro-interactions | Enhancement |

---

## 10. Acceptance Criteria (Sample — Home Page)
- [ ] All sections from Section 3 render with mock data matching the design layout
- [ ] Sidebar navigation highlights the active route correctly
- [ ] Cart panel updates totals correctly when quantity changes or items are removed
- [ ] Flash sale countdown timer counts down in real time and doesn't reset on re-render
- [ ] Wishlist heart toggles state and persists (localStorage for guest, API for logged-in — future)
- [ ] Layout is fully responsive at 375px, 768px, 1024px, 1440px widths
- [ ] Light/Dark mode toggle switches theme instantly and persists on reload
- [ ] Lighthouse accessibility score ≥ 90 on Home page

---

## 11. Future Enhancements (Out of Current Scope)
- Real backend API integration (Node.js/Express or Next.js API routes + PostgreSQL + Redis for cart caching — aligned with your existing stack)
- Real payment gateway integration
- Product reviews & ratings submission
- Admin dashboard for inventory/order management
- Personalization/recommendation engine (beyond static mock)
- Multi-language / multi-currency support
- Automated E2E test suite using Playwright + POM (aligned with your QA background) covering: search, add-to-cart, checkout, wishlist flows

---

## 12. Document Control
| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-08-16 | Initial SRS created from approved UI design |

