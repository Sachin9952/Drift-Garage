import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AccountSettings = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (formData.password && formData.password !== formData.confirmPassword) {
      return setMessage({ type: 'error', text: 'Password mismatch detected.' });
    }

    setLoading(true);
    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
      };
      if (formData.password) updateData.password = formData.password;

      await updateProfile(updateData);
      setMessage({ type: 'success', text: 'Identity configuration successfully updated.' });
      setFormData({ ...formData, password: '', confirmPassword: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Security Protocol Failure: Unable to update identity.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row gap-20 items-start">
        {/* Sidebar Info */}
        <div className="lg:w-1/3 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-black text-on-background tracking-tighter italic brand-logo uppercase leading-none mb-8">Security Protocol</h1>
          <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-[0.4em] leading-relaxed">Modify your personnel identity credentials and security access codes below. Changes take effect immediately across all deployment hubs.</p>
          
          <div className="mt-16 space-y-8">
             <div className="flex items-center gap-6 p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary-container">
                    <span className="material-symbols-outlined text-[28px]">shield_person</span>
                </div>
                <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest font-label">Access Level</p>
                    <p className="text-sm font-black text-on-background font-headline italic uppercase mt-1">{user?.role} Personnel</p>
                </div>
             </div>
             <div className="flex items-center gap-6 p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30">
                <div className="w-14 h-14 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary-container">
                    <span className="material-symbols-outlined text-[28px]">history</span>
                </div>
                <div>
                    <p className="text-[10px] font-black text-tertiary uppercase tracking-widest font-label">Commissioned</p>
                    <p className="text-sm font-black text-on-background font-headline italic uppercase mt-1">
                        {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                    </p>
                </div>
             </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 w-full bg-white border border-outline-variant rounded-[48px] p-8 md:p-16 shadow-2xl animate-fade-in relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
          
          <form onSubmit={handleSubmit} className="space-y-12">
            {message.text && (
              <div className={`p-6 rounded-2xl border flex items-center gap-4 animate-fade-in ${message.type === 'error' ? 'bg-error/5 border-error/20 text-error' : 'bg-primary/5 border-primary/20 text-primary'}`}>
                <span className="material-symbols-outlined">{message.type === 'error' ? 'report' : 'check_circle'}</span>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] font-label">{message.text}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3 group/input">
                <label className="text-[10px] font-black text-on-background uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label">Personnel Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container border border-outline-variant/60 rounded-2xl px-6 py-5 text-on-background text-sm font-black focus:border-primary focus:bg-white outline-none transition-all placeholder:text-on-surface-variant/20 font-headline italic uppercase"
                />
              </div>
              <div className="space-y-3 group/input">
                <label className="text-[10px] font-black text-on-background uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label">Comm Channel (Email)</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container border border-outline-variant/60 rounded-2xl px-6 py-5 text-on-background text-sm font-black focus:border-primary focus:bg-white outline-none transition-all placeholder:text-on-surface-variant/20 font-mono italic lowercase"
                />
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3 group/input">
                <label className="text-[10px] font-black text-on-background uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label">New Security Code</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="LEAVE BLANK TO RETAIN CURRENT"
                  className="w-full bg-surface-container border border-outline-variant/60 rounded-2xl px-6 py-5 text-on-background text-sm font-black focus:border-primary focus:bg-white outline-none transition-all placeholder:text-[9px] placeholder:tracking-[0.2em]"
                />
              </div>
              <div className="space-y-3 group/input">
                <label className="text-[10px] font-black text-on-background uppercase tracking-[0.4em] ml-2 group-focus-within/input:text-primary transition-colors font-label">Confirm Security Code</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="REPEAT NEW CODE"
                  className="w-full bg-surface-container border border-outline-variant/60 rounded-2xl px-6 py-5 text-on-background text-sm font-black focus:border-primary focus:bg-white outline-none transition-all placeholder:text-[9px] placeholder:tracking-[0.2em]"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-on-primary font-black text-[11px] py-6 rounded-2xl flex justify-center items-center gap-5 hover:bg-primary-container transition-all shadow-xl group uppercase tracking-[0.4em] active:scale-[0.98] shadow-primary/20 disabled:opacity-50"
            >
              {loading ? 'Reconfiguring...' : 'Reconfigure Identity'}
              <span className="material-symbols-outlined text-[24px] group-hover:rotate-12 transition-transform">published_with_changes</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
