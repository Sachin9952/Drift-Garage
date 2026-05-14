import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import API from '../api/axios';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const { data } = await API.get('/wishlist');
        setWishlistItems(data.products || []);
        setError(null);
      } catch (err) {
        setError('System Failure: Unable to scan garage collection.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = (productId) => {
    setWishlistItems(prev => prev.filter(item => item._id !== productId));
  };

  return (
    <div className="pt-32 pb-24 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 min-h-screen bg-background">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 animate-fade-in-up">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-on-background italic tracking-tighter brand-logo mb-3 uppercase leading-none">Your Garage</h1>
          <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em]">Viewing {wishlistItems.length} units currently docked in your private hangar.</p>
        </div>
        <div className="mt-10 md:mt-0 flex items-center gap-6 bg-surface-container border border-outline-variant rounded-2xl px-8 py-4 shadow-sm">
             <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(74,124,89,0.4)]"></div>
             <span className="text-[10px] font-black text-on-surface uppercase tracking-widest font-label">
               Collection Secure
             </span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="relative">
        {/* Subtle background decorative elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-on-surface-variant animate-pulse gap-6">
            <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Opening Hangar Doors...</p>
          </div>
        ) : error ? (
          <div className="text-center py-24 bg-error-container/10 border border-error/20 rounded-[40px] animate-shake">
            <span className="material-symbols-outlined text-5xl text-error mb-6">gpp_maybe</span>
            <p className="text-[11px] font-black text-error uppercase tracking-[0.3em] font-headline italic">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
            {wishlistItems.map((product, index) => (
              <div key={product._id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard 
                  product={product} 
                  isGarage={true} 
                  onRemove={() => handleRemove(product._id)}
                />
              </div>
            ))}
            
            {wishlistItems.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-32 bg-surface-container/30 border border-dashed border-outline-variant rounded-[48px] animate-fade-in">
                <div className="w-28 h-28 bg-surface-container rounded-full flex items-center justify-center mb-10 shadow-inner">
                  <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">garage_home</span>
                </div>
                <h3 className="text-3xl font-black text-on-surface italic uppercase font-headline">Hangar Is Empty</h3>
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] max-w-xs text-center leading-relaxed mt-4">No active units detected within your private deployment facility.</p>
                <Link to="/shop" className="mt-12 px-12 py-5 bg-primary text-on-primary font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl hover:bg-primary-container hover:text-on-primary-container transition-all shadow-xl active:scale-[0.98]">
                  Scout The Studio
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
