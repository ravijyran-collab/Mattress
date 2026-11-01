import React, { useState } from 'react';
import { Award, Check, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { FALLBACK_IMAGE } from '../data/productImages';

interface SmartQuizProps {
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onClose: () => void;
}

export const SmartQuiz: React.FC<SmartQuizProps> = ({ products, onSelectProduct, onClose }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    userType: 'Adult',
    position: 'Back Sleeper',
    firmness: 'Firm',
    pain: 'Yes',
    material: 'Any / Specialist Recommended'
  });

  const getRecommendation = (): Product => {
    if (answers.userType === 'Child') {
      const kid = products.find(p => p.subCategory === 'Kids Mattress' || p.subCategory === 'Pediatric Mattress');
      if (kid) return kid;
    }
    if (answers.pain === 'Yes') {
      const ortho = products.find(p => p.id === 'sm-ortho-01');
      if (ortho) return ortho;
    }
    if (answers.material.toLowerCase().includes('latex')) {
      const latex = products.find(p => p.id === 'sm-latex-02');
      if (latex) return latex;
    }
    if (answers.material.toLowerCase().includes('spring')) {
      const spring = products.find(p => p.id === 'sm-pocket-03');
      if (spring) return spring;
    }
    if (answers.firmness === 'Dual') {
      const dual = products.find(p => p.id === 'sm-dual-04');
      if (dual) return dual;
    }
    return products[0];
  };

  const recommendedProduct = getRecommendation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl space-y-8">
        {/* Top Header */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-[#C5A880] text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Smart Sleep Algorithm</span>
            </div>
            <h2 className="font-serif font-black text-2xl text-[#0B192C]">
              Interactive Mattress Selector
            </h2>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="text-xs font-bold text-gray-400 hover:text-black px-3 py-1.5 rounded-lg border border-gray-200"
          >
            Exit Quiz
          </button>
        </div>

        {/* Step Stepper */}
        <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
          <span className={step >= 1 ? 'text-[#0B192C]' : ''}>1. Sleeper Profile</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-[#0B192C]' : ''}>2. Posture & Spine</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-[#0B192C]' : ''}>3. Firmness & Tech</span>
          <span>→</span>
          <span className={step === 4 ? 'text-[#0B192C]' : ''}>4. Recommendation</span>
        </div>

        {/* Question 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base text-[#0B192C]">
              1. Who is this mattress intended for?
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { title: 'Adult / Couple', desc: 'Standard spine support, motion isolation & ergonomics' },
                { title: 'Growing Child / Pediatric', desc: 'Non-toxic, hypoallergenic, bone development core' }
              ].map(opt => (
                <button
                  key={opt.title}
                  type="button"
                  onClick={() => {
                    setAnswers({ ...answers, userType: opt.title.includes('Child') ? 'Child' : 'Adult' });
                    setStep(2);
                  }}
                  className="p-5 rounded-2xl border border-gray-200 hover:border-[#0B192C] text-left transition hover:shadow-sm"
                >
                  <span className="font-bold block text-sm text-[#0B192C] mb-1">{opt.title}</span>
                  <span className="text-[11px] text-gray-500 leading-relaxed block">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-[#0B192C]">
                2. Do you or your partner experience back, neck, or joint pain?
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { val: 'Yes', label: 'Yes, need Orthopedic Spine Relief', desc: 'Clinically tested firm postural realignment' },
                  { val: 'No', label: 'No, prefer General Comfort', desc: 'Balanced hotel-like body cradling' }
                ].map(item => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => {
                      setAnswers({ ...answers, pain: item.val });
                    }}
                    className={`p-4 rounded-2xl border text-left transition ${
                      answers.pain === item.val
                        ? 'border-[#0B192C] bg-[#0B192C] text-white shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 text-gray-800'
                    }`}
                  >
                    <span className="font-bold block text-sm mb-0.5">{item.label}</span>
                    <span className={`text-[11px] block ${answers.pain === item.val ? 'text-gray-300' : 'text-gray-500'}`}>{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-[#0B192C]">
                Primary Sleeping Position
              </h3>
              <div className="grid grid-cols-3 gap-2.5 text-xs">
                {['Back Sleeper', 'Side Sleeper', 'Stomach / Multi-sleeper'].map(pos => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => {
                      setAnswers({ ...answers, position: pos });
                      setStep(3);
                    }}
                    className={`p-3.5 rounded-xl border text-center font-bold transition ${
                      answers.position === pos
                        ? 'border-[#0B192C] bg-[#0B192C] text-[#C5A880]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Question 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-[#0B192C]">
                3. Preferred Comfort Firmness Feel
              </h3>
              <div className="grid grid-cols-3 gap-3 text-xs">
                {[
                  { feel: 'Medium Soft', label: 'Soft & Cradling', note: 'Deep contouring plush' },
                  { feel: 'Medium Firm', label: 'Medium Balanced', note: 'Hotel standard compromise' },
                  { feel: 'Firm', label: 'Firm & Orthopedic', note: 'Maximum spine support' }
                ].map(f => (
                  <button
                    key={f.feel}
                    type="button"
                    onClick={() => setAnswers({ ...answers, firmness: f.feel })}
                    className={`p-4 rounded-2xl border text-left transition ${
                      answers.firmness === f.feel
                        ? 'border-[#0B192C] bg-[#0B192C] text-white'
                        : 'border-gray-200 hover:border-gray-300 text-gray-800'
                    }`}
                  >
                    <span className="font-bold block text-sm mb-0.5">{f.label}</span>
                    <span className={`text-[10px] block ${answers.firmness === f.feel ? 'text-[#C5A880]' : 'text-gray-500'}`}>{f.note}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-[#0B192C]">
                Preferred Material Core
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {['Memory Foam', 'Natural Latex', 'Pocket Spring', 'Dual Reversible'].map(mat => (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => {
                      setAnswers({ ...answers, material: mat });
                      setStep(4);
                    }}
                    className="p-3 rounded-xl border border-gray-200 hover:border-[#0B192C] font-semibold text-center hover:bg-gray-50 transition"
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Final Recommendation */}
        {step === 4 && (
          <div className="text-center space-y-6 py-2">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold text-[#C5A880] tracking-wider">
                Matching Algorithm Result
              </span>
              <h3 className="font-serif font-black text-2xl text-[#0B192C] mt-1">
                {recommendedProduct.title}
              </h3>
              <p className="text-xs text-gray-500 max-w-lg mx-auto mt-2 leading-relaxed">
                {recommendedProduct.description}
              </p>
            </div>

            {/* Product Snapshot Card */}
            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-gray-200 max-w-md mx-auto flex items-center gap-4 text-left">
              <img 
                src={recommendedProduct.images[0] || FALLBACK_IMAGE} 
                alt={recommendedProduct.title} 
                className="w-20 h-20 rounded-xl object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== FALLBACK_IMAGE) {
                    target.src = FALLBACK_IMAGE;
                  }
                }}
              />
              <div className="flex-1 text-xs">
                <span className="text-[10px] text-gray-400 uppercase font-bold">{recommendedProduct.subCategory}</span>
                <h4 className="font-bold text-sm text-[#0B192C] line-clamp-1">{recommendedProduct.title}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-base font-black text-[#0B192C]">₹{recommendedProduct.basePrice.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-gray-400 line-through">₹{recommendedProduct.originalPrice.toLocaleString('en-IN')}</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold">{recommendedProduct.trialNights} Nights Trial • {recommendedProduct.warrantyYears} Yrs Warranty</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onSelectProduct(recommendedProduct)}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#0B192C] hover:bg-[#1E3E62] text-[#C5A880] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                <span>Configure This Mattress</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-auto px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
