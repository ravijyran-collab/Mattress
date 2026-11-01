import React, { useState } from 'react';
import { 
  Phone, MessageSquare, Truck, Calendar, Sparkles, Building2, 
  MapPin, Clock, Mail, ShieldCheck, CheckCircle2, ArrowRight,
  Send, HelpCircle
} from 'lucide-react';

const DIRECT_PHONE = "+91 73249 06081";
const WHATSAPP_RAW = "917324906081";

interface ContactDepartment {
  title: string;
  badge: string;
  desc: string;
  icon: any;
  whatsappText: string;
}

const DEPARTMENTS: ContactDepartment[] = [
  {
    title: "Delivery & Order Tracking",
    badge: "Pan-India Logistics",
    desc: "Check live dispatch status, delivery date estimates, PIN code serviceability, and courier OTP assistance.",
    icon: Truck,
    whatsappText: "Hello Sleepmall, I have an inquiry regarding Delivery Status & Order Tracking."
  },
  {
    title: "Mattress Booking & Inquiries",
    badge: "Sleep Consultations",
    desc: "Speak with a spine ergonomics specialist to book the right mattress for back pain, posture, or couple sleep.",
    icon: Calendar,
    whatsappText: "Hello Sleepmall, I want to inquire about booking a mattress and need advice."
  },
  {
    title: "Custom Size & Cot Sizing",
    badge: "Bespoke Master-Craft",
    desc: "Get quotation help for non-standard antique cots, curved radius corners, and exact inch dimensions.",
    icon: Sparkles,
    whatsappText: "Hello Sleepmall, I need help with Custom Mattress Dimensions and Cot frame measurement."
  },
  {
    title: "Bulk, Hotels & Commercial Reservations",
    badge: "B2B & Hospitality",
    desc: "Bulk wholesale pricing, resorts, guest houses, interior designer partner discounts, and institutional GST billing.",
    icon: Building2,
    whatsappText: "Hello Sleepmall, I want to make a Bulk Booking / Commercial Hotel Mattress Reservation."
  }
];

export const ContactUsView: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: 'Delivery & Tracking',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getCustomWhatsAppUrl = (text: string) => {
    return `https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#F4EFEA] border border-[#C5A880]/50 px-4 py-1.5 rounded-full text-xs font-bold text-[#0B192C]">
          <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Pan-India Direct Care Concierge</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#0B192C] tracking-tight">
          We are Here to Help You Sleep Better
        </h1>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Reach our dedicated sleep specialists directly on WhatsApp or voice call for quick delivery updates, mattress booking, custom cot sizing, and commercial bulk reservations.
        </p>

        {/* Primary Phone Card */}
        <div className="p-6 bg-[#0B192C] text-white rounded-3xl shadow-xl border border-[#C5A880]/40 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold text-[#C5A880] tracking-wider block">Direct Phone & WhatsApp Hotline</span>
            <span className="text-2xl sm:text-3xl font-mono font-black text-white">{DIRECT_PHONE}</span>
            <span className="text-xs text-gray-300 block mt-0.5">Available Mon-Sun, 8:00 AM - 10:00 PM IST (365 Days)</span>
          </div>

          <div className="flex gap-2">
            <a
              href={`tel:${DIRECT_PHONE.replace(/\s+/g, '')}`}
              className="px-4 py-2.5 bg-white text-[#0B192C] text-xs font-bold rounded-xl hover:bg-[#FAF9F6] transition flex items-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
            <a
              href={getCustomWhatsAppUrl("Hello Sleepmall Concierge, I would like to get assistance.")}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5 shadow"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4 Dedicated Purpose Channels */}
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">Direct Department Channels</span>
          <h2 className="text-2xl font-serif font-black text-[#0B192C] mt-0.5">What can we help you with today?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEPARTMENTS.map((dept, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#0B192C] text-[#C5A880] flex items-center justify-center shadow-xs">
                    <dept.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#FAF9F6] border border-gray-200 text-gray-700 rounded-full">
                    {dept.badge}
                  </span>
                </div>

                <h3 className="font-serif font-black text-base text-[#0B192C] group-hover:text-[#C5A880] transition">
                  {dept.title}
                </h3>
                
                <p className="text-xs text-gray-500 leading-relaxed">
                  {dept.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                <a
                  href={getCustomWhatsAppUrl(dept.whatsappText)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5 border border-[#25D366]/30"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Specialist</span>
                </a>
                <a
                  href={`tel:${DIRECT_PHONE.replace(/\s+/g, '')}`}
                  className="w-full py-2 text-center text-xs font-bold text-gray-600 hover:text-black block"
                >
                  Or Call {DIRECT_PHONE}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form & Regional Hubs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div>
            <h3 className="font-serif font-black text-xl text-[#0B192C]">
              Send an Instant Priority Message
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Our team typically responds via SMS, WhatsApp, or phone within 15 minutes during operating hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-[#FAF9F6] rounded-2xl border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-serif font-black text-lg text-[#0B192C]">Message Received!</h4>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                Thank you, <strong>{formData.name}</strong>. A Sleepmall concierge has received your request regarding <em>{formData.purpose}</em> and will contact you at <strong>+91 {formData.phone}</strong>.
              </p>
              <div className="pt-2">
                <a
                  href={getCustomWhatsAppUrl(`Hello, I just submitted an inquiry for ${formData.purpose}: ${formData.message}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-[#25D366] text-white text-xs font-bold rounded-xl shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open Immediate WhatsApp Chat</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-[#FAF9F6] focus:bg-white focus:border-[#C5A880] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Mobile Number (WhatsApp) *</label>
                  <div className="flex">
                    <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl font-bold text-gray-500">+91</span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2.5 rounded-r-xl border border-gray-300 bg-[#FAF9F6] focus:bg-white focus:border-[#C5A880] outline-none font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-[#FAF9F6] focus:bg-white focus:border-[#C5A880] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Inquiry Purpose *</label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-[#FAF9F6] focus:bg-white focus:border-[#C5A880] outline-none font-medium"
                  >
                    <option value="Delivery & Tracking">Delivery & Tracking</option>
                    <option value="Mattress Booking & Inquiries">Mattress Booking & Inquiries</option>
                    <option value="Custom Size Sizing">Custom Size Sizing</option>
                    <option value="Bulk, Hotel & Commercial Reservations">Bulk, Hotel & Commercial Reservations</option>
                    <option value="100-Night Trial or Warranty">100-Night Trial or Warranty</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Your Message / Order Reference *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what size, bed model, delivery pincode, or inquiry you have..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-[#FAF9F6] focus:bg-white focus:border-[#C5A880] outline-none font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0B192C] hover:bg-[#1E3E62] text-[#C5A880] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Request to Concierge</span>
              </button>
            </form>
          )}
        </div>

        {/* Fulfillment Hubs & Guarantees */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF9F6] p-6 rounded-3xl border border-gray-200/80 space-y-4">
            <h3 className="font-serif font-black text-base text-[#0B192C]">
              Pan-India Fulfillment Hubs
            </h3>

            <div className="space-y-3 text-xs text-gray-600">
              <div className="p-3.5 bg-white rounded-2xl border border-gray-100 space-y-1">
                <span className="font-bold text-[#0B192C] block flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>North Hub (Delhi NCR & Northern States)</span>
                </span>
                <p>DLF Cyber City, Sector 25, Gurugram, Haryana - 122002</p>
                <p className="text-[11px] text-gray-400">Direct Helpline: {DIRECT_PHONE}</p>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-gray-100 space-y-1">
                <span className="font-bold text-[#0B192C] block flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>West Hub (Mumbai & Western Logistics)</span>
                </span>
                <p>Logix Logistics Park, Kalyan-Bhiwandi Rd, Mumbai, MH - 421302</p>
                <p className="text-[11px] text-gray-400">Direct Helpline: {DIRECT_PHONE}</p>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-gray-100 space-y-1">
                <span className="font-bold text-[#0B192C] block flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>South Hub (Bengaluru & Southern Network)</span>
                </span>
                <p>EPIP Industrial Zone, Whitefield, Bengaluru, KA - 560066</p>
                <p className="text-[11px] text-gray-400">Direct Helpline: {DIRECT_PHONE}</p>
              </div>
            </div>
          </div>

          {/* Quick FAQ / Return Policy notice */}
          <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-2xs space-y-2 text-xs">
            <span className="font-bold text-[#0B192C] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100-Night Risk-Free Trial Guarantee</span>
            </span>
            <p className="text-gray-500 text-[11px] leading-relaxed">
              If your body does not completely adapt to your mattress within 100 nights, contact us at <strong>{DIRECT_PHONE}</strong> for free doorstep pickup and 100% full refund with zero questions asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
