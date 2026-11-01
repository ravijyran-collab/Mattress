import React, { useState } from 'react';
import { 
  Plus, Edit3, Trash2, ArrowLeft, BarChart3, Package, 
  ShoppingBag, Users, Tag, Truck, RefreshCw, X
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCT_IMAGES } from '../data/productImages';

interface AdminConsoleProps {
  products: Product[];
  onAddOrUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onClose: () => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  products,
  onAddOrUpdateProduct,
  onDeleteProduct,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'PRODUCTS' | 'ORDERS' | 'COUPONS' | 'HUBS'>('PRODUCTS');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Partial<Product>>({
    id: '',
    title: '',
    category: 'MATTRESSES',
    subCategory: 'Orthopedic Mattress',
    basePrice: 14999,
    originalPrice: 22999,
    firmness: 'Firm',
    material: 'High-Density Bonded Foam',
    rating: 4.8,
    reviewCount: 150,
    warrantyYears: 10,
    trialNights: 100,
    images: [PRODUCT_IMAGES.orthoSpinealign],
    description: 'Physiotherapist recommended ergonomic spine support mattress.'
  });

  const handleOpenAdd = () => {
    setEditProduct({
      id: `sm-sku-${Date.now().toString().slice(-6)}`,
      title: '',
      category: 'MATTRESSES',
      subCategory: 'Active Recovery Mattress',
      basePrice: 16999,
      originalPrice: 24999,
      firmness: 'Medium Firm',
      material: 'Pocket Spring & Gel Visco Foam',
      rating: 5.0,
      reviewCount: 1,
      warrantyYears: 10,
      trialNights: 100,
      images: [PRODUCT_IMAGES.hero],
      description: 'Manufactured with high-tensile core support and aero cooling.'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditProduct({ ...p });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct.title || !editProduct.basePrice) return;
    onAddOrUpdateProduct(editProduct as Product);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 gap-4">
        <div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-[#0B192C] mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Storefront</span>
          </button>
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-[#0B192C]">
            Sleepmall Master Operations Control
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Realtime Pan-India inventory, orders, discount coupons, and logistics management.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#0B192C] hover:bg-[#1E3E62] text-[#C5A880] text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center space-x-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Mattress SKU</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue (FY 2026)', value: '₹4.82 Cr', icon: BarChart3, sub: '+18.4% this quarter' },
          { label: 'Pan-India Active SKUs', value: `${products.length} Products`, icon: Package, sub: 'In stock across 3 hubs' },
          { label: 'Dispatched Consignments', value: '1,428 Orders', icon: ShoppingBag, sub: 'Delhivery & BlueDart' },
          { label: 'Verified Customers', value: '18,920 Pan-India', icon: Users, sub: '98.6% 100-night trial retention' }
        ].map((kpi, idx) => (
          <div key={idx} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{kpi.label}</span>
              <kpi.icon className="w-4 h-4 text-[#C5A880]" />
            </div>
            <div className="font-serif font-black text-xl text-[#0B192C]">{kpi.value}</div>
            <span className="text-[10px] text-emerald-700 font-semibold block">{kpi.sub}</span>
          </div>
        ))}
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center space-x-2 border-b border-gray-200 text-xs font-bold">
        {[
          { id: 'PRODUCTS', label: `Catalog SKUs (${products.length})` },
          { id: 'ORDERS', label: 'Recent Pan-India Orders (12)' },
          { id: 'COUPONS', label: 'Active Coupons (SLEEPNEW, COMFORT2000)' },
          { id: 'HUBS', label: 'Fulfillment Hubs (Delhi, Mumbai, Bengaluru)' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 px-3 transition border-b-2 ${
              activeTab === tab.id
                ? 'border-[#0B192C] text-[#0B192C]'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Catalog Table */}
      {activeTab === 'PRODUCTS' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F6] border-b border-gray-100 text-gray-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Product Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Firmness & Material</th>
                  <th className="p-4">Base Price (INR)</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/80 transition">
                    <td className="p-4 flex items-center space-x-3">
                      <img src={p.images[0]} alt="" className="w-12 h-12 object-cover rounded-xl border border-gray-200 shrink-0" />
                      <div>
                        <span className="font-bold text-[#0B192C] block text-sm line-clamp-1">{p.title}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{p.id}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">
                      <span className="font-bold text-[#0B192C] block">{p.subCategory}</span>
                      <span className="text-[10px] text-gray-400">{p.category}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-[#0B192C] block">{p.firmness}</span>
                      <span className="text-[10px] text-gray-500 line-clamp-1">{p.material}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-black text-[#0B192C] block text-sm">₹{p.basePrice.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-gray-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-gray-800">★ {p.rating}</span>
                      <span className="text-[10px] text-gray-400 block">({p.reviewCount} reviews)</span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-gray-600 hover:text-black rounded-lg hover:bg-gray-100 transition"
                        title="Edit Product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition"
                        title="Delete SKU"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsModalOpen(false)} 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
          />
          <form 
            onSubmit={handleSaveProduct} 
            className="relative bg-white rounded-3xl p-6 sm:p-8 w-full max-w-xl shadow-2xl z-10 space-y-4 text-xs max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif font-black text-lg text-[#0B192C]">
                {editProduct.id ? 'Edit Mattress SKU' : 'Create New Mattress SKU'}
              </h3>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-black font-bold p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="font-bold block mb-1">Product Title *</label>
              <input
                type="text"
                required
                value={editProduct.title || ''}
                onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl bg-[#FAF9F6] focus:bg-white outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold block mb-1">Category</label>
                <select
                  value={editProduct.category}
                  onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                >
                  <option value="MATTRESSES">MATTRESSES</option>
                  <option value="SLEEP ACCESSORIES">SLEEP ACCESSORIES</option>
                  <option value="OTHER PRODUCTS">OTHER PRODUCTS</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Subcategory</label>
                <input
                  type="text"
                  required
                  value={editProduct.subCategory || ''}
                  onChange={(e) => setEditProduct({ ...editProduct, subCategory: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold block mb-1">Base Price (INR) *</label>
                <input
                  type="number"
                  required
                  value={editProduct.basePrice || 0}
                  onChange={(e) => setEditProduct({ ...editProduct, basePrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Original MRP (INR) *</label>
                <input
                  type="number"
                  required
                  value={editProduct.originalPrice || 0}
                  onChange={(e) => setEditProduct({ ...editProduct, originalPrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold block mb-1">Firmness</label>
                <select
                  value={editProduct.firmness}
                  onChange={(e) => setEditProduct({ ...editProduct, firmness: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                >
                  <option value="Soft">Soft</option>
                  <option value="Medium Soft">Medium Soft</option>
                  <option value="Medium Firm">Medium Firm</option>
                  <option value="Firm">Firm</option>
                  <option value="Dual (Soft / Hard)">Dual (Soft / Hard)</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Warranty (Years)</label>
                <input
                  type="number"
                  value={editProduct.warrantyYears || 10}
                  onChange={(e) => setEditProduct({ ...editProduct, warrantyYears: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                />
              </div>
            </div>

            <div>
              <label className="font-bold block mb-1">Material Composition</label>
              <input
                type="text"
                value={editProduct.material || ''}
                onChange={(e) => setEditProduct({ ...editProduct, material: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl bg-white"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">Description</label>
              <textarea
                rows={3}
                value={editProduct.description || ''}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0B192C] hover:bg-[#1E3E62] text-[#C5A880] font-bold uppercase tracking-wider rounded-xl transition shadow"
            >
              Save Product Record
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
