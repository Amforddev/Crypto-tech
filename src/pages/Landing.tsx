import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, ArrowDownRight, ArrowUpRight, Check, Star, Download, Smartphone, ShieldCheck, Zap, Lock, CreditCard, ChevronDown, Plus } from 'lucide-react';
import { Button, Card, Input, Chip } from '../components/ui';
import { Link } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import AnimatedGlyph from '../components/AnimatedGlyph';

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeInTr({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.tr>
  );
}

export default function Landing() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CryptosSection />
      <ProductsSection />
      <GiftCardsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <MobileAppSection />
      <TrustSection />
      <StatsBanner />
      <NewsSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}

function HeroSection() {
  const [tab, setTab] = useState('exchange'); // 'exchange' | 'buy/sell' | 'person'
  const [payAmount, setPayAmount] = useState('500,000');
  const [selectedAsset, setSelectedAsset] = useState('BTC'); // 'BTC' | 'ETH' | 'SOL' | 'USDT'

  // Rates relative to NGN
  const RATES: Record<string, number> = {
    BTC: 35120400,
    ETH: 2105300,
    SOL: 142500,
    USDT: 1650,
    USD: 1620
  };

  // Convert input string with commas or decimals into clean float
  const getNumericAmount = (val: string) => {
    const sanitized = val.replace(/,/g, '');
    const num = parseFloat(sanitized);
    return isNaN(num) ? 0 : num;
  };

  // Compute estimation
  let estimatedValue = '0.00';
  let rateDisplay = '';
  let badgeLabel = '₿ BTC';

  const numericPay = getNumericAmount(payAmount);

  if (tab === 'exchange') {
    // Exchange NGN to USD (rate 1620)
    const rate = RATES.USD;
    estimatedValue = (numericPay / rate).toFixed(2);
    rateDisplay = `1 USD = ₦${rate.toLocaleString()}`;
    badgeLabel = '$ USD';
  } else if (tab === 'buy/sell') {
    // Buy selected asset using NGN
    const rate = RATES[selectedAsset] || RATES.BTC;
    const decimals = selectedAsset === 'USDT' ? 2 : 5;
    estimatedValue = (numericPay / rate).toFixed(decimals);
    rateDisplay = `1 ${selectedAsset} = ₦${rate.toLocaleString()}`;
    badgeLabel = selectedAsset === 'BTC' ? '₿ BTC' : selectedAsset === 'ETH' ? 'Ξ ETH' : selectedAsset === 'SOL' ? '◎ SOL' : '₮ USDT';
  } else {
    // Person (P2P) - NGN to USDT at a premium merchant rate
    const rate = 1635; // Custom P2P matching rate
    estimatedValue = (numericPay / rate).toFixed(2);
    rateDisplay = `1 USDT (P2P) = ₦${rate.toLocaleString()}`;
    badgeLabel = '₮ USDT';
  }

  const handlePayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let clean = e.target.value.replace(/[^0-9.]/g, '');
    // Format with commas for display
    const parts = clean.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formatted = parts.join('.');
    setPayAmount(formatted || '0');
  };

  return (
    <section className="pt-24 pb-16 px-6 relative border-b border-rule overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-pill border border-rule bg-bg-elev mb-8 text-xs font-medium text-bone">
              Sign up — get 10% off your first order
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6">
              How Africa <i className="font-serif font-normal italic text-lime">moves</i><br/> money, rebuilt.
            </h1>
            <p className="text-lg text-bone mb-10 max-w-lg leading-relaxed">
              The trusted way to buy, sell, and trade crypto and gift cards. Bank-grade security with the lowest fees in Africa.
            </p>
              <div className="flex flex-wrap flex-col sm:flex-row items-center gap-4">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="h-14 w-full bg-lime text-bg-base font-bold hover:bg-lime/90">Start trading</Button>
                </Link>
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" className="h-[54px] w-full text-bone hover:text-cream transition-colors gap-2 font-medium">
                    <Play className="w-[18px] h-[18px] shrink-0 text-lime" />
                    See how it works
                  </Button>
                </Link>
              </div>
          </FadeIn>

          <FadeIn delay={0.2} className="relative z-10 lg:ml-auto w-full max-w-md">
            <Card className="p-6">
              <div className="flex items-center gap-6 border-b border-rule mb-6 pb-2">
                {['Exchange', 'Buy/Sell', 'Person'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setTab(t.toLowerCase())}
                    className={`text-sm font-medium pb-2 relative transition-colors ${tab === t.toLowerCase() ? 'text-cream' : 'text-bone hover:text-cream'}`}
                  >
                    {t}
                    {tab === t.toLowerCase() && (
                      <motion.div layoutId="herotab" className="absolute -bottom-[1px] left-0 right-0 h-0.5 bg-lime" />
                    )}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                {tab === 'buy/sell' && (
                  <div className="flex items-center justify-between bg-bg-high border border-rule/60 rounded-2 p-1.5 text-xs">
                     <span className="text-bone pl-1.5 font-medium">Select asset:</span>
                     <div className="flex gap-1.5">
                       {['BTC', 'ETH', 'SOL', 'USDT'].map(coin => (
                         <button
                           key={coin}
                           onClick={() => setSelectedAsset(coin)}
                           className={`px-2.5 py-1 rounded-1.5 font-mono font-bold transition-all ${
                             selectedAsset === coin
                               ? 'bg-lime text-bg-base'
                               : 'text-bone hover:text-cream hover:bg-rule/40'
                           }`}
                         >
                           {coin}
                         </button>
                       ))}
                     </div>
                  </div>
                )}

                <div className="bg-bg-high border border-rule rounded-2 p-3">
                  <div className="text-xs text-bone mb-1">You Pay</div>
                  <div className="flex items-center justify-between">
                    <input 
                      type="text" 
                      value={payAmount} 
                      onChange={handlePayChange}
                      className="bg-transparent text-2xl font-mono font-medium w-full focus:outline-none tabular-nums text-cream" 
                    />
                    <Chip variant="neutral" className="shrink-0 rounded-2 text-sm px-3 py-1.5 h-auto font-mono">₦ NGN</Chip>
                  </div>
                </div>

                <div className="bg-bg-high border border-rule rounded-2 p-3">
                  <div className="text-xs text-bone mb-1">You Get (Estimated)</div>
                  <div className="flex items-center justify-between">
                    <input 
                      type="text" 
                      readOnly 
                      value={estimatedValue} 
                      className="bg-transparent text-2xl font-mono font-medium w-full focus:outline-none tabular-nums text-bone" 
                    />
                    <Chip variant="neutral" className="shrink-0 rounded-2 text-sm px-3 py-1.5 h-auto font-mono">{badgeLabel}</Chip>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-stone py-2 border-b border-rule-soft pb-4">
                  <span className="font-poppins">{rateDisplay}</span>
                  <span className="text-lime font-medium">Live Syncing</span>
                </div>

                <Link to="/signup" className="block w-full">
                  <Button className="w-full h-12 text-sm font-bold bg-lime text-bg-base hover:bg-lime/90 hover:scale-[1.01] transition-transform">
                     {tab === 'buy/sell' ? `Buy ${selectedAsset} Now` : tab === 'exchange' ? 'Convert Currency Now' : 'Search P2P Offers'}
                  </Button>
                </Link>
              </div>
            </Card>
          </FadeIn>
        </div>

        <FadeIn delay={0.4} className="mt-24 pt-8 border-t border-rule grid grid-cols-2 md:grid-cols-4 gap-8 text-sm font-medium text-bone border-b border-rule-soft pb-8 md:border-b-0 md:pb-0">
          <div><div className="text-2xl font-display font-bold text-cream mb-1">2.4M+</div> Users verified</div>
          <div><div className="text-2xl font-display font-bold text-cream mb-1">₦8.2B</div> Volume traded</div>
          <div><div className="text-2xl font-display font-bold text-cream mb-1">0.10%</div> Lowest fees</div>
          <div><div className="text-2xl font-display font-bold text-cream mb-1">24/7</div> Live support</div>
        </FadeIn>
      </div>
    </section>
  );
}

const sparklineData = [10, 15, 13, 20, 18, 25, 23, 28, 25, 30];
const sparkline = sparklineData.map((v, i) => ({ val: v, name: i }));

function CryptosSection() {
  const cryptos = [
    { name: 'Bitcoin', ticker: 'BTC', price: '₦35,120,400', change: '+2.45%', isUp: true },
    { name: 'Ethereum', ticker: 'ETH', price: '₦2,105,300', change: '+1.80%', isUp: true },
    { name: 'Tether', ticker: 'USDT', price: '₦1,650.00', change: '+0.01%', isUp: true },
    { name: 'Solana', ticker: 'SOL', price: '₦142,500', change: '-4.20%', isUp: false },
    { name: 'Binance Coin', ticker: 'BNB', price: '₦985,200', change: '+1.20%', isUp: true },
    { name: 'Ripple', ticker: 'XRP', price: '₦840.50', change: '-1.05%', isUp: false },
  ];

  return (
    <section className="py-24 px-6 border-b border-rule">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12">
            The rates everyone <i className="font-serif font-normal italic text-bone">wishes</i> they had.
          </h2>
        </FadeIn>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-bone border-b border-rule">
                <th className="pb-4 font-medium pl-4 uppercase tracking-wider">Asset</th>
                <th className="pb-4 font-medium uppercase tracking-wider hidden md:table-cell">Last 24h</th>
                <th className="pb-4 font-medium uppercase tracking-wider text-right">Price (NGN)</th>
                <th className="pb-4 font-medium uppercase tracking-wider text-right">24h Change</th>
                <th className="pb-4 font-medium uppercase tracking-wider text-right pr-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {cryptos.map((coin, i) => (
                <FadeInTr key={coin.ticker} delay={i * 0.1} className="table-row group border-b border-rule hover:bg-rule-soft transition-colors cursor-pointer">
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-3">
                      <Star className="w-4 h-4 text-stone hover:text-lime transition-colors" />
                      <div className="w-8 h-8 rounded-pill bg-bg-elev border border-rule flex items-center justify-center font-bold text-xs">{coin.ticker[0]}</div>
                      <div>
                        <div className="font-medium text-cream">{coin.name}</div>
                        <div className="text-xs text-bone font-mono">{coin.ticker}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 hidden md:table-cell w-32">
                    <div className="h-8 w-24">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sparkline}>
                          <Area type="monotone" dataKey="val" stroke={coin.isUp ? 'var(--color-good)' : 'var(--color-bad)'} strokeWidth={2} fill="transparent" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="font-mono text-cream text-lg">{coin.price}</div>
                  </td>
                  <td className="py-4 text-right">
                    <Chip variant={coin.isUp ? 'success' : 'danger'} className="font-mono">{coin.change}</Chip>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to="/signup">
                        <Button variant="secondary" size="sm">Buy</Button>
                      </Link>
                      <Link to="/signup">
                        <Button variant="secondary" size="sm">Trade</Button>
                      </Link>
                    </div>
                  </td>
                </FadeInTr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  const products = [
    { title: "P2P Trading", desc: "Trade directly with verified users via bank transfer.", highlight: false },
    { title: "Instant Buy & Sell", desc: "Convert NGN to crypto instantly with zero hidden fees.", highlight: true },
    { title: "Coin-to-Coin Swap", desc: "Exchange assets seamlessly with deep liquidity.", highlight: false },
    { title: "Sell Gift Cards", desc: "Turn unused gift cards into instant Naira balance.", highlight: false },
  ];

  return (
    <section className="py-24 px-6 border-b border-rule bg-bg-elev">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Four ways to <i className="font-serif font-normal italic text-bone">move</i> money. <br/>One platform.
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1} className="h-full">
              <Link to="/signup" className="block h-full">
                <Card className={`p-8 h-full flex flex-col group hover:-translate-y-1 hover:border-lime-line transition-all duration-300 ${p.highlight ? 'bg-lime text-bg-base border-lime-deep' : 'hover:border-rule-strong'}`}>
                  <h3 className="font-display font-bold text-xl mb-3">{p.title}</h3>
                  <p className={`text-sm mb-8 leading-relaxed ${p.highlight ? 'text-bg-high' : 'text-bone'}`}>{p.desc}</p>
                  <div className="mt-auto">
                    <div className={`w-10 h-10 rounded-pill flex items-center justify-center transition-colors ${p.highlight ? 'bg-bg-base text-lime' : 'bg-rule text-cream group-hover:bg-lime group-hover:text-bg-base'}`}>
                      <ArrowRight className="w-5 h-5"/>
                    </div>
                  </div>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function GiftCardsSection() {
  const [activeCurrency, setActiveCurrency] = useState('USD');

  // Multipliers relative to USD (which is 1.0)
  const currencyMultipliers: Record<string, { multiplier: number, prefix: string }> = {
    USD: { multiplier: 1.0, prefix: '$' },
    GBP: { multiplier: 1.25, prefix: '£' },
    EUR: { multiplier: 1.08, prefix: '€' },
    CAD: { multiplier: 0.73, prefix: 'CA$' },
    AUD: { multiplier: 0.66, prefix: 'A$' },
    CHF: { multiplier: 1.11, prefix: 'CHF' },
    NZD: { multiplier: 0.61, prefix: 'NZ$' },
  };

  const baseCards = [
    { name: 'Amazon', baseRate: 1150, color: 'bg-orange-500/10 border-orange-500/20', icon: 'simple-icons:amazon', glow: 'rgba(255, 153, 0, 0.35)' },
    { name: 'iTunes / Apple', baseRate: 1020, color: 'bg-blue-500/10 border-blue-500/20', icon: 'simple-icons:apple', glow: 'rgba(255, 255, 255, 0.35)' },
    { name: 'Steam', baseRate: 1350, color: 'bg-slate-700/20 border-slate-700/40', icon: 'simple-icons:steam', glow: 'rgba(102, 192, 244, 0.35)' },
    { name: 'Google Play', baseRate: 1100, color: 'bg-green-500/10 border-green-500/20', icon: 'simple-icons:googleplay', glow: 'rgba(52, 211, 153, 0.35)' },
    { name: 'eBay', baseRate: 1050, color: 'bg-red-500/10 border-red-500/20', icon: 'simple-icons:ebay', glow: 'rgba(229, 50, 56, 0.35)' },
    { name: 'Walmart', baseRate: 1120, color: 'bg-blue-600/10 border-blue-600/20', icon: 'simple-icons:walmart', glow: 'rgba(255, 194, 32, 0.35)' },
    { name: 'Target', baseRate: 1080, color: 'bg-red-600/10 border-red-600/20', icon: 'simple-icons:target', glow: 'rgba(239, 68, 68, 0.35)' },
    { name: 'Best Buy', baseRate: 1140, color: 'bg-yellow-500/10 border-yellow-500/20', icon: 'simple-icons:bestbuy', glow: 'rgba(234, 179, 8, 0.35)' },
    { name: 'Sephora', baseRate: 1200, color: 'bg-pink-500/10 border-pink-500/20', icon: 'simple-icons:sephora', glow: 'rgba(244, 114, 182, 0.35)' },
    { name: 'Nordstrom', baseRate: 1090, color: 'bg-stone-500/10 border-stone-500/20', icon: 'solar:bag-5-bold', glow: 'rgba(214, 211, 209, 0.25)' },
    { name: 'Macy\'s', baseRate: 950, color: 'bg-red-800/10 border-red-800/20', icon: 'solar:bag-4-bold', glow: 'rgba(239, 68, 68, 0.25)' },
    { name: 'Nike', baseRate: 1000, color: 'bg-zinc-500/10 border-zinc-500/20', icon: 'simple-icons:nike', glow: 'rgba(251, 146, 60, 0.35)' },
  ];

  const currentCurrency = currencyMultipliers[activeCurrency] || { multiplier: 1.0, prefix: '$' };

  const cards = baseCards.map(c => {
    const rateVal = Math.round(c.baseRate * currentCurrency.multiplier);
    return {
      name: c.name,
      rate: `₦${rateVal.toLocaleString()} / ${currentCurrency.prefix}`,
      color: c.color,
      icon: c.icon,
      glow: c.glow
    };
  });

  return (
    <section className="py-24 px-6 border-b border-rule overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Cards, cashed.<br/>Live rates. <i className="font-serif font-normal italic text-bone">Live humans.</i>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} className="flex gap-2 bg-bg-elev p-1 rounded-pill border border-rule overflow-x-auto w-full md:w-auto snap-x hide-scrollbar">
            {['USD', 'GBP', 'EUR', 'CAD', 'AUD', 'CHF', 'NZD'].map((c) => (
              <button 
                key={c} 
                onClick={() => setActiveCurrency(c)}
                className={`px-4 py-2 rounded-pill text-sm font-semibold transition-all shrink-0 snap-start ${
                  activeCurrency === c 
                    ? 'bg-lime text-bg-base font-bold shadow-sm' 
                    : 'text-bone hover:text-cream hover:bg-rule/40'
                }`}
              >
                {c}
              </button>
            ))}
          </FadeIn>
        </div>

        <div className="w-full relative group">
           <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 hide-scrollbar">
             {cards.map((c, i) => (
               <FadeIn key={c.name} delay={i * 0.05} className="shrink-0 w-64 snap-start">
                 <Link to="/signup" className="block">
                   <div className={`p-5 rounded-3 border ${c.color} h-38 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer hover:border-lime-line/50 bg-bg-elev/40`}>
                     <div className="flex items-center justify-between">
                       <div className="font-display font-bold text-cream text-lg">{c.name}</div>
                       <AnimatedGlyph icon={c.icon} size={22} glow glowColor={c.glow} variant="float" />
                     </div>
                     <div className="font-poppins text-sm font-bold text-lime">{c.rate}</div>
                   </div>
                 </Link>
               </FadeIn>
             ))}
           </div>
        </div>

        <FadeIn delay={0.4} className="grid md:grid-cols-3 gap-8 pt-16 border-t border-rule-soft">
          <div>
            <div className="text-lime font-poppins font-bold mb-4 bg-lime-tint inline-block px-3 py-1 rounded-pill">01</div>
            <h4 className="font-display font-bold text-xl mb-2 text-cream">Pick a card</h4>
            <p className="text-bone text-sm leading-relaxed">Select the brand, currency, and card type. See the live exchange rate upfront.</p>
          </div>
          <div>
            <div className="text-lime font-poppins font-bold mb-4 bg-lime-tint inline-block px-3 py-1 rounded-pill">02</div>
            <h4 className="font-display font-bold text-xl mb-2 text-cream">Upload photo + code</h4>
            <p className="text-bone text-sm leading-relaxed">Snap a clear picture of the physical card and receipt, or paste the e-code.</p>
          </div>
          <div>
            <div className="text-lime font-poppins font-bold mb-4 bg-lime-tint inline-block px-3 py-1 rounded-pill">03</div>
            <h4 className="font-display font-bold text-xl mb-2 text-cream">Paid in 5 mins</h4>
            <p className="text-bone text-sm leading-relaxed">Our human verification team checks the card and credits your NGN balance instantly.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const [tab, setTab] = useState('buy');

  const tabs = [
    { label: 'Buy Crypto', id: 'buy' },
    { label: 'Sell Crypto', id: 'sell' },
    { label: 'Trade P2P', id: 'p2p' },
    { label: 'Sell Gift Card', id: 'gift' }
  ];

  const STEPS_CONTENT: Record<string, { title: string, desc: string }[]> = {
    buy: [
      { title: "Open a free account", desc: "Sign up with your email and phone number in seconds." },
      { title: "Verify identity", desc: "Complete a quick KYC check with biometric verification to unlock high limits." },
      { title: "Fund your wallet", desc: "Deposit cash balance via instant bank transfer, card, or local mobile money." },
      { title: "Buy crypto in one tap", desc: "Convert NGN directly to BTC, ETH or stablecoins instantly with zero hidden fees." }
    ],
    sell: [
      { title: "Deposit your coins", desc: "Send crypto from any external platform directly to your protected Voltex deposit address." },
      { title: "Input cash-out amount", desc: "Specify the exact crypto portion you want to sell for premium local Naira." },
      { title: "Automatic conversion", desc: "Our live trading engine instantly sells your coins at top tier rates." },
      { title: "Receive fast bank transfer", desc: "Enjoy automated payments delivered directly to your verified local financial institution." }
    ],
    p2p: [
      { title: "Browse vetted merchants", desc: "Check live buy and sell orders from hundreds of highly-rated verified peer traders." },
      { title: "Lock assets in secure escrow", desc: "Specify your trade. The Voltex master contract locks the seller's crypto safely." },
      { title: "Direct bank transfer", desc: "Send payment to the vendor's bank account and click 'I have paid'." },
      { title: "Asset released to app", desc: "Escrow unlocks instantly as soon as payment clearing is completed. Seamless safety." }
    ],
    gift: [
      { title: "Select card brand & region", desc: "Choose from Amazon, Apple, Google, Walmart, Sephora, Nordstrom & many more." },
      { title: "Upload visual evidence", desc: "Add card pin scratch, full physical card photos, clear buyer store receipt or e-voucher." },
      { title: "Rapid human review", desc: "Voltex desk personnel verify the balance on live developer ledgers in under 4 minutes." },
      { title: "Naira cash payout", desc: "Convert balance immediately to spendable NGN and withdraw instantly." }
    ]
  };

  const activeSteps = STEPS_CONTENT[tab] || STEPS_CONTENT.buy;

  return (
    <section className="py-24 px-6 border-b border-rule bg-bg-elev">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Five minutes from <i className="font-serif font-normal italic text-bone">curious</i> to trading.
          </h2>
        </FadeIn>

        <Card className="max-w-4xl mx-auto flex flex-col md:flex-row overflow-hidden border-rule-strong p-0">
          <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-rule bg-bg-high p-4 flex flex-row md:flex-col gap-2 overflow-x-auto">
            {tabs.map((t) => {
              return (
                <button 
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`text-left px-4 py-4 rounded-2 text-sm font-bold transition-all whitespace-nowrap ${
                    tab === t.id 
                      ? 'bg-rule text-lime border-l-2 border-lime pl-3 md:pl-4 shadow-sm' 
                      : 'text-bone hover:text-cream hover:bg-rule-soft'
                  }`}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
          <div className="p-8 md:p-12 md:w-2/3 flex flex-col justify-between">
            <div className="space-y-10">
               {activeSteps.map((step, idx) => (
                 <motion.div 
                   key={`${tab}-${idx}`}
                   initial={{ opacity: 0, x: 10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.3, delay: idx * 0.05 }}
                   className="flex gap-6"
                 >
                   <div className="shrink-0 w-8 h-8 rounded-pill bg-lime/10 text-lime font-mono text-sm flex items-center justify-center font-bold border border-lime-line">
                     {idx + 1}
                   </div>
                   <div>
                     <h4 className="font-display font-bold text-xl mb-1">{step.title}</h4>
                     <p className="text-bone text-sm leading-relaxed">{step.desc}</p>
                   </div>
                 </motion.div>
               ))}
            </div>

            <div className="mt-12 pt-6 border-t border-rule/50 flex flex-col sm:flex-row items-center justify-between gap-4">
               <span className="text-xs text-bone">Ready to begin? Setup is completely free.</span>
               <Link to="/signup" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-lime hover:bg-lime/90 font-bold text-bg-base text-xs h-9 px-4 rounded-pill">
                     Try "{tabs.find(x => x.id === tab)?.label}" Now
                  </Button>
               </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: <ShieldCheck className="w-5 h-5"/>, title: "Bank-grade security", desc: "Cold storage for 98% of funds, regular audits, and mandatory 2FA." },
    { icon: <ArrowDownRight className="w-5 h-5"/>, title: "Lowest fees in Africa", desc: "Trade with a flat 0.10% fee and the tightest spreads in the market." },
    { icon: <Smartphone className="w-5 h-5"/>, title: "Humans on chat", desc: "No frustrating bots. Get 24/7 support from real experts who care." },
    { icon: <Zap className="w-5 h-5"/>, title: "Instant settlements", desc: "Withdrawals process in under 5 minutes, straight to your local bank." },
    { icon: <CreditCard className="w-5 h-5"/>, title: "50+ payment rails", desc: "Bank transfers, mobile money, and card payments supported natively." },
    { icon: <Download className="w-5 h-5"/>, title: "iOS & Android", desc: "A world-class mobile experience, designed for trading on the go." },
  ];

  return (
    <section className="py-24 px-6 border-b border-rule">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            The little things <i className="font-serif font-normal italic text-bone">add up.</i>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <FadeIn key={i} delay={i * 0.1} className="flex gap-5">
              <div className="shrink-0 w-12 h-12 rounded-2 bg-bg-elev border border-rule flex items-center justify-center text-lime shadow-sm">
                {f.icon}
              </div>
              <div>
                <h4 className="font-bold text-cream mb-2 font-display text-lg">{f.title}</h4>
                <p className="text-sm text-bone leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileAppSection() {
  return (
    <section className="py-32 px-6 border-b border-rule overflow-hidden bg-bg-elev">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <FadeIn className="z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
            Pocket-sized.<br/><i className="font-serif font-normal italic text-lime">Fully featured.</i>
          </h2>
          <p className="text-lg text-bone mb-10 max-w-md leading-relaxed">
            Manage your portfolio, trade instantly, and connect with P2P merchants faster with the Voltex mobile experience.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="secondary" className="h-14 px-6 gap-3 border-rule-strong bg-bg-base hover:border-lime-line">
              <Download className="w-5 h-5"/> 
              <div className="text-left flex flex-col">
                <span className="text-[10px] leading-tight text-bone">Download on the</span>
                <span className="text-sm font-bold leading-tight text-cream">App Store</span>
              </div>
            </Button>
            <Button variant="secondary" className="h-14 px-6 gap-3 border-rule-strong bg-bg-base hover:border-lime-line">
              <Smartphone className="w-5 h-5"/> 
              <div className="text-left flex flex-col">
                <span className="text-[10px] leading-tight text-bone">Get it on</span>
                <span className="text-sm font-bold leading-tight text-cream">Google Play</span>
              </div>
            </Button>
          </div>
        </FadeIn>
        
        <div className="relative h-[600px] hidden lg:block perspective-[1000px]">
          {/* Mockup 1 */}
          <div className="absolute right-[10%] top-10 w-[280px] h-[580px] rounded-[40px] border-[8px] border-black bg-bg-base rotate-[6deg] transform-gpu translate-z-[100px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-4 flex flex-col">
             <div className="w-full flex justify-between items-center mb-6 pt-4">
                <div className="w-24 h-5 bg-rule rounded-pill" />
                <div className="w-8 h-8 rounded-pill bg-lime/20 border border-lime/30" />
             </div>
             <div className="w-full h-32 bg-bg-elev border border-rule-soft rounded-3 mb-4" />
             <div className="space-y-3">
               {[1,2,3,4].map(i => <div key={i} className="w-full h-16 bg-bg-paper border border-rule-soft rounded-2" />)}
             </div>
          </div>
          {/* Mockup 2 */}
          <div className="absolute right-[40%] top-24 w-[280px] h-[580px] rounded-[40px] border-[8px] border-black bg-bg-paper -rotate-[4deg] transform-gpu -translate-z-[50px] shadow-xl overflow-hidden p-4 flex flex-col opacity-90 border-t-rule border-l-rule">
             <div className="flex-1 rounded-3 border border-rule mt-12 bg-bg-elev flex flex-col p-4 justify-center items-center">
                 <div className="w-24 h-24 rounded-full bg-lime/20 border-2 border-lime mb-6 flex items-center justify-center">
                   <div className="w-16 h-16 rounded-full bg-lime/40 animate-[pulse_2s_ease-in-out_infinite]"/>
                 </div>
                 <div className="h-4 w-3/4 bg-rule rounded-pill mb-3" />
                 <div className="h-4 w-1/2 bg-rule-soft rounded-pill" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="py-24 px-6 border-b border-rule text-center flex flex-col items-center">
      <FadeIn className="max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Your funds are never where they shouldn't be.</h2>
        <p className="text-bone mb-12 text-lg">We hold 98% of customer assets in multi-signature cold storage. We are SOC 2 Type II compliant and maintain 99.99% uptime.</p>
        <div className="flex flex-wrap justify-center gap-8">
           <div className="flex flex-col items-center">
             <div className="text-3xl font-display font-bold text-cream mb-1">98%</div>
             <div className="text-sm text-bone">Cold Storage</div>
           </div>
           <div className="w-px bg-rule hidden sm:block"></div>
           <div className="flex flex-col items-center">
             <div className="text-3xl font-display font-bold text-cream mb-1">SOC 2</div>
             <div className="text-sm text-bone">Type II Certified</div>
           </div>
           <div className="w-px bg-rule hidden sm:block"></div>
           <div className="flex flex-col items-center">
             <div className="text-3xl font-display font-bold text-cream mb-1">99.99%</div>
             <div className="text-sm text-bone">System Uptime</div>
           </div>
        </div>
      </FadeIn>
    </section>
  )
}

function StatsBanner() {
  return (
    <section className="bg-lime py-20 px-6 text-bg-base border-b border-lime-deep">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <h2 className="text-4xl md:text-5xl font-display font-bold shrink-0">
          The math <br/><i className="font-serif font-normal italic">checks out.</i>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl border-t border-bg-base/10 pt-8 lg:border-t-0 lg:pt-0">
           <div className="text-center lg:text-left">
             <div className="text-4xl font-display font-bold mb-1">2.4M+</div>
             <div className="text-sm font-bold opacity-80 uppercase tracking-wide">Users</div>
           </div>
           <div className="text-center lg:text-left">
             <div className="text-4xl font-display font-bold mb-1">₦8.2B</div>
             <div className="text-sm font-bold opacity-80 uppercase tracking-wide">Volume</div>
           </div>
           <div className="text-center lg:text-left">
             <div className="text-4xl font-display font-bold mb-1">14</div>
             <div className="text-sm font-bold opacity-80 uppercase tracking-wide">Countries</div>
           </div>
           <div className="text-center lg:text-left">
             <div className="text-4xl font-display font-bold mb-1">9</div>
             <div className="text-sm font-bold opacity-80 uppercase tracking-wide">Years</div>
           </div>
        </div>
      </div>
    </section>
  )
}

function NewsSection() {
  return (
    <section className="py-24 px-6 border-b border-rule">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
           <h2 className="text-3xl font-display font-bold mb-12">Latest News</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Voltex expands P2P marketplace to Kenya and Ghana", cat: "Product", date: "October 12, 2026" },
            { title: "Understanding the new regulatory framework in Nigeria", cat: "Compliance", date: "September 28, 2026" },
            { title: "How to safely trade gift cards without getting scammed", cat: "Guide", date: "September 15, 2026" },
          ].map((n, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <Card className="group cursor-pointer hover:border-rule-strong p-0 overflow-hidden flex flex-col h-full border-rule">
                <div className="h-48 bg-bg-elev overflow-hidden relative border-b border-rule">
                  <div className="absolute inset-0 bg-gradient-to-tr from-rule-strong to-transparent group-hover:scale-105 transition-transform duration-500"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4"><Chip variant="neutral">{n.cat}</Chip></div>
                  <h3 className="font-display font-bold text-xl mb-4 group-hover:text-lime transition-colors">{n.title}</h3>
                  <div className="text-sm text-bone mt-auto font-mono">{n.date}</div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  return (
    <section className="py-24 px-6 border-b border-rule bg-bg-elev">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
           <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">Frequently asked questions</h2>
        </FadeIn>
        <div className="space-y-3">
          {['How long do withdrawals take?', 'Are my funds secure?', 'What are your exchange fees?', 'Which gift cards do you accept?', 'Do I need to verify my identity to trade?'].map((q, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="border border-rule bg-bg-paper p-5 rounded-2 flex justify-between items-center cursor-pointer hover:border-rule-strong transition-colors hover:bg-bg-elev">
                <span className="font-medium text-cream">{q}</span>
                <Plus className="w-5 h-5 text-bone" />
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="mt-12 text-center text-bone">
           Still have questions? <Link to="/help" className="text-cream hover:text-lime underline underline-offset-4 decoration-rule-strong transition-colors">Contact support</Link>
        </div>
      </div>
    </section>
  )
}

function FinalCTASection() {
  return (
    <section className="py-32 px-6 text-center bg-bg-base relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-tint rounded-full blur-[120px] opacity-20"></div>
      </div>
      <FadeIn className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">Start trading in under 2 minutes.</h2>
        <Link to="/signup">
          <Button size="lg" className="h-14 px-10 text-lg">Create free account</Button>
        </Link>
      </FadeIn>
    </section>
  )
}
