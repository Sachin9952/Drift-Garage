import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await API.get('/products');
        const featured = data.filter(p => p.isFeatured).slice(0, 4);
        if (featured.length === 0) {
          setFeaturedProducts(data.slice(0, 4));
        } else {
          setFeaturedProducts(featured);
        }
      } catch (err) {
        console.error('Failed to fetch featured products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="w-full overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center w-full">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-background">
          <img 
            alt="Supercar background" 
            className="w-full h-full object-cover object-right opacity-30 mix-blend-multiply transition-all duration-1000 scale-105 group-hover:scale-100" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuABDnjgbExWtKQAnQVbLGrSyxNwCrECGV1Td8v_B60FYiJsUa4RXufZFJoIHCVJ1H4RV-8AEp6Sa3AjNXdrr8xXGLdBEniVmluWtfeW4xlaWloIkar1NcAwSgbAYgPd8hFFI76nrTjPThi8vHfZbXrLeMviU3nw9FbLcBnmd5aSceIce6_4x5zNvCe5IgB_Vj9WcXEZvF83IWrHrVRFiDNw3KoneSL71NwhM64zjqF_owpLWCH4WF-VbzX5xLzEIViCYaggsbbo-n38"
          />
        </div>
        {/* Gradient Overlay for Depth and Text Readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/90 md:via-background/60 to-transparent"></div>
        
        {/* Content Container */}
        <div className="relative z-20 w-full px-6 md:px-12 lg:px-24 mx-auto max-w-7xl">
          <div className="max-w-2xl pt-24">
            {/* Main Headline */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-headline font-black leading-[1] tracking-tighter mb-10 text-on-background animate-fade-in-up uppercase italic">
              Collect Speed.<br/>
              <span className="text-primary">Own Legends.</span>
            </h1>
            {/* Subheadline/Description */}
            <p className="text-lg md:text-xl text-on-surface-variant font-body font-medium leading-relaxed mb-14 max-w-lg">
              The ultimate destination for premium die-cast models. Discover rare finds, exclusive drops, and elite collections curated for serious enthusiasts worldwide.
            </p>
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Primary CTA */}
              <Link to="/shop" className="bg-primary text-on-primary px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-primary-container hover:text-on-primary-container transition-all shadow-2xl active:scale-[0.98] group">
                Explore Collection
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </Link>
              {/* Secondary CTA */}
              <Link to="/shop" className="bg-surface-container-lowest border border-outline-variant text-on-background px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center hover:bg-white transition-all shadow-sm active:scale-[0.98]">
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-40 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 relative z-10">
          <div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-4 block font-label">The Showroom</span>
            <h2 className="text-5xl md:text-6xl font-headline font-black tracking-tighter text-on-background italic uppercase leading-none">Featured Grails</h2>
          </div>
          <div className="mt-10 md:mt-0">
            <Link to="/shop" className="inline-flex items-center gap-4 text-[10px] font-black text-primary hover:text-on-surface transition-all group font-label uppercase tracking-[0.3em] underline underline-offset-[10px]">
              View Full Hangar
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform text-[18px]">east</span>
            </Link>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[480px] bg-surface-container/30 animate-pulse rounded-[32px] border border-outline-variant"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
            {featuredProducts.length === 0 && (
              <div className="col-span-full py-40 text-center bg-surface-container/10 border border-dashed border-outline-variant rounded-[48px]">
                <span className="material-symbols-outlined text-7xl text-on-surface-variant/20 mb-8">inventory_2</span>
                <p className="text-xl text-on-surface-variant font-headline font-black italic uppercase tracking-widest opacity-40">The hangar is currently empty</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Brand Ethos */}
      <section className="py-40 bg-surface-container border-y border-outline-variant/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-24 relative z-10">
          <div className="flex flex-col gap-8 text-center md:text-left group animate-fade-in-up">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-on-primary transition-all duration-700 mx-auto md:mx-0 shadow-sm border border-primary-container">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            <h3 className="text-3xl font-headline font-black text-on-background italic uppercase leading-none tracking-tight">Authenticated</h3>
            <p className="text-on-surface-variant text-lg leading-relaxed font-medium">Every model is rigorously inspected for original integrity and pristine showroom condition.</p>
          </div>
          <div className="flex flex-col gap-8 text-center md:text-left group animate-fade-in-up delay-100">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-on-primary transition-all duration-700 mx-auto md:mx-0 shadow-sm border border-primary-container">
              <span className="material-symbols-outlined text-3xl">local_shipping</span>
            </div>
            <h3 className="text-3xl font-headline font-black text-on-background italic uppercase leading-none tracking-tight">Secure Transit</h3>
            <p className="text-on-surface-variant text-lg leading-relaxed font-medium">Reinforced strategic packaging ensures zero-impact delivery to your personal vault.</p>
          </div>
          <div className="flex flex-col gap-8 text-center md:text-left group animate-fade-in-up delay-200">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-on-primary transition-all duration-700 mx-auto md:mx-0 shadow-sm border border-primary-container">
              <span className="material-symbols-outlined text-3xl">distance</span>
            </div>
            <h3 className="text-3xl font-headline font-black text-on-background italic uppercase leading-none tracking-tight">Global Grid</h3>
            <p className="text-on-surface-variant text-lg leading-relaxed font-medium">Coordinating elite deliveries to legendary collectors across the entire global network.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
