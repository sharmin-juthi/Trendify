import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useShop();

  if (!isAuthModalOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login(email.trim(), name.trim() || undefined);
    }
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div
        className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#1F150C] p-2 flex items-center justify-center mx-auto shadow-lg shadow-[#1F150C]/30">
            <img src="/icon.png" alt="Trendify" className="w-full h-full object-contain" />
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
            {mode === 'login' ? 'Welcome Back to Trendify' : 'Join Trendify Today'}
          </h3>
          <p className="text-xs text-gray-400 font-medium">
            {mode === 'login'
              ? 'Access your orders, saved wishlist & exclusive coupons'
              : 'Create an account to unlock 10% off your first order'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alina Putri"
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-700 outline-none focus:border-[#412D15]"
                />
                <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alina.putri@trendify.com"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-700 outline-none focus:border-[#412D15]"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-900 dark:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-700 outline-none focus:border-[#412D15]"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#412D15] hover:bg-[#1F150C] text-[#E1DCC9] rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#412D15]/25 transition-all"
          >
            <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="text-center pt-2 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-400 font-medium">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="font-bold text-[#412D15] dark:text-[#E1DCC9] hover:underline"
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
