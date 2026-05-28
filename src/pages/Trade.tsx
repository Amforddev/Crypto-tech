import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Label, Chip } from '../components/ui';
import { ArrowDownUp, RefreshCw, ChevronDown, Check, Info, Wallet, CreditCard, Building, Smartphone, Settings, ArrowRight, X } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, BarChart, Bar, Cell, XAxis, YAxis } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

const chartData = Array.from({ length: 40 }).map((_, i) => ({
  time: i,
  price: 34000000 + Math.random() * 2000000 - 500000,
}));

export default function Trade() {
  const [tradeType, setTradeType] = useState<'buy' | 'sell' | 'swap'>('buy');

  return (
    <div className="max-w-7xl mx-auto pb-24 lg:pb-8">
      {/* Segmented Control */}
      <div className="flex gap-1 p-1 bg-bg-elev border border-rule rounded-pill w-fit mb-6 sm:mb-8">
        {['Buy', 'Sell', 'Swap'].map(t => {
          const id = t.toLowerCase() as 'buy' | 'sell' | 'swap';
          return (
            <button
              key={id}
              onClick={() => setTradeType(id)}
              className={`px-8 py-2 rounded-pill text-sm font-bold transition-colors ${tradeType === id ? 'bg-rule text-cream' : 'text-bone hover:text-cream'}`}
            >
              {t}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column: Form */}
        <div className="w-full lg:w-[55%] sticky top-24 shrink-0">
          <Card className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={tradeType}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {tradeType === 'buy' && <BuyForm />}
                {tradeType === 'sell' && <SellForm />}
                {tradeType === 'swap' && <SwapForm />}
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>

        {/* Right Column: Chart & Recent */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <ChartPanel />
          <RecentFills />
        </div>
      </div>
    </div>
  );
}

function AssetSelect({ value, onChange, options, align = 'right' }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((o: any) => o.value === value) || options[0];

  return (
    <div className="relative">
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 bg-bg-elev border border-rule hover:border-rule-strong rounded-2 px-3 py-1.5 transition-colors">
         {selected.icon}
         <div className="flex flex-col items-start px-1 text-left">
            <span className="font-bold text-sm leading-none text-cream">{selected.label}</span>
            {selected.subLabel && <span className="text-[10px] text-good font-mono leading-none mt-0.5">{selected.subLabel}</span>}
         </div>
         <ChevronDown className={`w-4 h-4 text-bone transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className={`absolute z-20 top-full mt-1 ${align === 'right' ? 'right-0' : 'left-0'} min-w-[140px] bg-bg-elev border border-rule-strong rounded-2 shadow-xl overflow-hidden py-1`}>
              {options.map((opt: any) => (
                 <button key={opt.value} type="button" className={`w-full text-left px-3 py-2.5 text-sm hover:bg-rule-soft transition-colors flex items-center justify-between ${opt.value === value ? 'text-cream bg-rule-soft/50' : 'text-bone hover:text-cream'}`} onClick={() => { onChange(opt.value); setIsOpen(false); }}>
                    <div className="flex items-center gap-2">
                       {opt.icon}
                       <span>{opt.label}</span>
                    </div>
                    {opt.value === value && <Check className="w-4 h-4 text-lime" />}
                 </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function BuyForm() {
  const [amount, setAmount] = useState('500,000');
  const [showFees, setShowFees] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [payAsset, setPayAsset] = useState('ngn');
  const [receiveAsset, setReceiveAsset] = useState('btc');
  const [paymentMethod, setPaymentMethod] = useState<'balance' | 'bank'>('balance');

  const fiatOptions = [
     { value: 'ngn', label: 'NGN', icon: <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 bg-[#008751] flex items-center justify-center"><div className="w-1.5 h-full bg-white"></div></div> },
     { value: 'usd', label: 'USD', icon: <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 bg-blue-600 flex items-center justify-center"><div className="w-1.5 h-full bg-red-500"></div><div className="absolute w-full h-1.5 bg-white"></div></div> }
  ];

  const cryptoOptions = [
     { value: 'btc', label: 'BTC', subLabel: '+2.4%', icon: <div className="w-5 h-5 rounded-full bg-[#F7931A] flex items-center justify-center text-white text-xs font-bold shrink-0">₿</div> },
     { value: 'usdt', label: 'USDT', subLabel: '0.0%', icon: <div className="w-5 h-5 rounded-full bg-[#26A17B] flex items-center justify-center text-white text-[10px] font-bold shrink-0">₮</div> },
     { value: 'sol', label: 'SOL', subLabel: '-1.2%', icon: <div className="w-5 h-5 rounded-full bg-[#14F195]/20 border border-[#14F195]/50 flex items-center justify-center text-[#14F195] text-[10px] font-bold shrink-0">◎</div> }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-display font-bold text-cream">Buy Crypto</h2>
      </div>

      {/* You Pay */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <Label className="mb-0">You Pay</Label>
          <div className="text-bone">Balance: <span className="font-mono text-cream">₦450,200.00</span> <button className="text-lime hover:underline ml-1" onClick={() => setAmount('450200')}>Max</button></div>
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-bone font-medium">₦</span>
          </div>
          <Input type="text" value={amount} onChange={e => setAmount(e.target.value)} className="pl-8 text-lg font-mono h-14" />
          <div className="absolute inset-y-2 right-2 flex items-center">
            <AssetSelect value={payAsset} onChange={setPayAsset} options={fiatOptions} />
          </div>
        </div>
      </div>

      {/* Receive */}
      <div className="space-y-2">
         <Label>Receive (Estimated)</Label>
         <div className="relative group">
          <Input type="text" readOnly value="0.01423" className="text-lg font-mono h-14 text-bone" />
          <div className="absolute inset-y-2 right-2 flex items-center">
             <AssetSelect value={receiveAsset} onChange={setReceiveAsset} options={cryptoOptions} />
          </div>
        </div>
      </div>

      {/* Rate & Fee breakdown */}
      <div className="bg-bg-elev border border-rule rounded-2 p-3 space-y-3">
         <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-bone">
              Rate <RefreshCw className="w-3 h-3 text-lime" />
            </div>
            <div className="font-mono text-cream flex items-center gap-1.5">
               1 {receiveAsset.toUpperCase()} ≈ ₦35,120,400 <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse"></span>
               <span className="text-xs text-bone ml-1">updated 3s ago</span>
            </div>
         </div>
         <button onClick={() => setShowFees(!showFees)} className="flex items-center justify-between w-full text-sm">
            <div className="text-bone hover:text-cream transition-colors border-b border-dashed border-rule-strong flex items-center gap-1">
               Fees & Details <ChevronDown className={`w-3 h-3 transition-transform ${showFees ? 'rotate-180' : ''}`} />
            </div>
         </button>
         <AnimatePresence>
           {showFees && (
             <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="pt-2 border-t border-rule-soft mt-2 space-y-2 text-sm text-bone">
                   <div className="flex justify-between">
                     <span>Spread</span>
                     <span className="font-mono text-cream">0.10%</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Network Fee</span>
                     <span className="font-mono text-cream">0.0001 {receiveAsset.toUpperCase()}</span>
                   </div>
                   <div className="flex justify-between font-medium pt-1">
                     <span className="text-cream">Total Payout</span>
                     <span className="font-mono text-cream">0.01413 {receiveAsset.toUpperCase()}</span>
                   </div>
                </div>
             </motion.div>
           )}
         </AnimatePresence>
      </div>

      {/* Payment Method */}
      <div className="space-y-2">
         <Label>Payment Method</Label>
         <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setPaymentMethod('balance')} className={`flex items-center p-3 border-2 rounded-2 gap-3 text-left transition-colors ${paymentMethod === 'balance' ? 'border-lime bg-lime-tint' : 'border-rule bg-bg-elev hover:border-rule-strong text-bone hover:text-cream'}`}>
               <Wallet className={`w-5 h-5 ${paymentMethod === 'balance' ? 'text-lime' : ''}`} />
               <div>
                  <div className={`text-sm font-bold ${paymentMethod === 'balance' ? 'text-cream' : ''}`}>NGN Balance</div>
                  <div className="text-xs font-mono opacity-80">₦450,200.00</div>
               </div>
            </button>
            <button onClick={() => setPaymentMethod('bank')} className={`flex items-center p-3 border-2 rounded-2 gap-3 text-left transition-colors ${paymentMethod === 'bank' ? 'border-lime bg-lime-tint' : 'border-rule bg-bg-elev hover:border-rule-strong text-bone hover:text-cream'}`}>
               <Building className={`w-5 h-5 ${paymentMethod === 'bank' ? 'text-lime' : ''}`} />
               <div>
                  <div className={`text-sm font-bold ${paymentMethod === 'bank' ? 'text-cream' : ''}`}>Bank Transfer</div>
                  <div className="text-xs opacity-80">Instant</div>
               </div>
            </button>
         </div>
         {paymentMethod === 'bank' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-2 text-sm text-bone">
              You will be provided with a unique bank account to transfer funds to on the next step.
            </motion.div>
         )}
      </div>

      <Button className="w-full h-14 text-base mt-2" onClick={() => setShowConfirm(true)}>Buy {receiveAsset.toUpperCase()}</Button>

      {/* Confirmation Modal */}
      {showConfirm && <ConfirmModal type="Buy" amount="0.01413" asset={receiveAsset.toUpperCase()} fiat="₦500,000" onClose={() => setShowConfirm(false)} />}
    </div>
  );
}

function SellForm() {
  const [amount, setAmount] = useState('0.15');
  const [sellAsset, setSellAsset] = useState('btc');
  const [receiveAsset, setReceiveAsset] = useState('ngn');
  const [destination, setDestination] = useState<'balance' | 'bank'>('balance');
  const [showConfirm, setShowConfirm] = useState(false);

  const cryptoOptions = [
     { value: 'btc', label: 'BTC', icon: <div className="w-5 h-5 rounded-full bg-[#F7931A] flex items-center justify-center text-white text-xs font-bold shrink-0">₿</div> },
     { value: 'usdt', label: 'USDT', icon: <div className="w-5 h-5 rounded-full bg-[#26A17B] flex items-center justify-center text-white text-[10px] font-bold shrink-0">₮</div> },
     { value: 'sol', label: 'SOL', icon: <div className="w-5 h-5 rounded-full bg-[#14F195]/20 border border-[#14F195]/50 flex items-center justify-center text-[#14F195] text-[10px] font-bold shrink-0">◎</div> }
  ];

  const fiatOptions = [
     { value: 'ngn', label: 'NGN', icon: <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 bg-[#008751] flex items-center justify-center"><div className="w-1.5 h-full bg-white"></div></div> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-display font-bold text-cream">Sell Crypto</h2>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <Label className="mb-0">You Sell</Label>
          <div className="text-bone">Balance: <span className="font-mono text-cream">1.45 {sellAsset.toUpperCase()}</span> <button className="text-lime hover:underline ml-1" onClick={() => setAmount('1.45')}>Max</button></div>
        </div>
        <div className="relative group">
          <Input type="text" value={amount} onChange={e => setAmount(e.target.value)} className="text-lg font-mono h-14 pl-4" />
          <div className="absolute inset-y-2 right-2 flex items-center">
            <AssetSelect value={sellAsset} onChange={setSellAsset} options={cryptoOptions} />
          </div>
        </div>
      </div>

      {/* Receive */}
      <div className="space-y-2">
         <Label>Receive (Estimated)</Label>
         <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-bone font-medium">₦</span>
          </div>
          <Input type="text" readOnly value="5,268,060.00" className="pl-8 text-lg font-mono h-14 text-bone" />
          <div className="absolute inset-y-2 right-2 flex items-center">
             <AssetSelect value={receiveAsset} onChange={setReceiveAsset} options={fiatOptions} />
          </div>
        </div>
      </div>

      {/* Rate & Fee breakdown */}
      <div className="bg-bg-elev border border-rule rounded-2 p-3 space-y-3">
         <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-bone">
              Rate <RefreshCw className="w-3 h-3 text-lime" />
            </div>
            <div className="font-mono text-cream flex items-center gap-1.5">
               1 {sellAsset.toUpperCase()} ≈ ₦35,120,400 <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse"></span>
            </div>
         </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-2">
         <Label>Payout Destination</Label>
         <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setDestination('balance')} className={`flex items-center p-3 border-2 rounded-2 gap-3 text-left transition-colors ${destination === 'balance' ? 'border-lime bg-lime-tint' : 'border-rule bg-bg-elev hover:border-rule-strong text-bone hover:text-cream'}`}>
               <Wallet className={`w-5 h-5 ${destination === 'balance' ? 'text-lime' : ''}`} />
               <div>
                  <div className={`text-sm font-bold ${destination === 'balance' ? 'text-cream' : ''}`}>NGN Balance</div>
                  <div className="text-xs font-mono opacity-80">Instant</div>
               </div>
            </button>
            <button onClick={() => setDestination('bank')} className={`flex items-center p-3 border-2 rounded-2 gap-3 text-left transition-colors ${destination === 'bank' ? 'border-lime bg-lime-tint' : 'border-rule bg-bg-elev hover:border-rule-strong text-bone hover:text-cream'}`}>
               <Building className={`w-5 h-5 ${destination === 'bank' ? 'text-lime' : ''}`} />
               <div>
                  <div className={`text-sm font-bold ${destination === 'bank' ? 'text-cream' : ''}`}>GTBank (...4920)</div>
                  <div className="text-xs opacity-80">Under 5 mins</div>
               </div>
            </button>
         </div>
      </div>

      <Button className="w-full h-14 text-base mt-2 bg-rust hover:bg-rust/90 shadow-[0_2px_0_#A1351A] focus-visible:ring-rust" onClick={() => setShowConfirm(true)}>Sell {sellAsset.toUpperCase()}</Button>
      
      {showConfirm && <ConfirmModal type="Sell" amount={amount} asset={sellAsset.toUpperCase()} fiat="₦5,268,060.00" onClose={() => setShowConfirm(false)} />}
    </div>
  );
}

function SwapForm() {
  const [amount, setAmount] = useState('1000');
  const [fromAsset, setFromAsset] = useState('usdt');
  const [toAsset, setToAsset] = useState('sol');
  const [step, setStep] = useState<'form' | 'success'>('form');

  const cryptoOptions = [
     { value: 'btc', label: 'BTC', icon: <div className="w-6 h-6 rounded-full bg-[#F7931A] flex items-center justify-center text-white text-sm font-bold shrink-0">₿</div> },
     { value: 'usdt', label: 'USDT', icon: <div className="w-6 h-6 rounded-full bg-[#26A17B] flex items-center justify-center text-white text-xs font-bold shrink-0">₮</div> },
     { value: 'sol', label: 'SOL', icon: <div className="w-6 h-6 rounded-full bg-[#14F195]/20 border border-[#14F195]/50 flex items-center justify-center text-[#14F195] text-xs font-bold shrink-0">◎</div> }
  ];

  const handleSwapSwitch = () => {
     setFromAsset(toAsset);
     setToAsset(fromAsset);
  }

  if (step === 'success') {
     return (
        <div className="py-12 text-center flex flex-col items-center animate-in fade-in zoom-in duration-300">
           <div className="w-20 h-20 bg-lime-tint border border-lime rounded-full flex items-center justify-center mb-6">
             <Check className="w-10 h-10 text-lime" />
           </div>
           <h3 className="text-2xl font-display font-bold text-cream mb-2">Swap Successful!</h3>
           <p className="text-bone mb-8">You successfully swapped {amount} {fromAsset.toUpperCase()} to {toAsset.toUpperCase()}.</p>
           <Button className="w-full h-12" onClick={() => setStep('form')} variant="secondary">Swap More</Button>
        </div>
     );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-display font-bold text-cream">Swap Assets</h2>
        <button className="text-bone hover:text-cream"><Settings className="w-5 h-5" /></button>
      </div>

      <div className="relative">
        <div className="space-y-2 bg-bg-elev border border-rule rounded-3 p-4">
          <div className="flex justify-between text-sm">
            <Label className="mb-0 text-bone">From</Label>
            <div className="text-bone">Bal: <span className="font-mono">1,450.50 {fromAsset.toUpperCase()}</span></div>
          </div>
          <div className="flex items-center justify-between">
            <Input type="text" value={amount} onChange={e => setAmount(e.target.value)} className="bg-transparent border-none text-2xl font-mono h-12 p-0 focus-visible:ring-0 w-1/2" />
            <AssetSelect value={fromAsset} onChange={setFromAsset} options={cryptoOptions} />
          </div>
        </div>

        {/* Switch button */}
        <button onClick={handleSwapSwitch} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-bg-paper border border-rule rounded-pill flex items-center justify-center text-cream hover:text-lime hover:border-lime transition-colors focus:outline-none focus:ring-2 focus:ring-lime cursor-pointer group">
           <ArrowDownUp className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
        </button>

        <div className="space-y-2 bg-bg-elev border border-rule rounded-3 p-4 mt-2">
          <div className="flex justify-between text-sm">
            <Label className="mb-0 text-bone">To (Estimated)</Label>
            <div className="text-bone">Bal: <span className="font-mono">5.24 {toAsset.toUpperCase()}</span></div>
          </div>
          <div className="flex items-center justify-between">
            <Input type="text" readOnly value="6.98" className="bg-transparent border-none text-2xl font-mono h-12 p-0 focus-visible:ring-0 text-bone w-1/2 pointer-events-none" />
            <AssetSelect value={toAsset} onChange={setToAsset} options={cryptoOptions} />
          </div>
        </div>
      </div>

      <div className="bg-bg-elev border border-rule rounded-2 p-3 space-y-2 text-sm">
         <div className="flex justify-between items-center text-bone">
           <span>Rate</span>
           <span className="font-mono text-cream">1 {toAsset.toUpperCase()} ≈ 143.20 {fromAsset.toUpperCase()}</span>
         </div>
         <div className="flex justify-between items-center text-bone">
           <span>Slippage Tolerance</span>
           <span className="font-mono text-cream">1.0%</span>
         </div>
         <div className="flex justify-between items-center text-bone">
           <span>Route</span>
           <span className="font-medium text-cream flex items-center gap-2 flex-wrap justify-end">{fromAsset.toUpperCase()} <ArrowRight className="w-3 h-3 text-bone" /> {toAsset.toUpperCase()}</span>
         </div>
      </div>

      <Button className="w-full h-14 text-base mt-2" onClick={() => setStep('success')}>Review Swap</Button>
    </div>
  );
}

function ConfirmModal({ type, amount, asset, fiat, onClose }: any) {
  const [step, setStep] = useState<'confirm' | 'success'>('confirm');
  const [timeLeft, setTimeLeft] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (step === 'confirm' && !isSubmitting && timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timeLeft, step, isSubmitting]);

  const handleConfirm = () => {
     setIsSubmitting(true);
     setTimeout(() => {
        setIsSubmitting(false);
        setStep('success');
     }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-base/80 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-bg-paper border border-rule rounded-3 w-full max-w-md overflow-hidden shadow-2xl">
        {step === 'confirm' ? (
           <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-display font-bold text-cream">Confirm Order</h3>
                 <button onClick={onClose} className="text-bone hover:text-cream"><X className="w-5 h-5" /></button>
              </div>
              <div className="text-center py-6">
                 <div className="text-sm text-bone mb-2">You will {type === 'Buy' ? 'receive' : 'sell'}</div>
                 <div className={`text-4xl font-display font-bold mb-2 ${type === 'Buy' ? 'text-lime' : 'text-rust'}`}>{amount} {asset}</div>
                 <div className="text-bone text-sm font-mono">{type === 'Buy' ? 'Cost' : 'Receive'}: {fiat}</div>
              </div>
              
              <div className="bg-bg-elev border border-rule rounded-2 p-4 space-y-3 text-sm mb-8">
                 <div className="flex justify-between text-bone"><span>Rate</span><span className="text-cream font-mono">1 {asset} = ₦35,120,400</span></div>
                 <div className="flex justify-between text-bone"><span>Fee</span><span className="text-cream font-mono">₦500.00</span></div>
                 <div className="flex justify-between font-bold pt-2 border-t border-rule-soft text-cream text-base"><span>Total</span><span className="font-mono">{fiat}</span></div>
              </div>
              
              <div className="flex items-center gap-4">
                 <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                       <circle cx="24" cy="24" r="22" fill="none" stroke="var(--color-rule)" strokeWidth="4" />
                       <motion.circle 
                         cx="24" cy="24" r="22" fill="none" stroke="var(--color-lime)" strokeWidth="4" 
                         strokeDasharray={2 * Math.PI * 22}
                         initial={{ strokeDashoffset: 0 }}
                         animate={{ strokeDashoffset: (1 - timeLeft/10) * (2 * Math.PI * 22) }}
                         transition={{ duration: 1, ease: 'linear' }}
                       />
                    </svg>
                    <span className="text-xs font-mono font-bold">{timeLeft}s</span>
                 </div>
                 <Button className="flex-1 h-12 text-base relative" onClick={handleConfirm} disabled={timeLeft === 0 || isSubmitting} style={type === 'Sell' ? { backgroundColor: 'var(--color-rust)', borderColor: 'var(--color-rust)', color: 'white', boxShadow: '0 2px 0 #A1351A' } : {}}>
                   {isSubmitting ? <RefreshCw className="w-5 h-5 animate-spin mx-auto text-white" /> : (timeLeft === 0 ? 'Rate expired' : `Confirm ${type}`)}
                 </Button>
              </div>
           </div>
        ) : (
           <div className="p-8 text-center flex flex-col items-center">
              <div className={`w-20 h-20 border rounded-full flex items-center justify-center mb-6 ${type === 'Buy' ? 'bg-lime-tint border-lime' : 'bg-lime-tint border-lime'}`}>
                <Check className={`w-10 h-10 ${type === 'Buy' ? 'text-lime' : 'text-lime'}`} />
              </div>
              <h3 className="text-2xl font-display font-bold text-cream mb-2">Order Successful!</h3>
              <p className="text-bone mb-8">You successfully {type === 'Buy' ? 'bought' : 'sold'} <span className="text-cream font-bold">{amount} {asset}</span>. Your balance has been updated.</p>
              <Button className="w-full h-12" onClick={onClose} variant="secondary">Done</Button>
           </div>
        )}
      </motion.div>
    </div>
  )
}

function ChartPanel() {
  const [tab, setTab] = useState('1D');
  const [chartType, setChartType] = useState<'line'|'candle'>('line');

  // Generate fake candle data based on the line chart data
  const candleData = chartData.map((d, i) => {
    const open = d.price - (Math.random() * 200000);
    const close = d.price + (Math.random() * 200000);
    const high = Math.max(open, close) + Math.random() * 100000;
    const low = Math.min(open, close) - Math.random() * 100000;
    return {
      time: d.time,
      open,
      close,
      high,
      low,
      isUp: close >= open,
      // For simple composed chart rendering:
      bodyBottom: Math.min(open, close),
      bodyLength: Math.abs(close - open),
      wickBottom: low,
      wickTop: high
    };
  });

  return (
    <Card className="p-6 flex flex-col h-[400px]">
       <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 rounded-pill bg-[#F7931A] flex items-center justify-center text-white text-[10px] font-bold">₿</div>
               <span className="font-bold text-cream">BTC/NGN</span>
            </div>
            <div className="text-2xl font-display font-bold text-cream mt-2 tabular-nums tracking-tight">₦35,120,400</div>
            <div className="text-sm font-medium text-good mt-1">+2.45% (₦840,500)</div>
          </div>
          <div className="flex flex-col items-end gap-3">
             <div className="flex bg-bg-elev border border-rule rounded-2 p-1">
               <button onClick={() => setChartType('line')} className={`px-3 py-1 rounded text-xs font-bold transition-colors ${chartType === 'line' ? 'bg-rule text-cream' : 'text-bone hover:text-cream'}`}>Line</button>
               <button onClick={() => setChartType('candle')} className={`px-3 py-1 rounded text-xs font-bold transition-colors ${chartType === 'candle' ? 'bg-rule text-cream' : 'text-bone hover:text-cream'}`}>Candle</button>
             </div>
             <div className="flex gap-2 text-xs font-medium text-bone">
                {['1H', '1D', '1W', '1M', '1Y'].map(t => (
                  <button key={t} onClick={() => setTab(t)} className={`${tab === t ? 'text-lime' : 'hover:text-cream'}`}>{t}</button>
                ))}
             </div>
          </div>
       </div>

       <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
             {chartType === 'line' ? (
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="chartColor" x1="0"y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-lime)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--color-lime)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-bg-elev)', border: '1px solid var(--color-rule)', borderRadius: '6px' }}
                    itemStyle={{ color: 'var(--color-cream)' }}
                    formatter={(value: number) => [`₦${value.toLocaleString(undefined, {maximumFractionDigits:0})}`]}
                    labelStyle={{ display: 'none' }}
                  />
                  <Area type="monotone" dataKey="price" stroke="var(--color-lime)" strokeWidth={2} fillOpacity={1} fill="url(#chartColor)" />
                </AreaChart>
             ) : (
                <BarChart data={candleData} barCategoryGap="20%">
                  <YAxis domain={['dataMin - 1000000', 'auto']} hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-bg-elev)', border: '1px solid var(--color-rule)', borderRadius: '6px' }}
                    cursor={{fill: 'var(--color-bg-elev)'}}
                    labelStyle={{ display: 'none' }}
                    formatter={(value: any, name: string, props: any) => {
                       if (name === 'bodyLength') return [`₦${props.payload.close.toLocaleString(undefined, {maximumFractionDigits:0})}`, 'Price'];
                       return [];
                    }}
                  />
                  <Bar dataKey="bodyLength" stackId="a">
                    {candleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.isUp ? 'var(--color-lime)' : 'var(--color-rust)'} />
                    ))}
                  </Bar>
                </BarChart>
             )}
          </ResponsiveContainer>
       </div>
    </Card>
  )
}

function RecentFills() {
  const [fills, setFills] = useState([
    { id: 1, type: 'buy', price: '35,120,400', amount: '0.0412', time: '14:24:02' },
    { id: 2, type: 'sell', price: '35,119,800', amount: '0.1054', time: '14:23:55' },
    { id: 3, type: 'buy', price: '35,118,500', amount: '0.0050', time: '14:23:10' },
    { id: 4, type: 'buy', price: '35,118,200', amount: '1.2400', time: '14:22:45' },
    { id: 5, type: 'sell', price: '35,122,100', amount: '0.0801', time: '14:20:12' },
  ]);

  useEffect(() => {
     const interval = setInterval(() => {
        setFills(prev => {
           const isBuy = Math.random() > 0.5;
           const newPriceInt = 35120400 + Math.floor(Math.random() * 5000) - 2500;
           const newPrice = newPriceInt.toLocaleString();
           const newAmount = (Math.random() * 0.5).toFixed(4);
           const now = new Date();
           const newTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds().toString().padStart(2, '0')}`;
           
           const newFill = {
              id: Date.now(),
              type: isBuy ? 'buy' : 'sell',
              price: newPrice,
              amount: newAmount,
              time: newTime
           };
           
           return [newFill, ...prev].slice(0, 5);
        });
     }, 3500);
     return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-4 sm:p-6 overflow-hidden">
      <h3 className="text-sm font-medium text-bone mb-4">Recent Market Trades</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-stone text-xs border-b border-rule font-medium">
              <th className="text-left pb-2 font-normal uppercase tracking-wider">Price (NGN)</th>
              <th className="text-right pb-2 font-normal uppercase tracking-wider">Amount (BTC)</th>
              <th className="text-right pb-2 font-normal uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {fills.map((f, i) => (
                <motion.tr 
                  key={f.id} 
                  initial={{ opacity: 0, y: -10, backgroundColor: f.type === 'buy' ? 'rgba(0, 135, 81, 0.2)' : 'rgba(161, 53, 26, 0.2)' }}
                  animate={{ opacity: 1, y: 0, backgroundColor: 'transparent' }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="font-mono text-xs sm:text-sm hover:bg-rule-soft cursor-default border-b border-rule/30"
                >
                  <td className={`py-2 px-1 ${f.type === 'buy' ? 'text-good' : 'text-bad'}`}>{f.price}</td>
                  <td className="text-right py-2 px-1 text-cream">{f.amount}</td>
                  <td className="text-right py-2 px-1 text-bone">{f.time}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </Card>
  )
}
