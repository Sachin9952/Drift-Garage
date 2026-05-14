import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/admin/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 bg-background">
        <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Syncing Hangar Inventory...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-fade-in-up bg-background">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-10">
        <div>
            <h2 className="text-4xl font-black text-on-background italic tracking-tighter brand-logo mb-3 uppercase leading-none">Inventory Vault</h2>
            <p className="text-on-surface-variant font-medium text-lg">Auditing {products.length} active units within the facility registry.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/products/add')}
          className="bg-primary text-on-primary px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] flex items-center gap-5 hover:bg-primary-container hover:text-on-primary-container transition-all shadow-xl active:scale-[0.98] group"
        >
          <span className="material-symbols-outlined text-[24px] group-hover:rotate-90 transition-transform">add_box</span>
          Commission New Unit
        </button>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-[48px] overflow-hidden shadow-sm relative">
        <div className="overflow-x-auto w-full relative z-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/30">
                <th className="p-10 text-[10px] font-black text-[#1f1f1f] uppercase tracking-[0.4em] font-label">Product Information</th>
                <th className="p-10 text-[10px] font-black text-[#1f1f1f] uppercase tracking-[0.4em] font-label">Category</th>
                <th className="p-10 text-[10px] font-black text-[#1f1f1f] uppercase tracking-[0.4em] font-label">Net Valuation</th>
                <th className="p-10 text-[10px] font-black text-[#1f1f1f] uppercase tracking-[0.4em] font-label">Hangar Status</th>
                <th className="p-10 text-right pr-12 text-[10px] font-black text-[#1f1f1f] uppercase tracking-[0.4em] font-label">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-primary/5 transition-all group">
                  <td className="p-10">
                    <div className="flex items-center gap-8">
                        <div className="w-24 h-24 rounded-3xl bg-surface-container border border-outline-variant flex items-center justify-center overflow-hidden p-4 group-hover:bg-white transition-all shadow-sm">
                          <img 
                            alt={product.name} 
                            className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-700" 
                            src={product.images?.[0] || 'https://via.placeholder.com/60'} 
                          />
                        </div>
                        <div>
                            <span className="text-xl font-black text-[#1f1f1f] italic tracking-tight block group-hover:text-primary transition-colors font-headline leading-tight">{product.name}</span>
                            <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] mt-3 block font-mono">ID: {product._id.slice(-8).toUpperCase()}</span>
                        </div>
                    </div>
                  </td>
                  <td className="p-10">
                      <span className="text-[10px] font-black text-primary border border-primary-container bg-primary/5 px-6 py-2.5 rounded-xl uppercase tracking-[0.2em] font-label">{product.category}</span>
                  </td>
                  <td className="p-10">
                      <span className="text-2xl font-black text-[#1f1f1f] italic tracking-tighter font-headline">₹{product.price.toLocaleString()}</span>
                  </td>
                  <td className="p-10">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                             <div className={`w-2.5 h-2.5 rounded-full ${product.stock > 10 ? 'bg-primary shadow-[0_0_8px_rgba(74,124,89,0.4)]' : 'bg-error animate-pulse shadow-[0_0_8px_rgba(184,50,48,0.4)]'}`}></div>
                             <span className={`text-[10px] font-black uppercase tracking-[0.3em] font-label ${product.stock > 10 ? 'text-primary' : 'text-error'}`}>
                               {product.stock} Units
                             </span>
                        </div>
                        <div className="w-32 h-2 bg-outline-variant/10 rounded-full overflow-hidden shadow-inner">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ${product.stock > 10 ? 'bg-primary' : 'bg-error'}`}
                                style={{ width: `${Math.min(product.stock, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                  </td>
                  <td className="p-10 pr-12 text-right space-x-5">
                    <button className="w-14 h-14 rounded-2xl bg-surface-container border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary-container hover:bg-white transition-all shadow-sm">
                      <span className="material-symbols-outlined text-[24px]">edit_square</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="w-14 h-14 rounded-2xl bg-surface-container border border-outline-variant text-on-surface-variant hover:text-error hover:border-error/40 hover:bg-error-container/10 transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[24px]">delete_forever</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Empty State */}
      {products.length === 0 && (
          <div className="bg-surface-container/30 border border-dashed border-outline-variant rounded-[64px] p-32 flex flex-col items-center justify-center text-center gap-10">
              <div className="w-32 h-32 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant/20 mb-6 shadow-inner">
                  <span className="material-symbols-outlined text-7xl">inventory_2</span>
              </div>
              <div>
                <h3 className="text-4xl font-black text-on-surface italic uppercase font-headline leading-none">Hangar Void</h3>
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] max-w-sm leading-relaxed mt-6">No strategic assets detected within the primary deployment facility registry.</p>
              </div>
              <button 
                onClick={() => navigate('/admin/products/add')}
                className="mt-12 text-primary text-[11px] font-black uppercase tracking-[0.5em] hover:text-on-surface transition-all underline underline-offset-[12px] font-label"
              >
                  Initiate Commission Protocol
              </button>
          </div>
      )}
    </div>
  );
};

export default AdminProducts;
