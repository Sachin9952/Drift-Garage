import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import API from '../api/axios';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All Listings');
  const [sortBy, setSortBy] = useState('Recently Listed');

  const categories = ['All Listings', 'Muscle', 'Exotic', 'JDM', 'Classic', 'Special Edition'];
  
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await API.get('/products');
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('System Failure: Unable to retrieve catalog data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All Listings' || product.category.toLowerCase() === activeCategory.toLowerCase();
    const price = product.discountPrice > 0 ? product.discountPrice : product.price;
    const matchesMinPrice = minPrice === '' || price >= Number(minPrice);
    const matchesMaxPrice = maxPrice === '' || price <= Number(maxPrice);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return matchesCategory && matchesMinPrice && matchesMaxPrice && matchesBrand;
  });

  const handleReset = () => {
    setActiveCategory('All Listings');
    setMinPrice('');
    setMaxPrice('');
    setSelectedBrands([]);
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Highest Price') return b.price - a.price;
    if (sortBy === 'Lowest Price') return a.price - b.price;
    if (sortBy === 'Recently Listed') return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  return (
    <div className="pt-32 pb-24 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 min-h-screen bg-background">
      {/* Header & Categories */}
      <div className="mb-16 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
                <h1 className="text-4xl md:text-5xl font-black text-on-background italic tracking-tighter brand-logo mb-3 uppercase leading-none">Studio Catalog</h1>
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em]">Browsing {products.length} units currently docked in the showroom.</p>
            </div>
            <div className="mt-8 md:mt-0">
                <button onClick={handleReset} className="text-[10px] font-black text-primary hover:text-on-surface uppercase tracking-[0.3em] transition-colors font-label underline underline-offset-8">Reset All Parameters</button>
            </div>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-6 relative z-10 border-b border-outline-variant/30">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${
                activeCategory === cat 
                  ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/10 -translate-y-1' 
                  : 'bg-surface-container text-on-surface-variant border-outline-variant hover:text-on-surface hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 relative">
        {/* Subtle background glow */}
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="w-full lg:w-80 flex-shrink-0">
            <FilterSidebar 
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              onReset={handleReset}
              products={products}
            />
        </div>
        
        {/* Product Grid Area */}
        <div className="flex-grow relative z-10">
          {/* Grid Toolbar */}
          <div className="flex justify-between items-center mb-12 bg-surface-container/50 p-6 rounded-2xl border border-outline-variant backdrop-blur-sm">
            <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">
                  {loading ? 'Scanning catalog...' : `Showing ${sortedProducts.length} Authenticated Units`}
                </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest hidden sm:block">Sort By</span>
              <div className="relative group/select">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface-container border border-outline-variant rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest text-on-surface outline-none focus:border-primary-container appearance-none cursor-pointer pr-12 transition-all hover:bg-white shadow-sm"
                >
                  <option>Recently Listed</option>
                  <option>Highest Price</option>
                  <option>Lowest Price</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 pointer-events-none group-focus-within/select:text-primary transition-colors text-[18px]">expand_more</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-error font-black uppercase text-[10px] tracking-[0.3em] py-24 text-center bg-error-container/10 border border-error/20 rounded-[40px] italic font-headline animate-shake">
              <span className="material-symbols-outlined text-5xl mb-6">gpp_maybe</span>
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-[480px] bg-surface-container/50 animate-pulse rounded-3xl border border-outline-variant"></div>
              ))}
            </div>
          ) : (
            <>
              {sortedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 bg-surface-container/30 border border-dashed border-outline-variant rounded-[40px]">
                  <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-8 text-on-surface-variant/40 shadow-inner">
                    <span className="material-symbols-outlined text-5xl">search_off</span>
                  </div>
                  <h3 className="text-3xl font-black text-on-surface italic uppercase font-headline">No Matches</h3>
                  <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em] max-w-sm text-center leading-relaxed">Adjust your parameters to locate the legend within our facility.</p>
                  <button onClick={handleReset} className="mt-10 px-10 py-4 bg-primary text-on-primary font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all shadow-xl">
                    Reset System
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 animate-fade-in">
                  {sortedProducts.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Load More */}
          {!loading && sortedProducts.length > 0 && (
            <div className="mt-24 flex justify-center">
              <button className="px-12 py-5 rounded-xl bg-surface-container border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary-container hover:bg-white transition-all font-black text-[11px] uppercase tracking-[0.4em] flex items-center gap-5 group shadow-xl active:scale-[0.98]">
                Expand Catalog
                <span className="material-symbols-outlined text-[20px] group-hover:translate-y-1 transition-transform">keyboard_double_arrow_down</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
