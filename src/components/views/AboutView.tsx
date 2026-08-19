import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Headphones, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AboutView: React.FC = () => {
  const { navigateTo } = useShop();

  const stats = [
    { label: 'Happy Customers', value: '150,000+' },
    { label: 'Official Brand Partners', value: '50+' },
    { label: 'Countries Shipped To', value: '35+' },
    { label: 'On-Time Delivery Rate', value: '99.8%' }
  ];

  const pillars = [
    {
      icon: Truck,
      title: 'Ultra-Fast Shipping',
      desc: 'Free 2-day express delivery on all orders over $50 with real-time GPS parcel tracking.'
    },
    {
      icon: ShieldCheck,
      title: '100% Genuine Products',
      desc: 'Sourced directly from official manufacturers with full 2-year warranty coverage.'
    },
    {
      icon: RefreshCw,
      title: '30-Day Risk-Free Returns',
      desc: 'Hassle-free 30-day return policy with instant prepaid shipping labels and quick refunds.'
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      desc: 'Our expert customer care squad is available around the clock via live chat and email.'
    }
  ];

  return (
    <div className="space-y-10 select-none">
      {/* Hero Banner */}
      <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#1F150C] via-[#312010] to-[#1F150C] text-white shadow-xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-[#E1DCC9] mx-auto">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          Reimagining Tech E-Commerce
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
          Empowering Tech Lovers with Premium Modern Gear
        </h1>
        <p className="text-sm sm:text-base text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed">
          Trendify is your trusted destination for cutting-edge audio, smart wearables, and daily EDC gear designed for modern lifestyles.
        </p>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 text-center shadow-sm space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-[#1F150C] dark:text-[#E1DCC9]">{stat.value}</p>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Brand Story Section */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-[#412D15]">Our Story</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1F150C] dark:text-gray-100">
            Crafted for Quality, Performance & Style
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Founded in 2026, Trendify was built on a simple promise: to curate high-quality tech accessories and audio gear without the bloated retail markups. Every product in our collection is rigorously tested for durability, acoustic precision, and aesthetic elegance.
          </p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            We partner exclusively with certified global brands and eco-friendly manufacturers who share our commitment to sustainability and innovation.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-3 bg-[#1F150C] text-[#E1DCC9] rounded-full text-xs font-black hover:bg-[#412D15] transition-colors shadow-md inline-flex items-center gap-2"
          >
            <span>Explore Trendify Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-[#E1DCC9]/40 dark:bg-gray-800 rounded-3xl p-8 text-center space-y-4 flex flex-col justify-center items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#1F150C] p-3 shadow-lg flex items-center justify-center mx-auto">
            <img src="/icon.png" alt="Trendify" className="w-full h-full object-contain" />
          </div>
          <h3 className="text-xl font-black text-[#1F150C] dark:text-gray-100">The Trendify Guarantee</h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 max-w-xs leading-relaxed">
            If you're not 100% satisfied with your purchase within 30 days, we'll refund every single penny — no questions asked.
          </p>
        </div>
      </div>

      {/* 4 Pillars of Excellence */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-[#1F150C] dark:text-gray-100 text-center">
          Why Thousands Choose Trendify
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E1DCC9]/40 text-[#1F150C] flex items-center justify-center">
                <item.icon className="w-6 h-6 text-[#1F150C]" />
              </div>
              <h3 className="font-extrabold text-sm text-[#1F150C] dark:text-gray-100">{item.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
