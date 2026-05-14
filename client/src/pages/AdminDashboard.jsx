import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminProducts from './admin/AdminProducts';
import AdminOrders from './admin/AdminOrders';
import AddProduct from './admin/AddProduct';
import AdminUsers from './admin/AdminUsers';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: 'dashboard' },
    { name: 'Products', path: '/admin/products', icon: 'inventory_2' },
    { name: 'Orders', path: '/admin/orders', icon: 'local_shipping' },
    { name: 'Users', path: '/admin/users', icon: 'group' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background font-body">
      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 w-full h-20 bg-surface-container/90 backdrop-blur-md border-b border-outline-variant z-[60] flex items-center justify-between px-6 shadow-sm">
        <Link to="/" className="text-xl font-black text-[#1f1f1f] italic tracking-tighter brand-logo uppercase">
          DRIFT GARAGE
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary-container active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[28px]">menu</span>
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Mobile Sidebar Drawer (Slides from RIGHT) */}
          <aside 
            className="md:hidden fixed top-0 right-0 h-screen w-[85%] max-w-[320px] bg-surface-container border-l border-outline-variant z-[80] flex flex-col animate-slide-in-right"
          >
            <div className="p-8 border-b border-outline-variant">
              <div className="flex items-center justify-between mb-10">
                <Link to="/" className="text-xl font-black text-[#1f1f1f] italic tracking-tighter brand-logo uppercase" onClick={() => setIsMobileMenuOpen(false)}>
                  DRIFT GARAGE
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant active:scale-90 transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              
              <div className="flex items-center gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary-container text-primary">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm font-black text-[#1f1f1f] font-headline italic line-clamp-1 leading-none">{user?.name}</div>
                  <div className="text-[9px] font-black text-primary uppercase tracking-widest mt-2">Authorized Admin</div>
                </div>
              </div>
            </div>

            <nav className="flex-1 flex flex-col gap-2 p-6 mt-4 overflow-y-auto">
              <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.4em] px-4 mb-4">Command Menu</p>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-300 relative font-label ${
                      isActive 
                        ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                        : 'text-on-surface-variant active:bg-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span> 
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-8 border-t border-outline-variant">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-5 px-6 py-5 text-error bg-error-container/10 border border-error/20 rounded-2xl font-label active:scale-95 transition-all justify-center"
              >
                <span className="material-symbols-outlined text-[22px]">logout</span>
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Terminate Session</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* SideNavBar (Desktop) */}
      <aside className="hidden md:flex h-full w-72 flex-col bg-surface-container border-r border-outline-variant relative z-40">
        <div className="p-10">
          <Link to="/" className="text-3xl font-black text-[#1f1f1f] italic tracking-tighter brand-logo mb-12 block leading-none uppercase">
            DRIFT GARAGE
          </Link>
          
          <div className="flex items-center gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary-container text-primary shadow-sm">
              <span className="material-symbols-outlined text-[24px]">person_filled</span>
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-black text-[#1f1f1f] font-headline italic line-clamp-1">{user?.name}</div>
              <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1">Authorized Admin</div>
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
                className={`flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-300 group relative font-label ${
                  isActive 
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'
                }`}
              >
                <span className={`material-symbols-outlined text-[22px] ${isActive ? 'text-on-primary' : 'group-hover:text-primary transition-colors'}`}>{item.icon}</span> 
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-outline-variant">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-5 px-6 py-4 text-on-surface-variant hover:text-error hover:bg-error-container/10 transition-all rounded-2xl group font-label"
          >
            <span className="material-symbols-outlined text-[22px] group-hover:rotate-12 transition-transform">logout</span>
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-background custom-scrollbar pt-20 md:pt-0">
        {/* Dynamic Background Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="px-6 md:px-16 py-12 max-w-7xl mx-auto relative z-10">
          <Routes>
            <Route index element={<StatsView />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const StatsView = () => {
  const logs = [
    { time: '09:42:15', msg: 'System authentication successful: Operator Admin', status: 'SECURE' },
    { time: '09:38:22', msg: 'Inventory sync complete: +12 units localized', status: 'SYNCED' },
    { time: '09:30:05', msg: 'Transaction verified: Order #DG-89241 initiated', status: 'VERIFIED' }
  ];

  return (
    <div className="animate-fade-in-up">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
        <div>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-4 block font-label">System Protocol: Active</span>
          <h1 className="text-4xl md:text-5xl font-black text-[#1f1f1f] italic tracking-tighter brand-logo leading-none uppercase">Command Center</h1>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl px-8 py-5 flex items-center gap-6 shadow-sm w-full md:w-auto">
            <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-surface-container-lowest bg-surface-variant flex items-center justify-center text-[10px] font-black text-on-surface-variant">U{i}</div>
                ))}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Operator Link</span>
              <span className="text-xs font-black text-primary uppercase tracking-widest">3 Systems Secure</span>
            </div>
        </div>
      </header>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-[32px] flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-primary/40 transition-all duration-500">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
          <div className="flex justify-between items-start mb-12">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary-container group-hover:scale-110 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-[28px]">payments</span>
            </div>
            <span className="text-primary text-[10px] font-black bg-primary/10 px-4 py-1.5 rounded-full tracking-widest border border-primary-container">+12.5%</span>
          </div>
          <div>
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2 font-label">Total Net Yield</p>
            <p className="text-3xl font-black text-[#1f1f1f] italic tracking-tighter font-headline">₹12,89,450</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-[32px] flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-secondary/40 transition-all duration-500">
          <div className="flex justify-between items-start mb-12">
            <div className="w-14 h-14 bg-secondary-container/30 rounded-2xl flex items-center justify-center text-secondary border border-outline-variant group-hover:scale-110 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-[28px]">shopping_bag</span>
            </div>
            <span className="text-secondary text-[10px] font-black bg-secondary-container/50 px-4 py-1.5 rounded-full tracking-widest border border-outline-variant">LIVE</span>
          </div>
          <div>
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2 font-label">Total Acquisitions</p>
            <p className="text-3xl font-black text-[#1f1f1f] italic tracking-tighter font-headline">2,482</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-[32px] flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-primary/40 transition-all duration-500">
          <div className="flex justify-between items-start mb-12">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary-container group-hover:scale-110 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-[28px]">group_add</span>
            </div>
            <span className="text-primary text-[10px] font-black bg-primary/10 px-4 py-1.5 rounded-full tracking-widest border border-primary-container">+4.2%</span>
          </div>
          <div>
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2 font-label">Commissioned Ops</p>
            <p className="text-3xl font-black text-[#1f1f1f] italic tracking-tighter font-headline">842</p>
          </div>
        </div>

        <div className="bg-error-container/10 border border-error/20 p-8 rounded-[32px] flex flex-col justify-between shadow-sm border-l-8 border-l-error hover:bg-error-container/20 transition-all duration-500">
          <div className="w-14 h-14 bg-error-container/40 rounded-2xl flex items-center justify-center text-error border border-error/20 mb-12 shadow-sm">
              <span className="material-symbols-outlined text-[28px]">warning</span>
          </div>
          <div>
            <p className="text-[10px] font-black text-error uppercase tracking-[0.2em] mb-2 font-label">Critical Shortage</p>
            <p className="text-3xl font-black text-error italic tracking-tighter font-headline">12 Units</p>
          </div>
        </div>
      </section>
      
      {/* System Logs */}
      <div className="mt-20 bg-surface-container border border-outline-variant rounded-[48px] p-8 md:p-16 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top"></div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-16 gap-6">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary-container">
                  <span className="material-symbols-outlined text-[24px]">terminal</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[#1f1f1f] italic tracking-tight uppercase font-headline">Terminal Feed</h3>
              </div>
              <button className="text-[10px] font-black text-primary hover:text-on-surface uppercase tracking-[0.4em] transition-colors font-label underline underline-offset-[10px]">Expand System Logs</button>
          </div>
          <div className="space-y-6">
              {logs.map((log, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-8 p-6 md:p-8 bg-surface-container-lowest rounded-3xl border border-outline-variant group/item hover:border-primary/40 transition-all shadow-sm">
                      <div className="flex items-center gap-6 flex-shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm group-hover/item:animate-pulse"></div>
                        <span className="text-xs font-black text-on-surface-variant/40 font-mono tracking-tighter">{log.time}</span>
                      </div>
                      <span className="text-base font-bold text-[#1f1f1f] flex-grow leading-relaxed font-headline italic">{log.msg}</span>
                      <div className="flex items-center">
                        <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] bg-primary/5 px-6 py-2.5 rounded-xl border border-primary-container shadow-inner">
                          {log.status}
                        </span>
                      </div>
                  </div>
              ))}
          </div>
          
          <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-4 px-6 py-2 bg-background/50 rounded-full border border-outline-variant/30">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                <span className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.5em]">Real-time encrypted stream active</span>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
