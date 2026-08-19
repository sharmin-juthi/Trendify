import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const FlashSaleBanner: React.FC = () => {
  const { navigateTo } = useShop();

  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 22
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#1F150C] text-[#E1DCC9] p-8 sm:p-12 lg:p-14 shadow-2xl border border-[#412D15]/40 select-none">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side Info (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#E1DCC9]">
            <Zap className="w-4 h-4 fill-[#E1DCC9]" />
            <span>FLASH SALE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight text-white">
            Up to 70% OFF
          </h2>

          <p className="text-xs sm:text-sm text-[#E1DCC9]/80 font-medium">
            Limited time offer on selected accessories. Grab your favorite audio gear & smart gadgets before stock runs out.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigateTo('category', 'all')}
              className="py-3 px-6 bg-[#E1DCC9] text-[#1F150C] hover:bg-white rounded-full font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 text-[#1F150C]" />
            </button>
          </div>
        </div>

        {/* Center Countdown Boxes (4 cols) */}
        <div className="lg:col-span-4 flex items-center justify-center gap-3">
          {[
            { label: 'Days', value: formatDigit(timeLeft.days) },
            { label: 'Hours', value: formatDigit(timeLeft.hours) },
            { label: 'Mins', value: formatDigit(timeLeft.minutes) },
            { label: 'Secs', value: formatDigit(timeLeft.seconds) }
          ].map((item, idx) => (
            <div
              key={idx}
              className="w-16 sm:w-20 py-3 rounded-2xl bg-[#412D15]/60 backdrop-blur-md border border-[#E1DCC9]/20 text-center"
            >
              <span className="text-xl sm:text-3xl font-black block font-mono text-[#E1DCC9]">
                {item.value}
              </span>
              <span className="text-[10px] font-extrabold text-[#E1DCC9]/80 uppercase tracking-wider block mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Right Product Image & Discount Badge (3 cols) */}
        <div className="lg:col-span-3 relative flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
            alt="Flash Sale Audio Gear"
            className="w-48 h-48 object-cover rounded-2xl drop-shadow-2xl border border-[#412D15]"
          />

          {/* Floating Discount Badge */}
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-[#412D15] text-[#E1DCC9] flex flex-col items-center justify-center shadow-2xl border-2 border-[#E1DCC9]">
            <span className="text-[9px] font-extrabold uppercase">UP TO</span>
            <span className="text-base font-black leading-none">70%</span>
            <span className="text-[9px] font-extrabold uppercase">OFF</span>
          </div>
        </div>
      </div>
    </div>
  );
};
