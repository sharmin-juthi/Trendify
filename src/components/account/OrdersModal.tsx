import React from 'react';
import { X, Package, Clock, CheckCircle2, Truck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const OrdersModal: React.FC = () => {
  const { isOrdersModalOpen, setIsOrdersModalOpen, orders } = useShop();

  if (!isOrdersModalOpen) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Delivered
          </span>
        );
      case 'Processing':
        return (
          <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-[10px] font-extrabold rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-600" /> Processing
          </span>
        );
      case 'Shipped':
        return (
          <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold rounded-full flex items-center gap-1">
            <Truck className="w-3 h-3 text-blue-600" /> Shipped
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-[10px] font-extrabold rounded-full">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1F150C] p-2 text-[#E1DCC9] flex items-center justify-center font-bold">
              <img src="/icon.png" alt="Orders" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-gray-900 dark:text-gray-100">
                My Orders Tracker
              </h3>
              <p className="text-xs text-gray-400 font-medium">
                {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOrdersModalOpen(false)}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
          {orders.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#412D15]/10 dark:bg-gray-800 text-[#412D15] flex items-center justify-center mx-auto">
                <Package className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                No orders placed yet
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 space-y-4"
              >
                {/* Order Top Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-200/60 dark:border-gray-700/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-gray-900 dark:text-gray-100">
                        Order #{order.id}
                      </span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
                      Placed on {new Date(order.placedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-gray-400 font-medium">Total Paid</span>
                    <p className="text-base font-black text-[#412D15]">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Items list */}
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-gray-200 dark:border-gray-700"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">
                          {item.name}
                        </p>
                        {item.variantText && (
                          <p className="text-[11px] text-gray-400">{item.variantText}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Address & Payment Info Footer */}
                <div className="pt-3 border-t border-gray-200/60 dark:border-gray-700/60 flex flex-wrap justify-between text-[11px] text-gray-500 dark:text-gray-400 font-medium gap-2">
                  <span>Deliver to: {order.shippingAddress.street}, {order.shippingAddress.city}</span>
                  <span>Payment: {order.paymentMethod}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

