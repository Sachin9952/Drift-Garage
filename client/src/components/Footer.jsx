import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface-container w-full py-24 border-t border-outline-variant relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-12 lg:px-24 gap-20 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col gap-6 max-w-sm">
            <Link to="/" className="text-3xl font-black text-on-background italic tracking-tighter brand-logo uppercase leading-none">
                DRIFT GARAGE
            </Link>
            <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
              The premier destination for elite die-cast collectors. Authenticating legends and securing rare acquisitions since inception.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(74,124,89,0.4)]"></div>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">System Operational</span>
            </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-20 gap-y-12 flex-grow">
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.4em] font-label">Showroom</h4>
            <div className="flex flex-col gap-4">
              <Link to="/shop" className="text-xs font-bold text-on-surface-variant hover:text-primary transition-all font-headline italic">Inventory</Link>
              <Link to="/shop" className="text-xs font-bold text-on-surface-variant hover:text-primary transition-all font-headline italic">New Arrivals</Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.4em] font-label">Protocol</h4>
            <div className="flex flex-col gap-4">
              <Link to="#" className="text-xs font-bold text-on-surface-variant hover:text-primary transition-all font-headline italic">Authentication</Link>
              <Link to="#" className="text-xs font-bold text-on-surface-variant hover:text-primary transition-all font-headline italic">Shipping</Link>
              <Link to="#" className="text-xs font-bold text-on-surface-variant hover:text-primary transition-all font-headline italic">Terms</Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-black text-on-surface uppercase tracking-[0.4em] font-label">Garage</h4>
            <div className="flex flex-col gap-4">
              <Link to="/wishlist" className="text-xs font-bold text-on-surface-variant hover:text-primary transition-all font-headline italic">Collection</Link>
              <Link to="/cart" className="text-xs font-bold text-on-surface-variant hover:text-primary transition-all font-headline italic">Cargo</Link>
              <Link to="/login" className="text-xs font-bold text-on-surface-variant hover:text-primary transition-all font-headline italic">Profile</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mt-24 pt-12 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] font-mono">
          © 2026 DRIFT GARAGE INC. // TERMINAL V3.1.2
        </div>
        <div className="flex items-center gap-10">
           <Link to="#" className="text-[9px] font-black text-on-surface-variant/60 hover:text-primary uppercase tracking-[0.4em] transition-colors">Privacy</Link>
           <Link to="#" className="text-[9px] font-black text-on-surface-variant/60 hover:text-primary uppercase tracking-[0.4em] transition-colors">Compliance</Link>
           <div className="w-px h-4 bg-outline-variant/30"></div>
           <span className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.4em]">Region: GLOBAL-01</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
