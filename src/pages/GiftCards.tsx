import React, { useState } from 'react';
import { Card, Button, Input, Chip, Label } from '../components/ui';
import { Search, Gift, ChevronRight, ArrowRight, ShieldCheck, AlertCircle, Check, Sparkles } from 'lucide-react';
import { Icon } from '@iconify/react';
import { motion } from 'motion/react';
import AnimatedGlyph from '../components/AnimatedGlyph';

interface GiftCardBrand {
  id: string;
  name: string;
  category: 'shopping' | 'gaming' | 'tech' | 'lifestyle';
  rate: string;
  numericRate: number;
  time: string;
  icon: string;
  badgeColor: string;
  accentColor: string;
  glowColor: string;
}

const POPULAR_CARDS: GiftCardBrand[] = [
  {
    id: '1',
    name: 'Amazon US',
    category: 'shopping',
    rate: '₦1,150/$',
    numericRate: 1150,
    time: '1-5 mins',
    icon: 'simple-icons:amazon',
    badgeColor: 'bg-amber-500/15 border-amber-500/30 text-[#FF9900]',
    accentColor: 'from-[#FF9900]/20 to-transparent',
    glowColor: 'rgba(255, 153, 0, 0.35)',
  },
  {
    id: '2',
    name: 'Apple / iTunes (US)',
    category: 'tech',
    rate: '₦1,050/$',
    numericRate: 1050,
    time: '5-15 mins',
    icon: 'simple-icons:apple',
    badgeColor: 'bg-zinc-800 border-zinc-700 text-cream',
    accentColor: 'from-white/10 to-transparent',
    glowColor: 'rgba(245, 241, 232, 0.3)',
  },
  {
    id: '3',
    name: 'Steam Wallet',
    category: 'gaming',
    rate: '₦1,120/$',
    numericRate: 1120,
    time: '1-5 mins',
    icon: 'simple-icons:steam',
    badgeColor: 'bg-[#1b2838] border-[#66c0f4]/40 text-[#66c0f4]',
    accentColor: 'from-[#66c0f4]/20 to-transparent',
    glowColor: 'rgba(102, 192, 244, 0.35)',
  },
  {
    id: '4',
    name: 'Google Play (US)',
    category: 'tech',
    rate: '₦980/$',
    numericRate: 980,
    time: '5-30 mins',
    icon: 'simple-icons:googleplay',
    badgeColor: 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400',
    accentColor: 'from-emerald-500/20 to-transparent',
    glowColor: 'rgba(52, 211, 153, 0.35)',
  },
  {
    id: '5',
    name: 'Sephora',
    category: 'lifestyle',
    rate: '₦1,000/$',
    numericRate: 1000,
    time: '10-45 mins',
    icon: 'simple-icons:sephora',
    badgeColor: 'bg-rose-950/40 border-rose-500/40 text-rose-400',
    accentColor: 'from-rose-500/20 to-transparent',
    glowColor: 'rgba(251, 113, 133, 0.35)',
  },
  {
    id: '6',
    name: 'Nordstrom',
    category: 'shopping',
    rate: '₦1,020/$',
    numericRate: 1020,
    time: '5-30 mins',
    icon: 'solar:bag-5-bold',
    badgeColor: 'bg-stone-900 border-stone-700 text-stone-200',
    accentColor: 'from-stone-500/20 to-transparent',
    glowColor: 'rgba(214, 211, 209, 0.25)',
  },
  {
    id: '7',
    name: 'PlayStation Network',
    category: 'gaming',
    rate: '₦1,080/$',
    numericRate: 1080,
    time: '5-15 mins',
    icon: 'simple-icons:playstation',
    badgeColor: 'bg-blue-950/50 border-blue-500/40 text-blue-400',
    accentColor: 'from-blue-600/20 to-transparent',
    glowColor: 'rgba(59, 130, 246, 0.35)',
  },
  {
    id: '8',
    name: 'Xbox Live',
    category: 'gaming',
    rate: '₦1,060/$',
    numericRate: 1060,
    time: '5-15 mins',
    icon: 'simple-icons:xbox',
    badgeColor: 'bg-green-950/50 border-green-500/40 text-green-400',
    accentColor: 'from-green-600/20 to-transparent',
    glowColor: 'rgba(34, 197, 94, 0.35)',
  },
  {
    id: '9',
    name: 'Razer Gold',
    category: 'gaming',
    rate: '₦1,180/$',
    numericRate: 1180,
    time: '2-8 mins',
    icon: 'simple-icons:razer',
    badgeColor: 'bg-lime/10 border-lime/30 text-lime',
    accentColor: 'from-lime/20 to-transparent',
    glowColor: 'rgba(214, 255, 63, 0.35)',
  },
  {
    id: '10',
    name: 'Walmart',
    category: 'shopping',
    rate: '₦1,120/$',
    numericRate: 1120,
    time: '5-20 mins',
    icon: 'simple-icons:walmart',
    badgeColor: 'bg-blue-900/30 border-blue-400/40 text-[#ffc220]',
    accentColor: 'from-amber-400/20 to-transparent',
    glowColor: 'rgba(255, 194, 32, 0.35)',
  },
  {
    id: '11',
    name: 'Nike Store',
    category: 'lifestyle',
    rate: '₦1,010/$',
    numericRate: 1010,
    time: '10-30 mins',
    icon: 'simple-icons:nike',
    badgeColor: 'bg-zinc-900 border-zinc-700 text-orange-400',
    accentColor: 'from-orange-500/20 to-transparent',
    glowColor: 'rgba(251, 146, 60, 0.35)',
  },
  {
    id: '12',
    name: 'eBay Global',
    category: 'shopping',
    rate: '₦1,050/$',
    numericRate: 1050,
    time: '5-25 mins',
    icon: 'simple-icons:ebay',
    badgeColor: 'bg-red-950/30 border-red-500/30 text-[#e53238]',
    accentColor: 'from-red-500/20 to-transparent',
    glowColor: 'rgba(229, 50, 56, 0.35)',
  },
];

export default function GiftCards() {
  const [activeCard, setActiveCard] = useState<GiftCardBrand | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'shopping' | 'gaming' | 'tech' | 'lifestyle'>('all');

  const filteredCards = POPULAR_CARDS.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || card.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (activeCard) {
    return <SellGiftCard flow={activeCard} onBack={() => setActiveCard(null)} />;
  }

  return (
    <div className="max-w-7xl mx-auto pb-24 lg:pb-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-display font-bold text-cream">Gift Cards</h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-pill bg-lime/10 text-lime border border-lime/30">
              Verified Rates
            </span>
          </div>
          <p className="text-bone text-sm">Sell your unused gift cards for instant Naira or Crypto.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="secondary" className="flex-1 sm:flex-none">My Trades</Button>
          <Button className="flex-1 sm:flex-none flex items-center gap-2">
            <AnimatedGlyph icon="solar:gift-bold" size={16} /> Buy Cards
          </Button>
        </div>
      </div>

      {/* Hero Promo Banner with Animated 3D Cards */}
      <div className="bg-gradient-to-r from-bg-elev via-bg-high to-bg-elev border border-lime/30 rounded-3 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-lime/15 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="flex-1 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-lime-tint border border-lime/40 text-xs font-semibold text-lime">
            <AnimatedGlyph icon="solar:fire-bold" size={14} variant="pulse" />
            Weekend Special Flash Rate
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-cream leading-tight">
            Trade Apple & Amazon Gift Cards up to <span className="text-lime font-poppins font-bold">₦1,150/$</span>
          </h2>
          <p className="text-bone text-sm max-w-lg leading-relaxed">
            Fast liquidation with automated rate protection. Physical cards and digital e-codes credited directly to your bank account or wallet.
          </p>
          <div className="pt-2">
            <Button
              className="bg-lime text-bg-base hover:bg-lime-soft font-bold px-6 h-12 shadow-[0_4px_16px_rgba(214,255,63,0.25)]"
              onClick={() => setActiveCard(POPULAR_CARDS[0])}
            >
              Trade Now at Peak Rate
            </Button>
          </div>
        </div>

        {/* Animated 3D Card Stack with Iconify Glyphs */}
        <div className="relative z-10 w-full md:w-80 h-44 flex items-center justify-center shrink-0">
          {/* Card 1: Apple Card */}
          <motion.div
            animate={{
              y: [0, -6, 0],
              rotate: [-10, -8, -10],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-44 h-28 bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-2 border border-white/20 p-3 shadow-2xl flex flex-col justify-between absolute left-4 top-2 cursor-pointer hover:border-lime transition-colors"
          >
            <div className="flex justify-between items-center">
              <AnimatedGlyph
                icon="simple-icons:apple"
                size={22}
                iconClassName="text-cream"
                glow
                glowColor="rgba(255, 255, 255, 0.4)"
                variant="float"
              />
              <span className="font-poppins font-semibold text-[11px] text-bone tracking-widest">$100</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-stone">
              <span>Apple Store</span>
              <span className="text-lime font-poppins font-bold text-xs">₦1,050/$</span>
            </div>
          </motion.div>

          {/* Card 2: Amazon Card (overlapping) */}
          <motion.div
            animate={{
              y: [0, 6, 0],
              rotate: [8, 11, 8],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-44 h-28 bg-gradient-to-br from-[#1E1B15] to-[#12100C] rounded-2 border border-[#FF9900]/40 p-3 shadow-2xl flex flex-col justify-between absolute right-4 bottom-2 cursor-pointer hover:border-lime transition-colors"
          >
            <div className="flex justify-between items-center">
              <AnimatedGlyph
                icon="simple-icons:amazon"
                size={22}
                iconClassName="text-[#FF9900]"
                glow
                glowColor="rgba(255, 153, 0, 0.4)"
                variant="pulse"
              />
              <span className="font-poppins font-semibold text-[11px] text-[#FF9900] tracking-widest">$200</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-stone">
              <span>Amazon US</span>
              <span className="text-lime font-poppins font-bold text-xs">₦1,150/$</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Brands Section */}
      <Card className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="font-display font-bold text-lg text-cream">Select a Brand to Sell</h3>
            <p className="text-xs text-bone mt-0.5">Click any card to calculate real-time payout value</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Category tabs */}
            <div className="flex items-center p-1 bg-bg-base border border-rule rounded-2 overflow-x-auto hide-scrollbar">
              {(['all', 'shopping', 'gaming', 'tech', 'lifestyle'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-1 capitalize transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-lime text-bg-base font-bold shadow-sm'
                      : 'text-bone hover:text-cream'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-bone pointer-events-none" />
              <Input
                type="text"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 w-full"
              />
            </div>
          </div>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map((card) => (
            <motion.button
              key={card.id}
              onClick={() => setActiveCard(card)}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex items-center gap-4 p-4 rounded-3 border border-rule bg-bg-elev hover:border-lime/50 hover:bg-bg-high transition-all text-left group relative overflow-hidden"
            >
              {/* Subtle gradient shimmer on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${card.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

              {/* Animated Glyph Icon Container */}
              <div className={`w-13 h-13 rounded-2 flex items-center justify-center shrink-0 border relative z-10 ${card.badgeColor}`}>
                <AnimatedGlyph
                  icon={card.icon}
                  size={24}
                  glow
                  glowColor={card.glowColor}
                  variant="float"
                />
              </div>

              {/* Content - with Poppins numbers and NO dots in front of text */}
              <div className="flex-1 min-w-0 relative z-10">
                <div className="font-bold text-cream truncate group-hover:text-lime transition-colors">
                  {card.name}
                </div>
                <div className="text-xs text-bone flex items-center gap-3 mt-1 font-poppins">
                  <span className="text-lime font-bold">{card.rate}</span>
                  <span className="text-stone">{card.time}</span>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-bone group-hover:text-lime transition-colors opacity-50 group-hover:opacity-100 shrink-0 relative z-10 group-hover:translate-x-0.5" />
            </motion.button>
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="py-12 text-center text-bone space-y-2">
            <AnimatedGlyph icon="solar:magnifer-broken" size={32} iconClassName="text-stone mx-auto mb-2" />
            <p className="text-sm font-medium text-cream">No gift card brands found</p>
            <p className="text-xs text-stone">Try searching for Amazon, Apple, Steam, or Xbox</p>
          </div>
        )}
      </Card>

      {/* Feature Highlights with Iconify Animated Glyphs */}
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <div className="p-5 border border-rule rounded-3 bg-bg-base flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-pill bg-lime/10 border border-lime/20 flex items-center justify-center mb-1">
            <AnimatedGlyph icon="solar:shield-check-bold" size={24} iconClassName="text-lime" variant="pulse" />
          </div>
          <h4 className="font-bold text-cream text-sm">Guaranteed Safety</h4>
          <p className="text-xs text-bone leading-relaxed">
            All trades are processed with encrypted image vaults and dedicated 24/7 resolution officers.
          </p>
        </div>

        <div className="p-5 border border-rule rounded-3 bg-bg-base flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-pill bg-lime/10 border border-lime/20 flex items-center justify-center mb-1">
            <AnimatedGlyph icon="solar:tag-price-bold" size={24} iconClassName="text-lime" variant="float" />
          </div>
          <h4 className="font-bold text-cream text-sm">Premium Market Rates</h4>
          <p className="text-xs text-bone leading-relaxed">
            Direct liquidity connections ensure top dollar conversions without intermediary agent cuts.
          </p>
        </div>

        <div className="p-5 border border-rule rounded-3 bg-bg-base flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-pill bg-lime/10 border border-lime/20 flex items-center justify-center mb-1">
            <AnimatedGlyph icon="solar:bolt-circle-bold" size={24} iconClassName="text-lime" variant="bounce" />
          </div>
          <h4 className="font-bold text-cream text-sm">Prompt Automated Payouts</h4>
          <p className="text-xs text-bone leading-relaxed">
            Funds hit your selected Nigerian bank account or USDT wallet within minutes of verification.
          </p>
        </div>
      </div>
    </div>
  );
}

function SellGiftCard({ flow, onBack }: { flow: GiftCardBrand; onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<'physical' | 'ecard'>('physical');
  const [receipt, setReceipt] = useState<'cash' | 'debit' | 'no-receipt'>('cash');
  const [amount, setAmount] = useState('100');

  // Rate logic calculation
  let baseRate = flow.numericRate;
  if (category === 'ecard') baseRate -= 50;
  if (receipt === 'no-receipt') baseRate -= 100;
  if (receipt === 'debit') baseRate -= 20;

  const numericAmount = parseFloat(amount) || 0;
  const totalNaira = Math.round(numericAmount * baseRate);

  return (
    <div className="max-w-3xl mx-auto pb-24 lg:pb-8 space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-bone hover:text-cream transition-colors text-sm font-medium"
      >
        <ArrowRight className="w-4 h-4 rotate-180" /> Back to Brands
      </button>

      <Card className="p-6">
        {/* Brand Banner Header with Animated Iconify Glyph */}
        <div className="flex items-center gap-4 border-b border-rule pb-6 mb-6">
          <div className={`w-16 h-16 rounded-2 flex items-center justify-center shrink-0 border relative ${flow.badgeColor}`}>
            <AnimatedGlyph
              icon={flow.icon}
              size={32}
              glow
              glowColor={flow.glowColor}
              variant="pulse"
            />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-cream">Sell {flow.name} Gift Card</h2>
            <div className="text-sm text-bone">Select card properties to get your guaranteed rate</div>
          </div>
        </div>

        {/* Step 1: Configuration */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="space-y-3">
              <Label>Card Form</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCategory('physical')}
                  className={`p-4 border-2 rounded-2 text-left transition-all ${
                    category === 'physical'
                      ? 'border-lime bg-lime-tint shadow-sm'
                      : 'border-rule bg-bg-elev hover:border-rule-strong text-bone'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <AnimatedGlyph
                      icon="solar:card-2-bold"
                      size={18}
                      iconClassName={category === 'physical' ? 'text-lime' : 'text-bone'}
                    />
                    <div className="font-bold text-cream">Physical Card</div>
                  </div>
                  <div className="text-xs opacity-80">I have photo of physical card & pack</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('ecard')}
                  className={`p-4 border-2 rounded-2 text-left transition-all ${
                    category === 'ecard'
                      ? 'border-lime bg-lime-tint shadow-sm'
                      : 'border-rule bg-bg-elev hover:border-rule-strong text-bone'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <AnimatedGlyph
                      icon="solar:code-circle-bold"
                      size={18}
                      iconClassName={category === 'ecard' ? 'text-lime' : 'text-bone'}
                    />
                    <div className="font-bold text-cream">E-Code</div>
                  </div>
                  <div className="text-xs opacity-80">I have the alphanumeric digital code</div>
                </button>
              </div>
            </div>

            {category === 'physical' && (
              <div className="space-y-3">
                <Label>Receipt Type</Label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setReceipt('cash')}
                    className={`p-3 border-2 rounded-2 text-left transition-all ${
                      receipt === 'cash'
                        ? 'border-lime bg-lime-tint'
                        : 'border-rule bg-bg-elev hover:border-rule-strong text-bone'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <AnimatedGlyph icon="solar:bill-list-bold" size={16} iconClassName={receipt === 'cash' ? 'text-lime' : 'text-bone'} />
                      <div className="font-bold text-cream text-xs sm:text-sm">Cash Receipt</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReceipt('debit')}
                    className={`p-3 border-2 rounded-2 text-left transition-all ${
                      receipt === 'debit'
                        ? 'border-lime bg-lime-tint'
                        : 'border-rule bg-bg-elev hover:border-rule-strong text-bone'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <AnimatedGlyph icon="solar:card-bold" size={16} iconClassName={receipt === 'debit' ? 'text-lime' : 'text-bone'} />
                      <div className="font-bold text-cream text-xs sm:text-sm">Debit/Credit</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReceipt('no-receipt')}
                    className={`p-3 border-2 rounded-2 text-left transition-all ${
                      receipt === 'no-receipt'
                        ? 'border-lime bg-lime-tint'
                        : 'border-rule bg-bg-elev hover:border-rule-strong text-bone'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <AnimatedGlyph icon="solar:close-circle-bold" size={16} iconClassName={receipt === 'no-receipt' ? 'text-lime' : 'text-bone'} />
                      <div className="font-bold text-cream text-xs sm:text-sm">No Receipt</div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Label>Total Face Value ($)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 text-lg font-poppins placeholder:text-rule-strong"
                placeholder="100"
              />
            </div>

            {/* Calculations using Poppins for numbers */}
            <div className="bg-bg-elev border border-rule rounded-3 p-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-bone">Current Rate</span>
                <span className="font-poppins text-lime font-bold">₦{baseRate.toLocaleString()}/$</span>
              </div>
              <div className="pt-3 border-t border-rule-soft flex justify-between items-center">
                <span className="text-cream font-bold">You will receive</span>
                <span className="text-2xl font-poppins font-bold text-cream tabular-nums">
                  ₦{totalNaira.toLocaleString()}
                </span>
              </div>
            </div>

            <Button size="lg" className="w-full text-base h-14 font-bold" onClick={() => setStep(2)}>
              Continue to Upload
            </Button>
          </div>
        )}

        {/* Step 2: Upload Details */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-amber/10 border border-amber/20 rounded-2 p-3 text-sm text-amber flex gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>Please ensure the card image and serial numbers are fully legible. Blurred uploads will be flagged.</span>
            </div>

            <div className="space-y-3">
              <Label>Card Image Upload</Label>
              <div className="border-2 border-dashed border-rule-strong rounded-3 p-8 flex flex-col items-center justify-center text-center bg-bg-elev hover:bg-bg-high transition-colors cursor-pointer group">
                <div className="w-14 h-14 rounded-full bg-bg-base border border-rule flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <AnimatedGlyph
                    icon="solar:camera-bold"
                    size={24}
                    iconClassName="text-lime"
                    variant="pulse"
                  />
                </div>
                <div className="font-bold text-cream text-sm mb-1">Click to upload card photo</div>
                <div className="text-xs text-bone">JPG, PNG, WebP up to 10MB</div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Card Code (Optional if clearly visible on picture)</Label>
              <Input
                type="text"
                className="h-12 font-poppins uppercase tracking-wider"
                placeholder="AQXX-829M-11PS"
              />
            </div>

            <div className="flex gap-4">
              <Button variant="secondary" className="flex-1 h-14" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                className="flex-[2] h-14 text-base bg-lime text-bg-base hover:bg-lime-soft font-bold font-poppins"
                onClick={() => setStep(3)}
              >
                Submit Trade (₦{totalNaira.toLocaleString()})
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 3 && (
          <div className="py-12 text-center flex flex-col items-center animate-in fade-in zoom-in duration-300 space-y-4">
            <div className="w-20 h-20 bg-lime-tint border border-lime rounded-full flex items-center justify-center mb-2">
              <AnimatedGlyph
                icon="solar:check-circle-bold"
                size={42}
                iconClassName="text-lime"
                variant="pulse"
              />
            </div>
            <h3 className="text-2xl font-display font-bold text-cream">Trade Submitted!</h3>
            <p className="text-bone max-w-sm text-sm leading-relaxed">
              Your gift card is being verified by our automated desk. You will be credited{' '}
              <strong className="text-lime font-poppins">₦{totalNaira.toLocaleString()}</strong> within 5-10 minutes.
            </p>
            <div className="flex gap-4 w-full pt-4">
              <Button
                variant="secondary"
                className="flex-1 h-12"
                onClick={() => {
                  setStep(1);
                  onBack();
                }}
              >
                Trade Another
              </Button>
              <Button
                className="flex-1 h-12 bg-lime text-bg-base hover:bg-lime-soft font-bold"
                onClick={() => (window.location.href = '/wallet')}
              >
                Go to Wallet
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
