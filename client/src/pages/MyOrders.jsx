import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get('/orders/my-orders');
        setOrders(data);
      } catch (err) {
        setError('System Failure: Unable to retrieve your deployment registry.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background">
      <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Accessing Registry...</p>
    </div>
  );

  return (
    <div className="pt-32 pb-24 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 min-h-screen bg-background">
      {/* Header Section */}
      <div className="mb-16 md:mb-24 animate-fade-in-up">
        <div className="flex items-center gap-4 mb-4">
           <span className="h-[1px] w-12 bg-primary"></span>
           <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] font-label">Logistics Archive</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-on-background tracking-tighter italic brand-logo uppercase leading-none">Your Registry</h1>
        <p className="text-sm md:text-base font-medium text-on-surface-variant/60 mt-8 max-w-xl leading-relaxed">A professional summary of your historical acquisitions and active deployments within the Drift Garage ecosystem.</p>
      </div>

      <div className="flex flex-col gap-12">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div 
              key={order._id} 
              className="bg-white border border-outline-variant rounded-[48px] overflow-hidden shadow-2xl hover:shadow-primary/5 transition-all duration-700 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Order Metadata Strip */}
              <div className="bg-surface-container-low/50 border-b border-outline-variant/30 px-8 md:px-12 py-8 md:py-10">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16">
                     <div>
                        <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] mb-3 font-label">Deployment ID</p>
                        <p className="text-[11px] md:text-sm font-black text-on-background font-mono italic tracking-tight">#{order._id.slice(-12).toUpperCase()}</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] mb-3 font-label">Commission Date</p>
                        <p className="text-[11px] md:text-sm font-black text-on-background italic font-headline">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                     </div>
                     <div className="col-span-2 sm:col-span-1">
                        <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] mb-3 font-label">Net Valuation</p>
                        <p className="text-2xl font-black text-primary italic tracking-tighter font-headline leading-none">₹{order.totalAmount.toLocaleString()}</p>
                     </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                     <div className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl border flex items-center justify-center gap-3 transition-all ${
                       order.orderStatus === 'Delivered' ? 'bg-primary/5 border-primary text-primary' : 
                       order.orderStatus === 'Shipped' ? 'bg-tertiary/5 border-tertiary text-tertiary' :
                       order.orderStatus === 'Cancelled' ? 'bg-error/5 border-error text-error' :
                       'bg-secondary/5 border-secondary text-secondary animate-pulse' // Processing / Pending
                     }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] font-label">{order.orderStatus || 'Processing'}</span>
                     </div>
                     <div className="flex-1 sm:flex-none px-6 py-3 rounded-2xl border border-outline-variant/40 bg-white text-on-surface-variant/60 flex items-center justify-center gap-3 shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] font-label">Verified</span>
                     </div>
                  </div>
                </div>
              </div>

              {/* Order Items Section */}
              <div className="p-8 md:p-12">
                <div className="space-y-8">
                  {order.items.map((item) => (
                    <div key={item.product} className="flex flex-col sm:flex-row items-center sm:items-start gap-8 md:gap-10 pb-8 last:pb-0 border-b last:border-0 border-outline-variant/20 group/item">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-[32px] bg-surface-container-low border border-outline-variant p-6 flex items-center justify-center flex-shrink-0 group-hover/item:bg-white group-hover/item:border-primary/20 transition-all duration-500 shadow-sm relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                        <img 
                          src={item.product?.images?.[0] || item.image || 'https://via.placeholder.com/300x300?text=DRIFT+GARAGE'} 
                          alt={item.name || 'Acquisition'} 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/300x300?text=DRIFT+GARAGE';
                          }}
                          className="w-full h-full object-contain drop-shadow-xl group-hover/item:scale-110 transition-transform duration-700 relative z-10"
                        />
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-center sm:pt-4 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                           <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] font-label">Acquisition Item</span>
                           <span className="h-[1px] w-4 bg-outline-variant"></span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-on-background italic tracking-tight font-headline uppercase leading-tight mb-4 group-hover/item:text-primary transition-colors">{item.name}</h3>
                        
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-3">
                          <div className="flex flex-col">
                             <span className="text-[8px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] font-label mb-1">Unit Valuation</span>
                             <span className="text-sm font-bold text-on-background font-headline italic">₹{item.price.toLocaleString()}</span>
                          </div>
                          <div className="w-px h-6 bg-outline-variant/30 hidden sm:block"></div>
                          <div className="flex flex-col">
                             <span className="text-[8px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] font-label mb-1">Quantity</span>
                             <span className="text-sm font-bold text-on-background font-mono italic">{item.quantity} Units</span>
                          </div>
                          <div className="w-px h-6 bg-outline-variant/30 hidden sm:block"></div>
                          <div className="flex flex-col">
                             <span className="text-[8px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] font-label mb-1">Total Payload</span>
                             <span className="text-sm font-black text-primary font-headline italic">₹{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="hidden lg:flex items-center self-center pr-4">
                         <span className="material-symbols-outlined text-outline-variant group-hover/item:text-primary group-hover/item:translate-x-2 transition-all cursor-default">east</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white/50 border border-dashed border-outline-variant rounded-[64px] p-24 flex flex-col items-center justify-center text-center gap-10 animate-fade-in shadow-inner">
            <div className="w-32 h-32 bg-surface-container rounded-full flex items-center justify-center shadow-inner text-on-surface-variant/10">
              <span className="material-symbols-outlined text-7xl">history</span>
            </div>
            <div>
              <h3 className="text-3xl font-black text-on-background italic uppercase font-headline">Registry Vacant</h3>
              <p className="text-xs font-medium text-on-surface-variant/60 uppercase tracking-[0.4em] max-w-xs mx-auto leading-relaxed mt-4">You haven't commissioned any deployments yet within this facility.</p>
            </div>
            <button onClick={() => window.location.href='/shop'} className="bg-primary text-on-primary px-16 py-6 rounded-3xl font-black text-[11px] uppercase tracking-[0.5em] hover:bg-primary-container transition-all shadow-2xl active:scale-[0.98]">
              Begin Acquisitions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
