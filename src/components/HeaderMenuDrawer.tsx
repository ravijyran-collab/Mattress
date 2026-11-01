import React from 'react';
import { 
  X, Sparkles, Award, ShieldCheck, Phone, 
  MessageSquare, ChevronRight, Search, Heart, 
  ShoppingBag, SlidersHorizontal, MapPin, Truck, Check, HelpCircle
} from 'lucide-react';
import { Product } from '../types';

interface HeaderMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: any, category?: string, subCategory?: string) => void;
  cartCount: number;
  wishlistCount: number;
  lang: 'EN' | 'HI';
  setLang: (l: 'EN' | 'HI') => void;
  onOpenSupport: () => void;
}

export const HeaderMenuDrawer: React.FC<HeaderMenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  cartCount,
  wishlistCount,
  lang,
  setLang,
  onOpenSupport
}) => {
  if (!isOpen) return null;

  const mattressTypes = [
    { title: 'Orthopedic Mattress', desc: '5-Zone medical back & spine care' },
    { title: 'Memory Foam Mattress', desc: 'AeroGel pressure relief contour' },
    { title: 'Soft Mattress', desc: 'Plush cloud hotel comfort' },
    { title: 'Hard Mattress', desc: 'Rigid orthotropic posture support' },
    { title: 'Dual Comfort Mattress', desc: '2-in-1 reversible flip sides' },
    { title: 'Latex Mattress', desc: '100% natural organic Dunlop tree latex' },
    { title: 'Spring Mattress', desc: 'Bonnell high-tensile bounce' },
    { title: 'Pocket Spring Mattress', desc: 'Zero motion partner isolation' },
    { title: 'Coir Mattress', desc: 'Traditional coconut coir firm balance' },
    { title: 'Premium Mattress', desc: 'Grand suite luxury pillow-top' },
    { title: 'Active Recovery Mattress', desc: 'Athletic copper-ion infused' },
    { title: 'Kids Mattress', desc: 'Sprout gentle growing spine core' },
    { title: 'Pediatric Mattress', desc: 'Breathable washable toddler mesh' }
  ];

  const accessoryTypes = [
    'Cervical Pillows',
    'Latex Pillows',
    'Memory Foam Pillows',
    'Regular Pillows',
    'Contour Pillows',
    'Mattress Protectors',
    'Waterproof Mattress Covers',
    'Mattress Toppers',
    'Bedsheets',
    'Cushions'
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        {/* Drawer Header */}
        <div className="p-4 bg-[#0B192C] text-white flex items-center justify-between border-b border-[#C5A880]/20">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A880] text-[#0B192C] font-serif font-black flex items-center justify-center text-lg">
              S
            </div>
            <div>
              <span className="font-serif font-black text-lg text-white">SLEEPMALL<span className="text-[#C5A880]">.COM</span></span>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest -mt-0.5">Navigation Directory</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language & Quick Actions Bar */}
        <div className="px-4 py-2.5 bg-[#FAF9F6] border-b border-gray-100 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-medium">Language:</span>
            <button
              type="button"
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
              className="font-bold text-[#0B192C] hover:text-[#C5A880] flex items-center gap-1 underline cursor-pointer"
            >
              {lang === 'EN' ? '🇮🇳 Switch to हिंदी' : '🇮🇳 Switch to English'}
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => { onClose(); onNavigate('catalog'); }}
              className="flex items-center space-x-1 text-gray-700 hover:text-[#0B192C] font-semibold"
            >
              <Heart className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Wishlist ({wishlistCount})</span>
            </button>
          </div>
        </div>

        {/* Scrollable Directory Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Custom Dimension Mattress Spotlight */}
          <div 
            onClick={() => { onClose(); onNavigate('custom-builder'); }}
            className="p-4 bg-[#F4EFEA] rounded-2xl border border-[#C5A880]/50 cursor-pointer hover:bg-[#FAF9F6] transition shadow-2xs group"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase tracking-wider text-[#0B192C] bg-[#C5A880] px-2 py-0.5 rounded">
                  <Sparkles className="w-3 h-3" />
                  <span>Interactive Studio</span>
                </span>
                <h4 className="font-serif font-black text-base text-[#0B192C] mt-1.5 group-hover:text-[#C5A880] transition">
                  Custom Dimension Mattress Builder
                </h4>
                <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                  Have an antique cot or bespoke frame? Configure any length & width with instant square-inch pricing and live weight calculation.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#0B192C] group-hover:translate-x-1 transition mt-2" />
            </div>
          </div>

          {/* Smart AI Quiz Banner */}
          <div 
            onClick={() => { onClose(); onNavigate('quiz'); }}
            className="p-3.5 bg-white rounded-2xl border border-gray-200 cursor-pointer hover:border-[#0B192C] transition flex items-center justify-between shadow-2xs group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#0B192C] text-[#C5A880] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif font-bold text-xs text-[#0B192C] group-hover:text-[#C5A880] transition">
                  Smart Mattress Selector (AI Quiz)
                </h5>
                <p className="text-[10px] text-gray-500">Find your ideal posture & firmness match in 60 seconds</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition" />
          </div>

          {/* 13 Mattress Categories Accordion/List */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-serif font-black text-xs uppercase tracking-wider text-gray-400">
                Mattresses by Type (13 Categories)
              </h4>
              <button 
                type="button"
                onClick={() => { onClose(); onNavigate('catalog', 'MATTRESSES'); }}
                className="text-[11px] text-[#C5A880] font-bold hover:underline"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 gap-1.5 text-xs">
              {mattressTypes.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onClose();
                    onNavigate('catalog', 'MATTRESSES', m.title);
                  }}
                  className="p-2.5 rounded-xl hover:bg-[#FAF9F6] border border-transparent hover:border-gray-200 cursor-pointer transition flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[#0B192C] block">{m.title}</span>
                    <span className="text-[10px] text-gray-500">{m.desc}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Sleep Accessories List */}
          <div className="space-y-2 border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <h4 className="font-serif font-black text-xs uppercase tracking-wider text-gray-400">
                Sleep Accessories & Pillows
              </h4>
              <button 
                type="button"
                onClick={() => { onClose(); onNavigate('catalog', 'SLEEP ACCESSORIES'); }}
                className="text-[11px] text-[#C5A880] font-bold hover:underline"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {accessoryTypes.map((acc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('catalog', 'SLEEP ACCESSORIES', acc);
                  }}
                  className="p-2 rounded-xl text-left bg-gray-50 hover:bg-[#0B192C] hover:text-white transition font-medium text-gray-700 truncate"
                >
                  {acc}
                </button>
              ))}
            </div>
          </div>

          {/* Other Products */}
          <div className="space-y-2 border-t border-gray-100 pt-4">
            <h4 className="font-serif font-black text-xs uppercase tracking-wider text-gray-400">
              Other Sleep Furniture
            </h4>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div 
                onClick={() => { onClose(); onNavigate('catalog', 'OTHER PRODUCTS'); }}
                className="p-3 bg-[#FAF9F6] rounded-xl border border-gray-200 cursor-pointer hover:border-[#0B192C] transition flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-[#0B192C] block">Convertible Sofa Cum Bed</span>
                  <span className="text-[10px] text-gray-500">3-seater luxury velvet couch unfolds to guest queen bed</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Contact & Support Section */}
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <button
              type="button"
              onClick={() => { onClose(); onNavigate('contact'); }}
              className="w-full p-3 bg-[#0B192C] text-white hover:bg-[#1E3E62] rounded-xl text-left text-xs font-bold flex items-center justify-between transition shadow-xs cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-[#C5A880] text-[#0B192C]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-white">Contact Us & Direct Care</span>
                  <span className="text-[10px] text-[#C5A880] font-mono font-normal">Delivery • Inquiries • Booking • +91 73249 06081</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#C5A880]" />
            </button>
          </div>

          {/* Admin & Operations Link */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => { onClose(); onNavigate('admin'); }}
              className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-left text-xs font-bold text-gray-700 flex items-center justify-between transition cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
                <span>Admin Operations & Catalog Control</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Drawer Footer Contact Bar */}
        <div className="p-4 bg-[#FAF9F6] border-t border-gray-200 space-y-2 text-xs">
          <div className="flex items-center justify-between text-gray-600">
            <span>Direct Care Helpline:</span>
            <a href="tel:+917324906081" className="text-[#0B192C] font-mono font-bold hover:underline">+91 73249 06081</a>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { onClose(); onNavigate('contact'); }}
              className="flex-1 py-2.5 bg-white border border-gray-300 hover:border-black rounded-xl font-bold text-center text-[#0B192C] transition cursor-pointer"
            >
              Contact Us Page
            </button>
            <a
              href="https://wa.me/917324906081?text=Hello%20Sleepmall,%20I%20have%20an%20inquiry%20regarding%20Mattress%20Delivery%20/%20Booking%20/%20Custom%20Size"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold text-center transition flex items-center justify-center space-x-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
