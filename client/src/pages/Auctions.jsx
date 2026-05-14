import React from 'react';
import AuctionCard from '../components/AuctionCard';

const Auctions = () => {
  const spotlightAuction = {
    name: "1:18 '92 Honda NSX Type-R",
    brand: "AutoArt Signature",
    scale: "1:18",
    lotNumber: "DG-8842",
    currentBid: "₹1,02,500.00",
    timeLeft: "02:45:18",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP3ICXKa5YAA209CHx5LQqMe-ICxiJySdJ9LSAzVWt-4FmrT84Dum1a16frIpwdeLjHG0b0OwQELwObXCiGa7CsXBUa7JRVfh_NLSWL4BuPfAQwL1Ys250o747YhZIXwoiGrkG42-4dJKGGdTVZnW83r88YftzYNN8Idp6jAdeCHgwGY_D_aKUltY23I5weVR5vAD7ZEgl1QoipH8YYnrru3a5rtnK_ykEgn1761vCbbDzHtCC70gQz-KrKdwiahjvltHq4eGXVovN",
    description: "A flawless replica of the legendary NA1 NSX-R. This specific model features functional pop-up headlights, a fully detailed C30A V6 engine bay, and exact Championship White color-matching."
  };

  const activeAuctions = [
    {
      id: 1,
      name: "Nissan Skyline R34 GT-R V-Spec II",
      brand: "AutoArt",
      scale: "1:18",
      lotNumber: "DG-1024",
      currentBid: "₹36,900.00",
      timeLeft: "05:12:44",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAMQDnC_BB5uw52NC4y-Q8iPnfxFMV-49CzAvN6qAnoNsm1d5d-GAZjSE_R2OpAqyaqxl7QcK9VDrm7seS4nrqq_VppKbD3CypspE_5yzivXnc3Nuy-ylrrYle4JD6QfkHxNF9dn105mERNMcXV3FuJUPGrGXRN_d7910O9c_K3gDpoxIzI0cf__eUzKg_FunABW83iNuyHTafnF8n3P-XclIYupfHdQjQjD-4whCRGrGHhjCD9crEJhITsDsJK7jC6yw_4q4jHAVT"
    },
    {
      id: 2,
      name: "Porsche 911 GT3 RS (991.2)",
      brand: "Minichamps",
      scale: "1:12",
      lotNumber: "DG-9912",
      currentBid: "₹69,700.00",
      timeLeft: "01:22:10",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_pMqt0REkNAOmBfXPeLCkWLi_9YPbG4au62CpbQJV2olsBL-CSFrM2x_IKWbfQQ9c1Y2fxIeCpiniiPOzRxhPNEB_ie1hN4alv1UUqLiEqyozHCgJR55u6Ccot599n9owRWJKhStUDEsoXs_bleND4kgJNkLeDqbjIOZq5nNA1D_UuDn6QUqKy8R7ePjx7w2S6qrkaOXAQBoP7vtrRbnOHcRLL8IrlS3VWN5AySHoFBFvK09mH8pXaUhxi-QSpdghovbmsDlXDV_t"
    },
    {
      id: 3,
      name: "Ferrari F40 Competizione",
      brand: "BBR Models",
      scale: "1:18",
      lotNumber: "DG-F40C",
      currentBid: "₹90,200.00",
      timeLeft: "12:05:30",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEJLXoYfWVvOpTl7E7Z1qnpYBnUv1ksQtcbE8EcKSgxSv0oTAfgYMd4Rk2E_LS89bVSfKpltSr2uY4xrLUmKgNS55dUtFUzxYGsOI7Wx539Id8qeTzM2B7ZKzIVsuGeA4D3rRWf5_xczmJYw8taTr51czmm9UTwZszPP0Vn-GveA4kIqry5aZfHq-6yKY49vQ65QTQA7AZKygME04wW6VQWv516XIGuiSXlEOGT5WANtH_e-iTFXixqY3WgT7sKTVKTLpj3-ePTHUg"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop w-full max-w-7xl mx-auto bg-drift-dark min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
        {/* Decorative Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-drift-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Left Column: Spotlight */}
        <div className="lg:col-span-7 flex flex-col gap-10 animate-fade-in-up">
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-drift-surface border border-white/5 flex items-center justify-center p-12 group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60"></div>
            
            <div className="absolute top-8 left-8 z-20">
              <span className="bg-drift-accent/10 text-drift-accent border border-drift-accent/30 px-4 py-2 rounded-xl font-black text-xs flex items-center gap-2.5 tracking-[0.3em] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-drift-accent animate-pulse"></span>
                PREMIUM LOT
              </span>
            </div>
            
            <img 
              alt={spotlightAuction.name} 
              className="relative z-10 w-full max-w-[85%] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:scale-110" 
              src={spotlightAuction.image}
            />
          </div>
          
          <div className="flex flex-col gap-6 relative z-10">
            <div>
                <span className="text-xs font-black text-drift-accent uppercase tracking-[0.5em] mb-4 block">Spotlight Acquisition</span>
                <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter brand-logo mb-6 leading-none">{spotlightAuction.name}</h1>
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">{spotlightAuction.brand}</span>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">Scale {spotlightAuction.scale}</span>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">LOT {spotlightAuction.lotNumber}</span>
                </div>
            </div>
            <p className="text-gray-400 font-medium max-w-2xl text-lg leading-relaxed">{spotlightAuction.description}</p>
          </div>
        </div>

        {/* Right Column: Bidding Terminal */}
        <div className="lg:col-span-5 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="sticky top-32 bg-drift-surface border border-white/5 rounded-[40px] p-8 md:p-12 flex flex-col gap-10 shadow-2xl overflow-hidden group">
            {/* Terminal Grid Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20"></div>
            
            <div className="flex flex-col items-center relative z-10">
              <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">alarm</span>
                CRITICAL WINDOW
              </span>
              <div className="flex gap-6 items-center">
                <div className="flex flex-col items-center">
                  <span className="text-5xl md:text-6xl font-black text-white font-mono tracking-tighter">{spotlightAuction.timeLeft.split(':')[0]}</span>
                  <span className="text-[10px] font-black text-gray-600 mt-2 uppercase tracking-widest">Hours</span>
                </div>
                <span className="text-3xl text-gray-800 mb-6">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-5xl md:text-6xl font-black text-white font-mono tracking-tighter">{spotlightAuction.timeLeft.split(':')[1]}</span>
                  <span className="text-[10px] font-black text-gray-600 mt-2 uppercase tracking-widest">Mins</span>
                </div>
                <span className="text-3xl text-gray-800 mb-6">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-5xl md:text-6xl font-black text-drift-accent font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">{spotlightAuction.timeLeft.split(':')[2]}</span>
                  <span className="text-[10px] font-black text-gray-600 mt-2 uppercase tracking-widest">Secs</span>
                </div>
              </div>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-3xl p-8 relative z-10">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-3 block">High Bidder Valuation</span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl md:text-5xl font-black text-white font-mono tracking-tighter">{spotlightAuction.currentBid}</span>
                <span className="text-drift-accent text-xs font-bold animate-pulse">ACTIVE</span>
              </div>
            </div>

            <div className="flex flex-col gap-6 relative z-10">
              <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-600 group-focus-within:text-drift-accent transition-colors italic">₹</span>
                <input 
                    className="w-full bg-black/60 border border-white/5 focus:border-drift-accent rounded-2xl py-6 pl-12 pr-6 font-mono text-2xl font-black text-white transition-all outline-none placeholder:text-gray-800" 
                    placeholder="ENTER VALUATION" 
                    type="number" 
                />
              </div>
              <button className="w-full bg-white text-drift-dark font-black text-sm py-6 rounded-2xl flex justify-center items-center gap-3 hover:bg-drift-accent transition-all shadow-xl group uppercase tracking-[0.2em] active:scale-[0.98]">
                Authorize Bid 
                <span className="material-symbols-outlined text-[24px] group-hover:rotate-12 transition-transform">gavel</span>
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">verified</span>
                Verified Collector Network
            </div>
          </div>
        </div>
      </div>

      {/* Active Auctions Grid */}
      <div className="mt-32 flex flex-col gap-12 relative z-10">
        <div className="flex items-end justify-between">
            <div>
                <h2 className="text-4xl font-black text-white italic tracking-tighter brand-logo leading-none mb-2">Live Floor</h2>
                <p className="text-gray-500 font-medium">Explore active bidding sessions on the marketplace floor.</p>
            </div>
            <div className="hidden md:flex items-center gap-4 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> {activeAuctions.length} Active Sessions</span>
            </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {activeAuctions.map((auction, idx) => (
            <div key={auction.id} className="animate-fade-in-up" style={{ animationDelay: `${(idx + 4) * 0.1}s` }}>
                <AuctionCard auction={auction} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auctions;
