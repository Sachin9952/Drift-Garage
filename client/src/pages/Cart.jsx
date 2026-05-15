import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeFromCart, updateCartQuantity } from '../utils/cartUtils';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = () => {
    setCartItems(getCart());
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
    window.addEventListener('cartUpdate', fetchCart);
    return () => window.removeEventListener('cartUpdate', fetchCart);
  }, []);

  const handleUpdateQuantity = (productId, newQty) => {
    updateCartQuantity(productId, newQty);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
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
    <div className="pt-32 pb-24 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 min-h-screen bg-background text-on-background">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 animate-fade-in-up">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-on-background tracking-tighter italic brand-logo uppercase leading-none">Your Cargo</h1>
          <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-[0.4em] mt-4">Reviewing {cartItems.length} units scheduled for deployment.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="lg:col-span-8 flex flex-col gap-10 relative z-10">
          {cartItems.map((item, index) => (
            <div 
              key={item.product._id} 
              className="bg-white border border-outline-variant rounded-[32px] p-8 flex flex-col sm:flex-row gap-10 items-center shadow-lg hover:shadow-xl transition-all animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-40 h-40 rounded-2xl bg-surface-container-low border border-outline-variant overflow-hidden flex-shrink-0 flex items-center justify-center p-6 group-hover:bg-white transition-colors duration-500">
                <img 
                  alt={item.product.name} 
                  className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-700" 
                  src={
                    item.product.image?.startsWith('http') ? item.product.image : 
                    item.product.image ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${item.product.image}` :
                    (item.product.images && item.product.images[0]?.startsWith('http')) ? item.product.images[0] :
                    (item.product.images && item.product.images[0]) ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${item.product.images[0]}` :
                    'https://via.placeholder.com/400x300?text=No+Asset+Found'
                  } 
                />
              </div>
              <div className="flex-grow flex flex-col justify-between h-full gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em] font-label">{item.product.brand}</span>
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black text-on-background italic tracking-tight font-headline uppercase">{item.product.name}</h3>
                    <div className="text-right">
                       <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] mb-1 font-label">Subtotal</p>
                       <p className="text-2xl font-black text-on-background italic tracking-tighter font-headline">
                         ₹{(item.product.price * item.quantity).toLocaleString()}
                       </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center bg-surface-container rounded-xl border border-outline-variant overflow-hidden shadow-inner p-1">
                    <button 
                      onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                      className="p-2 text-on-surface-variant hover:text-primary hover:bg-white rounded-lg transition-all active:scale-90"
                    >
                      <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>
                    <span className="px-5 text-sm font-black text-on-surface font-mono">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                      className="p-2 text-on-surface-variant hover:text-primary hover:bg-white rounded-lg transition-all active:scale-90"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(item.product._id)}
                    className="text-on-surface-variant/40 hover:text-error transition-all font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 group/del"
                  >
                    <span className="material-symbols-outlined text-[18px] group-hover/del:rotate-12 transition-transform">delete_sweep</span> 
                    Release Unit
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {cartItems.length === 0 && (
            <div className="bg-white/50 border border-dashed border-outline-variant rounded-[48px] p-24 flex flex-col items-center justify-center text-center gap-10 animate-fade-in shadow-inner">
              <div className="w-28 h-28 bg-surface-container rounded-full flex items-center justify-center shadow-inner text-on-surface-variant/20">
                <span className="material-symbols-outlined text-6xl">inventory_2</span>
              </div>
              <div>
                <h3 className="text-3xl font-black text-on-background italic uppercase font-headline">Cargo Void</h3>
                <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-[0.4em] max-w-xs mx-auto leading-relaxed mt-4">No assets detected within the current logistics manifest.</p>
              </div>
              <Link to="/shop" className="bg-primary text-on-primary px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-primary-container transition-all shadow-xl active:scale-[0.98]">
                Scout the Studio
              </Link>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 relative z-10">
          <div className="bg-white border border-outline-variant rounded-[40px] p-10 flex flex-col gap-10 sticky top-32 shadow-2xl overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-2 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
             
            <h3 className="text-2xl font-black text-on-background italic tracking-tight border-b border-outline-variant pb-8 font-headline uppercase">Acquisition Protocol</h3>
            <div className="flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-[0.3em]">Net Unit Value</span>
                <span className="text-lg font-black text-on-background italic tracking-tight font-headline">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-[0.3em]">Strategic Logistics</span>
                <span className="text-lg font-black text-on-background italic tracking-tight font-headline">₹{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-[0.3em]">Reg. Tax (18% GST)</span>
                <span className="text-lg font-black text-on-background italic tracking-tight font-headline">₹{tax.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 pt-10 border-t border-outline-variant relative z-10">
              <div className="flex justify-between items-end">
                <span className="text-xs font-black text-on-background uppercase tracking-[0.4em] mb-2">Total Valuation</span>
                <span className="text-5xl font-black text-primary italic tracking-tighter font-headline leading-none">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>

            {cartItems.length > 0 && (
              <Link to="/checkout" className="w-full bg-primary text-on-primary font-black text-[11px] py-6 rounded-2xl flex justify-center items-center gap-5 hover:bg-primary-container transition-all shadow-xl group uppercase tracking-[0.4em] active:scale-[0.98] shadow-primary/20">
                Initiate Deployment 
                <span className="material-symbols-outlined text-[24px] group-hover:translate-x-2 transition-transform">verified</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
