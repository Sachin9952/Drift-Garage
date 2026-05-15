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
    if (window.confirm('Terminate this asset registration?')) {
      try {
        await API.delete(`/admin/delete-product/${id}`);
        fetchProducts();
      } catch (err) {
        alert('Protocol Failure: Unable to release unit.');
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
        <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Syncing Hangar Inventory...</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
        <div>
            <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter brand-logo uppercase leading-none mb-2">Inventory Vault</h2>
            <p className="text-on-surface-variant font-medium text-base">Auditing {products.length} active units within the facility registry.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/products/add')}
          className="bg-primary text-on-primary px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-primary-container transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-xl">add_box</span>
          New Unit
        </button>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-[32px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/30">
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] font-label">Product</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] font-label">Category</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] font-label">Price</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] font-label">Stock</th>
                <th className="p-8 text-right text-[9px] font-black uppercase tracking-[0.3em] font-label">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-primary/5 transition-all group">
                  <td className="p-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-xl bg-surface-container border border-outline-variant flex items-center justify-center overflow-hidden p-2 group-hover:bg-white transition-all">
                          <img 
                            alt={product.name} 
                            className="w-full h-full object-contain" 
                            src={
                              product.image?.startsWith('http') ? product.image : 
                              (product.images && product.images[0]?.startsWith('http')) ? product.images[0] :
                              'https://via.placeholder.com/400x300?text=No+Asset+Found'
                            } 
                          />
                        </div>
                        <div>
                            <span className="text-lg font-black italic tracking-tight block font-headline leading-tight">{product.name}</span>
                            <span className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.1em] mt-1 block font-mono">ID: {product._id.slice(-6).toUpperCase()}</span>
                        </div>
                    </div>
                  </td>
                  <td className="p-8">
                      <span className="text-[9px] font-black text-primary border border-primary-container bg-primary/5 px-4 py-1.5 rounded-lg uppercase tracking-[0.1em]">{product.category}</span>
                  </td>
                  <td className="p-8">
                      <span className="text-xl font-black italic tracking-tighter font-headline">₹{product.price.toLocaleString()}</span>
                  </td>
                  <td className="p-8">
                      <span className={`text-[10px] font-black uppercase tracking-[0.1em] ${product.stock > 10 ? 'text-primary' : 'text-error'}`}>
                        {product.stock} Units
                      </span>
                  </td>
                  <td className="p-8 text-right space-x-3">
                    <button 
                      onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                      className="w-12 h-12 rounded-xl bg-surface-container border border-outline-variant text-on-surface-variant hover:text-primary hover:bg-white transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="w-12 h-12 rounded-xl bg-surface-container border border-outline-variant text-on-surface-variant hover:text-error hover:bg-error-container/10 transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
