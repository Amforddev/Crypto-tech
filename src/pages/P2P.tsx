import React, { useState } from 'react';
import { Card, Button, Input, Chip } from '../components/ui';
import { CheckCircle2, ShieldCheck, MessageSquare, Phone, MoreHorizontal, ArrowLeft, Send, Upload, ChevronDown, Filter, AlertCircle, Clock, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_BUY_OFFERS = [
  { id: 1, type: 'buy', vendor: 'NairaXchange', isVerified: true, trades: 1452, completion: 98.5, limits: '₦5,000 - ₦500,000', price: 1425.50, asset: 'USDT', available: '4,500.25 USDT', methods: ['Bank Transfer', 'Opay'] },
  { id: 2, type: 'buy', vendor: 'CryptoKing_NG', isVerified: true, trades: 840, completion: 99.1, limits: '₦50,000 - ₦2,000,000', price: 1426.00, asset: 'USDT', available: '1,200.00 USDT', methods: ['Bank Transfer'] },
  { id: 3, type: 'buy', vendor: 'FastPay_Agent', isVerified: false, trades: 125, completion: 94.2, limits: '₦1,000 - ₦50,000', price: 1427.50, asset: 'USDT', available: '150.00 USDT', methods: ['Bank Transfer', 'Palmpay'] },
  { id: 4, type: 'buy', vendor: 'Whale_Trader', isVerified: true, trades: 3105, completion: 99.8, limits: '₦500,000 - ₦10,000,000', price: 1428.00, asset: 'USDT', available: '50,000.00 USDT', methods: ['Bank Transfer'] },
];

const MOCK_SELL_OFFERS = [
  { id: 5, type: 'sell', vendor: 'Global_Traders', isVerified: true, trades: 4050, completion: 97.4, limits: '₦10,000 - ₦5,000,000', price: 1420.00, asset: 'USDT', available: '10,000.00 USDT', methods: ['Bank Transfer'] },
  { id: 6, type: 'sell', vendor: 'NaijaCoins', isVerified: true, trades: 1120, completion: 99.5, limits: '₦5,000 - ₦2,000,000', price: 1419.50, asset: 'USDT', available: '2,500.00 USDT', methods: ['Bank Transfer', 'Opay'] },
  { id: 7, type: 'sell', vendor: 'FastCash', isVerified: false, trades: 210, completion: 92.1, limits: '₦1,000 - ₦100,000', price: 1418.00, asset: 'USDT', available: '500.00 USDT', methods: ['Bank Transfer'] },
];

function FilterSelect({ label, value, options, onChange, iconPrefix }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((o: any) => o.value === value) || options[0];

  return (
    <div className="space-y-1.5 flex-1 relative">
      <label className="text-xs text-bone font-medium">{label}</label>
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full h-10 px-3 bg-bg-base border border-rule hover:border-rule-strong rounded-2 flex items-center justify-between text-sm text-cream transition-colors"
      >
        <div className="flex items-center gap-2">
          {selected.icon && selected.icon}
          {selected.label}
        </div>
        <ChevronDown className={`w-4 h-4 text-bone transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute z-20 left-0 right-0 top-[calc(100%+4px)] min-w-[120px] bg-bg-elev border border-rule-strong rounded-2 shadow-xl overflow-hidden py-1">
              {options.map((opt: any) => (
                 <button key={opt.value} type="button" className={`w-full text-left px-3 py-2.5 text-sm hover:bg-rule-soft transition-colors flex items-center gap-2 ${opt.value === value ? 'text-cream bg-rule-soft/50' : 'text-bone hover:text-cream'}`} onClick={() => { onChange(opt.value); setIsOpen(false); }}>
                    {opt.icon && opt.icon}
                    <span>{opt.label}</span>
                 </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function P2P() {
  const [activeTrade, setActiveTrade] = useState<any | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  
  const [assetFilter, setAssetFilter] = useState('usdt');
  const [fiatFilter, setFiatFilter] = useState('ngn');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const ASSET_OPTIONS = [
    { value: 'usdt', label: 'USDT', icon: <div className="w-5 h-5 rounded-full bg-[#26A17B] flex items-center justify-center text-white text-[10px] font-bold font-mono">₮</div> },
    { value: 'btc', label: 'BTC', icon: <div className="w-5 h-5 rounded-full bg-[#F7931A] flex items-center justify-center text-white text-[10px] font-bold font-mono">₿</div> }
  ];
  const FIAT_OPTIONS = [
    { value: 'ngn', label: 'NGN' },
    { value: 'usd', label: 'USD' }
  ];
  const PAYMENT_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'bank', label: 'Bank Transfer' },
    { value: 'opay', label: 'Opay' },
    { value: 'palmpay', label: 'Palmpay' }
  ];

  if (activeTrade) {
    return <TradeRoom trade={activeTrade} onBack={() => setActiveTrade(null)} />;
  }

  const offersToDisplay = tradeType === 'buy' ? MOCK_BUY_OFFERS : MOCK_SELL_OFFERS;

  return (
    <div className="max-w-7xl mx-auto pb-24 lg:pb-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-display font-bold text-cream">P2P Trading</h1>
            <Chip variant="success">Zero Fees</Chip>
          </div>
          <p className="text-bone text-sm">Buy and sell crypto directly with other users securely.</p>
        </div>
        <div className="flex bg-bg-elev border border-rule rounded-pill p-1">
           <button onClick={() => setTradeType('buy')} className={`px-6 py-2 rounded-pill font-bold text-sm transition-colors ${tradeType === 'buy' ? 'bg-rule text-cream' : 'text-bone hover:text-cream'}`}>Buy</button>
           <button onClick={() => setTradeType('sell')} className={`px-6 py-2 rounded-pill font-bold text-sm transition-colors ${tradeType === 'sell' ? 'bg-rule text-cream' : 'text-bone hover:text-cream'}`}>Sell</button>
        </div>
      </div>

      {/* Filters Region */}
      <Card className="p-4 sm:p-6 flex flex-col lg:flex-row gap-4 items-end z-10 w-full lg:w-auto relative">
        <div className="grid grid-cols-2 lg:flex gap-4 w-full lg:w-auto flex-1 z-10">
           <FilterSelect label="Asset" value={assetFilter} onChange={setAssetFilter} options={ASSET_OPTIONS} />
           <FilterSelect label="Fiat" value={fiatFilter} onChange={setFiatFilter} options={FIAT_OPTIONS} />

           <div className="space-y-1.5 flex-1 col-span-2 sm:col-span-1">
             <label className="text-xs text-bone font-medium">Amount</label>
             <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-bone text-sm">{fiatFilter === 'ngn' ? '₦' : '$'}</span>
                <Input type="text" placeholder="Enter amount" className="pl-7 h-10 w-full" />
             </div>
           </div>

           <FilterSelect label="Payment" value={paymentFilter} onChange={setPaymentFilter} options={PAYMENT_OPTIONS} />
        </div>
      </Card>

      {/* Warning Banner */}
      <div className="bg-amber/10 border border-amber/20 rounded-3 p-4 flex gap-3 text-amber text-sm max-w-4xl relative z-0">
         <AlertCircle className="w-5 h-5 shrink-0" />
         <p>Never release crypto before confirming payment in your bank account. Support will never ask you to release funds prematurely.</p>
      </div>

      {/* Offers Table */}
      <Card className="overflow-hidden relative z-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead className="bg-bg-elev border-b border-rule font-medium text-bone text-xs">
              <tr>
                <th className="text-left py-3 px-6 uppercase tracking-wider font-normal">Advertiser</th>
                <th className="text-left py-3 px-6 uppercase tracking-wider font-normal">Price</th>
                <th className="text-left py-3 px-6 uppercase tracking-wider font-normal">Limit / Available</th>
                <th className="text-left py-3 px-6 uppercase tracking-wider font-normal">Payment</th>
                <th className="text-right py-3 px-6 uppercase tracking-wider font-normal">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule divide-dashed">
               {offersToDisplay.map((offer) => (
                 <tr key={offer.id} className="hover:bg-rule-soft transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 mb-1">
                         <div className="w-6 h-6 rounded-pill bg-lime/10 text-lime flex items-center justify-center font-bold text-xs uppercase p-1">
                            {offer.vendor.substring(0, 2)}
                         </div>
                         <span className="font-bold text-cream">{offer.vendor}</span>
                         {offer.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-lime" />}
                      </div>
                      <div className="text-xs text-bone flex items-center gap-2">
                        <span>{offer.trades} orders</span>
                        <span className="w-1 h-1 rounded-full bg-rule-strong"></span>
                        <span>{offer.completion}% completion</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                       <div className="text-lg font-mono font-bold text-lime">₦{offer.price.toFixed(2)}</div>
                    </td>
                    <td className="py-4 px-6">
                       <div className="text-bone mb-1">Available: <span className="text-cream font-mono">{offer.available}</span></div>
                       <div className="text-bone">Limit: <span className="text-cream font-mono">{offer.limits}</span></div>
                    </td>
                    <td className="py-4 px-6">
                       <div className="flex flex-wrap gap-2">
                         {offer.methods.map((m, i) => (
                           <span key={i} className="inline-flex items-center border border-lime/30 bg-lime/5 px-2 py-1 rounded-sm text-xs text-bone">
                             {m}
                           </span>
                         ))}
                       </div>
                    </td>
                    <td className="py-4 px-6 text-right w-[150px]">
                       <Button className="w-full text-sm h-9" variant={tradeType === 'buy' ? 'primary' : 'default'} style={tradeType === 'sell' ? { backgroundColor: '#A1351A', borderColor: '#A1351A', color: 'white', boxShadow: '0 2px 0 #7A220F' } : {}} onClick={() => setActiveTrade(offer)}>
                         {tradeType === 'buy' ? 'Buy' : 'Sell'} {offer.asset}
                       </Button>
                    </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function TradeRoom({ trade, onBack }: { trade: any, onBack: () => void }) {
  const isBuy = trade.type === 'buy';
  const [amount, setAmount] = useState(isBuy ? '100000' : '100');
  const [step, setStep] = useState<'create' | 'payment' | 'completed' | 'released'>('create');
  
  const fiatAmount = isBuy ? amount : (parseFloat(amount || '0') * trade.price).toFixed(2);
  const cryptoAmount = isBuy ? (parseFloat(amount || '0') / trade.price).toFixed(2) : amount;

  return (
    <div className="max-w-4xl mx-auto pb-24 lg:pb-8 space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-bone hover:text-cream transition-colors text-sm font-medium">
         <ArrowLeft className="w-4 h-4" /> Back to Offers
      </button>

      <div className="grid lg:grid-cols-5 gap-6">
         {/* Left Side: Order Info */}
         <div className="lg:col-span-3 space-y-6">
            <Card className="p-6">
               <div className="flex justify-between items-start mb-6 border-b border-rule pb-6">
                  <div>
                    <h2 className="text-xl font-display font-bold text-cream mb-2">
                       {isBuy ? `Buy ${trade.asset} from` : `Sell ${trade.asset} to`} {trade.vendor}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-bone">
                       <ShieldCheck className="w-4 h-4 text-lime" /> Escrow secured
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm border border-rule px-3 py-1 rounded-pill bg-bg-elev text-bone font-mono mb-1">Price: ₦{trade.price.toFixed(2)}</div>
                    <div className="text-xs text-bone">15m payment window</div>
                  </div>
               </div>

               {step === 'create' && (
                 <div className="space-y-6 animate-in fade-in duration-300">
                   <div className="space-y-2">
                     <label className="text-sm font-medium text-bone">I want to pay</label>
                     <div className="relative">
                        {isBuy && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-bone font-medium">₦</span>}
                        <Input type="text" value={amount} onChange={(e: any) => setAmount(e.target.value)} className={`${isBuy ? 'pl-8' : 'pl-4'} text-xl font-mono h-14`} />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-lime">All</span>
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-medium text-bone">I will receive</label>
                     <div className="relative">
                        {!isBuy && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-bone font-medium">₦</span>}
                        <Input readOnly type="text" value={isBuy ? cryptoAmount : fiatAmount} className={`${!isBuy ? 'pl-8' : 'pl-4'} text-xl font-mono h-14 text-bone border-dashed`} />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-cream">{isBuy ? trade.asset : 'NGN'}</span>
                     </div>
                   </div>
                   <Button size="lg" className="w-full text-base" onClick={() => setStep('payment')} style={!isBuy ? { backgroundColor: '#A1351A', borderColor: '#A1351A', color: 'white', boxShadow: '0 2px 0 #7A220F' } : {}}>
                     {isBuy ? `Buy ${trade.asset}` : `Sell ${trade.asset}`}
                   </Button>
                 </div>
               )}

               {step === 'payment' && (
                 <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="bg-amber/10 border border-amber/20 rounded-3 p-4 flex items-center justify-between">
                       <div className="flex items-center gap-3 text-amber">
                         <div className="w-10 h-10 rounded-pill bg-amber/20 flex items-center justify-center shrink-0">
                           <Clock className="w-5 h-5 text-amber" />
                         </div>
                         <div>
                           <div className="font-bold text-sm">
                             {isBuy ? 'Waiting for your payment' : `Waiting for ${trade.vendor} to pay`}
                           </div>
                           <div className="text-xs opacity-80 mt-0.5">Time remaining: 14:59</div>
                         </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="text-sm font-bold text-cream">{isBuy ? 'Total to Pay' : 'Expected Payment'}</div>
                       <div className="text-4xl font-display font-bold text-lime font-mono">₦{parseFloat(fiatAmount).toLocaleString()}</div>
                    </div>

                    {isBuy ? (
                       <>
                          <div className="bg-bg-elev border border-rule rounded-3 p-4 space-y-4">
                             <div className="text-sm font-bold text-cream mb-2">Seller's Bank Details</div>
                             <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="text-bone">Bank Name</div>
                                <div className="text-cream text-right font-medium">Guaranty Trust Bank (GTB)</div>
                                <div className="col-span-2 border-t border-rule-soft mt-1 pt-3"></div>
                                <div className="text-bone">Account Number</div>
                                <div className="text-cream text-right font-mono text-base flex justify-end items-center gap-2">
                                  0123456789 <button className="text-lime text-xs uppercase tracking-wider">Copy</button>
                                </div>
                                <div className="col-span-2 border-t border-rule-soft mt-1 pt-3"></div>
                                <div className="text-bone">Account Name</div>
                                <div className="text-cream text-right font-medium uppercase">Adeyemi John Doe</div>
                             </div>
                          </div>
                          <div className="flex gap-4">
                             <Button variant="secondary" className="flex-1 h-12" onClick={() => setStep('create')}>Cancel Order</Button>
                             <Button className="flex-1 h-12 bg-[#008751] hover:bg-[#008751]/90 shadow-[0_2px_0_#005A36] text-white focus-visible:ring-[#008751]" onClick={() => setStep('completed')}>Transferred, Notify Seller</Button>
                          </div>
                       </>
                    ) : (
                       <>
                          <div className="bg-bg-elev border border-rule rounded-3 p-4 space-y-3 text-sm text-bone">
                            <p>Once the buyer transfers the funds, you will review it and release your <span className="text-cream font-bold">{cryptoAmount} {trade.asset}</span>.</p>
                            <p>Do NOT release crypto until you have successfully logged into your bank app and verified the balance.</p>
                          </div>
                          
                          <div className="flex justify-between items-center bg-bg-base border border-rule rounded-2 p-3 mt-4">
                             <span className="text-sm font-medium text-bone">Simulate Buyer Action</span>
                             <Button size="sm" variant="secondary" onClick={() => setStep('completed')}>Simulate Buyer Paid</Button>
                          </div>
                       </>
                    )}
                 </div>
               )}

               {step === 'completed' && (
                 <div className="space-y-8 py-8 animate-in fade-in zoom-in-95 duration-300 text-center flex flex-col items-center">
                    <div className="w-24 h-24 relative">
                       <svg className="absolute inset-0 w-full h-full animate-[spin_3s_linear_infinite]">
                          <circle cx="48" cy="48" r="46" fill="none" stroke="var(--color-rule)" strokeWidth="4" />
                          <circle cx="48" cy="48" r="46" fill="none" stroke="var(--color-lime)" strokeWidth="4" strokeDasharray="290" strokeDashoffset="260" strokeLinecap="round" />
                       </svg>
                       <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-16 h-16 bg-lime-tint border border-lime rounded-full flex items-center justify-center text-lime">
                           {isBuy ? <Clock className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
                         </div>
                       </div>
                    </div>
                    
                    <div>
                       <h3 className="text-2xl font-display font-bold text-cream mb-2">
                         {isBuy ? 'Releasing Assets' : 'Verify Payment'}
                       </h3>
                       <p className="text-bone max-w-[280px] mx-auto text-sm leading-relaxed">
                          {isBuy ? (
                             <>You marked this order as paid. Once the seller confirms your transfer, the <span className="text-cream font-bold">{cryptoAmount} {trade.asset}</span> will be deposited into your wallet immediately.</>
                          ) : (
                             <>Buyer has marked the order as paid. Check your bank app to confirm receipt of <span className="text-cream font-bold">₦{parseFloat(fiatAmount).toLocaleString()}</span> before releasing assets.</>
                          )}
                       </p>
                    </div>
                    
                    {isBuy ? (
                       <div className="w-full bg-bg-elev border border-rule rounded-3 p-4 text-left">
                          <div className="flex justify-between items-center text-sm mb-3">
                             <span className="text-bone">Status</span>
                             <span className="text-amber font-bold flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Pending Seller Confirmation</span>
                          </div>
                          <div className="flex justify-between flex-col items-center border-t border-rule-soft pt-4 gap-2">
                             <div className="flex justify-between w-full">
                                <span className="text-xs text-bone">Average release time: 2 mins</span>
                             </div>
                             <div className="flex gap-2 w-full mt-2">
                                <Button variant="secondary" className="flex-1">Appeal Order</Button>
                                <Button onClick={() => setStep('released')} className="flex-1" style={{ backgroundColor: 'var(--color-rule)', color: 'var(--color-cream)' }}>Simulate Release</Button>
                             </div>
                          </div>
                       </div>
                    ) : (
                       <div className="w-full">
                          <Button className="w-full h-14 bg-lime text-bg-base hover:bg-lime-soft text-base font-bold shadow-[0_2px_0_#98D22C] mb-3" onClick={() => setStep('released')}>I have received payment</Button>
                          <Button variant="secondary" className="w-full h-12">Appeal Order</Button>
                       </div>
                    )}
                 </div>
               )}

               {step === 'released' && (
                 <div className="space-y-8 py-10 animate-in fade-in zoom-in duration-300 text-center flex flex-col items-center">
                    <div className="w-24 h-24 bg-lime-tint border border-lime rounded-full flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-12 h-12 text-lime" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-display font-bold text-cream mb-2">Trade Completed</h3>
                       <p className="text-bone text-sm">
                          {isBuy ? `You successfully purchased ${cryptoAmount} ${trade.asset}.` : `You successfully sold ${cryptoAmount} ${trade.asset}.`}
                       </p>
                    </div>
                    <div className="w-full">
                       <Button size="lg" className="w-full" onClick={onBack}>Go back to offers</Button>
                    </div>
                 </div>
               )}
            </Card>
            
            <div className="bg-bg-base border border-rule rounded-3 p-6 text-sm text-bone">
               <h3 className="font-bold text-cream mb-4">Terms and Conditions</h3>
               <ul className="list-disc pl-4 space-y-2">
                 <li>Do not put words like "Crypto", "Bitcoin" or "USDT" in your transfer narration.</li>
                 <li>Ensure you are transferring from an account bearing your name. Third-party payments are not allowed.</li>
                 <li>{isBuy ? 'Click "Transferred" ONLY when you have successfully sent the funds.' : 'Do NOT release crypto until you have successfully verified the payment in your bank.'}</li>
               </ul>
            </div>
         </div>

         {/* Right Side: Chat & Status */}
         <div className="lg:col-span-2 h-[600px] flex flex-col">
            <Card className="flex-1 flex flex-col p-0 overflow-hidden">
               {/* Chat Header */}
               <div className="p-4 border-b border-rule flex justify-between items-center bg-bg-elev shrink-0">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-pill bg-lime/10 text-lime flex items-center justify-center font-bold text-sm uppercase relative">
                        {trade.vendor.substring(0, 2)}
                        <span className="w-3 h-3 rounded-full bg-lime border-2 border-bg-elev absolute -bottom-1 -right-1"></span>
                     </div>
                     <div>
                       <div className="font-bold text-cream text-sm">{trade.vendor}</div>
                       <div className="text-xs text-bone">Online now</div>
                     </div>
                  </div>
                  <div className="flex gap-2 text-bone">
                     <button className="p-2 hover:text-cream transition-colors"><Phone className="w-4 h-4" /></button>
                     <button className="p-2 hover:text-cream transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                  </div>
               </div>

               {/* Chat Messages */}
               <div className="flex-1 bg-bg-base/50 p-4 flex flex-col gap-4 overflow-y-auto">
                  <div className="text-center text-xs text-bone my-2">Today 14:32</div>
                  <div className="bg-bg-elev border border-rule self-start max-w-[85%] rounded-2 rounded-tl-sm p-3 text-sm text-bone">
                     Hello! I am online. {isBuy ? 'Please proceed with payment and I will release the assets immediately based on the terms. No third party!' : 'I am ready to make payment. Please confirm your details.'}
                  </div>
                  {step !== 'create' && (
                     <div className="bg-lime/10 border border-lime/20 self-end max-w-[80%] rounded-2 rounded-tr-sm p-3 text-sm text-cream">
                       {isBuy ? "I'm making the transfer now." : "Details confirmed. Waiting for your transfer."}
                     </div>
                  )}
                  {(step === 'completed' || step === 'released') && (
                     <div className="bg-bg-elev border border-rule self-start max-w-[85%] rounded-2 rounded-tl-sm p-3 text-sm text-bone">
                       {isBuy ? "Payment sent! Please check your bank and release the assets." : "I have sent the money. Please verify and release."}
                     </div>
                  )}
                  {step === 'released' && (
                     <div className="bg-lime/10 border border-lime/20 self-end max-w-[80%] rounded-2 rounded-tr-sm p-3 text-sm text-cream">
                       {isBuy ? "Thanks! Verified." : "Payment received, assets released! Thanks."}
                     </div>
                  )}
               </div>

               {/* Chat Input */}
               <div className="p-4 border-t border-rule bg-bg-elev shrink-0 relative">
                  <button className="absolute left-7 top-1/2 -translate-y-1/2 text-bone hover:text-cream transition-colors">
                     <Upload className="w-5 h-5" />
                  </button>
                  <Input type="text" placeholder="Type a message..." className="pl-12 pr-12 w-full h-12 bg-bg-base" />
                  <button className="absolute right-7 top-1/2 -translate-y-1/2 text-lime hover:text-lime-soft transition-colors">
                     <Send className="w-5 h-5" />
                  </button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
