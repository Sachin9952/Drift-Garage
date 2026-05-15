import React, { useState, useEffect } from 'react';
import API from '../../api/axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/admin/orders');
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/orders/${id}/status`, { status });
      fetchOrders();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
        <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Decrypting Logistics Data...</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-fade-in-up">
      <div>
          <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter brand-logo uppercase leading-none mb-2">Logistics Registry</h2>
          <p className="text-on-surface-variant font-medium text-base">Overseeing {orders.length} active deployments across the global grid.</p>
      </div>

      <div className="flex flex-col gap-8">
        {orders.map((order) => (
          <div key={order._id} className="bg-surface-container-lowest border border-outline-variant rounded-[32px] p-8 md:p-10 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary opacity-20 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Order Info & Status */}
              <div className="lg:w-1/3 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-2xl font-black text-primary italic tracking-tight font-headline uppercase leading-none">#{order._id.slice(-8).toUpperCase()}</span>
                    <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] mt-2 font-mono">
                      {new Date(order.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }).toUpperCase()}
                    </p>
                  </div>
                  <div className="relative">
                    <select 
                      value={order.orderStatus}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="bg-surface-container border border-outline-variant rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] outline-none focus:border-primary transition-all cursor-pointer appearance-none pr-10"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 pointer-events-none text-lg">expand_more</span>
                  </div>
                </div>

                <div className="bg-surface-container/50 rounded-2xl p-6 space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] font-label text-primary">Customer Protocol</h4>
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-on-surface-variant/40 uppercase font-black tracking-widest">Full Name</span>
                      <span className="text-sm font-black italic font-headline">{order.customerDetails?.fullName || 'IDENT_UNKNOWN'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-on-surface-variant/40 uppercase font-black tracking-widest">Contact Phone</span>
                      <span className="text-sm font-black italic font-headline">{order.customerDetails?.phone || 'SIGNAL_LOST'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-on-surface-variant/40 uppercase font-black tracking-widest">Deployment Point</span>
                      <span className="text-xs font-bold leading-relaxed">
                        {order.customerDetails?.address || 'COORDINATES_MISSING'}
                        {order.customerDetails?.city && `, ${order.customerDetails.city}`}
                        {order.customerDetails?.postalCode && ` - ${order.customerDetails.postalCode}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Clearance Total</span>
                  <span className="text-3xl font-black text-on-background italic tracking-tighter font-headline">₹{order.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="flex-1 space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] font-label">Cargo Manifest ({order.items.length} units)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30">
                      <div className="w-16 h-16 rounded-xl bg-white border border-outline-variant flex-shrink-0 flex items-center justify-center p-2">
                        <img 
                          src={item.image?.startsWith('http') ? item.image : `${import.meta.env.VITE_API_URL || ''}${item.image || ''}`} 
                          alt={item.name} 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <span className="text-sm font-black italic font-headline line-clamp-1 uppercase">{item.name}</span>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[9px] font-black text-on-surface-variant/60 uppercase tracking-widest">Qty: {item.quantity}</span>
                          <span className="text-xs font-black italic">₹{item.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
          <div className="bg-surface-container/30 border border-dashed border-outline-variant rounded-[48px] p-24 flex flex-col items-center justify-center text-center gap-6">
              <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant/20 shadow-inner">
                  <span className="material-symbols-outlined text-5xl">local_shipping</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-on-surface italic uppercase font-headline">Registry Null</h3>
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] max-w-sm mt-2">No active logistics manifests found.</p>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminOrders;
