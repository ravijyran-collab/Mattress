import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, Heart, Search, MapPin, Truck, ShieldCheck, 
  RotateCcw, Star, ChevronRight, Menu, X, Check, Filter, 
  SlidersHorizontal, Phone, Mail, Award, ArrowRight, User,
  Plus, Trash2, Edit3, CheckCircle2, AlertCircle, Clock,
  MessageSquare, Sparkles, HelpCircle, Layers, Check as CheckIcon
} from 'lucide-react';

import { Product, CartItem, Order, CategoryType } from './types';
import { INITIAL_PRODUCTS, PINCODE_DIRECTORY, STANDARD_SIZES, THICKNESS_OPTIONS } from './data/products';
import { PRODUCT_IMAGES, FALLBACK_IMAGE } from './data/productImages';
import { CustomMattressBuilder } from './components/CustomMattressBuilder';
import { SmartQuiz } from './components/SmartQuiz';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutView, OrderStatusView } from './components/CheckoutView';
import { AdminConsole } from './components/AdminConsole';
import { HeaderMenuDrawer } from './components/HeaderMenuDrawer';
import { Footer } from './components/Footer';
import { ContactUsView } from './components/ContactUsView';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'detail' | 'custom-builder' | 'quiz' | 'checkout' | 'order-status' | 'admin' | 'contact'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  
  // E-Commerce Core State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Delivery & Pincode State
  const [globalPincode, setGlobalPincode] = useState('110001');
  const [pinServiceInfo, setPinServiceInfo] = useState(PINCODE_DIRECTORY['110001']);
  const [pincodeInput, setPincodeInput] = useState('110001');

  // Checkout & Order State
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Detail Page Variant States
  const [detailSize, setDetailSize] = useState(STANDARD_SIZES[2].name);
  const [detailThickness, setDetailThickness] = useState(THICKNESS_OPTIONS[1].label);
  const [detailActiveImg, setDetailActiveImg] = useState(INITIAL_PRODUCTS[0].images[0]);

  // Catalog Filters State
  const [filterFirmness, setFilterFirmness] = useState('ALL');
  const [filterMaxPrice, setFilterMaxPrice] = useState(35000);
  const [sortBy, setSortBy] = useState('FEATURED');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handlePincodeCheck = (pin: string) => {
    const cleaned = pin.replace(/\D/g, '').slice(0, 6);
    setPincodeInput(cleaned);
    setGlobalPincode(cleaned);
    if (cleaned.length === 6 && PINCODE_DIRECTORY[cleaned]) {
      setPinServiceInfo(PINCODE_DIRECTORY[cleaned]);
      triggerToast(`Deliverable to ${PINCODE_DIRECTORY[cleaned].city}, ${PINCODE_DIRECTORY[cleaned].state}!`);
    } else if (cleaned.length === 6) {
      setPinServiceInfo({
        city: 'Rest of India Hub',
        state: 'Standard Transit',
        days: 5,
        cod: true
      });
      triggerToast('PIN code serviceable via Pan-India Standard Express (4-6 Days)!');
    }
  };

  const handleDirectoryNavigate = (view: any, category?: string, subCategory?: string) => {
    if (category) {
      setActiveCategory(category);
    }
    if (subCategory) {
      setSearchQuery(subCategory);
    } else if (category) {
      setSearchQuery('');
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (
    product: Product, 
    size = STANDARD_SIZES[2].name, 
    thickness = THICKNESS_OPTIONS[1].label, 
    qty = 1,
    isCustom = false,
    customDetails?: any
  ) => {
    const sizeMultiplier = STANDARD_SIZES.find(s => s.name === size)?.multiplier || 1.0;
    const thicknessAdd = THICKNESS_OPTIONS.find(t => t.label === thickness)?.addedPrice || 0;
    const unitPrice = isCustom 
      ? product.basePrice 
      : Math.round((product.basePrice * sizeMultiplier) + thicknessAdd);

    const cartKey = `${product.id}-${size}-${thickness}`;
    const existingIndex = cart.findIndex(item => item.cartKey === cartKey);

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].qty += qty;
      setCart(updated);
    } else {
      setCart(prev => [...prev, {
        cartKey,
        product,
        size,
        thickness,
        unitPrice,
        qty,
        isCustom,
        customDetails
      }]);
    }
    setIsCartOpen(true);
    triggerToast(lang === 'HI' ? 'कार्ट में जोड़ा गया' : 'Added to basket successfully!');
  };

  const updateCartQty = (cartKey: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartKey === cartKey) {
        const nextQty = item.qty + delta;
        return nextQty > 0 ? { ...item, qty: nextQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (cartKey: string) => {
    setCart(prev => prev.filter(item => item.cartKey !== cartKey));
    triggerToast('Item removed from basket');
  };

  const toggleWishlist = (product: Product) => {
    if (wishlist.some(p => p.id === product.id)) {
      setWishlist(prev => prev.filter(p => p.id !== product.id));
      triggerToast('Removed from Wishlist');
    } else {
      setWishlist(prev => [...prev, product]);
      triggerToast('Saved to Wishlist');
    }
  };

  // Pricing computations
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
  }, [cart]);

  const gstAmount = useMemo(() => Math.round(subtotal * 0.18), [subtotal]);
  const shippingFee = subtotal > 3999 || subtotal === 0 ? 0 : 499;
  const finalPayable = Math.max(0, subtotal + gstAmount + shippingFee - couponDiscount);

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'SLEEPNEW') {
      const discount = Math.round(subtotal * 0.10);
      setCouponDiscount(discount);
      triggerToast('Coupon SLEEPNEW applied! 10% instant discount.');
    } else if (couponCode.trim().toUpperCase() === 'COMFORT2000') {
      setCouponDiscount(2000);
      triggerToast('Flat ₹2,000 off applied!');
    } else {
      triggerToast('Invalid coupon. Try SLEEPNEW (10% off) or COMFORT2000');
    }
  };

  // Filtered Products for Catalog
  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      const matchCategory = activeCategory === 'ALL' || item.category === activeCategory;
      const matchFirmness = filterFirmness === 'ALL' || item.firmness.toLowerCase().includes(filterFirmness.toLowerCase());
      const matchPrice = item.basePrice <= filterMaxPrice;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.material.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchFirmness && matchPrice && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'PRICE_LOW') return a.basePrice - b.basePrice;
      if (sortBy === 'PRICE_HIGH') return b.basePrice - a.basePrice;
      if (sortBy === 'RATING') return b.rating - a.rating;
      return 0;
    });
  }, [products, activeCategory, filterFirmness, filterMaxPrice, searchQuery, sortBy]);

  // Detail page price calculation
  const detailComputedPrice = useMemo(() => {
    const sizeMultiplier = STANDARD_SIZES.find(s => s.name === detailSize)?.multiplier || 1.0;
    const thicknessAdd = THICKNESS_OPTIONS.find(t => t.label === detailThickness)?.addedPrice || 0;
    return Math.round((selectedProduct.basePrice * sizeMultiplier) + thicknessAdd);
  }, [selectedProduct, detailSize, detailThickness]);

  const detailComputedOriginal = useMemo(() => {
    const sizeMultiplier = STANDARD_SIZES.find(s => s.name === detailSize)?.multiplier || 1.0;
    const thicknessAdd = THICKNESS_OPTIONS.find(t => t.label === detailThickness)?.addedPrice || 0;
    return Math.round((selectedProduct.originalPrice * sizeMultiplier) + thicknessAdd);
  }, [selectedProduct, detailSize, detailThickness]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans antialiased flex flex-col selection:bg-[#C5A880] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B192C] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border-l-4 border-[#C5A880] animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#C5A880]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#0B192C] text-[#FAF9F6] text-xs py-2 px-4 border-b border-[#C5A880]/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center tracking-wide">
          <div className="flex items-center space-x-2">
            <span className="bg-[#C5A880] text-[#0B192C] font-extrabold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
              PAN INDIA
            </span>
            <span className="hidden sm:inline">Free Express White-Glove Delivery & 100-Night Risk-Free Trial</span>
            <span className="sm:hidden">Free Pan-India Delivery & 100-Night Trial</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
              className="text-[#C5A880] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>{lang === 'EN' ? '🇮🇳 हिंदी' : '🇮🇳 English'}</span>
            </button>
            <span className="hidden sm:inline text-gray-500">|</span>
            <button
              type="button"
              onClick={() => { setCurrentView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-gray-300 hover:text-white cursor-pointer flex items-center space-x-1.5"
            >
              <Phone className="w-3 h-3 text-[#C5A880]" />
              <span className="hidden sm:inline">Direct Helpline & WhatsApp:</span>
              <span className="text-[#C5A880] font-mono font-bold">+91 73249 06081</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN TOP BAR (Strict 1-row, 3-zone contract) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-6">
          
          {/* Zone 1: Hamburger Menu & Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              type="button"
              onClick={() => setIsMenuDrawerOpen(true)}
              className="p-2 rounded-xl text-[#0B192C] hover:bg-gray-100 border border-gray-200 transition shadow-2xs cursor-pointer flex items-center space-x-1.5 shrink-0"
              title="Open Navigation Menu"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-[#0B192C]" />
              <span className="hidden sm:inline text-xs font-bold text-[#0B192C]">Menu</span>
            </button>

            <div 
              onClick={() => setCurrentView('home')} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0B192C] flex items-center justify-center text-[#C5A880] font-serif font-black text-2xl shadow-md transition-transform group-hover:scale-105">
                S
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-[#0B192C] whitespace-nowrap">
                  SLEEPMALL<span className="text-[#C5A880]">.COM</span>
                </span>
                <p className="text-[10px] text-gray-400 tracking-widest uppercase -mt-1 font-semibold whitespace-nowrap">
                  {lang === 'HI' ? 'आपका आराम, हमारी प्राथमिकता' : 'Your Comfort, Our Priority'}
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder={lang === 'HI' ? "ऑर्थोपेडिक गद्दे, ग्रीवा तकिए खोजें..." : "Search orthopedic mattresses, cervical pillows..."}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== 'catalog') setCurrentView('catalog');
              }}
              className="w-full bg-[#FAF9F6] text-xs pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#C5A880] focus:bg-white transition-colors"
            />
          </div>

          {/* Zone 3: Navigation Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            <button 
              type="button"
              onClick={() => setCurrentView('custom-builder')}
              className={`hidden lg:flex items-center space-x-1.5 text-xs font-bold px-3.5 py-2 rounded-full transition border ${
                currentView === 'custom-builder'
                  ? 'bg-[#0B192C] text-[#C5A880] border-[#0B192C]'
                  : 'bg-[#F4EFEA] text-[#0B192C] border-[#C5A880]/50 hover:bg-[#C5A880] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="whitespace-nowrap">Custom Size Studio</span>
            </button>

            <button 
              type="button"
              onClick={() => setCurrentView('quiz')}
              className="hidden sm:flex items-center space-x-1.5 text-xs font-bold px-3.5 py-2 bg-white text-[#0B192C] border border-gray-200 rounded-full hover:border-[#0B192C] transition shadow-2xs"
            >
              <Award className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="whitespace-nowrap">{lang === 'HI' ? 'गद्दे चयनकर्ता AI' : 'Mattress AI'}</span>
            </button>

            <button 
              type="button"
              onClick={() => { setCurrentView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hidden xl:flex items-center space-x-1.5 text-xs font-bold px-3.5 py-2 rounded-full transition border ${
                currentView === 'contact'
                  ? 'bg-[#0B192C] text-[#C5A880] border-[#0B192C]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#0B192C]'
              }`}
              title="Delivery, Booking & Inquiries: +91 73249 06081"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span className="whitespace-nowrap">Contact & Care</span>
            </button>

            <button 
              type="button"
              onClick={() => setCurrentView('admin')}
              className="p-2 text-gray-700 hover:text-[#0B192C] hover:bg-gray-100 rounded-full transition"
              title="Admin Operations Console"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            <button 
              type="button"
              onClick={() => setIsWishlistModalOpen(true)}
              className="p-2 text-gray-700 hover:text-[#0B192C] hover:bg-gray-100 rounded-full transition relative"
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C5A880] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2 bg-[#0B192C] hover:bg-[#1E3E62] text-white px-4 py-2 rounded-full transition-all shadow-md group cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#C5A880] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold">
                {cart.reduce((c, i) => c + i.qty, 0)}
              </span>
            </button>
          </div>
        </div>

        {/* Category Secondary Navigation Tabs */}
        <nav className="bg-[#FAF9F6] border-t border-gray-100 px-4 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex items-center space-x-8 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-600 whitespace-nowrap">
            <button 
              type="button"
              onClick={() => { setActiveCategory('ALL'); setCurrentView('catalog'); }}
              className={`hover:text-[#0B192C] transition ${
                currentView === 'catalog' && activeCategory === 'ALL'
                  ? 'text-[#0B192C] border-b-2 border-[#C5A880] pb-1'
                  : ''
              }`}
            >
              All Products ({products.length})
            </button>
            <button 
              type="button"
              onClick={() => { setActiveCategory('MATTRESSES'); setCurrentView('catalog'); }}
              className={`hover:text-[#0B192C] transition ${
                currentView === 'catalog' && activeCategory === 'MATTRESSES'
                  ? 'text-[#0B192C] border-b-2 border-[#C5A880] pb-1'
                  : ''
              }`}
            >
              Mattresses (13 Types)
            </button>
            <button 
              type="button"
              onClick={() => { setActiveCategory('SLEEP ACCESSORIES'); setCurrentView('catalog'); }}
              className={`hover:text-[#0B192C] transition ${
                currentView === 'catalog' && activeCategory === 'SLEEP ACCESSORIES'
                  ? 'text-[#0B192C] border-b-2 border-[#C5A880] pb-1'
                  : ''
              }`}
            >
              Pillows & Protectors
            </button>
            <button 
              type="button"
              onClick={() => { setActiveCategory('OTHER PRODUCTS'); setCurrentView('catalog'); }}
              className={`hover:text-[#0B192C] transition ${
                currentView === 'catalog' && activeCategory === 'OTHER PRODUCTS'
                  ? 'text-[#0B192C] border-b-2 border-[#C5A880] pb-1'
                  : ''
              }`}
            >
              Sofa Cum Bed
            </button>
            <button 
              type="button"
              onClick={() => setCurrentView('custom-builder')}
              className={`hover:text-[#0B192C] transition flex items-center gap-1 ${
                currentView === 'custom-builder'
                  ? 'text-[#0B192C] border-b-2 border-[#C5A880] pb-1'
                  : 'text-[#C5A880]'
              }`}
            >
              ★ Custom Dimensions (Option A)
            </button>
          </div>
        </nav>
      </header>

      {/* VIEW ROUTING DISPATCHER */}
      <main className="flex-1">
        {/* 1. HOME VIEW */}
        {currentView === 'home' && (
          <div className="space-y-16 pb-16">
            {/* HERO SECTION */}
            <section className="relative bg-[#0B192C] text-white overflow-hidden py-14 sm:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center space-x-2 bg-[#1E3E62]/80 border border-[#C5A880]/40 px-3.5 py-1.5 rounded-full text-xs text-[#C5A880]">
                    <Award className="w-4 h-4" />
                    <span>India's Most Recommended Sleep Surface</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight">
                    Wake Up Rejuvenated. <br />
                    <span className="text-[#C5A880]">Pure Spine Alignment.</span>
                  </h1>

                  <p className="text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed">
                    Orthopedically certified multi-zone sleep systems, 100% natural organic latex, and bespoke mattress customization with factory-to-bedroom delivery across PAN India.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                    <button 
                      type="button"
                      onClick={() => { setActiveCategory('MATTRESSES'); setCurrentView('catalog'); }}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A880] hover:bg-[#B39366] text-[#0B192C] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
                    >
                      <span>Explore Mattresses</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button 
                      type="button"
                      onClick={() => setCurrentView('custom-builder')}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#1E3E62] hover:bg-[#285282] text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-gray-700 transition flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#C5A880]" />
                      <span>Custom Dimension Builder</span>
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800 text-xs">
                    <div>
                      <p className="font-serif font-black text-xl text-[#C5A880]">100 Nights</p>
                      <p className="text-gray-400 text-[11px] mt-0.5">Risk-Free Home Trial</p>
                    </div>
                    <div>
                      <p className="font-serif font-black text-xl text-[#C5A880]">10 Years</p>
                      <p className="text-gray-400 text-[11px] mt-0.5">Non-Sag Warranty</p>
                    </div>
                    <div>
                      <p className="font-serif font-black text-xl text-[#C5A880]">19,000+</p>
                      <p className="text-gray-400 text-[11px] mt-0.5">Indian PIN Codes</p>
                    </div>
                  </div>
                </div>

                {/* Hero Visual Card */}
                <div className="relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#1E3E62] group">
                    <img 
                      src={PRODUCT_IMAGES.hero} 
                      alt="Luxury Sleepmall Mattress" 
                      className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== PRODUCT_IMAGES.pocketSpring) {
                          target.src = PRODUCT_IMAGES.pocketSpring;
                        }
                      }}
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#C5A880]/30 text-[#0B192C] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-black text-[#C5A880] tracking-wider block">Featured Flagship</span>
                        <h4 className="font-serif font-black text-sm">SpineAlign Pro 5-Zone Ortho</h4>
                        <p className="text-xs text-gray-500">From ₹14,999 (Incl. 18% GST)</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => {
                          setSelectedProduct(products[0]);
                          setDetailActiveImg(products[0].images[0]);
                          setCurrentView('detail');
                        }}
                        className="px-4 py-2 bg-[#0B192C] text-[#C5A880] text-xs font-bold rounded-xl hover:bg-black transition"
                      >
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PAN-INDIA PINCODE SERVICEABILITY STRIP */}
            <section className="max-w-5xl mx-auto px-4 -mt-10 relative z-20">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-3.5">
                  <div className="p-3 bg-[#F4EFEA] text-[#0B192C] rounded-2xl">
                    <Truck className="w-6 h-6 text-[#C5A880]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-black text-sm text-[#0B192C]">Pan-India Express Delivery Checker</h3>
                    <p className="text-xs text-gray-500">Validate 6-digit postal PIN code for delivery transit days</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <input 
                    type="text" 
                    maxLength={6}
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 110001"
                    className="px-4 py-2.5 text-xs bg-[#FAF9F6] border border-gray-300 rounded-xl focus:outline-none focus:border-[#C5A880] w-36 text-center font-black tracking-widest"
                  />
                  <button 
                    type="button"
                    onClick={() => handlePincodeCheck(pincodeInput)}
                    className="px-5 py-2.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white text-xs font-bold rounded-xl transition"
                  >
                    Verify
                  </button>
                </div>

                {pinServiceInfo && (
                  <div className="text-xs text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
                    ✓ Deliverable to <strong>{pinServiceInfo.city}</strong> in {pinServiceInfo.days} days!
                  </div>
                )}
              </div>
            </section>

            {/* BEST SELLING PRODUCTS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">Handcrafted Comfort</span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0B192C] mt-1">
                    Best Selling Sleep Essentials
                  </h2>
                </div>
                <button 
                  type="button"
                  onClick={() => { setActiveCategory('ALL'); setCurrentView('catalog'); }} 
                  className="text-xs font-bold text-[#0B192C] hover:text-[#C5A880] flex items-center space-x-1"
                >
                  <span>View Full Catalog</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map(prod => (
                  <div 
                    key={prod.id} 
                    className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div 
                      className="relative aspect-4/3 overflow-hidden bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(prod);
                        setDetailActiveImg(prod.images[0]);
                        setCurrentView('detail');
                      }}
                    >
                      <img 
                        src={prod.images[0] || FALLBACK_IMAGE} 
                        alt={prod.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== FALLBACK_IMAGE) {
                            target.src = FALLBACK_IMAGE;
                          }
                        }}
                      />
                      <span className="absolute top-3 left-3 bg-[#0B192C] text-[#C5A880] text-[10px] font-bold px-2 py-1 rounded-lg">
                        {prod.firmness}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(prod);
                        }}
                        className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full hover:bg-white text-gray-700 shadow-sm transition"
                      >
                        <Heart className={`w-3.5 h-3.5 ${wishlist.some(w => w.id === prod.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{prod.subCategory}</span>
                        <h3 
                          onClick={() => {
                            setSelectedProduct(prod);
                            setDetailActiveImg(prod.images[0]);
                            setCurrentView('detail');
                          }}
                          className="font-serif font-black text-sm text-[#0B192C] hover:text-[#C5A880] cursor-pointer mt-1 line-clamp-1"
                        >
                          {prod.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{prod.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-gray-400 line-through">₹{prod.originalPrice.toLocaleString('en-IN')}</span>
                          <p className="font-serif font-black text-base text-[#0B192C]">₹{prod.basePrice.toLocaleString('en-IN')}</p>
                        </div>
                        <button 
                          type="button"
                          onClick={() => addToCart(prod)}
                          className="px-4 py-2 bg-[#FAF9F6] hover:bg-[#0B192C] text-[#0B192C] hover:text-[#C5A880] text-xs font-bold rounded-xl transition border border-gray-200 hover:border-[#0B192C]"
                        >
                          + Basket
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CUSTOM MATTRESS BUILDER SPOTLIGHT TEASER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="bg-[#FAF9F6] rounded-3xl border border-[#C5A880]/40 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-black uppercase tracking-wider text-[#C5A880]">Bespoke Craftsmanship</span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#0B192C] leading-tight">
                    Non-Standard Bed Cot? <br />
                    We Build Any Custom Length & Width.
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-xl leading-relaxed">
                    Whether you have an antique carved wooden diwan, imported California King frame, or custom caravan bunk, our studio calculates instant square-inch pricing with dynamic 2D canvas proportion rendering.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentView('custom-builder')}
                      className="px-8 py-3.5 bg-[#0B192C] hover:bg-[#1E3E62] text-[#C5A880] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition inline-flex items-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#C5A880]" />
                      <span>Launch Custom Mattress Builder</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                  <h4 className="font-serif font-bold text-sm text-[#0B192C]">Why Order Custom from Sleepmall?</h4>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Precision laser-cut down to the exact millimeter</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Curved radius and bed post notched corner options</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Transparent square-inch rates with full 18% GST tax invoice</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>5-7 business day express pan-India dispatch</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* WHY CHOOSE SLEEPMALL SECTION */}
            <section className="bg-[#F4EFEA] py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">Physiotherapist Approved</span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0B192C] mt-1">
                    Why India Sleeps on Sleepmall
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { icon: ShieldCheck, title: '10-Year Sag-Free Warranty', desc: 'Direct factory replacement guarantee on all high-density orthotropic cores.' },
                    { icon: RotateCcw, title: '100-Night Free Home Trial', desc: 'Sleep on it risk-free in your own bedroom. Don’t love it? We pick it up and refund 100%.' },
                    { icon: Truck, title: 'Pan-India Free Express Delivery', desc: 'Multi-layer sanitised compressed vacuum roll packaging delivered directly to your doorstep.' },
                    { icon: Award, title: 'Medical Ergonomics Certified', desc: '5-zone postural pressure relief tested to decompress lumbar vertebrae.' }
                  ].map((feat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-2xs text-center space-y-3 border border-gray-100">
                      <div className="w-12 h-12 mx-auto rounded-2xl bg-[#0B192C] text-[#C5A880] flex items-center justify-center">
                        <feat.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif font-bold text-sm text-[#0B192C]">{feat.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 2. CATALOG LISTING VIEW */}
        {currentView === 'catalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-400">Sleepmall Collection / {activeCategory}</span>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#0B192C]">
                  Sleep Engineering Products ({filteredProducts.length})
                </h1>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-gray-500 font-bold">Sort By:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#C5A880] font-semibold"
                >
                  <option value="FEATURED">Featured & Popular</option>
                  <option value="PRICE_LOW">Price: Low to High</option>
                  <option value="PRICE_HIGH">Price: High to Low</option>
                  <option value="RATING">Highest Customer Rating</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit space-y-6">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-serif font-bold text-sm text-[#0B192C] flex items-center gap-1.5">
                    <Filter className="w-4 h-4 text-[#C5A880]" />
                    <span>Refine Selection</span>
                  </h3>
                  <button 
                    type="button"
                    onClick={() => { setFilterFirmness('ALL'); setFilterMaxPrice(40000); setActiveCategory('ALL'); }}
                    className="text-[11px] text-[#C5A880] hover:underline font-bold"
                  >
                    Reset
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Category</h4>
                  <div className="space-y-1 text-xs">
                    {['ALL', 'MATTRESSES', 'SLEEP ACCESSORIES', 'OTHER PRODUCTS'].map(cat => (
                      <button 
                        key={cat}
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        className={`block w-full text-left px-3 py-2 rounded-xl transition ${
                          activeCategory === cat ? 'bg-[#0B192C] text-white font-bold' : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Firmness */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Firmness</h4>
                  <div className="space-y-1.5 text-xs">
                    {['ALL', 'Soft', 'Medium Soft', 'Medium Firm', 'Firm', 'Hard'].map(f => (
                      <label key={f} className="flex items-center space-x-2 cursor-pointer text-gray-700">
                        <input 
                          type="radio" 
                          name="firmness" 
                          checked={filterFirmness === f}
                          onChange={() => setFilterFirmness(f)}
                          className="accent-[#0B192C]"
                        />
                        <span>{f}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="uppercase text-gray-400">Max Budget</span>
                    <span className="text-[#0B192C]">₹{filterMaxPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range" 
                    min={1000} 
                    max={40000} 
                    step={1000}
                    value={filterMaxPrice} 
                    onChange={(e) => setFilterMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#0B192C] cursor-pointer"
                  />
                </div>
              </div>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                {filteredProducts.length === 0 ? (
                  <div className="bg-white p-12 text-center rounded-3xl border border-gray-100">
                    <p className="text-gray-500 font-medium">No products match your selected criteria.</p>
                    <button 
                      type="button"
                      onClick={() => { setFilterFirmness('ALL'); setFilterMaxPrice(40000); setActiveCategory('ALL'); }}
                      className="mt-4 px-5 py-2 bg-[#0B192C] text-white text-xs font-bold rounded-xl"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(prod => (
                      <div 
                        key={prod.id} 
                        className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-xl transition flex flex-col justify-between group"
                      >
                        <div 
                          className="relative aspect-4/3 bg-gray-100 cursor-pointer overflow-hidden"
                          onClick={() => {
                            setSelectedProduct(prod);
                            setDetailActiveImg(prod.images[0]);
                            setCurrentView('detail');
                          }}
                        >
                          <img 
                            src={prod.images[0] || FALLBACK_IMAGE} 
                            alt={prod.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (target.src !== FALLBACK_IMAGE) {
                                target.src = FALLBACK_IMAGE;
                              }
                            }}
                          />
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(prod);
                            }}
                            className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 rounded-full hover:bg-white text-gray-600 transition"
                          >
                            <Heart className={`w-4 h-4 ${wishlist.some(p => p.id === prod.id) ? 'fill-red-500 text-red-500' : ''}`} />
                          </button>
                          <span className="absolute bottom-2.5 left-2.5 bg-[#0B192C]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                            {prod.firmness}
                          </span>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-400">{prod.subCategory}</span>
                            <h3 
                              onClick={() => {
                                setSelectedProduct(prod);
                                setDetailActiveImg(prod.images[0]);
                                setCurrentView('detail');
                              }}
                              className="font-serif font-black text-sm text-[#0B192C] hover:text-[#C5A880] cursor-pointer mt-1"
                            >
                              {prod.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{prod.description}</p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <div>
                              <span className="text-[11px] text-gray-400 line-through">₹{prod.originalPrice.toLocaleString('en-IN')}</span>
                              <p className="font-serif font-black text-base text-[#0B192C]">₹{prod.basePrice.toLocaleString('en-IN')}</p>
                            </div>
                            <button 
                              type="button"
                              onClick={() => addToCart(prod)}
                              className="px-4 py-2 bg-[#0B192C] text-[#C5A880] hover:bg-[#1E3E62] text-xs font-bold rounded-xl transition cursor-pointer"
                            >
                              + Basket
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. PRODUCT DETAIL VIEW (PDP) */}
        {currentView === 'detail' && selectedProduct && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
            <button
              type="button"
              onClick={() => setCurrentView('catalog')}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-[#0B192C]"
            >
              <span>← Back to Catalog</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-4/3 rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-md">
                  <img 
                    src={detailActiveImg || FALLBACK_IMAGE} 
                    alt={selectedProduct.title} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== FALLBACK_IMAGE) {
                        target.src = FALLBACK_IMAGE;
                      }
                    }}
                  />
                </div>
                <div className="flex gap-3">
                  {selectedProduct.images.map((img, i) => (
                    <button 
                      key={i} 
                      type="button"
                      onClick={() => setDetailActiveImg(img)}
                      className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition ${
                        detailActiveImg === img ? 'border-[#C5A880]' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={img || FALLBACK_IMAGE} 
                        alt="thumbnail" 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== PRODUCT_IMAGES.orthoSpinealign) {
                            target.src = PRODUCT_IMAGES.orthoSpinealign;
                          }
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Variant Configurator */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">{selectedProduct.subCategory}</span>
                    <button 
                      type="button"
                      onClick={() => toggleWishlist(selectedProduct)}
                      className="flex items-center space-x-1.5 text-xs text-gray-500 hover:text-red-600"
                    >
                      <Heart className={`w-4 h-4 ${wishlist.some(p => p.id === selectedProduct.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      <span>Save to Wishlist</span>
                    </button>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#0B192C] mt-1">{selectedProduct.title}</h1>
                  
                  <div className="flex items-center space-x-3 mt-2 text-xs">
                    <div className="flex items-center space-x-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-gray-800">{selectedProduct.rating}</span>
                    <span className="text-gray-400">({selectedProduct.reviewCount} Pan-India Reviews)</span>
                  </div>
                </div>

                {/* Price Bar */}
                <div className="p-4 bg-[#F4EFEA] rounded-2xl flex items-baseline justify-between border border-[#C5A880]/30">
                  <div>
                    <span className="text-xs text-gray-500 line-through">₹{detailComputedOriginal.toLocaleString('en-IN')}</span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-serif font-black text-[#0B192C]">₹{detailComputedPrice.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-emerald-700 font-bold">
                        {Math.round(((detailComputedOriginal - detailComputedPrice) / detailComputedOriginal) * 100)}% OFF
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500">Includes 18% GST & Free PAN-India Transit Insurance</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1 rounded-full">
                    In Stock
                  </span>
                </div>

                {/* Size Selector */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
                    1. Choose Mattress Size: <span className="text-[#C5A880]">{detailSize}</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {STANDARD_SIZES.map(s => (
                      <button 
                        key={s.name}
                        type="button"
                        onClick={() => setDetailSize(s.name)}
                        className={`p-3 rounded-2xl border text-left transition font-medium ${
                          detailSize === s.name 
                            ? 'border-[#0B192C] bg-[#0B192C] text-white shadow-sm' 
                            : 'border-gray-200 bg-white hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        <span className="font-bold block">{s.label}</span>
                        <span className={`text-[10px] block ${detailSize === s.name ? 'text-[#C5A880]' : 'text-gray-400'}`}>{s.dimensions}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Thickness Selector */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
                    2. Choose Core Thickness: <span className="text-[#C5A880]">{detailThickness}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {THICKNESS_OPTIONS.map(t => (
                      <button 
                        key={t.label}
                        type="button"
                        onClick={() => setDetailThickness(t.label)}
                        className={`p-3 rounded-2xl border text-left transition font-medium ${
                          detailThickness === t.label 
                            ? 'border-[#0B192C] bg-[#0B192C] text-white shadow-sm' 
                            : 'border-gray-200 bg-white hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        <span className="font-bold block">{t.label}</span>
                        <span className={`text-[10px] block ${detailThickness === t.label ? 'text-[#C5A880]' : 'text-gray-400'}`}>{t.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pin code checker */}
                <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-2">
                  <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    Delivery Serviceability Estimate
                  </span>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      maxLength={6}
                      value={pincodeInput}
                      onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                      className="px-3 py-1.5 text-xs bg-[#FAF9F6] border rounded-xl w-32 font-black text-center"
                      placeholder="PIN Code"
                    />
                    <button 
                      type="button"
                      onClick={() => handlePincodeCheck(pincodeInput)}
                      className="px-3.5 py-1.5 bg-[#0B192C] text-white text-xs font-bold rounded-xl"
                    >
                      Check
                    </button>
                  </div>
                  {pinServiceInfo && (
                    <p className="text-[11px] text-emerald-700">
                      ✓ Available for {pinServiceInfo.city}. Estimated arrival in <strong>{pinServiceInfo.days} business days</strong>.
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => addToCart(selectedProduct, detailSize, detailThickness)}
                    className="flex-1 py-4 border-2 border-[#0B192C] text-[#0B192C] hover:bg-gray-50 font-bold text-xs uppercase tracking-wider rounded-2xl transition"
                  >
                    Add to Basket
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      addToCart(selectedProduct, detailSize, detailThickness);
                      setCurrentView('checkout');
                    }}
                    className="flex-1 py-4 bg-[#0B192C] hover:bg-[#1E3E62] text-[#C5A880] font-bold text-xs uppercase tracking-wider rounded-2xl transition shadow-lg"
                  >
                    Buy Now (Express)
                  </button>
                </div>
              </div>
            </div>

            {/* Specifications Card */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-serif font-black text-lg text-[#0B192C]">Medical & Engineering Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-600">
                <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-gray-100 space-y-1">
                  <span className="font-bold text-[#0B192C] block">Material Architecture</span>
                  <p>{selectedProduct.material}</p>
                </div>
                <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-gray-100 space-y-1">
                  <span className="font-bold text-[#0B192C] block">Firmness Level</span>
                  <p>{selectedProduct.firmness} (Certified Postural Alignment)</p>
                </div>
                <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-gray-100 space-y-1">
                  <span className="font-bold text-[#0B192C] block">Trial & Warranty</span>
                  <p>{selectedProduct.trialNights} Nights Risk-Free Trial • {selectedProduct.warrantyYears} Years Replacement Warranty</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. CUSTOM MATTRESS BUILDER (Option A) */}
        {currentView === 'custom-builder' && (
          <CustomMattressBuilder 
            onAddToCart={addToCart}
            globalPincode={globalPincode}
          />
        )}

        {/* 5. SMART MATTRESS SELECTOR (QUIZ) */}
        {currentView === 'quiz' && (
          <SmartQuiz 
            products={products}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setDetailActiveImg(p.images[0]);
              setCurrentView('detail');
            }}
            onClose={() => setCurrentView('home')}
          />
        )}

        {/* 6. CHECKOUT VIEW */}
        {currentView === 'checkout' && (
          <CheckoutView 
            cart={cart}
            subtotal={subtotal}
            gstAmount={gstAmount}
            shippingFee={shippingFee}
            couponDiscount={couponDiscount}
            couponCode={couponCode}
            finalPayable={finalPayable}
            onBack={() => setCurrentView('catalog')}
            onOrderComplete={(order) => {
              setCompletedOrder(order);
              setCart([]);
              setCurrentView('order-status');
            }}
          />
        )}

        {/* 7. ORDER STATUS VIEW */}
        {currentView === 'order-status' && completedOrder && (
          <OrderStatusView 
            order={completedOrder}
            onContinueShopping={() => setCurrentView('home')}
          />
        )}

        {/* 8. ADMIN OPERATIONS CONSOLE */}
        {currentView === 'admin' && (
          <AdminConsole 
            products={products}
            onAddOrUpdateProduct={(newP) => {
              const idx = products.findIndex(p => p.id === newP.id);
              if (idx > -1) {
                const updated = [...products];
                updated[idx] = newP;
                setProducts(updated);
              } else {
                setProducts([newP, ...products]);
              }
              triggerToast('Product catalog updated successfully');
            }}
            onDeleteProduct={(id) => {
              setProducts(prev => prev.filter(p => p.id !== id));
              triggerToast('Product deleted from database');
            }}
            onClose={() => setCurrentView('home')}
          />
        )}
        {/* 9. CONTACT US & DEPARTMENT CARE VIEW */}
        {currentView === 'contact' && (
          <ContactUsView 
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* CART SLIDE-OVER DRAWER */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={updateCartQty}
        onRemoveItem={removeFromCart}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setCurrentView('checkout');
        }}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        onApplyCoupon={applyCoupon}
        couponDiscount={couponDiscount}
      />

      {/* WISHLIST MODAL */}
      {isWishlistModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsWishlistModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif font-black text-lg text-[#0B192C]">
                Your Saved Mattresses & Accessories ({wishlist.length})
              </h3>
              <button 
                type="button" 
                onClick={() => setIsWishlistModalOpen(false)}
                className="text-gray-400 hover:text-black font-bold p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {wishlist.length === 0 ? (
              <p className="text-xs text-gray-500 py-6 text-center">No mattresses saved yet.</p>
            ) : (
              <div className="max-h-72 overflow-y-auto space-y-3">
                {wishlist.map(w => (
                  <div key={w.id} className="flex items-center justify-between p-3 bg-[#FAF9F6] rounded-2xl border text-xs">
                    <div className="flex items-center space-x-3">
                      <img src={w.images[0]} alt="" className="w-12 h-12 object-cover rounded-xl" />
                      <div>
                        <span className="font-bold text-[#0B192C] block">{w.title}</span>
                        <span className="font-serif font-black text-[#0B192C]">₹{w.basePrice.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(w);
                        setIsWishlistModalOpen(false);
                      }}
                      className="px-3 py-1.5 bg-[#0B192C] text-[#C5A880] font-bold rounded-xl cursor-pointer"
                    >
                      + Basket
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUPPORT & WARRANTY MODAL */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsSupportModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-serif font-black text-lg text-[#0B192C]">Sleepmall Direct Support</h3>
                <p className="text-[11px] text-gray-500">Delivery, Bookings, Custom Cot Sizes & Inquiries</p>
              </div>
              <button type="button" onClick={() => setIsSupportModalOpen(false)} className="text-gray-400 hover:text-black p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Quick Contact Card */}
            <div className="p-4 bg-[#0B192C] text-white rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#C5A880] uppercase font-bold tracking-wider block">Pan-India Helpline</span>
                  <a href="tel:+917324906081" className="text-xl font-mono font-bold text-white hover:underline">+91 73249 06081</a>
                </div>
                <a
                  href="tel:+917324906081"
                  className="px-3 py-1.5 bg-white text-[#0B192C] font-bold rounded-xl text-xs hover:bg-[#FAF9F6] transition flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Call</span>
                </a>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider block">Instant WhatsApp Care</span>
                  <a href="https://wa.me/917324906081?text=Hello%20Sleepmall,%20I%20have%20an%20inquiry%20regarding%20Mattress%20Delivery%20/%20Booking%20/%20Custom%20Size" target="_blank" rel="noreferrer" className="text-sm font-mono text-white hover:underline">+91 73249 06081</a>
                </div>
                <a
                  href="https://wa.me/917324906081?text=Hello%20Sleepmall,%20I%20have%20an%20inquiry%20regarding%20Mattress%20Delivery%20/%20Booking%20/%20Custom%20Size"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#25D366] text-white font-bold rounded-xl text-xs hover:bg-[#20ba5a] transition flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="space-y-2 text-gray-600 leading-relaxed pt-1">
              <p><strong>Email Concierge:</strong> care@sleepmall.com (24-hour SLA)</p>
              <p><strong>Operating Hours:</strong> 8:00 AM – 10:00 PM IST (365 Days, All India)</p>
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
                <strong>100-Night Free Trial Policy:</strong> Experience your mattress for 100 nights at home. If you are not completely rested, contact us on +91 73249 06081 for free doorstep pickup and 100% full refund with zero questions asked.
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsSupportModalOpen(false);
                setCurrentView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3 bg-[#FAF9F6] border border-gray-300 hover:border-black rounded-2xl font-bold text-center text-[#0B192C] transition flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>Visit Full Contact & Department Hub</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* FLOATING DIRECT WHATSAPP & SUPPORT WIDGET */}
      <aside aria-label="Direct WhatsApp & Support Contact" className="fixed bottom-6 right-6 z-40 flex items-center space-x-2">
        <a
          href="tel:+917324906081"
          className="p-3 bg-[#0B192C] hover:bg-[#1E3E62] text-[#C5A880] rounded-full shadow-2xl transition-transform hover:scale-105 border border-[#C5A880]/40 hidden sm:flex items-center justify-center"
          title="Direct Call: +91 73249 06081"
        >
          <Phone className="w-4 h-4" />
        </a>
        <a
          href="https://wa.me/917324906081?text=Hello%20Sleepmall,%20I%20have%20an%20inquiry%20regarding%20Mattress%20Delivery%20/%20Booking%20/%20Custom%20Size"
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-2.5 rounded-full shadow-2xl transition-transform hover:scale-105 font-bold text-xs"
          title="Direct WhatsApp: +91 73249 06081"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline">WhatsApp (+91 73249 06081)</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </aside>

      {/* HAMBURGER NAVIGATION DIRECTORY DRAWER */}
      <HeaderMenuDrawer 
        isOpen={isMenuDrawerOpen}
        onClose={() => setIsMenuDrawerOpen(false)}
        onNavigate={handleDirectoryNavigate}
        cartCount={cart.reduce((c, i) => c + i.qty, 0)}
        wishlistCount={wishlist.length}
        lang={lang}
        setLang={setLang}
        onOpenSupport={() => setIsSupportModalOpen(true)}
      />

      {/* UPGRADED LUXURY FOOTER */}
      <Footer 
        onNavigate={handleDirectoryNavigate}
        onOpenSupport={() => setIsSupportModalOpen(true)}
        onOpenCustomBuilder={() => { setCurrentView('custom-builder'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onOpenQuiz={() => { setCurrentView('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      />
    </div>
  );
}
