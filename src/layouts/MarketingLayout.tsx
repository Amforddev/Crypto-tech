import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Button } from '../components/ui';

const INITIAL_CRYPTOS = [
  { id: 'BTC', price: 35120400, change: 2.4, isUp: true },
  { id: 'ETH', price: 2105300, change: 1.8, isUp: true },
  { id: 'SOL', price: 142500, change: -4.2, isUp: false },
  { id: 'USDT', price: 1650.00, change: 0.1, isUp: true },
  { id: 'BNB', price: 520400, change: -1.2, isUp: false },
  { id: 'XRP', price: 840.50, change: 0.5, isUp: true },
  { id: 'ADA', price: 580.20, change: -2.1, isUp: false },
  { id: 'DOGE', price: 185.40, change: 5.5, isUp: true },
  { id: 'LINK', price: 21400, change: 5.1, isUp: true },
  { id: 'DOT', price: 9800, change: -1.5, isUp: false }
];

export function MarketingLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [cryptos, setCryptos] = useState(INITIAL_CRYPTOS);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=USD');
        const json = await response.json();
        if (json && json.data && json.data.rates) {
          const r = json.data.rates;
          const ngnRate = parseFloat(r['NGN']) || 1650;
          
          setCryptos(prev => prev.map(item => {
            const cryptoRate = r[item.id];
            if (cryptoRate) {
              const priceUSD = 1 / parseFloat(cryptoRate);
              const priceNGN = priceUSD * ngnRate;
              const simulatedChange = (Math.random() * 8) - 4; // -4% to +4%
              return {
                ...item,
                price: priceNGN,
                change: parseFloat(simulatedChange.toFixed(2)),
                isUp: simulatedChange >= 0
              };
            }
            return item;
          }));
        }
      } catch (e) {
        console.warn("Could not fetch real-time rates from Coinbase API, using active simulated feeds:", e);
      }
    };

    fetchPrices();
    const apiInterval = setInterval(fetchPrices, 40000); 
    
    // Live tick micro fluctuations for realism
    const liveInterval = setInterval(() => {
      setCryptos(prev => prev.map(item => {
        const pct = 1 + ((Math.random() * 0.0006) - 0.0003);
        return {
          ...item,
          price: item.price * pct
        };
      }));
    }, 4000);

    return () => {
      clearInterval(apiInterval);
      clearInterval(liveInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Ticker Bar Placeholder */}
      <div className="h-[46px] bg-lime text-bg-base flex items-center overflow-hidden border-b border-rule font-mono text-xs sm:text-sm whitespace-nowrap">
        <div className="flex w-max animate-marquee">
          {Array(2).fill(0).map((_, i) => (
            <div key={i} className="flex px-4 gap-8 font-semibold">
              {cryptos.map(item => (
                <span key={item.id} className="flex items-center gap-1.5">
                  {item.id} ₦{item.price.toLocaleString(undefined, { maximumFractionDigits: item.price < 500 ? 2 : 0 })}
                  <span className={`mix-blend-multiply flex items-center font-bold ${item.isUp ? 'text-[#1D6F42]' : 'text-[#A12B2B]'}`}>
                    {item.isUp ? '▲' : '▼'} {Math.abs(item.change)}%
                  </span>
                </span>
              ))}
            </div>
          ))}
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
