import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/cart');
      setCartItems(data.items || []);
      setError(null);
    } catch (err) {
      setError('System Failure: Unable to inspect cargo data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      await API.put(`/cart/${productId}`, { quantity: newQty });
      fetchCart();
    } catch (err) {
      alert('Failed to update quantity');
    }
  };

  const removeItem = async (productId) => {
    try {
      await API.delete(`/cart/${productId}`);
      fetchCart();
    } catch (err) {
      alert('Failed to remove item');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product.discountPrice > 0 ? item.product.discountPrice : item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const shipping = cartItems.length > 0 ? 150.00 : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background">
      <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Inspecting Cargo Manifest...</p>
    </div>
  );

  return (
    <div className="pt-32 pb-24 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 min-h-screen bg-background">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 animate-fade-in-up">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-on-background tracking-tighter italic brand-logo uppercase leading-none">Your Cargo</h1>
          <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] mt-3">Reviewing {cartItems.length} units scheduled for deployment.</p>
        </div>
        <div className="mt-8 md:mt-0 flex items-center gap-4 bg-surface-container border border-outline-variant rounded-2xl px-6 py-3 shadow-sm">
           <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
           <span className="text-[10px] font-black text-on-surface uppercase tracking-widest">Protocol: Secure</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
        {/* Subtle background decorative element */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Cart Items */}
        <div className="lg:col-span-8 flex flex-col gap-8 relative z-10">
          {cartItems.map((item, index) => (
            <div 
              key={item.product._id} 
              className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-8 flex flex-col sm:flex-row gap-10 items-center shadow-sm group hover:border-primary/30 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-full sm:w-44 h-44 rounded-2xl bg-surface-container border border-outline-variant overflow-hidden flex-shrink-0 flex items-center justify-center p-6 group-hover:bg-white transition-colors duration-500">
                <img 
                  alt={item.product.name} 
                  className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-700" 
                  src={item.product.images?.[0] || 'https://via.placeholder.com/100'} 
                />
              </div>
              <div className="flex-grow flex flex-col sm:flex-row justify-between w-full gap-8">
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block font-label">{item.product.brand}</span>
                    <h3 className="text-2xl font-black text-on-surface italic tracking-tight mb-4 font-headline">{item.product.name}</h3>
                    <p className="text-on-surface-variant text-sm font-medium leading-relaxed mb-6 line-clamp-2 max-w-sm">{item.product.description || 'Authentic die-cast legend ready for your collection.'}</p>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="flex items-center bg-surface-container rounded-xl border border-outline-variant overflow-hidden shadow-inner">
                      <button 
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="p-3 text-on-surface-variant hover:text-primary hover:bg-white transition-all active:scale-90"
                      >
                        <span className="material-symbols-outlined text-[20px]">remove</span>
                      </button>
                      <span className="px-6 text-sm font-black text-on-surface font-mono">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="p-3 text-on-surface-variant hover:text-primary hover:bg-white transition-all active:scale-90"
                      >
                        <span className="material-symbols-outlined text-[20px]">add</span>
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.product._id)}
                      className="text-on-surface-variant/40 hover:text-error transition-all font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 group/del"
                    >
                      <span className="material-symbols-outlined text-[20px] group-hover/del:rotate-12 transition-transform">delete_sweep</span> 
                      Release Unit
                    </button>
                  </div>
                </div>
                <div className="text-left sm:text-right flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-outline-variant/30 pt-8 sm:pt-0 sm:pl-8">
                  <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2 font-label">Subtotal</p>
                  <p className="text-2xl font-black text-on-surface italic tracking-tighter font-headline">
                    ₹{((item.product.discountPrice > 0 ? item.product.discountPrice : item.product.price) * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {cartItems.length === 0 && (
            <div className="bg-surface-container/30 border border-dashed border-outline-variant rounded-[48px] p-24 flex flex-col items-center justify-center text-center gap-10 animate-fade-in">
              <div className="w-28 h-28 bg-surface-container rounded-full flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">inventory_2</span>
              </div>
              <div>
                <h3 className="text-3xl font-black text-on-surface italic uppercase font-headline">Cargo Void</h3>
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] max-w-xs mx-auto leading-relaxed mt-4">No assets detected within the current logistics manifest.</p>
              </div>
              <Link to="/shop" className="bg-primary text-on-primary px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-primary-container hover:text-on-primary-container transition-all shadow-xl active:scale-[0.98]">
                Scout the Studio
              </Link>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="lg:col-span-4 relative z-10">
          <div className="bg-surface-container border border-outline-variant rounded-[40px] p-10 flex flex-col gap-10 sticky top-32 shadow-sm overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-2 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
             
            <h3 className="text-2xl font-black text-on-background italic tracking-tight border-b border-outline-variant/30 pb-8 font-headline uppercase">Acquisition Protocol</h3>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Net Unit Value</span>
                <span className="text-lg font-black text-on-surface italic tracking-tight font-headline">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Strategic Logistics</span>
                <span className="text-lg font-black text-on-surface italic tracking-tight font-headline">₹{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Reg. Tax (18% GST)</span>
                <span className="text-lg font-black text-on-surface italic tracking-tight font-headline">₹{tax.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 pt-10 border-t border-outline-variant relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-on-surface uppercase tracking-[0.3em]">Total Valuation</span>
                <span className="text-4xl font-black text-primary italic tracking-tighter font-headline">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>

            {cartItems.length > 0 && (
              <Link to="/checkout" className="w-full bg-primary text-on-primary font-black text-[11px] py-6 rounded-2xl flex justify-center items-center gap-5 hover:bg-primary-container hover:text-on-primary-container transition-all shadow-xl group uppercase tracking-[0.4em] active:scale-[0.98]">
                Initiate Deployment 
                <span className="material-symbols-outlined text-[24px] group-hover:translate-x-2 transition-transform">verified</span>
              </Link>
            )}
            
            <div className="flex items-center justify-center gap-4 mt-2 text-on-surface-variant/40 text-[9px] font-black uppercase tracking-[0.4em]">
                <span className="material-symbols-outlined text-lg">shield</span>
                Encrypted Transaction protocol active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
