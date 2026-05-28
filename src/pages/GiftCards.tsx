import React, { useState } from 'react';
import { Card, Button, Input, Chip, Label } from '../components/ui';
import { Search, Gift, CheckCircle2, ChevronRight, Upload, Camera, Tag, ArrowRight, ShieldCheck, AlertCircle, Check } from 'lucide-react';

const POPULAR_CARDS = [
  { id: '1', name: 'Amazon US', rate: '₦1,150/$', time: '1-5 mins', icon: '🛒', color: 'bg-amber-500' },
  { id: '2', name: 'Apple / iTunes (US)', rate: '₦950/$', time: '5-15 mins', icon: '🍎', color: 'bg-zinc-800' },
  { id: '3', name: 'Steam Wallet', rate: '₦1,050/$', time: '1-5 mins', icon: '🎮', color: 'bg-blue-600' },
  { id: '4', name: 'Google Play (US)', rate: '₦980/$', time: '5-30 mins', icon: '▶️', color: 'bg-green-500' },
  { id: '5', name: 'Sephora', rate: '₦1,000/$', time: '10-45 mins', icon: '💄', color: 'bg-rose-500' },
  { id: '6', name: 'Nordstrom', rate: '₦1,020/$', time: '5-30 mins', icon: '🛍️', color: 'bg-neutral-600' },
];

export default function GiftCards() {
  const [activeCard, setActiveCard] = useState<any | null>(null);

  if (activeCard) {
    return <SellGiftCard flow={activeCard} onBack={() => setActiveCard(null)} />;
  }

  return (
    <div className="max-w-7xl mx-auto pb-24 lg:pb-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-display font-bold text-cream">Gift Cards</h1>
            <Chip variant="success">Best Rates</Chip>
          </div>
          <p className="text-bone text-sm">Sell your unused gift cards for instant Naira or Crypto.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="secondary" className="flex-1 sm:flex-none">My Trades</Button>
          <Button className="flex-1 sm:flex-none flex items-center gap-2"><Gift className="w-4 h-4" /> Buy Cards</Button>
        </div>
      </div>

      <div className="bg-lime/10 border border-lime/20 rounded-3 p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-lime/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="flex-1 relative z-10">
           <h2 className="text-xl sm:text-2xl font-display font-bold text-cream mb-2">Trade Apple Gift Cards at ₦1,050/$</h2>
           <p className="text-bone text-sm mb-4">Special weekend rate valid until Sunday 11:59PM. Minimum $100 physical card.</p>
           <Button className="bg-lime text-bg-base hover:bg-lime-soft">Trade Now</Button>
        </div>
        <div className="w-full sm:w-1/3 relative z-10 flex justify-center">
           <div className="w-32 h-20 bg-zinc-800 rounded-lg shadow-2xl border border-white/10 flex items-center justify-center rotate-[-12deg] relative z-20">
             <span className="text-3xl">🍎</span>
           </div>
           <div className="w-32 h-20 bg-amber-500 rounded-lg shadow-2xl border border-white/10 flex items-center justify-center rotate-[12deg] -ml-16 mt-6">
             <span className="text-3xl">🛒</span>
           </div>
        </div>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
           <h3 className="font-display font-bold text-lg text-cream">Select a Brand to Sell</h3>
           <div className="relative w-full sm:w-64">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-bone" />
             <Input type="text" placeholder="Search brands..." className="pl-9 h-10 w-full" />
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
           {POPULAR_CARDS.map((card) => (
             <button key={card.id} onClick={() => setActiveCard(card)} className="flex items-center gap-4 p-4 rounded-3 border border-rule bg-bg-elev hover:border-rule-strong hover:bg-rule-soft transition-all text-left group">
                <div className={`w-12 h-12 rounded-2 flex items-center justify-center text-xl shrink-0 shadow-inner ${card.color}`}>
                  {card.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-cream truncate">{card.name}</div>
                  <div className="text-xs text-bone flex items-center gap-2 mt-1">
                    <span className="text-lime font-mono font-medium">{card.rate}</span>
                    <span className="w-1 h-1 rounded-full bg-rule-strong"></span>
                    <span>{card.time}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-bone group-hover:text-cream transition-colors opacity-50 group-hover:opacity-100" />
             </button>
           ))}
        </div>
        
        <div className="mt-8 text-center">
           <Button variant="secondary">Load More Brands</Button>
        </div>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
         <div className="p-4 border border-rule rounded-3 bg-bg-base flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-pill bg-lime/10 flex items-center justify-center mb-3">
               <ShieldCheck className="w-5 h-5 text-lime" />
            </div>
            <h4 className="font-bold text-cream text-sm mb-1">Guaranteed Safety</h4>
            <p className="text-xs text-bone">All trades are verifiable with 24/7 dedicated dispute resolution.</p>
         </div>
         <div className="p-4 border border-rule rounded-3 bg-bg-base flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-pill bg-lime/10 flex items-center justify-center mb-3">
               <Tag className="w-5 h-5 text-lime" />
            </div>
            <h4 className="font-bold text-cream text-sm mb-1">Premium Rates</h4>
            <p className="text-xs text-bone">We offer the most competitive market rates for all gift cards.</p>
         </div>
         <div className="p-4 border border-rule rounded-3 bg-bg-base flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-pill bg-lime/10 flex items-center justify-center mb-3">
               <AlertCircle className="w-5 h-5 text-lime" />
            </div>
            <h4 className="font-bold text-cream text-sm mb-1">Prompt Payouts</h4>
            <p className="text-xs text-bone">Payments are deposited to your wallet immediately after verification.</p>
         </div>
      </div>
    </div>
  );
}

function SellGiftCard({ flow, onBack }: any) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<'physical' | 'ecard'>('physical');
  const [receipt, setReceipt] = useState<'cash' | 'debit' | 'no-receipt'>('cash');
  const [amount, setAmount] = useState('100');
  
  // Rate logic mockup
  let baseRate = parseInt(flow.rate.replace(/[^0-9]/g, ''));
  if (category === 'ecard') baseRate -= 50;
  if (receipt === 'no-receipt') baseRate -= 100;
  if (receipt === 'debit') baseRate -= 20;

  const totalNaira = parseInt(amount || '0') * baseRate;

  return (
    <div className="max-w-3xl mx-auto pb-24 lg:pb-8 space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-bone hover:text-cream transition-colors text-sm font-medium">
         <ArrowRight className="w-4 h-4 rotate-180" /> Back to Brands
      </button>

      <Card className="p-6">
         <div className="flex items-center gap-4 border-b border-rule pb-6 mb-6">
            <div className={`w-14 h-14 rounded-2 flex items-center justify-center text-2xl shrink-0 shadow-inner ${flow.color}`}>
              {flow.icon}
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-cream">Sell {flow.name} Gift Card</h2>
              <div className="text-sm text-bone">Select card properties to get the exact rate</div>
            </div>
         </div>

         {step === 1 && (
           <div className="space-y-8">
              <div className="space-y-3">
                <Label>Card Form</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setCategory('physical')} className={`p-4 border-2 rounded-2 text-left transition-colors ${category === 'physical' ? 'border-lime bg-lime-tint' : 'border-rule bg-bg-elev hover:border-rule-strong text-bone'}`}>
                    <div className="font-bold text-cream mb-1">Physical Card</div>
                    <div className="text-xs opacity-80">I have the physical card picture</div>
                  </button>
                  <button onClick={() => setCategory('ecard')} className={`p-4 border-2 rounded-2 text-left transition-colors ${category === 'ecard' ? 'border-lime bg-lime-tint' : 'border-rule bg-bg-elev hover:border-rule-strong text-bone'}`}>
                    <div className="font-bold text-cream mb-1">E-Code</div>
                    <div className="text-xs opacity-80">I only have the alphanumeric code</div>
                  </button>
                </div>
              </div>

              {category === 'physical' && (
                 <div className="space-y-3">
                   <Label>Receipt Type</Label>
                   <div className="grid grid-cols-3 gap-3">
                     <button onClick={() => setReceipt('cash')} className={`p-3 border-2 rounded-2 text-left transition-colors ${receipt === 'cash' ? 'border-lime bg-lime-tint' : 'border-rule bg-bg-elev hover:border-rule-strong text-bone'}`}>
                       <div className="font-bold text-cream text-sm">Cash Receipt</div>
                     </button>
                     <button onClick={() => setReceipt('debit')} className={`p-3 border-2 rounded-2 text-left transition-colors ${receipt === 'debit' ? 'border-lime bg-lime-tint' : 'border-rule bg-bg-elev hover:border-rule-strong text-bone'}`}>
                       <div className="font-bold text-cream text-sm">Debit/Credit</div>
                     </button>
                     <button onClick={() => setReceipt('no-receipt')} className={`p-3 border-2 rounded-2 text-left transition-colors ${receipt === 'no-receipt' ? 'border-lime bg-lime-tint' : 'border-rule bg-bg-elev hover:border-rule-strong text-bone'}`}>
                       <div className="font-bold text-cream text-sm">No Receipt</div>
                     </button>
                   </div>
                 </div>
              )}

              <div className="space-y-3">
                 <Label>Total Face Value ($)</Label>
                 <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-12 text-lg font-mono placeholder:text-rule-strong" placeholder="e.g. 100" />
              </div>

              <div className="bg-bg-elev border border-rule rounded-3 p-4 space-y-3">
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-bone">Current Rate</span>
                   <span className="font-mono text-lime font-bold">₦{baseRate}/$</span>
                 </div>
                 <div className="pt-3 border-t border-rule-soft flex justify-between items-center">
                   <span className="text-cream font-bold">You will receive</span>
                   <span className="text-2xl font-display font-bold text-cream tabular-nums font-mono">₦{totalNaira.toLocaleString()}</span>
                 </div>
              </div>

              <Button size="lg" className="w-full text-base h-14" onClick={() => setStep(2)}>Continue to Upload</Button>
           </div>
         )}

         {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="bg-amber/10 border border-amber/20 rounded-2 p-3 text-sm text-amber flex gap-2">
                 <AlertCircle className="w-5 h-5 shrink-0" />
                 <span>Please ensure the card image and code are clear. Blurred images will be rejected.</span>
               </div>

               <div className="space-y-3">
                  <Label>Card Details</Label>
                  <div className="border-2 border-dashed border-rule-strong rounded-3 p-10 flex flex-col items-center justify-center text-center bg-bg-elev hover:bg-rule-soft transition-colors cursor-pointer group">
                     <div className="w-12 h-12 rounded-full bg-bg-base border border-rule flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Camera className="w-5 h-5 text-bone group-hover:text-cream" />
                     </div>
                     <div className="font-bold text-cream text-sm mb-1">Click to upload card image</div>
                     <div className="text-xs text-bone">JPG, PNG up to 5MB</div>
                  </div>
               </div>
               
               <div className="space-y-3">
                  <Label>Card Code (Optional if visible on image)</Label>
                  <Input type="text" className="h-12 font-mono uppercase" placeholder="e.g. AQXX-829M-11PS" />
               </div>

               <div className="flex gap-4">
                  <Button variant="secondary" className="flex-1 h-14" onClick={() => setStep(1)}>Back</Button>
                  <Button className="flex-[2] h-14 text-base bg-lime text-bg-base hover:bg-lime-soft" onClick={() => setStep(3)}>Submit Trade (₦{totalNaira.toLocaleString()})</Button>
               </div>
            </div>
         )}

         {step === 3 && (
            <div className="py-12 text-center flex flex-col items-center animate-in fade-in zoom-in duration-300">
               <div className="w-20 h-20 bg-lime-tint border border-lime rounded-full flex items-center justify-center mb-6">
                 <Check className="w-10 h-10 text-lime" />
               </div>
               <h3 className="text-2xl font-display font-bold text-cream mb-2">Trade Submitted!</h3>
               <p className="text-bone mb-8 max-w-sm">Your gift card is being verified by our team. You will be credited ₦{totalNaira.toLocaleString()} within 5-10 minutes if successful.</p>
               <div className="flex gap-4 w-full">
                  <Button variant="secondary" className="flex-1 h-12" onClick={() => { setStep(1); onBack(); }}>Trade Another</Button>
                  <Button className="flex-1 h-12" onClick={() => window.location.href = '/wallet'}>Go to Wallet</Button>
               </div>
            </div>
         )}
      </Card>
    </div>
  )
}
