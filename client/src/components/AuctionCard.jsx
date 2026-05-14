import React from 'react';
import { Link } from 'react-router-dom';

const AuctionCard = ({ auction }) => {
  const { id, name, currentBid, timeLeft, image, lotNumber, brand, scale } = auction;

  return (
    <Link to={`/product/${id}`} className="bg-drift-surface border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 group flex flex-col h-full cursor-pointer hover:border-drift-accent/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="relative aspect-video bg-black/40 overflow-hidden flex items-center justify-center p-8">
        <div className="absolute inset-0 bg-gradient-to-t from-drift-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-red-500/10 text-red-500 border border-red-500/30 px-3 py-1 rounded-lg font-black text-[10px] flex items-center gap-2 tracking-[0.2em] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            LIVE
          </span>
        </div>
        
        <div className="absolute top-4 right-4 z-10">
           <span className="text-[10px] font-bold text-gray-700 font-mono tracking-tighter uppercase">ID: {lotNumber}</span>
        </div>
        
        <img 
          alt={name} 
          className="object-contain w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-700 ease-out" 
          src={image}
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/5 group-hover:border-drift-accent/20 transition-colors"></div>
        
        <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black text-drift-accent uppercase tracking-widest">{brand}</span>
            <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{scale}</span>
        </div>
        
        <h3 className="text-lg font-black text-white italic tracking-tight mb-6 group-hover:text-drift-accent transition-colors leading-tight">
            {name}
        </h3>
        
        <div className="mt-auto pt-5 border-t border-white/5 flex justify-between items-end">
            <div>
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] mb-1.5">Current Bid</p>
              <p className="text-xl font-black text-white font-mono tracking-tighter group-hover:text-drift-accent transition-colors">
                {currentBid}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] mb-1.5">Ends In</p>
              <div className="flex items-center gap-1.5 text-drift-accent">
                 <span className="material-symbols-outlined text-sm">schedule</span>
                 <p className="text-xs font-black font-mono">{timeLeft}</p>
              </div>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default AuctionCard;
