import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col lg:flex-row bg-background overflow-hidden font-body">
      {/* Left Column: Cinematic Visuals (Earthy/Light) */}
      <div className="hidden lg:flex lg:w-[60%] relative bg-surface-container overflow-hidden">
        <img 
          className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105 hover:scale-100 transition-transform duration-[10s] ease-linear" 
          alt="Vintage Garage"
          src="https://images.unsplash.com/photo-1594739297381-e43d1ac31201?auto=format&fit=crop&q=80&w=2070"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-background/40 to-background"></div>
        
        {/* Animated Elements */}
        <div className="absolute top-20 left-20 w-32 h-[2px] bg-primary/20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20">
            <div className="flex items-center gap-6 mb-8">
                <span className="h-[2px] w-16 bg-primary shadow-[0_0_8px_rgba(74,124,89,0.4)]"></span>
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Phase 01: Identification</span>
            </div>
            <h2 className="text-6xl font-black text-on-background italic tracking-tighter brand-logo drop-shadow-sm mb-6 leading-none uppercase">
                AUTHORIZED <br/> ACCESS ONLY.
            </h2>
            <p className="text-on-surface-variant font-medium max-w-md text-lg leading-relaxed tracking-wide">
                Welcome back to the Vault. Connect your credentials to manage your legendary acquisitions and secure your collection.
            </p>
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 md:p-12 relative bg-background">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/5 blur-[120px] rounded-full"></div>
        </div>

        <div className="w-full max-w-[440px] relative z-10 animate-fade-in-up">
          <div className="text-center mb-16">
            <Link to="/" className="text-4xl font-black text-on-background italic tracking-tighter brand-logo hover:text-primary transition-all uppercase leading-none block">
              DRIFT GARAGE
            </Link>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-[40px] p-8 md:p-12 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
            
            <div className="flex border-b border-outline-variant/30 mb-12">
              <button className="flex-1 pb-5 text-center border-b-2 border-primary text-[#1f1f1f] font-black text-[10px] uppercase tracking-[0.3em] transition-all font-label">
                Sign In
              </button>
              <Link to="/signup" className="flex-1 pb-5 text-center border-b-2 border-transparent text-on-surface-variant/40 hover:text-primary font-black text-[10px] uppercase tracking-[0.3em] transition-all font-label">
                Register
              </Link>
            </div>

            {error && (
              <div className="bg-error-container/10 text-error p-5 rounded-2xl mb-10 text-[11px] font-black uppercase tracking-widest border border-error/20 flex items-center gap-4 animate-shake italic font-headline">
                <span className="material-symbols-outlined text-[20px]">error</span>
                {error}
              </div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-4 group/input">
                <label className="text-[10px] font-black text-[#1f1f1f] uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label" htmlFor="email">Operator ID</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within/input:text-primary transition-colors text-[20px]">alternate_email</span>
                  <input 
                    className="w-full bg-surface-container border border-outline-variant rounded-2xl py-5 pl-14 pr-6 text-[#1f1f1f] text-sm font-bold focus:outline-none focus:border-primary-container focus:bg-white transition-all placeholder:text-on-surface-variant/20 font-headline italic" 
                    id="email" 
                    placeholder="EMAIL@DOMAIN.COM" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-4 group/input">
                <div className="flex justify-between items-center px-2">
                  <label className="text-[10px] font-black text-[#1f1f1f] uppercase tracking-[0.4em] group-focus-within/input:text-primary transition-colors font-label" htmlFor="password">Security Key</label>
                  <a className="text-[9px] font-black text-primary/60 hover:text-primary transition-colors uppercase tracking-[0.3em] font-label" href="#">Lost Key?</a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within/input:text-primary transition-colors text-[20px]">lock</span>
                  <input 
                    className="w-full bg-surface-container border border-outline-variant rounded-2xl py-5 pl-14 pr-6 text-[#1f1f1f] text-sm font-black focus:outline-none focus:border-primary-container focus:bg-white transition-all placeholder:text-on-surface-variant/20 font-mono italic" 
                    id="password" 
                    placeholder="••••••••" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button 
                className={`w-full bg-primary text-on-primary font-black text-[11px] py-6 px-6 rounded-2xl hover:bg-primary-container hover:text-on-primary-container transition-all duration-500 shadow-xl active:scale-[0.98] uppercase tracking-[0.4em] mt-6 flex justify-center items-center gap-4 ${loading ? 'opacity-30 cursor-not-allowed' : ''}`} 
                type="submit"
                disabled={loading}
              >
                {loading ? 'DECRYPTING...' : 'Enter System'}
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </button>
            </form>
            
            <div className="mt-12 flex items-center justify-center gap-6">
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
              <span className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.4em] font-label">Alternate Sync</span>
              <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <button className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl border border-outline-variant bg-surface-container hover:bg-white hover:border-primary/30 transition-all group">
                <span className="text-[10px] font-black text-on-surface-variant group-hover:text-primary uppercase tracking-[0.3em] font-label">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl border border-outline-variant bg-surface-container hover:bg-white hover:border-primary/30 transition-all group">
                <span className="text-[10px] font-black text-on-surface-variant group-hover:text-primary uppercase tracking-[0.3em] font-label">Discord</span>
              </button>
            </div>
          </div>
          
          <div className="mt-12 text-center">
              <p className="text-on-surface-variant/40 text-[9px] font-black uppercase tracking-[0.4em] font-label">
                  Encrypted Session <span className="text-primary mx-4">•</span> Secure Transmission
              </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
