import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    discountPrice: '',
    description: '',
    imageUrl: '',
    stock: '',
    isFeatured: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        discountPrice: Number(formData.discountPrice || 0),
        stock: Number(formData.stock),
        images: [formData.imageUrl]
      };

      await API.post('/admin/products', productData);
      
      setSuccess('Asset Successfully Commissioned to Vault.');
      setFormData({
        name: '',
        brand: '',
        category: '',
        price: '',
        discountPrice: '',
        description: '',
        imageUrl: '',
        stock: '',
        isFeatured: false
      });
      
      setTimeout(() => navigate('/admin/products'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Protocol Failure. Authentication check required.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      <div className="flex items-center gap-8 mb-12">
        <button 
            onClick={() => navigate('/admin/products')} 
            className="w-14 h-14 flex items-center justify-center bg-surface-container border border-outline-variant rounded-2xl text-on-surface-variant hover:text-primary hover:bg-white hover:border-primary-container transition-all active:scale-95 shadow-sm"
        >
          <span className="material-symbols-outlined text-[28px]">arrow_back_ios_new</span>
        </button>
        <div>
            <h2 className="text-4xl font-black text-on-background italic tracking-tighter brand-logo uppercase leading-none mb-2">New Commission</h2>
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em]">Initiating asset registration protocol.</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-[48px] p-12 md:p-20 relative overflow-hidden shadow-sm group">
        {/* Design Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(74,124,89,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(74,124,89,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        
        {error && (
          <div className="mb-12 p-6 bg-error-container/10 border border-error/20 text-error rounded-2xl flex items-center gap-5 animate-shake">
            <span className="material-symbols-outlined text-[24px]">gpp_maybe</span>
            <p className="text-[11px] font-black uppercase tracking-widest leading-relaxed">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-12 p-6 bg-primary/5 border border-primary-container/30 text-primary rounded-2xl flex items-center gap-5 animate-fade-in">
            <span className="material-symbols-outlined text-[24px]">verified</span>
            <p className="text-[11px] font-black uppercase tracking-widest leading-relaxed">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {/* Title/Name */}
            <div className="space-y-4 group/input">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label">Asset Designation</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="EX: CUSTOM '67 CAMARO"
                  className="w-full bg-surface-container border border-outline-variant focus:border-primary-container focus:bg-white rounded-2xl py-5 px-8 text-sm font-bold text-on-surface outline-none transition-all placeholder:text-on-surface-variant/30 font-headline italic"
                />
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-4 group/input">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label">Manufacturing Origin</label>
              <input 
                type="text" 
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                placeholder="EX: HOT WHEELS"
                className="w-full bg-surface-container border border-outline-variant focus:border-primary-container focus:bg-white rounded-2xl py-5 px-8 text-sm font-bold text-on-surface outline-none transition-all placeholder:text-on-surface-variant/30 font-headline italic"
              />
            </div>

            {/* Category */}
            <div className="space-y-4 group/input">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label">Strategic Class</label>
              <div className="relative group/select">
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container border border-outline-variant focus:border-primary-container focus:bg-white rounded-2xl py-5 px-8 text-sm font-bold text-on-surface outline-none transition-all cursor-pointer appearance-none font-headline italic pr-12"
                >
                  <option value="">SELECT CLASS</option>
                  <option value="Muscle">MUSCLE</option>
                  <option value="Exotic">EXOTIC</option>
                  <option value="JDM">JDM</option>
                  <option value="Classic">CLASSIC</option>
                  <option value="Special Edition">SPECIAL OPS</option>
                </select>
                <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 pointer-events-none group-focus-within/select:text-primary transition-colors">expand_more</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-4 group/input">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label">Net Valuation (INR)</label>
              <div className="relative">
                <span className="absolute left-8 top-1/2 -translate-y-1/2 text-primary font-black italic text-lg">₹</span>
                <input 
                  type="number" 
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="0.00"
                  className="w-full bg-surface-container border border-outline-variant focus:border-primary-container focus:bg-white rounded-2xl py-5 pl-14 pr-8 text-lg font-black text-on-surface outline-none transition-all placeholder:text-on-surface-variant/30 font-mono tracking-tighter italic"
                />
              </div>
            </div>

            {/* Stock */}
            <div className="space-y-4 group/input">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label">Available Capacity</label>
              <input 
                type="number" 
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                placeholder="QUANTITY"
                className="w-full bg-surface-container border border-outline-variant focus:border-primary-container focus:bg-white rounded-2xl py-5 px-8 text-sm font-bold text-on-surface outline-none transition-all placeholder:text-on-surface-variant/30 font-headline italic"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-4 group/input">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label">Visual Data Link</label>
              <input 
                type="url" 
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                placeholder="HTTPS://ACQUISITION.DATA/LINK"
                className="w-full bg-surface-container border border-outline-variant focus:border-primary-container focus:bg-white rounded-2xl py-5 px-8 text-sm font-bold text-on-surface outline-none transition-all placeholder:text-on-surface-variant/30 font-headline italic"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4 group/input">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label">Technical Intelligence</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              placeholder="STRATEGIC SPECIFICATIONS AND UNIT HISTORY..."
              className="w-full bg-surface-container border border-outline-variant focus:border-primary-container focus:bg-white rounded-[28px] py-6 px-8 text-sm font-bold text-on-surface outline-none transition-all resize-none placeholder:text-on-surface-variant/30 font-body leading-relaxed"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-12 pt-8">
              {/* Featured Toggle */}
              <label className="flex items-center gap-6 cursor-pointer group/toggle">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    id="isFeatured"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-16 h-8 bg-surface-container border border-outline-variant rounded-full peer-checked:bg-primary/20 peer-checked:border-primary transition-all shadow-inner"></div>
                  <div className="absolute left-1.5 top-1.5 w-5 h-5 bg-on-surface-variant/30 rounded-full transition-all peer-checked:translate-x-8 peer-checked:bg-primary shadow-md"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] group-hover/toggle:text-on-surface transition-colors font-label">Spotlight Allocation</span>
                  <span className="text-[9px] font-medium text-on-surface-variant/40 uppercase tracking-widest mt-1">High priority deployment</span>
                </div>
              </label>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full sm:w-auto bg-primary text-on-primary font-black text-[11px] uppercase tracking-[0.4em] py-6 px-16 rounded-2xl flex items-center justify-center gap-5 hover:bg-primary-container hover:text-on-primary-container transition-all shadow-xl active:scale-[0.97] group ${loading ? 'opacity-30 cursor-not-allowed' : ''}`}
              >
                {loading ? 'PROCESSING...' : 'CONFIRM COMMISSION'}
                <span className="material-symbols-outlined text-[24px] group-hover:rotate-12 transition-transform">{loading ? 'sync' : 'verified'}</span>
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
