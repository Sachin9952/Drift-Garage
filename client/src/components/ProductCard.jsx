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
    <Link to={`/product/${_id}`} className="group flex flex-col h-full bg-surface-container-lowest border border-outline-variant rounded-[32px] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low flex items-center justify-center p-10 group-hover:bg-white transition-colors duration-700">
        <img 
          alt={name} 
          className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-1000 ease-out" 
          src={image}
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2.5">
          {isFeatured && (
            <span className="px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] shadow-sm bg-primary text-on-primary border border-primary-container">
              Featured
            </span>
          )}
          {discountPrice > 0 && (
            <span className="bg-error text-on-error px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] border border-error-container shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Favorite Button Overlay */}
        <button 
          onClick={handleWishlist}
          disabled={loading}
          className={`absolute top-6 right-6 z-20 backdrop-blur-md border border-outline-variant p-3.5 rounded-2xl transition-all active:scale-90 shadow-sm ${isWishlisted ? 'text-error border-error-container bg-error/10' : 'bg-surface/40 text-on-surface-variant hover:text-error hover:bg-white hover:border-error-container'}`}
        >
          <span className={`material-symbols-outlined text-[22px] transition-all ${isWishlisted ? 'filled-icon' : ''}`}>
            {isGarage ? 'delete' : 'favorite'}
          </span>
        </button>
      </div>

      {/* Product Details */}
      <div className="p-10 flex flex-col flex-grow bg-white">
        <div className="mb-8 flex-grow">
          <div className="flex items-center gap-3 mb-3">
             <span className="h-[1px] w-6 bg-primary/30"></span>
             <span className="text-[9px] uppercase tracking-[0.4em] font-black text-primary block font-label">{brand || 'Hotwheel'}</span>
          </div>
          <h3 className="text-xl font-black text-[#1f1f1f] leading-tight font-headline italic tracking-tight group-hover:text-primary transition-colors line-clamp-2">{name}</h3>
        </div>
        
        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent mb-8"></div>
        
        {/* Pricing & Stock */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] mb-2.5 font-label">
              {discountPrice > 0 ? 'Offer Valuation' : 'Market Valuation'}
            </p>
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-black text-[#1f1f1f] italic tracking-tighter font-headline">₹{discountPrice > 0 ? discountPrice.toLocaleString() : price.toLocaleString()}</p>
              {discountPrice > 0 && (
                <p className="text-sm text-on-surface-variant/40 line-through font-bold font-mono">₹{price.toLocaleString()}</p>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] mb-2.5 font-label">Availability</p>
            <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${stock > 0 ? 'text-primary bg-primary/5 border-primary-container' : 'text-error bg-error/5 border-error-container'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${stock > 0 ? 'bg-primary' : 'bg-error'}`}></div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">
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
