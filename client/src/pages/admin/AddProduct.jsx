import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api/axios';

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    description: '',
    stock: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        try {
          const { data } = await API.get(`/products/${id}`);
          setFormData({
            name: data.name,
            brand: data.brand,
            category: data.category,
            price: data.price,
            description: data.description,
            stock: data.stock,
          });
          setPreview(data.image?.startsWith('http') ? data.image : `${import.meta.env.VITE_API_URL || ''}${data.image || ''}`);
        } catch (err) {
          setError('Failed to fetch asset data.');
        } finally {
          setFetching(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('brand', formData.brand);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('stock', formData.stock);
    if (image) data.append('image', image);

    try {
      if (isEdit) {
        await API.put(`/admin/edit-product/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSuccess('Asset Successfully Updated.');
      } else {
        await API.post('/admin/add-product', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSuccess('Asset Successfully Commissioned.');
      }
      setTimeout(() => navigate('/admin/products'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Protocol Failure.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
        <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Retrieving Asset Data...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up pb-20">
      <div className="flex items-center gap-6 mb-10">
        <button 
            onClick={() => navigate('/admin/products')} 
            className="w-12 h-12 flex items-center justify-center bg-surface-container border border-outline-variant rounded-xl text-on-surface-variant hover:text-primary transition-all active:scale-95 shadow-sm"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <div>
            <h2 className="text-3xl font-black italic tracking-tighter brand-logo uppercase leading-none mb-1">{isEdit ? 'Edit Asset' : 'New Commission'}</h2>
            <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Initiating registration protocol.</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-sm">
        {error && (
          <div className="mb-8 p-5 bg-error-container/10 border border-error/20 text-error rounded-2xl flex items-center gap-4 animate-shake">
            <span className="material-symbols-outlined text-xl">warning</span>
            <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-8 p-5 bg-primary/5 border border-primary-container/30 text-primary rounded-2xl flex items-center gap-4 animate-fade-in">
            <span className="material-symbols-outlined text-xl">verified</span>
            <p className="text-[10px] font-black uppercase tracking-widest">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.3em] ml-2 font-label">Asset Designation</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="EX: CUSTOM '67 CAMARO"
                className="w-full bg-surface-container border border-outline-variant focus:border-primary-container focus:bg-white rounded-xl py-4 px-6 text-sm font-bold outline-none transition-all placeholder:text-on-surface-variant/30 font-headline italic"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.3em] ml-2 font-label">Manufacturing Origin</label>
              <input 
                type="text" 
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                placeholder="EX: HOT WHEELS"
                className="w-full bg-surface-container border border-outline-variant focus:border-primary-container focus:bg-white rounded-xl py-4 px-6 text-sm font-bold outline-none transition-all placeholder:text-on-surface-variant/30 font-headline italic"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.3em] ml-2 font-label">Strategic Class</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full bg-surface-container border border-outline-variant focus:border-primary-container focus:bg-white rounded-xl py-4 px-6 text-sm font-bold outline-none transition-all cursor-pointer font-headline italic"
              >
                <option value="">SELECT CLASS</option>
                <option value="Muscle">MUSCLE</option>
                <option value="Exotic">EXOTIC</option>
                <option value="JDM">JDM</option>
                <option value="Classic">CLASSIC</option>
                <option value="Special Edition">SPECIAL OPS</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.3em] ml-2 font-label">Net Valuation (INR)</label>
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="0.00"
                className="w-full bg-surface-container border border-outline-variant focus:border-primary-container focus:bg-white rounded-xl py-4 px-6 text-sm font-bold outline-none transition-all font-mono italic"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.3em] ml-2 font-label">Available Capacity</label>
              <input 
                type="number" 
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                placeholder="QUANTITY"
                className="w-full bg-surface-container border border-outline-variant focus:border-primary-container focus:bg-white rounded-xl py-4 px-6 text-sm font-bold outline-none transition-all font-headline italic"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.3em] ml-2 font-label">Visual Capture</label>
              <div className="flex items-center gap-6">
                <label className="flex-1 bg-surface-container border border-outline-variant border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white transition-all group">
                  <span className="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary transition-colors">cloud_upload</span>
                  <span className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest mt-2">Upload Image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} required={!isEdit} />
                </label>
                {preview && (
                  <div className="w-24 h-24 rounded-xl bg-surface-container border border-outline-variant overflow-hidden p-2">
                    <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.3em] ml-2 font-label">Technical Intelligence</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="STRATEGIC SPECIFICATIONS..."
              className="w-full bg-surface-container border border-outline-variant focus:border-primary-container focus:bg-white rounded-2xl py-4 px-6 text-sm font-bold outline-none transition-all resize-none leading-relaxed"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-primary text-on-primary font-black text-[10px] uppercase tracking-[0.3em] py-5 rounded-xl flex items-center justify-center gap-4 hover:bg-primary-container transition-all active:scale-[0.98] ${loading ? 'opacity-30' : ''}`}
          >
            {loading ? 'PROCESSING...' : isEdit ? 'CONFIRM UPDATE' : 'CONFIRM COMMISSION'}
            <span className="material-symbols-outlined text-xl">{loading ? 'sync' : 'verified'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
