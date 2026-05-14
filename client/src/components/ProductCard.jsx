import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const ProductCard = ({ product, isGarage, onRemove }) => {
  const { _id, brand, name, price, discountPrice, images, isFeatured, stock } = product;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(isGarage); 
  const [loading, setLoading] = useState(false);
  const image = images && images.length > 0 ? images[0] : 'https://via.placeholder.com/300x200?text=No+Image';

  useEffect(() => {
    const checkStatus = async () => {
      if (!user || isGarage) return;
      try {
        const { data } = await API.get('/wishlist');
        const found = data.products.some(p => p._id === _id);
        setIsWishlisted(found);
      } catch (err) {
        console.error(err);
      }
    };
    checkStatus();
  }, [_id, user, isGarage]);

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      if (isWishlisted) {
        await API.delete(`/wishlist/${_id}`);
        setIsWishlisted(false);
        if (onRemove) onRemove(); 
      } else {
        await API.post(`/wishlist/${_id}`);
        setIsWishlisted(true);
      }
    } catch (err) {
      console.error('Wishlist action failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link to={`/product/${_id}`} className="group flex flex-col h-full bg-white border border-outline-variant rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low flex items-center justify-center p-6 sm:p-8 group-hover:bg-white transition-colors duration-700">
        <img 
          alt={name} 
          className="w-full h-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-1000 ease-out" 
          src={image}
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {isFeatured && (
            <span className="px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] shadow-sm bg-primary text-on-primary border border-primary-container">
              Featured
            </span>
          )}
          {discountPrice > 0 && (
            <span className="bg-error text-on-error px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] border border-error-container shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Favorite Button Overlay */}
        <button 
          onClick={handleWishlist}
          disabled={loading}
          className={`absolute top-4 right-4 z-20 backdrop-blur-md border border-outline-variant p-2.5 rounded-xl transition-all active:scale-90 shadow-sm ${isWishlisted ? 'text-error border-error-container bg-error/10' : 'bg-surface/40 text-on-surface-variant hover:text-error hover:bg-white hover:border-error-container'}`}
        >
          <span className={`material-symbols-outlined text-[18px] transition-all ${isWishlisted ? 'filled-icon' : ''}`}>
            {isGarage ? 'delete' : 'favorite'}
          </span>
        </button>
      </div>

      {/* Product Details */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow bg-white">
        <div className="mb-6 flex-grow">
          <div className="flex items-center gap-2 mb-2">
             <span className="h-[1px] w-4 bg-primary/30"></span>
             <span className="text-[8px] uppercase tracking-[0.3em] font-black text-primary block font-label">{brand || 'Hotwheel'}</span>
          </div>
          <h3 className="text-lg font-black text-on-background leading-tight font-headline italic tracking-tight group-hover:text-primary transition-colors line-clamp-2 uppercase">{name}</h3>
        </div>
        
        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent mb-6"></div>
        
        {/* Pricing & Stock Grid */}
        <div className="grid grid-cols-2 gap-4 items-end">
          <div className="flex flex-col gap-1">
            <p className="text-[8px] font-black text-on-surface-variant/60 uppercase tracking-[0.2em] font-label">
              {discountPrice > 0 ? 'Offer Valuation' : 'Market Valuation'}
            </p>
            <div className="flex flex-wrap items-baseline gap-2">
              <p className="text-2xl font-black text-on-background italic tracking-tighter font-headline">₹{discountPrice > 0 ? discountPrice.toLocaleString() : price.toLocaleString()}</p>
              {discountPrice > 0 && (
                <p className="text-[10px] text-on-surface-variant/40 line-through font-bold font-mono">₹{price.toLocaleString()}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <p className="text-[8px] font-black text-on-surface-variant/60 uppercase tracking-[0.2em] font-label">Availability</p>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${stock > 0 ? 'text-primary bg-primary/5 border-primary-container' : 'text-error bg-error/5 border-error-container'}`}>
              <div className={`w-1 h-1 rounded-full ${stock > 0 ? 'bg-primary' : 'bg-error'}`}></div>
              <span className="text-[8px] font-black uppercase tracking-[0.1em]">
                {stock > 0 ? `${stock} Units` : 'Void'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
