import React from 'react';

const FilterSidebar = ({ 
  minPrice, setMinPrice, 
  maxPrice, setMaxPrice, 
  selectedBrands, setSelectedBrands, 
  onReset,
  products 
}) => {
  const brands = [...new Set(products.map(p => p.brand))].filter(Boolean).sort();

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(prev => prev.filter(b => b !== brand));
    } else {
      setSelectedBrands(prev => [...prev, brand]);
    }
  };

  return (
    <aside className="w-full space-y-12 animate-fade-in">
      <div className="bg-white border border-outline-variant rounded-[32px] p-8 shadow-sm relative overflow-hidden group">
        {/* Subtle decorative background */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

        <div className="flex justify-between items-center mb-10 relative z-10">
          <h2 className="text-xl font-black text-on-background italic tracking-tighter uppercase font-headline">Filters</h2>
          <button 
            onClick={onReset}
            className="text-[10px] font-black text-primary hover:text-on-surface transition-colors uppercase tracking-[0.3em] font-label"
          >
            Reset
          </button>
        </div>
        
        {/* Filter Group: Brand */}
        <div className="mb-10 border-b border-outline-variant pb-10 relative z-10">
          <h3 className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-[0.4em] mb-6 font-label">Manufacturing Origin</h3>
          <div className="space-y-4 max-h-40 sm:max-h-72 overflow-y-auto custom-scrollbar pr-4">
            {brands.length > 0 ? brands.map((brand) => (
              <label key={brand} className="flex items-center gap-4 cursor-pointer group/label">
                <div 
                  onClick={() => toggleBrand(brand)}
                  className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${
                    selectedBrands.includes(brand) 
                      ? 'border-primary bg-primary/10 shadow-sm' 
                      : 'border-outline-variant group-hover/label:border-primary/50'
                  }`}
                >
                  {selectedBrands.includes(brand) && (
                    <span className="material-symbols-outlined text-[16px] text-primary font-black">check</span>
                  )}
                </div>
                <span 
                  onClick={() => toggleBrand(brand)}
                  className={`text-sm font-bold transition-colors font-headline italic ${
                    selectedBrands.includes(brand) ? 'text-primary' : 'text-on-surface-variant group-hover/label:text-on-surface'
                  }`}
                >
                  {brand}
                </span>
              </label>
            )) : (
              <p className="text-on-surface-variant/40 text-[10px] italic font-black uppercase tracking-widest">Scanning origins...</p>
            )}
          </div>
        </div>

        {/* Filter Group: Price Range */}
        <div className="relative z-10">
          <h3 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.4em] mb-6 font-label">Valuation Range (INR)</h3>
          <div className="flex flex-col gap-5">
            <div className="relative group/input">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary font-black italic group-focus-within/input:text-primary transition-colors">₹</span>
              <input 
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant rounded-xl pl-12 pr-6 py-4 text-on-surface text-sm font-black outline-none transition-all focus:border-primary-container focus:bg-white placeholder:text-on-surface-variant/30 font-mono italic tracking-tighter shadow-sm" 
                placeholder="MIN" 
                type="number"
              />
            </div>
            <div className="relative group/input">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary font-black italic group-focus-within/input:text-primary transition-colors">₹</span>
              <input 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant rounded-xl pl-12 pr-6 py-4 text-on-surface text-sm font-black outline-none transition-all focus:border-primary-container focus:bg-white placeholder:text-on-surface-variant/30 font-mono italic tracking-tighter shadow-sm" 
                placeholder="MAX" 
                type="number"
              />
            </div>
          </div>
        </div>

        {/* System Status Mockup */}
        <div className="mt-12 pt-8 border-t border-outline-variant/30 text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-surface-container rounded-full border border-outline-variant">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">Real-time sync active</span>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
