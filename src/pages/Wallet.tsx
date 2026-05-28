import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { Card, Button, Chip } from '../components/ui';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { Download, Send, RefreshCw, ArrowRightLeft, ArrowDownRight, Clock, Search, ChevronRight, X, Building, Wallet as WalletIcon, Check, Plus, AlertCircle, ChevronDown } from 'lucide-react';
import { Input, Label } from '../components/ui';
import { motion, AnimatePresence } from 'motion/react';

const WALLET_DATA = [

  { asset: 'Tether', ticker: 'USDT', balance: '4,500.25', fiat: '₦6,412,856.25', price: '₦1,425.00', icon: '₮', color: 'bg-[#26A17B]' },
  { asset: 'Bitcoin', ticker: 'BTC', balance: '0.1450', fiat: '₦5,092,458.00', price: '₦35,120,400', icon: '₿', color: 'bg-[#F7931A]' },
  { asset: 'Solana', ticker: 'SOL', balance: '24.50', fiat: '₦3,491,250.00', price: '₦142,500', icon: '◎', color: 'bg-black border border-[#14F195]' },
  { asset: 'Ethereum', ticker: 'ETH', balance: '0.8500', fiat: '₦2,450,150.00', price: '₦2,882,529', icon: 'Ξ', color: 'bg-[#627EEA]' },
];

export default function Wallet() {
  const [activeTab, setActiveTab] = useState('crypto');
  const [activeModal, setActiveModal] = useState<'deposit' | 'withdraw' | 'send' | null>(null);

  return (
    <div className="max-w-7xl mx-auto pb-24 lg:pb-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-cream">Wallet</h1>
          <p className="text-bone text-sm mt-1">Manage your fiat and crypto balances securely.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="secondary" className="flex-1 sm:flex-none" onClick={() => setActiveModal('deposit')}><Download className="w-4 h-4 mr-2" /> Deposit</Button>
          <Button className="flex-1 sm:flex-none" onClick={() => setActiveModal('send')}><Send className="w-4 h-4 mr-2" /> Send</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
         {/* Main Balance Card */}
         <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-bg-elev to-bg-base border-rule flex flex-col relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-8 relative z-10">
               <div>
                 <div className="text-sm text-bone mb-2 flex items-center gap-2">Estimated Total Balance <RefreshCw className="w-3.5 h-3.5 text-bone hover:text-cream cursor-pointer" /></div>
                 <div className="text-4xl sm:text-5xl font-display font-bold text-cream tabular-nums tracking-tight">₦17,896,914.25</div>
                 <div className="text-sm text-lime font-medium mt-2">≈ $12,559.23 USD</div>
               </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-auto relative z-10">
               <div className="bg-bg-base border border-rule rounded-3 p-4">
                  <div className="text-xs text-bone mb-1">Naira Balance</div>
                  <div className="font-mono font-bold text-cream">₦450,200.00</div>
               </div>
               <div className="bg-bg-base border border-rule rounded-3 p-4">
                  <div className="text-xs text-bone mb-1">Crypto Value</div>
                  <div className="font-mono font-bold text-cream">₦17,446,714.25</div>
               </div>
               <div className="bg-bg-base border border-rule rounded-3 p-4">
                  <div className="text-xs text-bone mb-1">In Orders</div>
                  <div className="font-mono font-bold text-cream">₦0.00</div>
               </div>
               <div className="bg-bg-base border border-rule rounded-3 p-4">
                  <div className="text-xs text-bone mb-1">Total Assets</div>
                  <div className="font-mono font-bold text-cream">5</div>
               </div>
            </div>
         </Card>

         {/* Quick Actions */}
         <Card className="p-6">
            <h3 className="font-display font-bold text-cream mb-4">Quick Actions</h3>
            <div className="space-y-3">
               <button onClick={() => setActiveModal('deposit')} className="w-full flex items-center justify-between p-3 rounded-2 border border-rule bg-bg-base hover:bg-rule-soft transition-colors group">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-pill bg-[#008751]/10 text-[#008751] flex items-center justify-center shrink-0">
                        <Download className="w-4 h-4" />
                     </div>
                     <div className="text-left">
                        <div className="text-sm font-bold text-cream">Deposit NGN</div>
                        <div className="text-xs text-bone">Bank transfer, card</div>
                     </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-bone group-hover:text-cream transition-colors" />
               </button>
               <button onClick={() => setActiveModal('withdraw')} className="w-full flex items-center justify-between p-3 rounded-2 border border-rule bg-bg-base hover:bg-rule-soft transition-colors group">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-pill bg-rust/10 text-rust flex items-center justify-center shrink-0">
                        <ArrowDownRight className="w-4 h-4" />
                     </div>
                     <div className="text-left">
                        <div className="text-sm font-bold text-cream">Withdraw NGN</div>
                        <div className="text-xs text-bone">To local bank</div>
                     </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-bone group-hover:text-cream transition-colors" />
               </button>
               <Link to="/app/trade" className="w-full flex items-center justify-between p-3 rounded-2 border border-rule bg-bg-base hover:bg-rule-soft transition-colors group">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-pill bg-info/10 text-info flex items-center justify-center shrink-0">
                        <ArrowRightLeft className="w-4 h-4" />
                     </div>
                     <div className="text-left">
                        <div className="text-sm font-bold text-cream">Swap Crypto</div>
                        <div className="text-xs text-bone">Zero fee conversion</div>
                     </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-bone group-hover:text-cream transition-colors" />
               </Link>
            </div>
         </Card>
      </div>

      {/* Asset List */}
      <Card className="overflow-hidden p-0">
         <div className="p-4 border-b border-rule flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-bg-elev">
            <div className="flex gap-4">
              <button 
                className={`text-sm font-bold pb-2 border-b-2 transition-colors ${activeTab === 'crypto' ? 'border-lime text-cream' : 'border-transparent text-bone hover:text-cream'}`}
                onClick={() => setActiveTab('crypto')}
              >
                Crypto Balances
              </button>
              <button 
                className={`text-sm font-bold pb-2 border-b-2 transition-colors ${activeTab === 'fiat' ? 'border-lime text-cream' : 'border-transparent text-bone hover:text-cream'}`}
                onClick={() => setActiveTab('fiat')}
              >
                Fiat Balances
              </button>
            </div>
            <div className="relative">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-bone" />
               <input type="text" placeholder="Search assets..." className="bg-bg-base border border-rule rounded-pill pl-9 pr-4 py-1.5 text-sm w-full sm:w-48 text-cream focus:outline-none focus:border-lime" />
            </div>
         </div>

         {activeTab === 'crypto' && (
           <div className="overflow-x-auto">
             <table className="w-full text-sm">
               <thead className="bg-bg-base font-medium text-bone text-xs">
                 <tr>
                   <th className="text-left py-3 px-6 uppercase tracking-wider font-normal">Asset</th>
                   <th className="text-right py-3 px-6 uppercase tracking-wider font-normal">Balance</th>
                   <th className="text-right py-3 px-6 uppercase tracking-wider font-normal hidden sm:table-cell">Current Price</th>
                   <th className="text-right py-3 px-6 uppercase tracking-wider font-normal">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-rule/50">
                  {WALLET_DATA.map((asset, i) => (
                    <tr key={i} className="hover:bg-bg-elev transition-colors cursor-pointer group">
                       <td className="py-4 px-6">
                         <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-pill flex items-center justify-center text-white text-xs font-bold ${asset.color}`}>
                               {asset.icon}
                            </div>
                            <div>
                               <div className="font-bold text-cream group-hover:text-lime transition-colors">{asset.asset}</div>
                               <div className="text-xs text-bone">{asset.ticker}</div>
                            </div>
                         </div>
                       </td>
                       <td className="py-4 px-6 text-right">
                         <div className="font-mono text-cream">{asset.balance}</div>
                         <div className="text-xs text-bone font-mono mt-0.5">{asset.fiat}</div>
                       </td>
                       <td className="py-4 px-6 text-right hidden sm:table-cell">
                         <div className="font-mono text-cream">{asset.price}</div>
                       </td>
                       <td className="py-4 px-6 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="secondary" size="sm" className="h-8 text-xs font-medium px-3" onClick={() => setActiveModal('deposit')}>Deposit</Button>
                            <Link to="/app/trade">
                               <Button variant="secondary" size="sm" className="h-8 text-xs font-medium px-3">Trade</Button>
                            </Link>
                         </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
             </table>
           </div>
         )}

         {activeTab === 'fiat' && (
            <div className="p-6">
               <div className="max-w-md p-4 rounded-3 border border-rule bg-bg-base flex justify-between items-center hover:border-lime transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[#008751] flex items-center justify-center border-2 border-[#008751]/20">
                        <div className="w-2 h-full bg-white"></div>
                     </div>
                     <div>
                        <div className="font-bold text-cream text-lg">Nigerian Naira</div>
                        <div className="text-xs text-bone">NGN</div>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="font-mono font-bold text-xl text-cream tabular-nums">₦450,200.00</div>
                  </div>
               </div>
            </div>
         )}
      </Card>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-display font-bold text-cream">
                  {activeModal === 'deposit' && 'Deposit Funds'}
                  {activeModal === 'withdraw' && 'Withdraw Funds'}
                  {activeModal === 'send' && 'Send Crypto'}
               </h3>
               <button onClick={() => setActiveModal(null)} className="text-bone hover:text-cream transition-colors p-1">
                 <X className="w-5 h-5" />
               </button>
            </div>

            {activeModal === 'deposit' && <DepositModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'withdraw' && <WithdrawModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'send' && <SendModal onClose={() => setActiveModal(null)} />}
          </Card>
        </div>
      )}
    </div>
  );
}

function CustomSelect({ options, value, onChange }: { options: any[], value: string, onChange: (v: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find(o => o.value === value) || options[0];

  return (
    <div className="relative">
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between h-12 w-full rounded-2 bg-bg-elev border border-rule px-3 py-2 text-sm text-cream hover:border-rule-strong transition-colors">
         <div className="flex items-center gap-2">
            {selected.icon && selected.icon}
            <span>{selected.label}</span>
         </div>
         <ChevronDown className={`w-4 h-4 text-bone transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute z-20 top-full mt-1 left-0 right-0 bg-bg-elev border border-rule-strong rounded-2 shadow-xl overflow-hidden py-1 max-h-[300px] overflow-y-auto">
              {options.map((opt: any) => (
                <button key={opt.value} type="button" className={`w-full text-left px-3 py-2.5 text-sm hover:bg-rule-soft transition-colors flex items-center justify-between ${opt.value === value ? 'text-cream bg-rule-soft/50' : 'text-bone hover:text-cream'}`} onClick={() => { onChange(opt.value); setIsOpen(false); }}>
                  <div className="flex items-center gap-2">
                    {opt.icon && opt.icon}
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

function DepositModal({ onClose }: { onClose: () => void }) {
  const { showToast } = useToast();
  const [asset, setAsset] = useState('ngn');
  const [network, setNetwork] = useState('trc20');
  
  const assetOptions = [
    { value: 'ngn', label: 'NGN - Nigerian Naira', icon: <div className="w-5 h-5 rounded-full bg-[#008751] flex items-center justify-center shrink-0"><div className="w-1.5 h-full bg-white"></div></div> },
    { value: 'usdt', label: 'USDT - Tether', icon: <div className="w-5 h-5 rounded-full bg-[#26A17B] flex items-center justify-center text-white text-[10px] font-bold">₮</div> },
    { value: 'btc', label: 'BTC - Bitcoin', icon: <div className="w-5 h-5 rounded-full bg-[#F7931A] flex items-center justify-center text-white text-[10px] font-bold">₿</div> }
  ];

  const networkOptions = [
    { value: 'trc20', label: 'Tron (TRC20)' },
    { value: 'erc20', label: 'Ethereum (ERC20)' },
    { value: 'bep20', label: 'BNB Smart Chain (BEP20)' }
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Asset</Label>
        <CustomSelect options={assetOptions} value={asset} onChange={setAsset} />
      </div>

      <AnimatePresence mode="wait">
        {asset === 'ngn' ? (
          <motion.div key="ngn-deposit" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden pt-2">
            <div className="p-4 bg-bg-elev border border-rule rounded-3 space-y-4">
               <div>
                 <div className="text-xs text-bone mb-1">Bank Name</div>
                 <div className="text-sm font-bold text-cream">Voltex - Wema Bank</div>
               </div>
               <div>
                 <div className="text-xs text-bone mb-1">Account Number</div>
                 <div className="flex items-center justify-between">
                   <div className="text-2xl font-mono font-bold text-lime tracking-wider">9023418765</div>
                   <Button variant="secondary" size="sm" className="h-8" onClick={() => {
                     navigator.clipboard.writeText("9023418765");
                     showToast("Account number copied! Send NGN bank transfers here.", "success");
                   }}>Copy</Button>
                 </div>
               </div>
               <div>
                 <div className="text-xs text-bone mb-1">Account Name</div>
                 <div className="text-sm font-bold text-cream">VOLTEX / JOHN DOE</div>
               </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-info/10 rounded-2 border border-info/20 text-info">
               <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
               <p className="text-xs leading-relaxed">Transfers to this bank account will automatically be credited to your NGN balance within 1-5 minutes.</p>
            </div>
            
            <Button className="w-full mt-4 bg-lime text-bg-base hover:bg-lime/90 font-bold" onClick={() => {
              showToast("Transfer details submitted! Your wallet will reflect NGN automatically after bank clearance.", "info");
              onClose();
            }}>I've Made this Transfer</Button>
          </motion.div>
        ) : (
          <motion.div key="crypto-deposit" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden pt-2">
             <div className="space-y-2">
               <Label>Network</Label>
               <CustomSelect options={networkOptions} value={network} onChange={setNetwork} />
             </div>
             <div className="pt-2 space-y-2">
               <Label>Deposit Address</Label>
               <div className="p-4 bg-bg-base border border-rule rounded-2 font-mono text-sm break-all text-cream text-center tracking-wider">
                 TY9vNQKX8T4...L8p9wB2z
               </div>
             </div>
             <Button className="w-full mt-4 bg-lime text-bg-base hover:bg-lime/90 font-bold" onClick={() => {
                navigator.clipboard.writeText("TY9vNQKX8T4m7W1Yx9vL8p9wB2z");
                showToast("Crypto deposit address copied!", "success");
             }}>Copy Address</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function WithdrawModal({ onClose }: { onClose: () => void }) {
  const { showToast } = useToast();
  const [asset, setAsset] = useState('ngn');
  const [bank, setBank] = useState('gtb');
  const [addingBank, setAddingBank] = useState(false);
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const assetOptions = [
    { value: 'ngn', label: 'NGN - Nigerian Naira', icon: <div className="w-5 h-5 rounded-full bg-[#008751] flex items-center justify-center shrink-0"><div className="w-1.5 h-full bg-white"></div></div> },
    { value: 'usdt', label: 'USDT - Tether', icon: <div className="w-5 h-5 rounded-full bg-[#26A17B] flex items-center justify-center text-white text-[10px] font-bold">₮</div> },
  ];

  const bankOptions = [
    { value: 'gtb', label: 'GTBank - ****4920' },
    { value: 'zenith', label: 'Zenith Bank - ****2210' },
    { value: 'add_new', label: 'Add New Bank Account...', icon: <Plus className="w-4 h-4 text-lime" /> }
  ];

  const availableBalance = asset === 'ngn' ? '450200' : '4500.25';

  const handleMax = () => {
    setAmount(availableBalance);
  };

  const handleConfirm = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
      showToast(`Withdrawal of ${parseFloat(amount).toLocaleString()} ${asset.toUpperCase()} successfully initiated!`, "success");
    }, 1500);
  };

  if (step === 'success') {
     return (
        <div className="py-6 text-center flex flex-col items-center animate-in fade-in zoom-in duration-300">
           <div className="w-20 h-20 bg-lime-tint border border-lime rounded-full flex items-center justify-center mb-6">
             <Check className="w-10 h-10 text-lime" />
           </div>
           <h3 className="text-2xl font-display font-bold text-cream mb-2">Withdrawal Initiated!</h3>
           <p className="text-bone mb-8">Your withdrawal of <span className="text-cream font-bold">{amount} {asset.toUpperCase()}</span> is being processed.</p>
           <Button className="w-full h-12" onClick={onClose} variant="secondary">Done</Button>
        </div>
     );
  }

  return (
    <div className="space-y-4">
      {addingBank ? (
         <AnimatePresence>
           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <button className="text-sm text-bone hover:text-cream flex items-center gap-1 mb-4" onClick={() => setAddingBank(false)}>
                 &larr; Back
              </button>
              <div className="space-y-2">
                <Label>Bank Name</Label>
                <select className="flex h-11 w-full rounded-2 bg-bg-high border border-rule px-3 py-2 text-sm text-cream focus-visible:outline-none focus-visible:border-lime">
                   <option>Access Bank</option>
                   <option>GTBank</option>
                   <option>Zenith Bank</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Account Number</Label>
                <Input type="text" placeholder="e.g. 0123456789" />
              </div>
              <div className="space-y-2">
                <Label>Account Name</Label>
                <Input type="text" placeholder="Enter name on account" />
              </div>
              <Button className="w-full mt-4" onClick={() => { setBank('gtb'); setAddingBank(false); }}>Save Account</Button>
           </motion.div>
         </AnimatePresence>
      ) : (
         <AnimatePresence>
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="space-y-2">
                <Label>Asset to Withdraw</Label>
                <CustomSelect options={assetOptions} value={asset} onChange={setAsset} />
              </div>
              {asset === 'ngn' && (
                <div className="space-y-2">
                  <Label>Select Destination</Label>
                  <CustomSelect options={bankOptions} value={bank} onChange={(val) => {
                     if (val === 'add_new') {
                        setAddingBank(true);
                     } else {
                        setBank(val);
                     }
                  }} />
                </div>
              )}
              <div className="space-y-2 pt-2">
                <Label>Amount ({asset.toUpperCase()})</Label>
                <Input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <div className="flex justify-between text-xs text-bone">
                  <span>Available: {asset === 'ngn' ? '₦450,200.00' : '4,500.25 USDT'}</span>
                  <button className="text-lime hover:underline" onClick={handleMax}>Max</button>
                </div>
              </div>
              <Button className="w-full mt-4 h-12 bg-rust hover:bg-rust/90 shadow-[0_2px_0_#A1351A] focus-visible:ring-rust text-base relative" onClick={handleConfirm} disabled={isSubmitting || !amount}>
                 {isSubmitting ? <RefreshCw className="w-5 h-5 animate-spin mx-auto" /> : 'Confirm Withdrawal'}
              </Button>
           </motion.div>
         </AnimatePresence>
      )}
    </div>
  )
}

function SendModal({ onClose }: { onClose: () => void }) {
  const { showToast } = useToast();
  const [asset, setAsset] = useState('usdt');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSending, setIsSending] = useState(false);

  const assetOptions = [
    { value: 'usdt', label: 'USDT - Tether', icon: <div className="w-5 h-5 rounded-full bg-[#26A17B] flex items-center justify-center text-white text-[10px] font-bold">₮</div> },
    { value: 'btc', label: 'BTC - Bitcoin', icon: <div className="w-5 h-5 rounded-full bg-[#F7931A] flex items-center justify-center text-white text-[10px] font-bold">₿</div> }
  ];

  const handleMax = () => {
     setAmount(asset === 'usdt' ? '4500.25' : '0.1450');
  };

  const handleSend = () => {
     if (!amount) return;
     setIsSending(true);
     setTimeout(() => {
        setIsSending(false);
        setStep('success');
        showToast(`Successfully sent ${parseFloat(amount).toLocaleString()} ${asset.toUpperCase()}!`, "success");
     }, 1500);
  };

  if (step === 'success') {
     return (
        <div className="py-6 text-center flex flex-col items-center animate-in fade-in zoom-in duration-300">
           <div className="w-20 h-20 bg-lime-tint border border-lime rounded-full flex items-center justify-center mb-6">
             <Check className="w-10 h-10 text-lime" />
           </div>
           <h3 className="text-2xl font-display font-bold text-cream mb-2">Sent Successfully!</h3>
           <p className="text-bone mb-8">Your crypto is on its way. You can track this transfer in your transaction history.</p>
           <Button className="w-full h-12" onClick={onClose} variant="secondary">Done</Button>
        </div>
     );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Select Asset</Label>
        <CustomSelect options={assetOptions} value={asset} onChange={setAsset} />
      </div>
      <div className="space-y-2">
        <Label>Recipient Address or Email</Label>
        <Input placeholder="Enter wallet address or VoltPay email" value={recipient} onChange={e => setRecipient(e.target.value)} />
        <div className="text-xs text-bone mt-1">Transfers to Voltex emails are instant and free.</div>
      </div>
      <div className="space-y-2 pt-2">
        <Label>Amount</Label>
        <Input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <div className="flex justify-between text-xs text-bone">
          <span>Available: {asset === 'usdt' ? '4,500.25 USDT' : '0.1450 BTC'}</span>
          <button className="text-lime hover:underline" onClick={handleMax}>Max</button>
        </div>
      </div>
      <Button className="w-full mt-4 h-12 relative flex items-center justify-center" onClick={handleSend} disabled={isSending || !amount}>
         {isSending ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Send Crypto'}
      </Button>
    </div>
  )
}

