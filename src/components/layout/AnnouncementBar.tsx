import React from 'react';
import { Flame, Truck, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AnnouncementBar: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-[#1F150C] text-[#E1DCC9] text-xs py-2.5 px-4 select-none border-b border-[#412D15]/30">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between font-medium">
        {/* Left Side Promo Text */}
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#E1DCC9] fill-[#E1DCC9]" />
          <span>
            <strong className="text-white">Summer Sale is Live!</strong> Get Up to 60% OFF on Selected Items
          </span>
          <button
            onClick={() => navigateTo('category', 'all')}
            className="text-[#E1DCC9] hover:text-white font-bold underline flex items-center gap-1 ml-1"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3 h-3 text-[#E1DCC9]" />
          </button>
        </div>

        {/* Right Side Free Shipping Threshold */}
        <div className="hidden sm:flex items-center gap-2 text-[#E1DCC9]">
          <Truck className="w-4 h-4 text-[#E1DCC9]" />
          <span className="text-[#E1DCC9]">Free Shipping on orders over $99</span>
        </div>
      </div>
    </div>
  );
};
