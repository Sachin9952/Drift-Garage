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
      await API.put(`/admin/orders/${id}/status`, { orderStatus: status });
      fetchOrders();
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 bg-background">
        <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Decrypting Logistics Data...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-fade-in-up bg-background">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-10">
        <div>
            <h2 className="text-4xl font-black text-on-background italic tracking-tighter brand-logo mb-3 uppercase leading-none">Logistics Registry</h2>
            <p className="text-on-surface-variant font-medium text-lg">Overseeing {orders.length} active deployments across the global grid.</p>
        </div>
        <div className="flex items-center gap-6 bg-surface-container border border-outline-variant rounded-2xl px-10 py-5 shadow-sm">
           <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(74,124,89,0.4)]"></div>
           <span className="text-[10px] font-black text-on-surface uppercase tracking-[0.3em] font-label">Real-time tracking active</span>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-[48px] overflow-hidden shadow-sm relative">
        <div className="overflow-x-auto w-full relative z-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant/30">
                <th className="p-10 text-[10px] font-black text-[#1f1f1f] uppercase tracking-[0.4em] font-label">Order Manifest</th>
                <th className="p-10 text-[10px] font-black text-[#1f1f1f] uppercase tracking-[0.4em] font-label">Collector Identity</th>
                <th className="p-10 text-[10px] font-black text-[#1f1f1f] uppercase tracking-[0.4em] font-label">Net Valuation</th>
                <th className="p-10 text-[10px] font-black text-[#1f1f1f] uppercase tracking-[0.4em] font-label">Transit Status</th>
                <th className="p-10 text-right pr-12 text-[10px] font-black text-[#1f1f1f] uppercase tracking-[0.4em] font-label">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-primary/5 transition-all group">
                  <td className="p-10">
                    <div className="flex flex-col gap-3">
                        <span className="text-xl font-black text-primary italic tracking-tight font-headline">#{order._id.slice(-8).toUpperCase()}</span>
                        <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] font-mono">{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</span>
                    </div>
                  </td>
                  <td className="p-10">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-surface-container border border-outline-variant flex items-center justify-center text-on-surface-variant/40 group-hover:text-primary transition-all group-hover:bg-white group-hover:border-primary-container shadow-sm">
                          <span className="material-symbols-outlined text-[28px]">person_outline</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-base font-black text-[#1f1f1f] uppercase tracking-wider leading-none font-headline italic">{order.user?.name}</span>
                        <span className="text-[10px] font-black text-on-surface-variant/40 lowercase tracking-tight font-mono">{order.user?.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-10">
                      <span className="text-2xl font-black text-[#1f1f1f] italic tracking-tighter font-headline">₹{order.totalAmount.toLocaleString()}</span>
                  </td>
                  <td className="p-10">
                    <div className="flex items-center gap-4">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          order.orderStatus === 'Delivered' ? 'bg-primary shadow-[0_0_8px_rgba(74,124,89,0.4)]' : 
                          order.orderStatus === 'Processing' ? 'bg-secondary animate-pulse shadow-[0_0_8px_rgba(107,99,88,0.4)]' : 
                          order.orderStatus === 'Cancelled' ? 'bg-error shadow-[0_0_8px_rgba(184,50,48,0.4)]' :
                          'bg-outline-variant'
                        }`}></span>
                        <span className={`text-[10px] font-black uppercase tracking-[0.3em] font-label ${
                          order.orderStatus === 'Delivered' ? 'text-primary' : 
                          order.orderStatus === 'Processing' ? 'text-secondary' : 
                          order.orderStatus === 'Cancelled' ? 'text-error' :
                          'text-on-surface-variant'
                        }`}>
                          {order.orderStatus}
                        </span>
                    </div>
                  </td>
                  <td className="p-10 pr-12 text-right">
                    <div className="flex items-center justify-end gap-6">
                        <div className="relative group/select">
                          <select 
                            value={order.orderStatus}
                            onChange={(e) => updateStatus(order._id, e.target.value)}
                            className="bg-surface-container border border-outline-variant rounded-2xl px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant outline-none focus:border-primary-container focus:text-primary transition-all cursor-pointer appearance-none hover:bg-white pr-14 shadow-sm font-label"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 pointer-events-none group-hover/select:text-primary transition-colors text-[20px]">expand_more</span>
                        </div>
                        <button className="w-14 h-14 rounded-2xl bg-surface-container border border-outline-variant text-on-surface-variant hover:text-primary hover:bg-white hover:border-primary-container transition-all shadow-sm flex items-center justify-center">
                            <span className="material-symbols-outlined text-[24px]">info_i</span>
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {orders.length === 0 && (
          <div className="bg-surface-container/30 border border-dashed border-outline-variant rounded-[64px] p-32 flex flex-col items-center justify-center text-center gap-10">
              <div className="w-32 h-32 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant/20 mb-6 shadow-inner">
                  <span className="material-symbols-outlined text-7xl">local_shipping</span>
              </div>
              <div>
                <h3 className="text-4xl font-black text-on-surface italic uppercase font-headline leading-none">Registry Null</h3>
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] max-w-sm leading-relaxed mt-6">No active logistics manifests found within the central registry deployment stream.</p>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminOrders;
