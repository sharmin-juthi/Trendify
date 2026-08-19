import React, { useState } from 'react';
import {
  X,
  MapPin,
  CreditCard,
  CheckCircle2,
  Plus,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    user,
    addAddress,
    cart,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTotal,
    placeOrder
  } = useShop();

  if (!isCheckoutModalOpen) return null;

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    user.addresses[0]?.id || ''
  );

  const [paymentMethod, setPaymentMethod] = useState<string>('Credit Card (**** 4821)');
  const [isAddingNewAddr, setIsAddingNewAddr] = useState(false);

  // New Address Form State
  const [newLabel, setNewLabel] = useState('Home');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newPostal, setNewPostal] = useState('');

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStreet && newCity) {
      addAddress({
        label: newLabel,
        street: newStreet,
        city: newCity,
        postalCode: newPostal || '94101',
        country: 'United States',
        isDefault: false
      });
      setIsAddingNewAddr(false);
      setNewStreet('');
      setNewCity('');
    }
  };

  const handlePlaceOrder = () => {
    const selectedAddress =
      user.addresses.find((a) => a.id === selectedAddressId) || user.addresses[0];
    if (!selectedAddress) return;

    placeOrder(selectedAddress, paymentMethod);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1F150C] p-2 flex items-center justify-center font-bold">
              <img src="/icon.png" alt="Checkout" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-gray-900 dark:text-gray-100">
                Express Checkout
              </h3>
              <p className="text-xs text-gray-400 font-medium">
                Step {step} of 2 • {step === 1 ? 'Shipping Address' : 'Payment Method'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          {step === 1 ? (
            /* Step 1: Select or Add Shipping Address */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#412D15]" /> Select Shipping Address
                </h4>
                <button
                  onClick={() => setIsAddingNewAddr(!isAddingNewAddr)}
                  className="text-xs font-bold text-[#412D15] hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {isAddingNewAddr ? 'Cancel' : 'Add New Address'}
                </button>
              </div>

              {isAddingNewAddr ? (
                <form onSubmit={handleCreateAddress} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl space-y-3 border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Label</label>
                      <input
                        type="text"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        placeholder="Home / Work"
                        className="w-full mt-1 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Postal Code</label>
                      <input
                        type="text"
                        value={newPostal}
                        onChange={(e) => setNewPostal(e.target.value)}
                        placeholder="94107"
                        className="w-full mt-1 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Street Address</label>
                    <input
                      type="text"
                      required
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      placeholder="123 Market Street, Apt 5"
                      className="w-full mt-1 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">City</label>
                    <input
                      type="text"
                      required
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder="San Francisco"
                      className="w-full mt-1 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#412D15] text-[#E1DCC9] rounded-xl text-xs font-bold hover:bg-[#1F150C] transition-colors"
                  >
                    Save Address
                  </button>
                </form>
              ) : (
                <div className="space-y-3">
                  {user.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                        selectedAddressId === addr.id
                          ? 'border-[#412D15] bg-[#412D15]/10 ring-2 ring-[#412D15]/20'
                          : 'border-gray-200 dark:border-gray-800 hover:border-[#412D15]/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-gray-900 dark:text-gray-100">
                            {addr.label}
                          </span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 bg-[#E1DCC9] text-[#1F150C] text-[10px] font-bold rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {addr.street}, {addr.city}, {addr.postalCode}, {addr.country}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                          selectedAddressId === addr.id
                            ? 'border-[#412D15] bg-[#412D15] text-white'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedAddressId === addr.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Step 2: Select Payment Method */
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#412D15]" /> Choose Payment Option
              </h4>

              <div className="space-y-3">
                {[
                  { id: 'card', name: 'Credit / Debit Card (Visa/Mastercard)', detail: '**** **** **** 4821' },
                  { id: 'paypal', name: 'PayPal Express Checkout', detail: 'Instant 1-Click Pay' },
                  { id: 'applepay', name: 'Apple Pay / Google Pay', detail: 'Biometric Touch ID' }
                ].map((pm) => (
                  <div
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.name)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      paymentMethod === pm.name
                        ? 'border-[#412D15] bg-[#412D15]/10 ring-2 ring-[#412D15]/20'
                        : 'border-gray-200 dark:border-gray-800 hover:border-[#412D15]/40'
                    }`}
                  >
                    <div>
                      <p className="font-extrabold text-xs text-gray-900 dark:text-gray-100">
                        {pm.name}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{pm.detail}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === pm.name
                          ? 'border-[#412D15] bg-[#412D15] text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {paymentMethod === pm.name && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Snapshot */}
              <div className="mt-6 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 space-y-2 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">${cartSubtotal.toFixed(2)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-red-500 font-bold">
                    <span>Discount</span>
                    <span>-${cartDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Shipping Fee</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">
                    {cartShippingFee === 0 ? 'FREE' : `$${cartShippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-black text-sm text-gray-900 dark:text-gray-100">
                  <span>Final Total</span>
                  <span className="text-[#412D15]">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
          {step === 2 ? (
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Back to Address
            </button>
          ) : (
            <div />
          )}

          {step === 1 ? (
            <button
              disabled={!selectedAddressId}
              onClick={() => setStep(2)}
              className="py-3 px-6 bg-[#412D15] hover:bg-[#1F150C] text-[#E1DCC9] rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#412D15]/25 transition-all"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handlePlaceOrder}
              className="py-3.5 px-6 bg-gradient-to-r from-[#1F150C] to-[#412D15] text-[#E1DCC9] rounded-2xl font-black text-xs flex items-center gap-2 shadow-xl shadow-[#412D15]/30 transition-all hover:scale-102"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Confirm & Pay ${cartTotal.toFixed(2)}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

