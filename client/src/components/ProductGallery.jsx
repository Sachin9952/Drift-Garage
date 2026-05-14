import React, { useState } from 'react';

const ProductGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="lg:col-span-7 flex flex-col gap-6 animate-fade-in-up">
      {/* Main Large Image */}
      <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#1a1a1a] border border-white/5 overflow-hidden group shadow-2xl relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-drift-accent/5 to-transparent pointer-events-none"></div>
        <img 
          alt="Main product" 
          className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]" 
          src={activeImage}
        />
        
        {/* Interactive Badge */}
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
          <button className="bg-black/60 backdrop-blur-md border border-white/10 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:border-drift-accent/50 hover:text-drift-accent transition-all uppercase tracking-widest shadow-xl">
            <span className="material-symbols-outlined text-sm">360</span>
            360° Studio
          </button>
        </div>
        
        {/* Fullscreen Toggle */}
        <button className="absolute top-6 right-6 z-20 text-gray-400 hover:text-white bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10 transition-all hover:scale-110 active:scale-95">
          <span className="material-symbols-outlined text-[20px]">zoom_in</span>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {images.map((img, i) => (
          <div 
            key={i}
            onClick={() => setActiveImage(img)}
            className={`w-24 h-20 flex-shrink-0 rounded-xl border-2 transition-all duration-300 cursor-pointer overflow-hidden bg-[#1a1a1a] flex items-center justify-center p-2 ${
              activeImage === img 
                ? 'border-drift-accent shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-105' 
                : 'border-white/5 opacity-40 hover:opacity-100 hover:border-white/20'
            }`}
          >
            <img alt={`Thumbnail ${i}`} className="w-full h-full object-contain" src={img} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
