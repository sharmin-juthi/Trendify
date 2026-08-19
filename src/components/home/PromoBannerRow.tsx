import React, { useState, useEffect } from 'react';
import { Flame, Truck, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const PromoBannerRow: React.FC = () => {
  const { navigateTo } = useShop();

  // Real-time Flash Sale Countdown (2 hours 45 mins 18 secs target)
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none">
      {/* 1. Flash Sale Card */}
      <div
        onClick={() => navigateTo('category', 'all')}
        className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 text-white shadow-xl shadow-red-500/20 cursor-pointer group hover:scale-[1.02] transition-transform"
      >
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 fill-white" /> Flash Sale
          </span>
          <span className="text-xs font-bold text-red-100">Up to 70% OFF</span>
        </div>

        <div className="mt-4 space-y-2">
          <h4 className="text-lg font-black leading-tight">Limited Time Deal</h4>
          <p className="text-xs text-red-100 font-medium">
            Hurry! Stock is running out fast on trending audio & apparel.
          </p>
        </div>

        {/* Live Timer Badges */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5 text-rose-300" />
            <span>{formatDigit(timeLeft.hours)}</span>:
            <span>{formatDigit(timeLeft.minutes)}</span>:
            <span className="text-yellow-300">{formatDigit(timeLeft.seconds)}</span>
          </div>
          <span className="text-[11px] text-rose-100 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Shop now <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* 2. Free Shipping Card */}
      <div
        onClick={() => navigateTo('category', 'all')}
        className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xl shadow-emerald-500/20 cursor-pointer group hover:scale-[1.02] transition-transform"
      >
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" /> Express Delivery
          </span>
          <span className="text-xs font-bold text-emerald-100">Worldwide</span>
        </div>

        <div className="mt-4 space-y-2">
          <h4 className="text-lg font-black leading-tight">Free Shipping</h4>
          <p className="text-xs text-emerald-100 font-medium">
            Enjoy 100% free doorstep delivery on all orders over $50.
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-200">No promo code needed</span>
          <span className="text-xs font-bold text-white group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Shop now <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* 3. New Arrivals Card */}
      <div
        onClick={() => navigateTo('category', 'all')}
        className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-[#1F150C] via-[#312010] to-[#412D15] text-[#E1DCC9] shadow-xl shadow-[#1F150C]/20 cursor-pointer group hover:scale-[1.02] transition-transform"
      >
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-white">
            <Sparkles className="w-3.5 h-3.5" /> Just Dropped
          </span>
          <span className="text-xs font-bold text-[#E1DCC9]">2026 Trends</span>
        </div>

        <div className="mt-4 space-y-2">
          <h4 className="text-lg font-black leading-tight text-white">New Arrivals</h4>
          <p className="text-xs text-[#E1DCC9]/80 font-medium">
            Explore the latest streetwear, smart gear, and wellness products.
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-bold text-[#E1DCC9]/90">Fresh Stock Weekly</span>
          <span className="text-xs font-bold text-white group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Shop now <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};

