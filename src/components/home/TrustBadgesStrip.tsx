import React from 'react';
import { ShieldCheck, RefreshCw, Headphones, Award } from 'lucide-react';

export const TrustBadgesStrip: React.FC = () => {
  const badges = [
    {
      icon: ShieldCheck,
      title: '100% Secure Payment',
      subtitle: '256-bit Tokenized Encryption',
      color: 'bg-[#E1DCC9] text-[#1F150C]'
    },
    {
      icon: RefreshCw,
      title: '30-Day Easy Returns',
      subtitle: 'Hassle-free money back guarantee',
      color: 'bg-[#E1DCC9] text-[#1F150C]'
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      subtitle: 'Instant live agent chat & email',
      color: 'bg-[#E1DCC9] text-[#1F150C]'
    },
    {
      icon: Award,
      title: 'Trusted by Thousands',
      subtitle: '4.9 ★★★★★ Customer Rating',
      color: 'bg-[#E1DCC9] text-[#1F150C]'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
      {badges.map((b, idx) => {
        const Icon = b.icon;
        return (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-[#412D15]/20 shadow-sm hover:border-[#412D15] transition-all"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${b.color}`}>
              <Icon className="w-6 h-6 text-[#1F150C]" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-[#1F150C] dark:text-gray-100">
                {b.title}
              </h4>
              <p className="text-[11px] text-[#412D15] dark:text-[#E1DCC9] font-medium mt-0.5">
                {b.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
