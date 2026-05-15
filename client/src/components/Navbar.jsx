import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'My Orders', path: '/orders' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-[60] bg-surface/90 backdrop-blur-xl border-b border-outline-variant h-20 md:h-24">
        <div className="flex justify-between items-center px-6 md:px-12 lg:px-24 h-full w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-12">
            <Link to="/" className="text-2xl md:text-3xl font-black brand-logo tracking-tighter text-on-background hover:text-primary transition-colors uppercase italic">
              Drift Garage
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary font-label ${
                    location.pathname === link.path 
                    ? 'text-primary' 
                    : 'text-on-surface-variant'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-8">
            <Link to="/cart" className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full active:scale-95 relative">
              <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary-container active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-fade-in md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <aside className="fixed top-0 right-0 h-screen w-full sm:w-[400px] bg-background z-[110] shadow-2xl transition-transform duration-500 flex flex-col animate-slide-in-right md:hidden">
            {/* Header */}
            <div className="px-8 h-20 flex justify-between items-center border-b border-outline-variant bg-background">
                <Link to="/" className="text-xl font-black text-on-background italic tracking-tighter brand-logo uppercase leading-none" onClick={() => setIsMobileMenuOpen(false)}>
                  Drift Garage
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container border border-outline-variant text-on-surface-variant active:scale-90 transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-10 space-y-10">
              <div className="space-y-4">
                <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.5em] px-2 font-label">Navigation</p>
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-6 py-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 text-[11px] font-black text-on-background uppercase tracking-[0.3em] font-label transition-all active:bg-primary active:text-on-primary"
                    >
                      {link.name}
                      <span className="material-symbols-outlined text-[18px] opacity-20">east</span>
                    </Link>
                  ))}
                  <Link 
                    to="/admin" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-6 py-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 text-[11px] font-black text-on-background uppercase tracking-[0.3em] font-label"
                  >
                    Admin Access
                    <span className="material-symbols-outlined text-[18px] opacity-20">admin_panel_settings</span>
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Navbar;
