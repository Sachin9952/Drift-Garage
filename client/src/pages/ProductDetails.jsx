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
    <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-32 flex flex-col gap-16 w-full min-h-screen bg-drift-dark">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-3 text-gray-500 text-xs font-bold uppercase tracking-[0.2em] animate-fade-in">
        <button className="hover:text-drift-accent transition-colors" onClick={() => navigate('/shop')}>Shop</button>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-gray-500">{product.category}</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-white">{product.name}</span>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <ProductGallery images={product.images} />

        {/* Details Panel */}
        <div className="lg:col-span-5 flex flex-col gap-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-drift-surface border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col gap-10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-drift-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="flex flex-col gap-6 relative z-10">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-drift-accent/10 text-drift-accent border border-drift-accent/20 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase">{product.brand || 'Hotwheel'}</span>
                <span className="bg-white/5 text-gray-400 border border-white/5 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase">{product.category}</span>
                
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 ml-auto">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">In Showroom</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 ml-auto text-red-400">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Reserved / Sold</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight italic brand-logo">
                {product.name}
              </h1>
            </div>

            <div className="flex flex-col gap-8 relative z-10">
              <div className="flex items-end gap-3">
                <span className="text-5xl font-black text-white tracking-tighter font-mono">₹{displayPrice}</span>
                {product.discountPrice > 0 && (
                  <span className="text-xl text-gray-500 line-through mb-1.5 font-mono">₹{product.price}</span>
                )}
                <span className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest ml-1">INR</span>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || addingToCart}
                  className={`col-span-9 bg-white text-drift-dark font-black text-sm py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-drift-accent transition-all duration-300 active:scale-[0.97] uppercase tracking-widest shadow-xl ${product.stock === 0 || addingToCart ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  {addingToCart ? 'Acquiring...' : 'Add to Garage'}
                </button>
                <button 
                  onClick={handleToggleWishlist}
                  className={`col-span-3 border transition-all duration-300 rounded-xl flex items-center justify-center active:scale-[0.97] shadow-lg ${
                    isWishlisted 
                    ? 'border-red-500/50 bg-red-500/10 text-red-500' 
                    : 'border-white/10 bg-white/5 text-gray-400 hover:border-red-500/50 hover:text-red-500'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[22px] transition-all ${isWishlisted ? 'filled-icon' : ''}`}>
                    favorite
                  </span>
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm text-drift-accent">verified</span>
                Certified Original Packaging & Authenticity
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="flex flex-col gap-6 relative z-10">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Collector Specifications</h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Manufacturer</span>
                  <span className="text-sm font-semibold text-white">{product.brand || 'Mattel'}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Classification</span>
                  <span className="text-sm font-semibold text-white">{product.category}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Showroom Units</span>
                  <span className="text-sm font-semibold text-white">{product.stock} Available</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Condition</span>
                  <span className="text-sm font-semibold text-emerald-400 uppercase tracking-tighter">Mint / Carded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-3 bg-drift-surface border border-white/5 rounded-3xl p-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-drift-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-drift-accent">auto_stories</span>
            Legend Background
          </h2>
          <div className="text-gray-400 text-lg leading-relaxed space-y-6 max-w-4xl">
            <p>{product.description}</p>
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
