import React, { useState } from 'react';
import { 
  ShieldCheck, CheckCircle2, Lock, Truck, CreditCard, 
  QrCode, ArrowLeft, Building2, MapPin, AlertCircle, Printer
} from 'lucide-react';
import { CartItem, Order, Address } from '../types';
import { PINCODE_DIRECTORY } from '../data/products';
import { FALLBACK_IMAGE } from '../data/productImages';

interface CheckoutViewProps {
  cart: CartItem[];
  subtotal: number;
  gstAmount: number;
  shippingFee: number;
  couponDiscount: number;
  couponCode: string;
  finalPayable: number;
  onBack: () => void;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  subtotal,
  gstAmount,
  shippingFee,
  couponDiscount,
  couponCode,
  finalPayable,
  onBack,
  onOrderComplete
}) => {
  const [formData, setFormData] = useState<Address>({
    name: 'Ananya Deshmukh',
    mobile: '9820123456',
    email: 'ananya.deshmukh@example.com',
    houseNo: 'A-402, Signature Towers',
    street: 'Koregaon Park Road',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    landmark: 'Near German Bakery'
  });

  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY_UPI' | 'RAZORPAY_CARD' | 'NETBANKING' | 'COD'>('RAZORPAY_UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [upiId, setUpiId] = useState('ananya@okhdfcbank');

  const handlePincodeChange = (pin: string) => {
    const cleaned = pin.replace(/\D/g, '').slice(0, 6);
    const directoryHit = PINCODE_DIRECTORY[cleaned];
    if (directoryHit) {
      setFormData(prev => ({
        ...prev,
        pincode: cleaned,
        city: directoryHit.city.split(',')[0].trim(),
        state: directoryHit.state
      }));
    } else {
      setFormData(prev => ({ ...prev, pincode: cleaned }));
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrder: Order = {
        orderId: `SLP-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cart],
        total: finalPayable,
        subtotal,
        gstAmount,
        shippingFee,
        couponDiscount,
        couponCode,
        address: formData,
        paymentMethod: paymentMethod === 'RAZORPAY_UPI' ? 'Razorpay UPI / QR' :
                       paymentMethod === 'RAZORPAY_CARD' ? 'Razorpay Credit/Debit Card' :
                       paymentMethod === 'NETBANKING' ? 'Indian Net Banking' : 'Cash on Delivery (COD)',
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'CONFIRMED',
        awbNumber: `DELH-${Math.floor(100000000 + Math.random() * 900000000)}`,
        courierPartner: 'Delhivery Express Surface'
      };
      onOrderComplete(newOrder);
    }, 2200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-600 hover:text-[#0B192C]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Shopping</span>
        </button>
        <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
          <Lock className="w-3.5 h-3.5" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Details */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div>
              <h2 className="font-serif font-black text-xl text-[#0B192C]">
                1. Pan-India Delivery Address
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                White-glove doorstep delivery to any verified postal PIN code in India.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="font-bold text-gray-700 block mb-1">Full Name (Consignee) *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-[#FAF9F6] focus:bg-white focus:border-[#C5A880] outline-none font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Mobile Number (For Courier OTP) *</label>
                <div className="flex">
                  <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl font-bold text-gray-500">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3.5 py-2.5 rounded-r-xl border border-gray-300 bg-[#FAF9F6] focus:bg-white focus:border-[#C5A880] outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Email (For GST Tax Invoice) *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-[#FAF9F6] focus:bg-white focus:border-[#C5A880] outline-none font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-gray-700 block mb-1">House / Flat / Floor / Building *</label>
                <input
                  type="text"
                  required
                  value={formData.houseNo}
                  onChange={(e) => setFormData({ ...formData, houseNo: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-[#FAF9F6] focus:bg-white focus:border-[#C5A880] outline-none font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-gray-700 block mb-1">Street / Area / Colony *</label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-[#FAF9F6] focus:bg-white focus:border-[#C5A880] outline-none font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Postal PIN Code (6 Digits) *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-[#FAF9F6] focus:bg-white focus:border-[#C5A880] outline-none font-bold tracking-widest text-center"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">City / District *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-[#FAF9F6] focus:bg-white focus:border-[#C5A880] outline-none font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">State / UT *</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-[#FAF9F6] focus:bg-white focus:border-[#C5A880] outline-none font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Nearby Landmark (Optional)</label>
                <input
                  type="text"
                  value={formData.landmark || ''}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-[#FAF9F6] focus:bg-white focus:border-[#C5A880] outline-none font-medium"
                />
              </div>
            </div>

            {/* Payment Section */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div>
                <h2 className="font-serif font-black text-xl text-[#0B192C]">
                  2. Select Payment Gateway
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Instant authorization via Razorpay India test mode.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { id: 'RAZORPAY_UPI', icon: QrCode, title: 'Razorpay UPI & QR', sub: 'Google Pay, PhonePe, Paytm, BHIM' },
                  { id: 'RAZORPAY_CARD', icon: CreditCard, title: 'Credit / Debit Card', sub: 'Visa, MasterCard, RuPay, Amex' },
                  { id: 'NETBANKING', icon: Building2, title: 'Indian Net Banking', sub: 'HDFC, ICICI, SBI, Axis, Kotak' },
                  { id: 'COD', icon: Truck, title: 'Cash on Delivery (COD)', sub: 'Pay with cash upon arrival' }
                ].map(method => {
                  const isChecked = paymentMethod === method.id;
                  return (
                    <label
                      key={method.id}
                      className={`p-4 rounded-2xl border cursor-pointer block transition ${
                        isChecked
                          ? 'border-[#0B192C] bg-[#FAF9F6] ring-2 ring-[#C5A880]/30'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={isChecked}
                          onChange={() => setPaymentMethod(method.id as any)}
                          className="mt-1 accent-[#0B192C]"
                        />
                        <div className="flex-1">
                          <span className="font-bold text-sm text-[#0B192C] block flex items-center gap-1.5">
                            <method.icon className="w-4 h-4 text-[#C5A880]" />
                            {method.title}
                          </span>
                          <span className="text-[11px] text-gray-500 block mt-0.5">{method.sub}</span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing || cart.length === 0}
              className="w-full py-4 bg-[#0B192C] hover:bg-[#1E3E62] text-[#C5A880] font-bold text-xs uppercase tracking-wider rounded-2xl shadow-xl transition flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Transaction via Razorpay...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>Pay ₹{finalPayable.toLocaleString('en-IN')} & Confirm Order</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Review Sticky Box */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 lg:sticky lg:top-24">
          <h3 className="font-serif font-black text-base text-[#0B192C]">
            Order Review ({cart.reduce((c, i) => c + i.qty, 0)} Items)
          </h3>

          <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
            {cart.map((item) => (
              <div key={item.cartKey} className="flex gap-3 text-xs items-center justify-between border-b border-gray-100 pb-2.5">
                <div className="flex items-center space-x-3">
                  <img 
                    src={item.product.images[0] || FALLBACK_IMAGE} 
                    alt="" 
                    className="w-12 h-12 object-cover rounded-lg shrink-0 border" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== FALLBACK_IMAGE) {
                        target.src = FALLBACK_IMAGE;
                      }
                    }}
                  />
                  <div>
                    <span className="font-bold text-[#0B192C] block line-clamp-1">{item.product.title}</span>
                    <span className="text-[11px] text-gray-400">{item.size} • Qty: {item.qty}</span>
                  </div>
                </div>
                <span className="font-black text-[#0B192C] shrink-0">
                  ₹{(item.unitPrice * item.qty).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs text-gray-600 border-t pt-3">
            <div className="flex justify-between">
              <span>Item Subtotal:</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Pan-India GST (18% Included):</span>
              <span>₹{gstAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping & Transit Insurance:</span>
              <span className="text-emerald-700 font-bold">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Coupon ({couponCode}):</span>
                <span>- ₹{couponDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between font-serif font-black text-lg text-[#0B192C] pt-2 border-t">
              <span>Payable Amount:</span>
              <span className="text-[#C5A880]">₹{finalPayable.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-3 bg-[#FAF9F6] rounded-xl border border-gray-200 text-[11px] text-gray-500 space-y-1">
            <div className="flex items-center space-x-1.5 text-gray-700 font-bold">
              <Truck className="w-4 h-4 text-[#C5A880]" />
              <span>Pan-India Fulfillment Promise</span>
            </div>
            <p>Direct sanitised transit from nearest regional hub. Zero damage guarantee on all bed & mattress consignments.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrderStatusView: React.FC<{ order: Order; onContinueShopping: () => void }> = ({
  order,
  onContinueShopping
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">Order Placed Successfully</span>
          <h1 className="font-serif font-black text-3xl text-[#0B192C]">
            Thank You for Choosing Sleepmall
          </h1>
          <p className="text-xs text-gray-500">
            Order Reference: <strong className="font-mono text-black">{order.orderId}</strong> • Placed on {order.date}
          </p>
        </div>

        {/* Live Stepper Tracker */}
        <div className="p-6 bg-[#FAF9F6] rounded-3xl border border-gray-100 space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-serif font-bold text-[#0B192C]">Live Pan-India Tracking</span>
            <span className="text-[11px] text-gray-500">AWB: <strong className="font-mono text-black">{order.awbNumber}</strong> ({order.courierPartner})</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold pt-2">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-[#0B192C] text-[#C5A880] flex items-center justify-center mx-auto shadow-sm">1</div>
              <span className="text-[#0B192C] block">Confirmed</span>
              <span className="text-[10px] text-gray-400 block font-normal">Payment Cleared</span>
            </div>
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-[#0B192C] text-[#C5A880] flex items-center justify-center mx-auto shadow-sm">2</div>
              <span className="text-[#0B192C] block">Packed</span>
              <span className="text-[10px] text-gray-400 block font-normal">Sanitized Hub</span>
            </div>
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mx-auto">3</div>
              <span className="text-gray-500 block">In Transit</span>
              <span className="text-[10px] text-gray-400 block font-normal">Delhivery Surface</span>
            </div>
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mx-auto">4</div>
              <span className="text-gray-500 block">Delivered</span>
              <span className="text-[10px] text-gray-400 block font-normal">OTP Required</span>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="border-t border-gray-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600">
          <div>
            <h4 className="font-bold text-[#0B192C] mb-1">Shipping Destination:</h4>
            <p className="font-medium text-gray-800">{order.address.name}</p>
            <p>{order.address.houseNo}, {order.address.street}</p>
            <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
            <p className="text-gray-500 mt-1">SMS Alerts: +91 {order.address.mobile}</p>
          </div>

          <div>
            <h4 className="font-bold text-[#0B192C] mb-1">Payment & Invoice:</h4>
            <p>Mode: <strong>{order.paymentMethod}</strong></p>
            <p>Total Paid: <strong>₹{order.total.toLocaleString('en-IN')}</strong> (Incl. 18% GST)</p>
            <p>Invoice Sent To: <strong>{order.address.email}</strong></p>
            <button
              type="button"
              onClick={() => window.print()}
              className="mt-2 inline-flex items-center space-x-1 text-xs font-bold text-[#0B192C] hover:text-[#C5A880]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Tax Invoice</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onContinueShopping}
          className="w-full py-4 bg-[#0B192C] text-[#C5A880] hover:bg-[#1E3E62] font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition"
        >
          Return to Sleepmall Store
        </button>
      </div>
    </div>
  );
};
