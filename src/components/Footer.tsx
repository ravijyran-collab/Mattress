import React, { useState } from 'react';
import { 
  ShieldCheck, RotateCcw, Truck, Award, Mail, 
  Phone, MessageSquare, MapPin, CheckCircle2, 
  CreditCard, QrCode, Lock, ChevronRight, Sparkles
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: any, category?: string, subCategory?: string) => void;
  onOpenSupport: () => void;
  onOpenCustomBuilder: () => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSupport,
  onOpenCustomBuilder,
  onOpenQuiz
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setIsSubscribed(true);
  };

  return (
    <footer className="bg-[#0B192C] text-[#FAF9F6] border-t border-[#C5A880]/30 pt-14 pb-8">
      {/* 1. VIP SLEEP CLUB NEWSLETTER SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-14 border-b border-gray-800">
        <div className="bg-[#1E3E62]/50 rounded-3xl p-6 sm:p-10 border border-[#C5A880]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center space-x-1.5 bg-[#C5A880]/20 text-[#C5A880] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>VIP Sleep Club</span>
            </div>
            <h3 className="font-serif font-black text-2xl sm:text-3xl text-white">
              Claim ₹1,500 Off Your First Mattress
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Subscribe to the Sleepmall VIP Newsletter to unlock ₹1,500 instant store credit, seasonal private sale previews, and our doctor-backed Pan-India sleep hygiene guide.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px] max-w-md">
            {isSubscribed ? (
              <div className="p-4 bg-emerald-950/80 rounded-2xl border border-emerald-600/50 text-emerald-300 text-xs flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold text-white">VIP Welcome Code Unlocked!</p>
                  <p className="text-[11px] mt-0.5">Use code <strong className="text-[#C5A880] font-mono font-bold text-xs">SLEEPVIP1500</strong> at checkout for ₹1,500 discount.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 bg-[#0B192C] text-xs text-white rounded-xl border border-gray-700 focus:outline-none focus:border-[#C5A880] font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C5A880] hover:bg-[#B39366] text-[#0B192C] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md whitespace-nowrap cursor-pointer"
                >
                  Join VIP Club
                </button>
              </form>
            )}
            <p className="text-[10px] text-gray-400 mt-2 text-center lg:text-left">
              *Instant voucher applicable on orders above ₹10,000. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* 2. VALUE PROPOSITION STRIP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-b border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-[#1E3E62] text-[#C5A880] shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-white text-sm">100-Night Home Trial</h5>
              <p className="text-gray-400 text-[11px] mt-0.5 leading-relaxed">Risk-free trial in your bedroom. 100% refund with free doorstep pickup.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-[#1E3E62] text-[#C5A880] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-white text-sm">10-Year Sag-Free Warranty</h5>
              <p className="text-gray-400 text-[11px] mt-0.5 leading-relaxed">Direct replacement warranty covering core sagging and fabric integrity.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-[#1E3E62] text-[#C5A880] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-white text-sm">Pan-India Express Free Delivery</h5>
              <p className="text-gray-400 text-[11px] mt-0.5 leading-relaxed">19,000+ Pin codes served with sanitised vacuum-compressed roll pack.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-[#1E3E62] text-[#C5A880] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif font-bold text-white text-sm">Medical Ergonomics Tested</h5>
              <p className="text-gray-400 text-[11px] mt-0.5 leading-relaxed">5-Zone body contouring tested for lumbar decompression & posture care.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MULTI-COLUMN DIRECTORY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-xs border-b border-gray-800">
        
        {/* Col 1: Brand & Hubs */}
        <div className="space-y-4 lg:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C5A880] text-[#0B192C] font-serif font-black flex items-center justify-center text-lg">
              S
            </div>
            <span className="text-xl font-serif font-black tracking-tight text-white">SLEEPMALL<span className="text-[#C5A880]">.COM</span></span>
          </div>

          <p className="text-gray-400 text-xs leading-relaxed">
            Pan-India online mattress and sleep tech ecosystem. Bringing medically calibrated sleep surfaces directly to your bedroom.
          </p>

          <div className="space-y-2 pt-2 border-t border-gray-800 text-[11px] text-gray-300">
            <p className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
              <span><strong>Fulfillment Hubs:</strong> Delhi NCR • Mumbai • Bengaluru</span>
            </p>
            <p className="flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
              <span><strong>Helpline & Bookings:</strong> <a href="tel:+917324906081" className="text-white hover:underline font-mono">+91 73249 06081</a></span>
            </p>
            <p className="flex items-center space-x-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span><strong>WhatsApp Care:</strong> <a href="https://wa.me/917324906081" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline font-mono">+91 73249 06081</a></span>
            </p>
          </div>
        </div>

        {/* Col 2: Mattresses (13 Types) */}
        <div>
          <h4 className="font-serif font-bold text-white mb-4 tracking-wider uppercase text-xs">
            Mattresses (13 Types)
          </h4>
          <ul className="space-y-2 text-gray-400 text-xs">
            <li onClick={() => onNavigate('catalog', 'MATTRESSES', 'Orthopedic Mattress')} className="hover:text-[#C5A880] cursor-pointer">Orthopedic SpineAlign Pro</li>
            <li onClick={() => onNavigate('catalog', 'MATTRESSES', 'Latex Mattress')} className="hover:text-[#C5A880] cursor-pointer">100% Eco-Pure Natural Latex</li>
            <li onClick={() => onNavigate('catalog', 'MATTRESSES', 'Pocket Spring Mattress')} className="hover:text-[#C5A880] cursor-pointer">Zero Motion Pocket Spring</li>
            <li onClick={() => onNavigate('catalog', 'MATTRESSES', 'Dual Comfort Mattress')} className="hover:text-[#C5A880] cursor-pointer">Dual Comfort Reversible 2-in-1</li>
            <li onClick={() => onNavigate('catalog', 'MATTRESSES', 'Memory Foam Mattress')} className="hover:text-[#C5A880] cursor-pointer">AeroGel Cooling Memory Foam</li>
            <li onClick={() => onNavigate('catalog', 'MATTRESSES', 'Coir Mattress')} className="hover:text-[#C5A880] cursor-pointer">Natural Coconut Coir Balance</li>
            <li onClick={() => onNavigate('catalog', 'MATTRESSES', 'Spring Mattress')} className="hover:text-[#C5A880] cursor-pointer">High-Tensile Bonnell Spring</li>
            <li onClick={() => onNavigate('catalog', 'MATTRESSES', 'Active Recovery Mattress')} className="hover:text-[#C5A880] cursor-pointer">Active Recovery Athletic Foam</li>
            <li onClick={() => onNavigate('catalog', 'MATTRESSES', 'Kids Mattress')} className="hover:text-[#C5A880] cursor-pointer">Sprout Kids Gentle Spine</li>
            <li onClick={() => onNavigate('catalog', 'MATTRESSES', 'Pediatric Mattress')} className="hover:text-[#C5A880] cursor-pointer">Pediatric Washable Crib Core</li>
          </ul>
        </div>

        {/* Col 3: Sleep Accessories */}
        <div>
          <h4 className="font-serif font-bold text-white mb-4 tracking-wider uppercase text-xs">
            Accessories & Bedding
          </h4>
          <ul className="space-y-2 text-gray-400 text-xs">
            <li onClick={() => onNavigate('catalog', 'SLEEP ACCESSORIES', 'Cervical Pillows')} className="hover:text-[#C5A880] cursor-pointer">Cervical Spine Contour Pillows</li>
            <li onClick={() => onNavigate('catalog', 'SLEEP ACCESSORIES', 'Latex Pillows')} className="hover:text-[#C5A880] cursor-pointer">Natural Pincore Latex Pillows</li>
            <li onClick={() => onNavigate('catalog', 'SLEEP ACCESSORIES', 'Memory Foam Pillows')} className="hover:text-[#C5A880] cursor-pointer">Cooling Gel Memory Pillows</li>
            <li onClick={() => onNavigate('catalog', 'SLEEP ACCESSORIES', 'Mattress Protectors')} className="hover:text-[#C5A880] cursor-pointer">100% Bamboo Waterproof Protectors</li>
            <li onClick={() => onNavigate('catalog', 'SLEEP ACCESSORIES', 'Mattress Toppers')} className="hover:text-[#C5A880] cursor-pointer">AeroCloud 2-Inch Mattress Topper</li>
            <li onClick={() => onNavigate('catalog', 'SLEEP ACCESSORIES', 'Bedsheets')} className="hover:text-[#C5A880] cursor-pointer">400 TC Egyptian Cotton Bedsheets</li>
            <li onClick={() => onNavigate('catalog', 'OTHER PRODUCTS', 'Sofa Cum Bed')} className="hover:text-[#C5A880] cursor-pointer">Convertible Velvet Sofa Cum Bed</li>
          </ul>
        </div>

        {/* Col 4: Custom Size & Smart Tools */}
        <div>
          <h4 className="font-serif font-bold text-white mb-4 tracking-wider uppercase text-xs">
            Custom Studio & Tools
          </h4>
          <ul className="space-y-2 text-gray-400 text-xs">
            <li onClick={onOpenCustomBuilder} className="hover:text-[#C5A880] cursor-pointer text-[#C5A880] font-bold flex items-center gap-1">
              <span>★ Custom Dimension Builder</span>
            </li>
            <li onClick={onOpenCustomBuilder} className="hover:text-[#C5A880] cursor-pointer">Live Mattress Weight Calculator</li>
            <li onClick={onOpenCustomBuilder} className="hover:text-[#C5A880] cursor-pointer">Curved & Notched Corner Sizing</li>
            <li onClick={onOpenCustomBuilder} className="hover:text-[#C5A880] cursor-pointer">How to Measure Bed Cot Guide</li>
            <li onClick={onOpenQuiz} className="hover:text-[#C5A880] cursor-pointer flex items-center gap-1">
              <span>Smart Mattress Selector (AI Quiz)</span>
            </li>
            <li onClick={() => onNavigate('contact')} className="hover:text-[#C5A880] cursor-pointer text-emerald-400 font-bold flex items-center gap-1">
              <span>📞 Inquiries & Bulk Booking (+91 73249 06081)</span>
            </li>
            <li onClick={() => onNavigate('admin')} className="hover:text-[#C5A880] cursor-pointer">Admin Operations Portal</li>
            <li onClick={onOpenSupport} className="hover:text-[#C5A880] cursor-pointer">Institutional & Hotel Quotes</li>
          </ul>
        </div>

        {/* Col 5: Customer Assurance & Compliance */}
        <div>
          <h4 className="font-serif font-bold text-white mb-4 tracking-wider uppercase text-xs">
            Assurance & Policies
          </h4>
          <ul className="space-y-2 text-gray-400 text-xs">
            <li onClick={() => onNavigate('contact')} className="hover:text-[#C5A880] cursor-pointer text-[#C5A880] font-bold flex items-center gap-1">
              <span>★ Contact Us & Direct Care (+91 73249 06081)</span>
            </li>
            <li onClick={onOpenSupport} className="hover:text-[#C5A880] cursor-pointer">100-Night Risk-Free Home Trial</li>
            <li onClick={onOpenSupport} className="hover:text-[#C5A880] cursor-pointer">10-Year Sag-Free Warranty Terms</li>
            <li onClick={onOpenSupport} className="hover:text-[#C5A880] cursor-pointer">Pan-India Transit Insurance</li>
            <li onClick={onOpenSupport} className="hover:text-[#C5A880] cursor-pointer">Hassle-Free Return & Refund Policy</li>
            <li onClick={onOpenSupport} className="hover:text-[#C5A880] cursor-pointer">18% Indian GST Tax Compliance</li>
            <li onClick={onOpenSupport} className="hover:text-[#C5A880] cursor-pointer">Privacy Policy & Terms of Service</li>
            <li onClick={() => onNavigate('contact')} className="hover:text-[#C5A880] cursor-pointer">Track Consignment & Delivery (+91 73249 06081)</li>
          </ul>
        </div>

      </div>

      {/* 4. TRUST, CERTIFICATIONS & PAYMENT BADGES STRIP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-b border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <span className="font-bold text-white text-xs uppercase tracking-wider">Certified Quality:</span>
          <span className="bg-[#1E3E62] px-2.5 py-1 rounded-md text-white font-medium">🇮🇳 100% Made In India</span>
          <span className="bg-[#1E3E62] px-2.5 py-1 rounded-md text-white font-medium">ISO 9001:2015 Quality</span>
          <span className="bg-[#1E3E62] px-2.5 py-1 rounded-md text-white font-medium">OEKO-TEX Standard 100</span>
          <span className="bg-[#1E3E62] px-2.5 py-1 rounded-md text-white font-medium">eco-INSTITUT Pure Latex</span>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
          <span className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Secure Gateways:</span>
          </span>
          <span className="px-2 py-0.5 bg-gray-800 rounded text-[11px] font-bold text-gray-300">Razorpay</span>
          <span className="px-2 py-0.5 bg-gray-800 rounded text-[11px] font-bold text-gray-300">UPI (GPay / PhonePe / Paytm)</span>
          <span className="px-2 py-0.5 bg-gray-800 rounded text-[11px] font-bold text-gray-300">Visa / MasterCard / RuPay</span>
          <span className="px-2 py-0.5 bg-gray-800 rounded text-[11px] font-bold text-gray-300">Cash on Delivery</span>
        </div>
      </div>

      {/* 5. BOTTOM COPYRIGHT & LEGAL BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <p>© 2026 SLEEPMALL.COM. All rights reserved. Pan-India Independent Brand.</p>
        <p className="mt-2 sm:mt-0 text-[11px]">
          256-Bit SSL Encrypted Bank Level Security • Pan-India GST Compliant Invoicing
        </p>
      </div>
    </footer>
  );
};
