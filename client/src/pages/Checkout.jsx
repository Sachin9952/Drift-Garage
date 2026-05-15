import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { getCart, clearCart } from '../utils/cartUtils';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  useEffect(() => {
    const items = getCart();
    if (items.length === 0 && !orderSuccess) {
      navigate('/cart');
    }
    setCartItems(items);
    setLoading(false);
  }, [navigate, orderSuccess]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const shipping = 90.00;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlacingOrder(true);

    const orderData = {
      customerDetails: formData,
      items: cartItems.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        image: item.product.image || item.product.images?.[0] || '',
        price: item.product.price,
        product: item.product._id
      })),
      totalAmount: total,
    };

    try {
      await API.post('/orders/place-order', orderData);
      clearCart();
      setOrderSuccess(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 animate-bounce">
          <span className="material-symbols-outlined text-5xl">verified</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-on-background tracking-tighter italic brand-logo mb-4 uppercase">Order Placed!</h1>
        <p className="text-on-surface-variant font-medium text-lg max-w-md">Our team will contact you shortly to confirm your deployment.</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-10 bg-primary text-on-primary font-black text-[11px] px-12 py-5 rounded-2xl shadow-xl hover:bg-primary-container transition-all uppercase tracking-[0.4em]"
        >
          Return to Studio
        </button>
      </div>
    );
  }

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background">
      <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Calibrating Logistics...</p>
    </div>
  );

  return (
    <div className="pt-32 pb-24 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 min-h-screen bg-background text-on-background">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10 relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-black text-on-background tracking-tighter italic brand-logo mb-3 uppercase leading-none">Final Clearance</h1>
            <p className="text-on-surface-variant font-medium text-lg">Please provide your deployment destination.</p>
          </div>

          <section className="bg-surface-container-lowest border border-outline-variant rounded-[40px] p-8 md:p-12 shadow-sm animate-fade-in-up">
            <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 md:gap-y-8">
              <div className="space-y-2.5 md:col-span-2">
                <label className="text-[10px] font-black text-on-background uppercase tracking-[0.4em] ml-2 font-label">Full Name</label>
                <input 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container border border-outline-variant/60 rounded-2xl px-6 py-4 text-on-background text-sm font-bold outline-none focus:border-primary transition-all font-headline italic" 
                  placeholder="ACQUISITION SPECIALIST NAME" 
                  type="text" 
                />
              </div>
              <div className="space-y-2.5 md:col-span-2">
                <label className="text-[10px] font-black text-on-background uppercase tracking-[0.4em] ml-2 font-label">Phone Number</label>
                <input 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container border border-outline-variant/60 rounded-2xl px-6 py-4 text-on-background text-sm font-bold outline-none focus:border-primary transition-all font-headline italic" 
                  placeholder="+91 XXXXX XXXXX" 
                  type="tel" 
                />
              </div>
              <div className="space-y-2.5 md:col-span-2">
                <label className="text-[10px] font-black text-on-background uppercase tracking-[0.4em] ml-2 font-label">Deployment Address</label>
                <input 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container border border-outline-variant/60 rounded-2xl px-6 py-4 text-on-background text-sm font-bold outline-none focus:border-primary transition-all font-headline italic" 
                  placeholder="STREET NAME, HANGAR NO." 
                  type="text" 
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-on-background uppercase tracking-[0.4em] ml-2 font-label">City</label>
                <input 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container border border-outline-variant/60 rounded-2xl px-6 py-4 text-on-background text-sm font-bold outline-none focus:border-primary transition-all font-headline italic" 
                  placeholder="METROPOLIS" 
                  type="text" 
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-on-background uppercase tracking-[0.4em] ml-2 font-label">Postal Code</label>
                <input 
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container border border-outline-variant/60 rounded-2xl px-6 py-4 text-on-background text-sm font-bold outline-none focus:border-primary transition-all font-mono italic" 
                  placeholder="000 000" 
                  type="text" 
                />
              </div>
            </form>
          </section>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-4">
             <button onClick={() => navigate('/cart')} className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-all font-black text-[10px] uppercase tracking-[0.4em] group">
                <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                Modify Cargo Manifest
             </button>
            <button 
              form="checkout-form"
              type="submit"
              disabled={placingOrder}
              className={`w-full sm:w-auto bg-primary text-on-primary font-black text-[9px] px-16 py-6 rounded-2xl shadow-xl hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] ${placingOrder ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              {placingOrder ? 'EXECUTING...' : 'Confirm Authorization'} 
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-32 relative z-10 animate-fade-in-up">
          <div className="bg-white border border-outline-variant rounded-[48px] p-10 md:p-12 shadow-2xl flex flex-col gap-10">
            <h3 className="text-2xl font-bold text-on-background italic tracking-tight border-b border-outline-variant/20 pb-8 font-headline uppercase">Acquisition Recap</h3>
            <div className="flex flex-col gap-6 max-h-[360px] overflow-y-auto custom-scrollbar pr-4">
              {cartItems.map(item => (
                <div key={item.product._id} className="flex gap-6 items-center group/item">
                  <div className="w-20 h-20 rounded-[20px] bg-surface-container-lowest border border-outline-variant/60 overflow-hidden flex-shrink-0 flex items-center justify-center p-3 group-hover/item:bg-white transition-colors">
                    <img 
                      alt={item.product.name} 
                      className="w-full h-full object-contain drop-shadow-lg" 
                      src={
                        item.product.image?.startsWith('http') ? item.product.image : 
                        item.product.image ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${item.product.image}` :
                        (item.product.images && item.product.images[0]?.startsWith('http')) ? item.product.images[0] :
                        (item.product.images && item.product.images[0]) ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${item.product.images[0]}` :
                        'https://via.placeholder.com/400x300?text=No+Asset+Found'
                      } 
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-base font-bold text-on-background italic tracking-tight font-headline line-clamp-1">{item.product.name}</h4>
                    <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest mt-1 block opacity-60">Qty: {item.quantity}</span>
                  </div>
                  <span className="text-base font-bold text-on-background italic tracking-tighter font-headline">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col gap-5 pt-10 border-t border-outline-variant/20">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-[0.2em]">Net Unit Value</span>
                <span className="text-base font-bold text-on-background italic tracking-tight font-headline">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-[0.2em]">Deployment Fee</span>
                <span className="text-base font-bold text-on-background italic tracking-tight font-headline">₹{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-medium text-on-surface-variant uppercase tracking-[0.2em]">Security Tax (GST)</span>
                <span className="text-base font-bold text-on-background italic tracking-tight font-headline">₹{tax.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-10 border-t border-outline-variant">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em]">Total</span>
                <span className="text-xs font-bold text-on-background uppercase tracking-[0.2em]">Clearance</span>
              </div>
              <span className="text-4xl font-black text-primary italic tracking-tighter font-headline">₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
