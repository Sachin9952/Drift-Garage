import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminProducts from './admin/AdminProducts';
import AdminOrders from './admin/AdminOrders';
import AddProduct from './admin/AddProduct';

const AdminDashboard = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Inventory', path: '/admin/products', icon: 'inventory_2' },
    { name: 'Logistics', path: '/admin/orders', icon: 'local_shipping' },
    { name: 'Add Unit', path: '/admin/products/add', icon: 'add_box' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background font-body text-on-background">
      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 w-full h-20 bg-surface/90 backdrop-blur-md border-b border-outline-variant z-[60] flex items-center justify-between px-6 shadow-sm">
        <Link to="/" className="text-xl font-black italic tracking-tighter brand-logo uppercase">
          DRIFT GARAGE
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary-container"
        >
          <span className="material-symbols-outlined text-[28px]">menu</span>
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      
      {/* Sidebar (Desktop & Mobile) */}
      <aside 
        className={`fixed md:static inset-y-0 right-0 z-[80] w-[280px] md:w-72 bg-surface-container border-l md:border-l-0 md:border-r border-outline-variant flex flex-col transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}
      >
        <div className="p-10">
          <Link to="/" className="text-2xl md:text-3xl font-black italic tracking-tighter brand-logo mb-12 block leading-none uppercase">
            DRIFT GARAGE
          </Link>
          
          <div className="flex items-center gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary-container text-primary">
              <span className="material-symbols-outlined text-[24px]">terminal</span>
            </div>
            <div>
              <div className="text-sm font-black font-headline italic">Command Center</div>
              <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1">Admin Access</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-3 px-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path}
                to={item.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-300 group relative font-label ${
                  isActive 
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span> 
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-outline-variant">
          <Link 
            to="/"
            className="w-full flex items-center gap-5 px-6 py-4 text-on-surface-variant hover:text-primary transition-all rounded-2xl group font-label"
          >
            <span className="material-symbols-outlined text-[22px]">store</span>
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">View Shop</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-background custom-scrollbar pt-24 md:pt-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto relative z-10">
          <Routes>
            <Route index element={<AdminProducts />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<AddProduct />} />
            <Route path="orders" element={<AdminOrders />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
