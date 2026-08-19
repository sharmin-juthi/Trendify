import React from 'react';
import { HeroCarousel } from '../home/HeroCarousel';
import { TrustBadgesStrip } from '../home/TrustBadgesStrip';
import { CategoryGrid } from '../home/CategoryGrid';
import { ProductSection } from '../home/ProductSection';
import { FlashSaleBanner } from '../home/FlashSaleBanner';
import { FeaturedCollections } from '../home/FeaturedCollections';
import { MOCK_PRODUCTS } from '../../data/mockData';

export const HomeView: React.FC = () => {
  // 2 rows = 8 products for featured
  const featuredProducts = MOCK_PRODUCTS.slice(0, 8);
  // 4 rows = 16 products for new arrivals (repeat/use all available)
  const newArrivals = [...MOCK_PRODUCTS].reverse();

  return (
    <div className="space-y-12">
      {/* 1. Hero Carousel Banner */}
      <HeroCarousel />

      {/* 2. Trust Badges Strip (4 Badges: Secure Payment, Easy Returns, 24/7 Support, Trusted by Thousands) */}
      <TrustBadgesStrip />

      {/* 3. Shop by Category (8 Cards with PNG Images) */}
      <CategoryGrid />

      {/* 4. Featured Products — 2 rows of 4 */}
      <ProductSection
        title="Featured Products"
        products={featuredProducts}
        rows={2}
      />

      {/* 5. Flash Sale Dark Countdown Banner */}
      <FlashSaleBanner />

      {/* 6. Featured Collections — 5 Bento Grid */}
      <FeaturedCollections />

      {/* 7. New Arrivals — 4 rows */}
      <ProductSection
        title="New Arrivals"
        products={newArrivals}
        rows={4}
      />
    </div>
  );
};
