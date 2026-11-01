import React, { useState, useMemo } from 'react';
import { 
  Ruler, Layers, ShieldCheck, Truck, HelpCircle, 
  CheckCircle2, ShoppingBag, MessageSquare, Info, 
  ArrowRight, Sparkles, Check, Weight
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCT_IMAGES } from '../data/productImages';

interface MaterialOption {
  id: string;
  name: string;
  baseRatePerSqInch: number;
  feel: string;
  tag: string;
  warrantyYears: number;
  densityKgM3: number;
  densityLabel: string;
  description: string;
}

const MATERIALS: MaterialOption[] = [
  {
    id: 'ortho-memory',
    name: 'Orthopedic SpineAlign Bonded Foam',
    baseRatePerSqInch: 2.85,
    feel: 'Medium Firm',
    tag: 'Best for Back Pain',
    warrantyYears: 10,
    densityKgM3: 72,
    densityLabel: '72 kg/m³ High-Density Core',
    description: 'High-density rebonded base with 5-zone contour pressure relief memory foam top.'
  },
  {
    id: 'natural-latex',
    name: '100% Eco-Pure Natural Tree Latex',
    baseRatePerSqInch: 4.10,
    feel: 'Medium Soft (Responsive)',
    tag: 'All-Natural & Organic',
    warrantyYears: 12,
    densityKgM3: 80,
    densityLabel: '80 kg/m³ Pure Dunlop Latex',
    description: 'Pin-core aerated Dunlop latex certified free from synthetic fillers or chemical off-gassing.'
  },
  {
    id: 'pocket-spring',
    name: 'Zero Partner Motion Pocket Spring',
    baseRatePerSqInch: 3.30,
    feel: 'Medium Balanced',
    tag: 'Motion Isolation',
    warrantyYears: 10,
    densityKgM3: 54,
    densityLabel: '54 kg/m³ Tempered Pocketed Coils',
    description: 'Individually encased high-tensile carbon-steel coils topped with quilted luxury foam.'
  },
  {
    id: 'dual-comfort',
    name: 'Dual Comfort Reversible Core',
    baseRatePerSqInch: 2.30,
    feel: 'Dual (Soft side + Hard side)',
    tag: 'Best Value',
    warrantyYears: 7,
    densityKgM3: 36,
    densityLabel: '36 kg/m³ Dual-Resilience Foam',
    description: 'One soft ergonomic contour surface and one high-resilience firm orthotropic base.'
  }
];

const THICKNESS_FACTORS: Record<number, { label: string; sub: string; multiplier: number }> = {
  5: { label: '5 Inch (12.7 cm)', sub: 'Compact Profile', multiplier: 1.0 },
  6: { label: '6 Inch (15.2 cm)', sub: 'Recommended Standard', multiplier: 1.18 },
  8: { label: '8 Inch (20.3 cm)', sub: 'Luxury Hotel Plush', multiplier: 1.40 },
  10: { label: '10 Inch (25.4 cm)', sub: 'Grand Suite Pillowtop', multiplier: 1.65 }
};

const CORNER_TYPES = [
  { id: 'standard', name: 'Standard 90° Square Corners', extraCharge: 0 },
  { id: 'curved', name: 'Curved Radius Bed Corners (R=50mm)', extraCharge: 1200 },
  { id: 'notched', name: 'Bed Post Cutout / Notched Corners', extraCharge: 1800 }
];

interface CustomMattressBuilderProps {
  onAddToCart: (product: Product, size: string, thickness: string, qty: number, isCustom?: boolean, customDetails?: any) => void;
  globalPincode: string;
}

export const CustomMattressBuilder: React.FC<CustomMattressBuilderProps> = ({ onAddToCart, globalPincode }) => {
  const [unit, setUnit] = useState<'INCHES' | 'CM'>('INCHES');
  const [lengthInches, setLengthInches] = useState(75);
  const [widthInches, setWidthInches] = useState(48);
  const [thickness, setThickness] = useState(6);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialOption>(MATERIALS[0]);
  const [selectedCorner, setSelectedCorner] = useState(CORNER_TYPES[0]);
  const [showMeasureModal, setShowMeasureModal] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // Conversion helpers
  const toDisplay = (valInches: number) => unit === 'CM' ? Math.round(valInches * 2.54) : valInches;
  const toInches = (valDisplay: number) => unit === 'CM' ? Math.round(valDisplay / 2.54) : valDisplay;

  const MIN_L = 60, MAX_L = 84;
  const MIN_W = 30, MAX_W = 84;

  const pricing = useMemo(() => {
    const areaSqInches = lengthInches * widthInches;
    const thicknessMultiplier = THICKNESS_FACTORS[thickness].multiplier;
    const baseSubtotal = Math.round(
      (areaSqInches * selectedMaterial.baseRatePerSqInch * thicknessMultiplier) + selectedCorner.extraCharge
    );
    const standardMRP = Math.round(baseSubtotal * 1.55);
    const gst18 = Math.round(baseSubtotal * 0.18);
    const finalAmount = baseSubtotal + gst18;

    // Physical Volume & Weight Calculation
    // 1 cubic inch = 0.000016387064 cubic meters
    const volumeCuIn = areaSqInches * thickness;
    const volumeM3 = volumeCuIn * 0.000016387064;
    const fabricCoverWeightKg = 2.0; // 350 GSM quilted organic knitted fabric
    const rawWeightKg = (volumeM3 * selectedMaterial.densityKgM3) + fabricCoverWeightKg;
    const estimatedWeightKg = Math.round(rawWeightKg * 10) / 10;
    const estimatedWeightLbs = Math.round(estimatedWeightKg * 2.20462 * 10) / 10;

    return {
      areaSqInches,
      areaSqFt: (areaSqInches / 144).toFixed(2),
      standardMRP,
      baseSubtotal,
      gst18,
      finalAmount,
      volumeCuIn,
      estimatedWeightKg,
      estimatedWeightLbs
    };
  }, [lengthInches, widthInches, thickness, selectedMaterial, selectedCorner]);

  const handleOrderCustom = () => {
    const customSKU = `SM-CUST-${lengthInches}x${widthInches}x${thickness}-${selectedMaterial.id.toUpperCase()}`;
    const customProduct: Product = {
      id: customSKU,
      title: `Custom Crafted ${selectedMaterial.name}`,
      category: 'MATTRESSES',
      subCategory: 'Customized Mattress',
      basePrice: pricing.baseSubtotal,
      originalPrice: pricing.standardMRP,
      firmness: selectedMaterial.feel,
      material: selectedMaterial.description,
      rating: 5.0,
      reviewCount: 38,
      warrantyYears: selectedMaterial.warrantyYears,
      trialNights: 100,
      images: [PRODUCT_IMAGES.hero],
      description: `Precision custom build: ${lengthInches}" L × ${widthInches}" W × ${thickness}" H with ${selectedCorner.name}. Handcrafted in 5-7 business days for non-standard cots.`,
      benefits: [
        'Laser-cut to your exact millimeter bed frame dimensions',
        'Custom edge contouring and corner beveling',
        'Factory direct white-glove doorstep delivery',
        'Certified zero-sag multi-year warranty'
      ]
    };

    onAddToCart(
      customProduct,
      `Custom (${lengthInches}" × ${widthInches}")`,
      `${thickness} Inch (${selectedCorner.name})`,
      1,
      true,
      {
        lengthInches,
        widthInches,
        thicknessInches: thickness,
        cornerType: selectedCorner.name,
        estimatedWeightKg: pricing.estimatedWeightKg,
        estimatedWeightLbs: pricing.estimatedWeightLbs
      }
    );

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Sleepmall Specialist, I need a custom mattress of dimensions: ${lengthInches}"L x ${widthInches}"W x ${thickness}"H in ${selectedMaterial.name}. Estimated Weight: ${pricing.estimatedWeightKg} kg. Corner: ${selectedCorner.name}. Estimated Price: ₹${pricing.finalAmount.toLocaleString('en-IN')}. My delivery pincode is ${globalPincode}. Please advise!`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-6 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#F4EFEA] border border-[#C5A880]/40 px-3.5 py-1 rounded-full text-xs font-semibold text-[#0B192C] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Pan-India Custom Master-Craft Studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#0B192C] tracking-tight">
            Custom Dimension Mattress Builder
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
            Have an antique sheesham wood bed, imported European frame, or customized bunk cot? Specify your exact mattress surface down to the inch for laser-cut perfection.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button 
            type="button"
            onClick={() => setShowMeasureModal(true)}
            className="flex items-center space-x-1.5 text-xs font-bold text-[#0B192C] hover:text-[#C5A880] px-3.5 py-2 bg-white rounded-xl border border-gray-200 shadow-sm transition hover:border-[#C5A880]"
          >
            <HelpCircle className="w-4 h-4 text-[#C5A880]" />
            <span>How To Measure Cot</span>
          </button>

          <div className="flex items-center bg-gray-200/80 p-1 rounded-xl text-xs font-bold">
            <button 
              type="button"
              onClick={() => setUnit('INCHES')}
              className={`px-3 py-1.5 rounded-lg transition ${unit === 'INCHES' ? 'bg-[#0B192C] text-[#C5A880] shadow-sm' : 'text-gray-600 hover:text-black'}`}
            >
              Inches
            </button>
            <button 
              type="button"
              onClick={() => setUnit('CM')}
              className={`px-3 py-1.5 rounded-lg transition ${unit === 'CM' ? 'bg-[#0B192C] text-[#C5A880] shadow-sm' : 'text-gray-600 hover:text-black'}`}
            >
              Centimeters
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
          {/* 1. Surface Sliders */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-base text-[#0B192C] flex items-center space-x-2">
                <Ruler className="w-5 h-5 text-[#C5A880]" />
                <span>1. Enter Surface Dimensions</span>
              </h2>
              <span className="text-xs text-gray-400">Values in {unit.toLowerCase()}</span>
            </div>

            {/* Length */}
            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-gray-100 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700 uppercase tracking-wider">
                  Length (Head to Toe)
                </span>
                <div className="flex items-center space-x-1.5">
                  <input 
                    type="number"
                    min={toDisplay(MIN_L)}
                    max={toDisplay(MAX_L)}
                    value={toDisplay(lengthInches)}
                    onChange={(e) => {
                      const val = toInches(Number(e.target.value));
                      if (val >= MIN_L && val <= MAX_L) setLengthInches(val);
                    }}
                    className="w-16 px-2 py-1 text-right font-black text-sm text-[#0B192C] bg-white border border-gray-300 rounded-lg focus:border-[#C5A880] outline-none"
                  />
                  <span className="font-bold text-gray-500">{unit.toLowerCase()}</span>
                </div>
              </div>
              <input 
                type="range"
                min={MIN_L}
                max={MAX_L}
                value={lengthInches}
                onChange={(e) => setLengthInches(Number(e.target.value))}
                className="w-full accent-[#0B192C] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>Min: {toDisplay(MIN_L)} {unit.toLowerCase()}</span>
                <span>Standard Cot: {toDisplay(72)} / {toDisplay(78)} {unit.toLowerCase()}</span>
                <span>Max: {toDisplay(MAX_L)} {unit.toLowerCase()}</span>
              </div>
            </div>

            {/* Width */}
            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-gray-100 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700 uppercase tracking-wider">
                  Width (Side to Side)
                </span>
                <div className="flex items-center space-x-1.5">
                  <input 
                    type="number"
                    min={toDisplay(MIN_W)}
                    max={toDisplay(MAX_W)}
                    value={toDisplay(widthInches)}
                    onChange={(e) => {
                      const val = toInches(Number(e.target.value));
                      if (val >= MIN_W && val <= MAX_W) setWidthInches(val);
                    }}
                    className="w-16 px-2 py-1 text-right font-black text-sm text-[#0B192C] bg-white border border-gray-300 rounded-lg focus:border-[#C5A880] outline-none"
                  />
                  <span className="font-bold text-gray-500">{unit.toLowerCase()}</span>
                </div>
              </div>
              <input 
                type="range"
                min={MIN_W}
                max={MAX_W}
                value={widthInches}
                onChange={(e) => setWidthInches(Number(e.target.value))}
                className="w-full accent-[#0B192C] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>Single: {toDisplay(36)} {unit.toLowerCase()}</span>
                <span>Queen: {toDisplay(60)} | King: {toDisplay(72)} {unit.toLowerCase()}</span>
                <span>Bespoke Max: {toDisplay(MAX_W)} {unit.toLowerCase()}</span>
              </div>
            </div>
          </div>

          {/* 2. Thickness */}
          <div className="space-y-3">
            <h2 className="font-serif font-bold text-base text-[#0B192C] flex items-center space-x-2">
              <Layers className="w-5 h-5 text-[#C5A880]" />
              <span>2. Choose Core Thickness</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              {Object.entries(THICKNESS_FACTORS).map(([inchKey, data]) => {
                const numericInch = Number(inchKey);
                const isSelected = thickness === numericInch;
                return (
                  <button
                    key={inchKey}
                    type="button"
                    onClick={() => setThickness(numericInch)}
                    className={`p-3.5 rounded-2xl border text-center transition ${
                      isSelected
                        ? 'border-[#0B192C] bg-[#0B192C] text-white shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-400 text-gray-800'
                    }`}
                  >
                    <span className="font-bold block text-sm">{numericInch} Inch</span>
                    <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-[#C5A880]' : 'text-gray-400'}`}>
                      {data.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Material Core */}
          <div className="space-y-3">
            <h2 className="font-serif font-bold text-base text-[#0B192C]">
              3. Select Sleep Tech Material Core
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {MATERIALS.map((mat) => {
                const isSelected = selectedMaterial.id === mat.id;
                return (
                  <div
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30 bg-[#FAF9F6]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <span className="font-bold text-sm text-[#0B192C]">{mat.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0B192C] text-[#C5A880] shrink-0">
                          {mat.tag}
                        </span>
                      </div>
                      <p className="text-gray-500 text-[11px] leading-relaxed mt-1">{mat.description}</p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                      <span className="font-medium text-gray-600">Feel: <strong>{mat.feel}</strong></span>
                      <span className="text-emerald-700 font-bold">{mat.warrantyYears} Yrs Warranty</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Corner Geometry */}
          <div className="space-y-3">
            <h2 className="font-serif font-bold text-base text-[#0B192C]">
              4. Bed Frame Corner Geometry
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {CORNER_TYPES.map((corner) => {
                const isPicked = selectedCorner.id === corner.id;
                return (
                  <button
                    key={corner.id}
                    type="button"
                    onClick={() => setSelectedCorner(corner)}
                    className={`p-3.5 rounded-xl border text-left transition ${
                      isPicked
                        ? 'border-[#0B192C] bg-[#0B192C] text-white shadow-sm'
                        : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800'
                    }`}
                  >
                    <span className="font-bold block">{corner.name}</span>
                    <span className={`text-[10px] block mt-1 ${isPicked ? 'text-[#C5A880]' : 'text-gray-500'}`}>
                      {corner.extraCharge === 0 ? 'Standard (+₹0)' : `Custom Cut (+₹${corner.extraCharge.toLocaleString('en-IN')})`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Preview & Billing Column */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* Proportional Bed Canvas */}
          <div className="bg-[#0B192C] text-white p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#C5A880] font-bold uppercase tracking-wider">Live Proportion Canvas</span>
              <span className="text-gray-300 font-mono text-[11px]">Dynamic 1:1 Scale</span>
            </div>

            <div className="h-64 flex items-center justify-center p-4 bg-[#1E3E62]/40 rounded-2xl border border-gray-800 relative overflow-hidden">
              <div 
                style={{
                  width: `${Math.min(90, Math.max(45, (widthInches / MAX_W) * 85))}%`,
                  height: `${Math.min(90, Math.max(55, (lengthInches / MAX_L) * 90))}%`,
                  borderRadius: selectedCorner.id === 'curved' ? '28px' : '6px'
                }}
                className="bg-white text-[#0B192C] shadow-2xl transition-all duration-300 flex flex-col justify-between p-4 relative border-2 border-[#C5A880]"
              >
                <div className="text-[10px] font-bold text-center border-b pb-1 text-gray-500">
                  HEAD (WIDTH: {toDisplay(widthInches)} {unit.toLowerCase()})
                </div>

                <div className="text-center my-auto">
                  <p className="font-serif font-black text-sm text-[#0B192C] leading-snug">
                    {selectedMaterial.name.split(' ')[0]} {selectedMaterial.name.split(' ')[1] || ''}
                  </p>
                  <p className="text-[10px] text-gray-500 font-bold">{thickness}-Inch Core Depth</p>
                  <p className="text-[9px] text-[#C5A880] font-mono font-bold mt-0.5">{pricing.areaSqFt} Sq. Ft.</p>
                </div>

                <div className="text-[10px] font-bold text-center border-t pt-1 text-gray-500">
                  LENGTH: {toDisplay(lengthInches)} {unit.toLowerCase()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-[11px] text-gray-300 pt-2 border-t border-gray-800">
              <div>
                <span className="text-gray-400 block text-[10px]">Surface Area</span>
                <strong className="text-white">{pricing.areaSqInches.toLocaleString('en-IN')} sq.in</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Thickness</span>
                <strong className="text-white">{thickness}" ({Math.round(thickness * 2.54)} cm)</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Est. Weight</span>
                <strong className="text-[#C5A880]">{pricing.estimatedWeightKg} kg</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Fabrication</span>
                <strong className="text-[#C5A880]">5-7 Days</strong>
              </div>
            </div>
          </div>

          {/* Quotation & Checkout Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-[#0B192C]">Instant Order Quotation</h3>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Base Custom Fabrication:</span>
                <span>₹{pricing.baseSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {selectedCorner.extraCharge > 0 && (
                <div className="flex justify-between text-indigo-700 font-medium">
                  <span>Custom Edge Routing ({selectedCorner.name}):</span>
                  <span>+₹{selectedCorner.extraCharge.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (18% Pan-India Tax Included):</span>
                <span>₹{pricing.gst18.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>White-Glove Pan-India Delivery:</span>
                <span className="font-bold">FREE</span>
              </div>

              {/* ESTIMATED MATTRESS WEIGHT FIELD */}
              <div className="p-3.5 bg-[#FAF9F6] rounded-2xl border border-gray-200/80 space-y-1.5 my-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center space-x-1.5 font-bold text-[#0B192C] text-xs">
                    <Weight className="w-4 h-4 text-[#C5A880]" />
                    <span>Estimated Mattress Weight:</span>
                  </span>
                  <div className="text-right">
                    <span className="font-serif font-black text-sm text-[#0B192C]">
                      {pricing.estimatedWeightKg} kg
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono ml-1.5">
                      ({pricing.estimatedWeightLbs} lbs)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-500 pt-1.5 border-t border-gray-200/60 font-medium">
                  <span>Core Density: <strong className="text-gray-700">{selectedMaterial.densityLabel}</strong></span>
                  <span>Net Volume: <strong className="text-gray-700 font-mono">{(pricing.volumeCuIn / 1728).toFixed(1)} cu.ft</strong></span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-gray-400 line-through">₹{pricing.standardMRP.toLocaleString('en-IN')}</span>
                  <div className="text-2xl font-serif font-black text-[#0B192C]">
                    ₹{pricing.finalAmount.toLocaleString('en-IN')}
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Save ₹{(pricing.standardMRP - pricing.finalAmount).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleOrderCustom}
                disabled={addedToast}
                className="w-full py-4 bg-[#0B192C] hover:bg-[#1E3E62] text-[#C5A880] font-bold text-xs uppercase tracking-wider rounded-2xl shadow-xl transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                {addedToast ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-white">Custom Mattress Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                    <span>Order Custom Made Mattress</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/917324906081?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold text-xs rounded-2xl transition flex items-center justify-center space-x-2 border border-[#25D366]/30"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Consult Dimensions on WhatsApp</span>
              </a>
            </div>

            <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-[11px] text-gray-500">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>10-Yr Sag-Free Warranty</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Truck className="w-4 h-4 text-[#C5A880]" />
                <span>Transit Box Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Measurement Modal */}
      {showMeasureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setShowMeasureModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl z-10 space-y-6">
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">Measurement Precision Guide</span>
                <h3 className="font-serif font-bold text-xl text-[#0B192C]">How to Measure Your Bed Cot Correctly</h3>
              </div>
              <button 
                type="button"
                onClick={() => setShowMeasureModal(false)}
                className="text-gray-400 hover:text-black font-bold text-base px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-start space-x-2.5 text-amber-900">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span><strong>Never measure your old compressed mattress!</strong> Old mattresses stretch and deform with body impressions. Always measure the interior drop area of your bed cot directly.</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#0B192C] text-[#C5A880] flex items-center justify-center font-bold text-xs shrink-0">1</div>
                  <div>
                    <h5 className="font-bold text-[#0B192C]">Measure Cot Inner Length</h5>
                    <p className="text-gray-500">Run a steel measuring tape along the inside edge of the headboard to the inside edge of the footboard.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#0B192C] text-[#C5A880] flex items-center justify-center font-bold text-xs shrink-0">2</div>
                  <div>
                    <h5 className="font-bold text-[#0B192C]">Measure Cot Inner Width</h5>
                    <p className="text-gray-500">Measure inside edge to inside edge from the left rail to the right rail across the center of the bed frame.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#0B192C] text-[#C5A880] flex items-center justify-center font-bold text-xs shrink-0">3</div>
                  <div>
                    <h5 className="font-bold text-[#0B192C]">Deduct 0.5" for Easy Tuck-in (Recommended)</h5>
                    <p className="text-gray-500">If your bed frame has high recessed wooden lip edges, subtract 0.5 inches (1.2 cm) from your measured length and width for seamless tuck-in of bedsheets.</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowMeasureModal(false)}
              className="w-full py-3 bg-[#0B192C] text-[#C5A880] font-bold text-xs rounded-xl hover:bg-[#1E3E62] transition"
            >
              I Understand, Continue Designing
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
