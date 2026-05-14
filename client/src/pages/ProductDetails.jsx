import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import ProductCard from '../components/ProductCard';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
        
        // Fetch similar products (same category)
        const { data: allProducts } = await API.get('/products');
        const similar = allProducts
          .filter(p => p.category === data.category && p._id !== data._id)
          .slice(0, 3);
        setSimilarProducts(similar);
        
        setError(null);
      } catch (err) {
        setError('Product not found.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setAddingToCart(true);
    try {
      await API.post('/cart', { productId: product._id, quantity: 1 });
      alert('Product added to cart!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    // Check if product is in wishlist on load
    const checkWishlist = async () => {
      if (!user) return;
      try {
        const { data } = await API.get('/wishlist');
        const found = data.products.some(p => p._id === id);
        setIsWishlisted(found);
      } catch (err) {
        console.error(err);
      }
    };
    checkWishlist();
  }, [id, user]);

  const handleToggleWishlist = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (isWishlisted) {
        await API.delete(`/wishlist/${product._id}`);
        setIsWishlisted(false);
      } else {
        await API.post(`/wishlist/${product._id}`);
        setIsWishlisted(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update wishlist');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white bg-drift-dark">Scanning Studio...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500 bg-drift-dark">{error}</div>;
  if (!product) return null;

  const displayPrice = product.discountPrice > 0 ? product.discountPrice : product.price;

  return (
    <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-32 flex flex-col gap-16 w-full min-h-screen bg-background text-on-background">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-3 text-on-surface-variant/60 text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in">
        <button className="hover:text-primary transition-colors" onClick={() => navigate('/shop')}>Shop</button>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <span className="text-on-surface-variant/60">{product.category}</span>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <span className="text-on-background font-black">{product.name}</span>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-7">
           <ProductGallery images={product.images} />
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-5 flex flex-col gap-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white border border-outline-variant rounded-[40px] p-8 md:p-12 flex flex-col gap-12 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="flex flex-col gap-8 relative z-10">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="bg-primary/10 text-primary border border-primary/20 px-5 py-2 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase">{product.brand || 'Hotwheel'}</span>
                <span className="bg-surface-container text-on-surface-variant border border-outline-variant px-5 py-2 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase">{product.category}</span>
                
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 ml-auto">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(74,124,89,0.5)]"></div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">In Showroom</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 ml-auto text-error">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Reserved / Sold</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-on-background leading-[1.1] tracking-tighter italic brand-logo uppercase">
                {product.name}
              </h1>
            </div>

            <div className="flex flex-col gap-10 relative z-10">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.4em] mb-2 font-label">Market Valuation</p>
                <div className="flex items-end gap-4">
                  <span className="text-6xl font-black text-on-background tracking-tighter font-headline italic">₹{displayPrice.toLocaleString()}</span>
                  {product.discountPrice > 0 && (
                    <span className="text-2xl text-on-surface-variant/40 line-through mb-2 font-mono">₹{product.price.toLocaleString()}</span>
                  )}
                  <span className="text-[10px] font-black text-on-surface-variant mb-4 uppercase tracking-[0.4em] ml-2">INR</span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || addingToCart}
                  className={`col-span-9 bg-primary text-on-primary font-black text-[10px] py-6 rounded-2xl flex items-center justify-center gap-4 hover:bg-primary-container transition-all duration-300 active:scale-[0.97] uppercase tracking-[0.3em] shadow-xl shadow-primary/20 ${product.stock === 0 || addingToCart ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                  <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
                  {addingToCart ? 'Acquiring...' : 'Add to Garage'}
                </button>
                <button 
                  onClick={handleToggleWishlist}
                  className={`col-span-3 border transition-all duration-300 rounded-2xl flex items-center justify-center active:scale-[0.97] shadow-lg ${
                    isWishlisted 
                    ? 'border-error/50 bg-error/10 text-error' 
                    : 'border-outline-variant bg-surface-container text-on-surface-variant hover:border-error/50 hover:text-error'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[24px] transition-all ${isWishlisted ? 'filled-icon' : ''}`}>
                    favorite
                  </span>
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-4 p-5 bg-surface-container/50 rounded-2xl border border-outline-variant text-on-surface-variant text-[10px] font-black uppercase tracking-[0.3em]">
                <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
                Certified Original Packaging & Authenticity
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-outline-variant to-transparent"></div>

            <div className="flex flex-col gap-8 relative z-10">
              <h3 className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.4em]">Collector Specifications</h3>
              <div className="grid grid-cols-2 gap-y-8 gap-x-6">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black text-on-surface-variant/60 uppercase tracking-[0.3em]">Manufacturer</span>
                  <span className="text-base font-black text-on-background italic uppercase">{product.brand || 'Mattel'}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black text-on-surface-variant/60 uppercase tracking-[0.3em]">Classification</span>
                  <span className="text-base font-black text-on-background italic uppercase">{product.category}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black text-on-surface-variant/60 uppercase tracking-[0.3em]">Showroom Units</span>
                  <span className="text-base font-black text-on-background italic uppercase">{product.stock} Available</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black text-on-surface-variant/60 uppercase tracking-[0.3em]">Condition</span>
                  <span className="text-base font-black text-primary italic uppercase tracking-tighter">Mint / Carded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-3 bg-white border border-outline-variant rounded-[40px] p-10 md:p-16 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
          <h2 className="text-3xl font-black text-on-background flex items-center gap-4 mb-10 italic uppercase font-headline">
            <span className="material-symbols-outlined text-primary text-3xl">auto_stories</span>
            Legend Background
          </h2>
          <div className="text-on-surface-variant text-xl leading-relaxed space-y-8 max-w-5xl font-medium">
            <p className="first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-primary">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="flex flex-col gap-10 mt-8">
          <div className="flex justify-between items-end border-b border-white/10 pb-6 relative">
            <h2 className="text-3xl font-bold text-white">Similar Grails</h2>
            <button 
              onClick={() => navigate('/shop')} 
              className="text-drift-accent font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
            >
              View Full Studio
            </button>
            <div className="absolute bottom-[-1px] left-0 w-24 h-0.5 bg-drift-accent"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {similarProducts.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
