import React from 'react';
import { ShoppingBag, X, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';
import { FALLBACK_IMAGE } from '../data/productImages';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onProceedCheckout: () => void;
  couponCode: string;
  setCouponCode: (val: string) => void;
  onApplyCoupon: () => void;
  couponDiscount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onProceedCheckout,
  couponCode,
  setCouponCode,
  onApplyCoupon,
  couponDiscount
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
  const gstAmount = Math.round(subtotal * 0.18);
  const shippingFee = subtotal > 3999 || subtotal === 0 ? 0 : 499;
  const grandTotal = Math.max(0, subtotal + gstAmount + shippingFee - couponDiscount);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#0B192C] text-white">
          <div className="flex items-center space-x-2.5">
            <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
            <h3 className="font-serif font-bold text-lg">Your Sleep Basket</h3>
            <span className="text-xs text-gray-300 font-mono">({cart.reduce((c, i) => c + i.qty, 0)} items)</span>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="text-gray-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-16">
              <div className="w-16 h-16 rounded-full bg-[#FAF9F6] flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-gray-300" />
              </div>
              <h4 className="font-serif font-bold text-gray-800 text-lg">Your basket is empty</h4>
              <p className="text-xs text-gray-500 mt-1 max-w-xs leading-relaxed">
                Discover India's most comfortable orthopedic mattresses, natural latex, and contour cervical pillows.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-[#0B192C] hover:bg-[#1E3E62] text-[#C5A880] text-xs font-bold rounded-xl transition shadow"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.cartKey} 
                className="flex gap-3 p-3 bg-[#FAF9F6] rounded-2xl border border-gray-100 relative group"
              >
                <img 
                  src={item.product.images[0] || FALLBACK_IMAGE} 
                  alt={item.product.title} 
                  className="w-20 h-20 object-cover rounded-xl shrink-0 border border-gray-200"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== FALLBACK_IMAGE) {
                      target.src = FALLBACK_IMAGE;
                    }
                  }}
                />
                
                <div className="flex-1 pr-6">
                  <h4 className="text-xs font-bold text-[#0B192C] leading-snug line-clamp-1">
                    {item.product.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {item.size} • {item.thickness}
                  </p>
                  {item.isCustom && item.customDetails && (
                    <span className="inline-block mt-1 text-[10px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded">
                      Custom: {item.customDetails.lengthInches}" × {item.customDetails.widthInches}" ({item.customDetails.cornerType})
                      {item.customDetails.estimatedWeightKg ? ` • Net Wt: ${item.customDetails.estimatedWeightKg} kg` : ''}
                    </span>
                  )}

                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="font-serif font-black text-sm text-[#0B192C]">
                      ₹{(item.unitPrice * item.qty).toLocaleString('en-IN')}
                    </span>

                    <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-2xs">
                      <button 
                        type="button"
                        onClick={() => onUpdateQty(item.cartKey, -1)} 
                        className="px-2 py-0.5 text-xs font-black text-gray-600 hover:bg-gray-100 rounded-l"
                      >
                        -
                      </button>
                      <span className="px-2.5 text-xs font-bold text-[#0B192C]">{item.qty}</span>
                      <button 
                        type="button"
                        onClick={() => onUpdateQty(item.cartKey, 1)} 
                        className="px-2 py-0.5 text-xs font-black text-gray-600 hover:bg-gray-100 rounded-r"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => onRemoveItem(item.cartKey)} 
                  className="absolute top-2.5 right-2.5 text-gray-400 hover:text-red-600 transition p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Billing Details */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white space-y-3">
            {/* Coupon Box */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Coupon: SLEEPNEW / COMFORT2000"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="w-full pl-9 pr-3 py-1.5 text-xs uppercase bg-[#FAF9F6] border border-gray-300 rounded-lg focus:border-[#C5A880] outline-none font-medium"
                />
              </div>
              <button 
                type="button"
                onClick={onApplyCoupon}
                className="px-4 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-[#C5A880] text-xs font-bold rounded-lg transition"
              >
                Apply
              </button>
            </div>

            <div className="space-y-1.5 text-xs text-gray-600 border-t pt-2">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Pan-India GST (18% Included):</span>
                <span>₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>White-Glove Delivery:</span>
                <span className="text-emerald-700 font-bold">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount Applied:</span>
                  <span>- ₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between font-serif font-black text-base text-[#0B192C] pt-2 border-t">
                <span>Grand Total:</span>
                <span className="text-[#C5A880]">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={onProceedCheckout}
              className="w-full bg-[#0B192C] hover:bg-[#1E3E62] text-[#C5A880] py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Proceed to Pan-India Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100-Night Trial • 256-Bit Encrypted Payment</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
