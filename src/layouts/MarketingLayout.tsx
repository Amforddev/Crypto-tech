import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Button } from '../components/ui';

export function MarketingLayout() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Ticker Bar Placeholder */}
      <div className="h-10 bg-lime text-bg-base flex items-center overflow-hidden border-b border-rule font-mono text-sm whitespace-nowrap">
        <div className="animate-[marquee_20s_linear_infinite] inline-block px-4 font-semibold w-full text-center">
          BTC ₦35,120,400 <span className="text-lime-deep">▲ 2.4%</span> &nbsp;&nbsp;&nbsp;&nbsp; 
          ETH ₦2,105,300 <span className="text-lime-deep">▲ 1.8%</span> &nbsp;&nbsp;&nbsp;&nbsp;
          SOL ₦142,500 <span className="text-bad">▼ 4.2%</span> &nbsp;&nbsp;&nbsp;&nbsp;
          USDT ₦1,650.00 <span className="text-lime-deep">▲ 0.1%</span>
        </div>
      </div>

      <nav className={`sticky top-0 z-50 px-6 py-4 transition-colors duration-200 ${scrolled ? 'bg-bg-base border-b border-rule' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-display font-bold text-cream tracking-tight">Voltex.</Link>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-bone">
            <Link to="/features" className="hover:text-lime transition-colors">Products</Link>
            <Link to="/app/trade" className="hover:text-lime transition-colors">Exchange</Link>
            <Link to="/app/wallet" className="hover:text-lime transition-colors">Wallet</Link>
            <Link to="/features" className="hover:text-lime transition-colors">Features</Link>
            <Link to="/help" className="hover:text-lime transition-colors">Help</Link>
          </div>
          <div className="flex flex-row items-center space-x-4">
             <Link to="/login" className="text-sm font-medium text-bone hover:text-cream">Sign in</Link>
             <Link to="/signup">
                <Button>Open account</Button>
             </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-bg-paper border-t border-rule py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
           <div>
              <h4 className="font-bold text-cream mb-4 font-display">Products</h4>
              <ul className="space-y-2 text-sm text-bone">
                 <li><Link to="/app/trade" className="hover:text-lime">Exchange</Link></li>
                 <li><Link to="/app/p2p" className="hover:text-lime">P2P Trading</Link></li>
                 <li><Link to="/app/gift-cards" className="hover:text-lime">Gift Cards</Link></li>
                 <li><Link to="/app/wallet" className="hover:text-lime">Wallet</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="font-bold text-cream mb-4 font-display">Company</h4>
              <ul className="space-y-2 text-sm text-bone">
                 <li><Link to="/about" className="hover:text-lime">About Us</Link></li>
                 <li><Link to="/features" className="hover:text-lime">Features</Link></li>
                 <li><Link to="/help" className="hover:text-lime">Help Center</Link></li>
                 <li><Link to="/blog" className="hover:text-lime">Blog</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="font-bold text-cream mb-4 font-display">Legal</h4>
              <ul className="space-y-2 text-sm text-bone">
                 <li><Link to="/help" className="hover:text-lime">Terms of Service</Link></li>
                 <li><Link to="/help" className="hover:text-lime">Privacy Policy</Link></li>
                 <li><Link to="/help" className="hover:text-lime">AML Policy</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="font-bold text-cream mb-4 font-display">Connect</h4>
              <ul className="space-y-2 text-sm text-bone">
                 <li><Link to="/help" className="hover:text-lime">Support</Link></li>
                 <li><Link to="/help" className="hover:text-lime">Twitter</Link></li>
                 <li><Link to="/help" className="hover:text-lime">Telegram</Link></li>
              </ul>
           </div>
        </div>
      </footer>
    </div>
  );
}
