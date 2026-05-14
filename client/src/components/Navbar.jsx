import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
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
    { name: 'Shop', path: '/shop' },
    { name: 'Garage', path: '/wishlist' },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to exit the garage?')) {
      logout();
      navigate('/login');
      setShowDropdown(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-[60] bg-surface/90 backdrop-blur-xl border-b border-outline-variant h-20 md:h-24">
        <div className="flex justify-between items-center px-6 md:px-12 lg:px-24 h-full w-full max-w-7xl mx-auto">
          {/* Brand */}
          <div className="flex items-center gap-12">
            <Link to="/" className="text-2xl md:text-3xl font-black brand-logo tracking-tighter text-[#1f1f1f] hover:text-primary transition-colors uppercase italic">
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
            <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full active:scale-95 hidden sm:block">
              <span className="material-symbols-outlined text-[24px]">search</span>
            </button>
            
            <Link to="/cart" className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full active:scale-95 relative">
              <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-error text-on-error text-[9px] rounded-full flex items-center justify-center font-black">2</span>
            </Link>

            {/* User Profile (Desktop) */}
            <div className="hidden md:block relative">
                {user ? (
                  <div className="relative">
                    <button 
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="h-12 w-12 rounded-2xl bg-surface-container border border-outline-variant hover:border-primary transition-all overflow-hidden flex items-center justify-center group shadow-sm"
                    >
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-[24px] text-on-surface-variant group-hover:text-primary transition-colors">person</span>
                      )}
                    </button>
                    
                    {showDropdown && (
                      <div className="absolute right-0 mt-4 w-72 bg-surface-container-lowest border border-outline-variant rounded-3xl py-4 shadow-2xl z-[70] animate-fade-in overflow-hidden">
                        <div className="px-6 py-5 border-b border-outline-variant/30 mb-2 bg-surface-container-low/30">
                          <p className="text-sm font-black text-[#1f1f1f] font-headline italic leading-none">{user.name}</p>
                          <p className="text-[9px] text-primary uppercase tracking-[0.3em] font-black mt-2">{user.role}</p>
                        </div>
                        {user.role === 'admin' && (
                          <Link 
                            to="/admin" 
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-4 px-6 py-4 text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all text-[11px] font-black uppercase tracking-widest font-label"
                          >
                            <span className="material-symbols-outlined text-[20px]">dashboard</span> Command Center
                          </Link>
                        )}
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-4 px-6 py-4 text-error hover:bg-error-container/10 transition-all text-[11px] font-black uppercase tracking-widest font-label"
                        >
                          <span className="material-symbols-outlined text-[20px]">logout</span> Terminate Session
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/login" className="h-12 w-12 rounded-2xl bg-surface-container border border-outline-variant hover:border-primary transition-all flex items-center justify-center text-on-surface-variant group shadow-sm">
                    <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">person</span>
                  </Link>
                )}
            </div>

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

      {/* Mobile Drawer (Moved outside Nav restricted height) */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-fade-in md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <aside className="fixed top-0 right-0 h-screen w-full sm:w-[400px] bg-background z-[110] shadow-2xl transition-transform duration-500 flex flex-col animate-slide-in-right md:hidden">
            {/* Header */}
            <div className="px-8 h-20 flex justify-between items-center border-b border-outline-variant bg-background">
                <Link to="/" className="text-xl font-black text-[#1f1f1f] italic tracking-tighter brand-logo uppercase leading-none" onClick={() => setIsMobileMenuOpen(false)}>
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
              {/* User Identity */}
              {user && (
                <div className="flex items-center gap-5 p-6 bg-surface-container-low rounded-3xl border border-outline-variant/30">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary-container overflow-hidden">
                        {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-[28px]">person</span>}
                    </div>
                    <div>
                        <p className="text-base font-black text-[#1f1f1f] font-headline italic leading-none">{user.name}</p>
                        <p className="text-[10px] text-primary uppercase tracking-widest font-black mt-2">{user.role}</p>
                    </div>
                </div>
              )}

              {/* Navigation Group */}
              <div className="space-y-4">
                <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.5em] px-2 font-label">Registry</p>
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-6 py-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 text-[11px] font-black text-[#1f1f1f] uppercase tracking-[0.3em] font-label transition-all active:bg-primary active:text-on-primary"
                    >
                      {link.name}
                      <span className="material-symbols-outlined text-[18px] opacity-20">east</span>
                    </Link>
                  ))}
                  {user?.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-6 py-5 rounded-2xl bg-primary/5 border border-primary/20 text-[11px] font-black text-primary uppercase tracking-[0.3em] font-label"
                    >
                      Command Center
                      <span className="material-symbols-outlined text-[18px]">dashboard</span>
                    </Link>
                  )}
                </div>
              </div>

              {!user && (
                  <Link 
                    to="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 w-full p-5 bg-primary text-on-primary rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] font-label shadow-lg shadow-primary/20 justify-center"
                  >
                      <span className="material-symbols-outlined text-[20px]">login</span> Authenticate
                  </Link>
              )}
            </div>

            {/* Footer */}
            {user && (
                <div className="p-8 border-t border-outline-variant">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-6 py-5 text-error bg-error-container/10 border border-error/20 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] font-label active:scale-95 transition-all justify-center"
                    >
                        <span className="material-symbols-outlined text-[20px]">logout</span> Terminate Session
                    </button>
                </div>
            )}
          </aside>
        </>
      )}
    </>
  );
};

export default Navbar;
