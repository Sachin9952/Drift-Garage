import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { _id, brand, name, price, image, isFeatured, stock } = product;
  
  const displayImage = image?.startsWith('http') ? image : 
                       (product.images && product.images[0]?.startsWith('http')) ? product.images[0] :
                       'https://via.placeholder.com/400x300?text=No+Asset+Found';

  return (
    <Link to={`/product/${_id}`} className="group flex flex-col h-full bg-white border border-outline-variant rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low flex items-center justify-center p-6 sm:p-8 group-hover:bg-white transition-colors duration-700">
        <img 
          alt={name} 
          className="w-full h-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-1000 ease-out" 
          src={displayImage}
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {isFeatured && (
            <span className="px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] shadow-sm bg-primary text-on-primary border border-primary-container">
              Featured
            </span>
          )}
        </div>
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
            <p className="text-[8px] font-black text-on-surface-variant/60 uppercase tracking-[0.2em] font-label">Market Valuation</p>
            <div className="flex flex-wrap items-baseline gap-2">
              <p className="text-2xl font-black text-on-background italic tracking-tighter font-headline">₹{price.toLocaleString()}</p>
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
