import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
    paymentMethod: 'PayPal',
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await API.get('/cart');
        setCartItems(data.items || []);
        if (data.items.length === 0) {
          navigate('/cart');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product.discountPrice > 0 ? item.product.discountPrice : item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const shipping = 150.00;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlacingOrder(true);

    const orderData = {
      orderItems: cartItems.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        image: item.product.images[0],
        price: item.product.discountPrice > 0 ? item.product.discountPrice : item.product.price,
        product: item.product._id
      })),
      shippingAddress: {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      paymentMethod: formData.paymentMethod,
      totalPrice: total,
    };

    try {
      await API.post('/orders', orderData);
      // Clear cart
      await Promise.all(cartItems.map(item => API.delete(`/cart/${item.product._id}`)));
      alert('Order placed successfully!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background">
      <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Calibrating Logistics...</p>
    </div>
  );

  return (
    <div className="pt-32 pb-24 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 min-h-screen bg-background text-on-background">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
        {/* Decorative background glow */}
        <div className="absolute top-40 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>

        {/* Left Column: Checkout Flow */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10 relative z-10">
          {/* Header */}
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-black text-on-background tracking-tighter italic brand-logo mb-3 uppercase leading-none">Final Clearance</h1>
            <p className="text-on-surface-variant font-medium text-lg">Please provide your shipping destination and payment credentials.</p>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full max-w-2xl mb-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="absolute left-0 top-5 w-full h-[1px] bg-outline-variant/30"></div>
            <div className="absolute left-0 top-5 w-1/3 h-[1px] bg-primary shadow-[0_0_8px_rgba(74,124,89,0.3)]"></div>
            <div className="relative z-10 flex justify-between items-center w-full px-1">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center text-[11px] font-black shadow-lg shadow-primary/20 rotate-3 transition-transform hover:rotate-0 cursor-default">01</div>
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Deployment</span>
              </div>
              <div className="flex flex-col items-center gap-3 opacity-30">
                <div className="w-10 h-10 rounded-xl bg-surface-container border border-outline-variant text-on-surface-variant flex items-center justify-center text-[11px] font-black">02</div>
                <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.3em]">Verification</span>
              </div>
              <div className="flex flex-col items-center gap-3 opacity-30">
                <div className="w-10 h-10 rounded-xl bg-surface-container border border-outline-variant text-on-surface-variant flex items-center justify-center text-[11px] font-black">03</div>
                <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.3em]">Transaction</span>
              </div>
            </div>
          </div>

          {/* Shipping Form */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-[40px] p-8 md:p-12 shadow-sm animate-fade-in-up group overflow-hidden relative" style={{ animationDelay: '0.2s' }}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
            
            <div className="flex items-center gap-6 mb-10 pb-6 border-b border-outline-variant/20">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary-container">
                <span className="material-symbols-outlined text-xl">local_shipping</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-on-background italic tracking-tight uppercase font-headline">Shipping Protocol</h2>
            </div>
            
            <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 md:gap-y-8">
              <div className="space-y-2.5 md:col-span-2 group/input">
                <label className="text-[10px] font-black text-on-background uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label">Full Name</label>
                <div className="relative">
                  <input 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full bg-surface-container border border-outline-variant/60 rounded-2xl px-6 py-4 text-on-background text-sm font-bold focus:border-primary focus:bg-white outline-none transition-all placeholder:text-on-surface-variant/40 font-headline italic" 
                    placeholder="ACQUISITION SPECIALIST NAME" 
                    type="text" 
                  />
                </div>
              </div>
              <div className="space-y-2.5 md:col-span-2 group/input">
                <label className="text-[10px] font-black text-on-background uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label">Deployment Address</label>
                <input 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container border border-outline-variant/60 rounded-2xl px-6 py-4 text-on-background text-sm font-bold focus:border-primary focus:bg-white outline-none transition-all placeholder:text-on-surface-variant/40 font-headline italic" 
                  placeholder="STREET NAME, HANGAR NO." 
                  type="text" 
                />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2.5 group/input">
                  <label className="text-[10px] font-black text-on-background uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label">City</label>
                  <input 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-surface-container border border-outline-variant/60 rounded-2xl px-6 py-4 text-on-background text-sm font-bold focus:border-primary focus:bg-white outline-none transition-all placeholder:text-on-surface-variant/40 font-headline italic" 
                    placeholder="METROPOLIS" 
                    type="text" 
                  />
                </div>
                <div className="space-y-2.5 group/input">
                  <label className="text-[10px] font-black text-on-background uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label">Postal Code</label>
                  <input 
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full bg-surface-container border border-outline-variant/60 rounded-2xl px-6 py-4 text-on-background text-sm font-black focus:border-primary focus:bg-white outline-none transition-all placeholder:text-on-surface-variant/40 font-mono italic" 
                    placeholder="000 000" 
                    type="text" 
                  />
                </div>
                <div className="space-y-2.5 group/input">
                  <label className="text-[10px] font-black text-on-background uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label">Country</label>
                  <input 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full bg-surface-container border border-outline-variant/60 rounded-2xl px-6 py-4 text-on-background text-sm font-bold focus:border-primary focus:bg-white outline-none transition-all placeholder:text-on-surface-variant/40 font-headline italic" 
                    placeholder="INDIA" 
                    type="text" 
                  />
                </div>
              </div>
              
              <div className="space-y-6 md:col-span-2 mt-4">
                <label className="text-[10px] font-black text-on-background uppercase tracking-[0.4em] ml-2 font-label">Payment Gateway</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <label className={`flex items-center gap-5 cursor-pointer bg-surface-container px-6 py-5 rounded-[24px] border transition-all group/radio ${formData.paymentMethod === 'PayPal' ? 'border-primary bg-primary/5 shadow-sm' : 'border-outline-variant hover:border-primary/40 hover:bg-white shadow-inner'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="PayPal" 
                      checked={formData.paymentMethod === 'PayPal'}
                      onChange={handleChange}
                      className="accent-primary w-5 h-5"
                    />
                    <div className="flex flex-col">
                        <span className="text-on-background font-black text-sm font-headline italic">PayPal</span>
                        <span className="text-[9px] text-on-surface-variant font-black tracking-widest mt-0.5">Secure Protocol</span>
                    </div>
                  </label>
                  <label className={`flex items-center gap-5 cursor-pointer bg-surface-container px-6 py-5 rounded-[24px] border transition-all group/radio ${formData.paymentMethod === 'Stripe' ? 'border-primary bg-primary/5 shadow-sm' : 'border-outline-variant hover:border-primary/40 hover:bg-white shadow-inner'}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="Stripe" 
                      checked={formData.paymentMethod === 'Stripe'}
                      onChange={handleChange}
                      className="accent-primary w-5 h-5"
                    />
                    <div className="flex flex-col">
                        <span className="text-on-background font-black text-sm font-headline italic">Stripe</span>
                        <span className="text-[9px] text-on-surface-variant font-black tracking-widest mt-0.5">Direct Credit</span>
                    </div>
                  </label>
                </div>
              </div>
            </form>
          </section>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
             <button onClick={() => navigate('/cart')} className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-all font-black text-[10px] uppercase tracking-[0.4em] group">
                <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                Modify Cargo Manifest
             </button>
            <button 
              form="checkout-form"
              type="submit"
              disabled={placingOrder}
              className={`w-full sm:w-auto bg-primary text-on-primary font-black text-[11px] px-16 py-6 rounded-2xl shadow-xl hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center gap-5 uppercase tracking-[0.4em] active:scale-[0.98] ${placingOrder ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              {placingOrder ? 'EXECUTING...' : 'Confirm Authorization'} 
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-32 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-surface-container border border-outline-variant rounded-[48px] p-10 md:p-12 shadow-sm flex flex-col gap-10 overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            
            <h3 className="text-2xl font-black text-on-background italic tracking-tight border-b border-outline-variant/20 pb-8 font-headline uppercase">Acquisition Recap</h3>
            <div className="flex flex-col gap-6 max-h-[360px] overflow-y-auto custom-scrollbar pr-4">
              {cartItems.map(item => (
                <div key={item.product._id} className="flex gap-6 items-center group/item">
                  <div className="w-20 h-20 rounded-[20px] bg-surface-container-lowest border border-outline-variant/60 overflow-hidden flex-shrink-0 flex items-center justify-center p-3 group-hover/item:border-primary transition-all shadow-sm">
                    <img 
                      alt={item.product.name} 
                      className="w-full h-full object-contain drop-shadow-md group-hover/item:scale-110 transition-transform duration-700" 
                      src={item.product.images?.[0] || 'https://via.placeholder.com/100'} 
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-base font-black text-on-background italic tracking-tight font-headline line-clamp-1">{item.product.name}</h4>
                    <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mt-1.5 block">Qty: {item.quantity}</span>
                  </div>
                  <span className="text-base font-black text-on-background italic tracking-tighter font-headline">₹{((item.product.discountPrice > 0 ? item.product.discountPrice : item.product.price) * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col gap-5 pt-10 border-t border-outline-variant/20">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Net Unit Value</span>
                <span className="text-base font-black text-on-background italic tracking-tight font-headline">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Deployment Fee</span>
                <span className="text-base font-black text-on-background italic tracking-tight font-headline">₹{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Security Tax (GST)</span>
                <span className="text-base font-black text-on-background italic tracking-tight font-headline">₹{tax.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-10 border-t border-outline-variant relative z-10">
              <span className="text-xs font-black text-on-background uppercase tracking-[0.3em]">Total Clearance</span>
              <span className="text-3xl font-black text-primary italic tracking-tighter font-headline drop-shadow-sm">₹{total.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-5 p-6 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-inner">
                <span className="material-symbols-outlined text-primary text-2xl">shield</span>
                <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.2em] leading-relaxed">
                    Protected by 256-bit military-grade encryption protocol.
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
