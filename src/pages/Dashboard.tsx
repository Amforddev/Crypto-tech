import React, { useState } from 'react';
import { Card, Button, Chip } from '../components/ui';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis } from 'recharts';
import { ArrowUpRight, ArrowDownRight, ArrowRightLeft, Send, Download, Gift, Copy, X, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const portfolioData = [
  { time: '1D', value: 14500000 },
  { time: '1D', value: 14750000 },
  { time: '1D', value: 14600000 },
  { time: '1D', value: 14850000 },
  { time: '1D', value: 14800000 },
  { time: '1D', value: 14950000 },
  { time: '1D', value: 15090521 },
];

const COLORS = ['#F0B23E', '#D6FF3F', '#6BB6E8', '#6BD96B', '#8C8678'];
const allocationData = [
  { name: 'Bitcoin', value: 54 },
  { name: 'Solana', value: 22 },
  { name: 'USDC', value: 16 },
  { name: 'Ethereum', value: 8 },
  { name: 'Others', value: 3 },
];

const sparklineData = [10, 15, 13, 20, 18, 25, 23, 28, 25, 30];
const sparklineDown = [30, 25, 28, 22, 24, 18, 20, 15, 12, 10];
const mapSparkline = (data: number[], color: string) => data.map((v, i) => ({ val: v, name: i, color }));

export default function Dashboard() {
  const [showBanner, setShowBanner] = useState(true);
  const [timeTab, setTimeTab] = useState('1D');
  const [marketTab, setMarketTab] = useState('Top gainers');

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-24 lg:pb-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-cream">Welcome back, Adaeze</h1>
          <p className="text-bone text-sm mt-1">Here's your portfolio at a glance · updated 4s ago</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="secondary" className="flex-1 sm:flex-none">Deposit</Button>
          <Link to="/app/trade" className="flex-1 sm:flex-none">
            <Button className="w-full">Trade</Button>
          </Link>
        </div>
      </div>

      {/* Referral Banner */}
      {showBanner && (
        <div className="bg-lime-tint border border-lime-line rounded-3 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
          <button onClick={() => setShowBanner(false)} className="absolute top-3 right-3 text-lime hover:text-lime-soft">
            <X className="w-4 h-4" />
          </button>
          <div>
            <h3 className="font-bold text-lime font-display">Refer a friend, earn ₦2,500 each</h3>
            <p className="text-sm text-lime/80 mt-1">Share your link and earn when they complete their first trade.</p>
          </div>
          <div className="flex items-center gap-3 sm:pr-6 w-full sm:w-auto">
            <div className="bg-bg-elev border border-rule-strong rounded-2 px-3 py-2 flex items-center gap-2 font-mono text-sm text-cream flex-1 sm:flex-none justify-between">
              VOLT-A0CKR
              <Copy className="w-4 h-4 text-bone hover:text-cream cursor-pointer shrink-0" />
            </div>
            <Button size="sm" className="bg-lime text-bg-base hover:bg-lime-soft">Invite now</Button>
          </div>
        </div>
      )}

      {/* Top Region */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart Card */}
        <Card className="lg:col-span-2 p-6 flex flex-col">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                 <div className="text-sm text-bone mb-2">Total Portfolio Value</div>
                 <div className="text-4xl sm:text-5xl font-display font-bold text-cream tabular-nums tracking-tight">₦15,090,521.50</div>
                 <div className="mt-3 inline-flex items-center gap-2">
                   <Chip variant="success">+₦345,670.20 / +2.34% today</Chip>
                 </div>
              </div>
              <div className="flex bg-bg-elev p-1 rounded-pill border border-rule self-start w-full sm:w-auto overflow-x-auto">
                {['1D', '1W', '1M', '1Y', 'All'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setTimeTab(t)}
                    className={`px-4 py-1.5 rounded-pill text-xs font-bold transition-colors shrink-0 ${timeTab === t ? 'bg-rule text-cream' : 'text-bone hover:text-cream'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
           </div>

           <div className="h-[240px] w-full mb-8">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={portfolioData}>
                 <defs>
                   <linearGradient id="colorValue" x1="0"y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="var(--color-lime)" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="var(--color-lime)" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <RechartsTooltip 
                   contentStyle={{ backgroundColor: 'var(--color-bg-elev)', border: '1px solid var(--color-rule)', borderRadius: '8px' }}
                   itemStyle={{ color: 'var(--color-cream)' }}
                   formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Value']}
                   labelStyle={{ display: 'none' }}
                 />
                 <Area type="monotone" dataKey="value" stroke="var(--color-lime)" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>

           <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-auto">
             <QuickAction to="/app/trade" icon={<ArrowUpRight className="w-5 h-5"/>} label="Buy" color="bg-lime/10 text-lime border-lime/20 hover:bg-lime/20" />
             <QuickAction to="/app/trade" icon={<ArrowDownRight className="w-5 h-5"/>} label="Sell" color="bg-rust/10 text-rust border-rust/20 hover:bg-rust/20" />
             <QuickAction to="/app/trade" icon={<ArrowRightLeft className="w-5 h-5"/>} label="Swap" color="bg-lime/10 text-lime border-lime/20 hover:bg-lime/20" />
             <QuickAction to="/app/wallet" icon={<Send className="w-5 h-5"/>} label="Send" color="bg-info/10 text-info border-info/20 hover:bg-info/20" />
             <QuickAction to="/app/wallet" icon={<Download className="w-5 h-5"/>} label="Receive" color="bg-good/10 text-good border-good/20 hover:bg-good/20" />
             <QuickAction to="/app/gift-cards" icon={<Gift className="w-5 h-5"/>} label="Gift Card" color="bg-amber/10 text-amber border-amber/20 hover:bg-amber/20" />
           </div>
        </Card>

        {/* Right Column Top */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-bone mb-4">24h Profit/Loss</h3>
            <div className="text-2xl font-display font-bold text-good tabular-nums mb-1">+₦182,453.00</div>
            <div className="text-sm text-good font-medium">+1.22%</div>
            <div className="mt-6 pt-6 border-t border-rule-soft">
              <h3 className="text-sm font-medium text-bone mb-4">Available NGN Balance</h3>
              <div className="text-3xl font-display font-bold text-cream tabular-nums mb-6">₦450,200.00</div>
              <div className="flex gap-3">
                 <Link to="/app/wallet" className="flex-1">
                    <Button variant="secondary" className="w-full h-10 text-xs">Withdraw</Button>
                 </Link>
                 <Link to="/app/wallet" className="flex-1">
                    <Button className="w-full h-10 text-xs">Deposit</Button>
                 </Link>
              </div>
            </div>
          </Card>

          {/* Allocation Donut */}
          <Card className="p-6">
            <h3 className="font-display font-bold text-cream mb-6">Allocation</h3>
            <div className="relative h-[200px] mb-6">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={allocationData}
                     innerRadius={70}
                     outerRadius={90}
                     paddingAngle={5}
                     dataKey="value"
                     stroke="none"
                   >
                     {allocationData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Pie>
                 </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <div className="text-xs text-bone font-medium">Total</div>
                 <div className="text-xl font-display font-bold text-cream tabular-nums">₦15.1M</div>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
              {allocationData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                  <div className="text-sm font-medium text-cream">{item.name}</div>
                  <div className="text-xs text-bone ml-auto">{item.value}%</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Region */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-display font-bold text-cream text-lg">Recent activity</h3>
             <Link to="/app/wallet" className="text-sm text-lime hover:text-lime-soft font-medium">See all</Link>
          </div>
          <div className="space-y-4">
             <ActivityRow icon={<ArrowUpRight/>} color="text-good" bg="bg-good/10" title="Bought BTC" sub="Market order · 2h ago" amount="+0.015 BTC" amountClass="text-good" subAmount="₦526,800.00" status="Completed" />
             <ActivityRow icon={<Gift/>} color="text-amber" bg="bg-amber/10" title="Sold Amazon Gift Card" sub="$100 · Physical · 5h ago" amount="+₦115,000.00" amountClass="text-good" subAmount="Success" status="Completed" />
             <ActivityRow icon={<ArrowRightLeft/>} color="text-info" bg="bg-info/10" title="Swapped USDT → SOL" sub="250 USDT · Yesterday" amount="+1.75 SOL" amountClass="text-good" subAmount="-250 USDT" status="Completed" />
             <ActivityRow icon={<Download/>} color="text-white" bg="bg-white/10" title="Bank Transfer Received" sub="GTBank · Yesterday" amount="+₦2,500,000.00" amountClass="text-cream" subAmount="Funded" status="Completed" />
             <ActivityRow icon={<ArrowDownRight/>} color="text-rust" bg="bg-rust/10" title="Sold ETH via P2P" sub="To @KwameTrader · Oct 12" amount="-1.5 ETH" amountClass="text-rust" subAmount="+₦3,150,000.00" status="Completed" isLast />
          </div>
        </Card>

        <div className="space-y-6 flex flex-col">
           {/* Markets snapshot */}
           <Card className="p-6 flex-1">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-display font-bold text-cream text-lg">Markets snapshot</h3>
                 <Link to="/app/markets" className="text-sm text-lime hover:text-lime-soft font-medium">View markets</Link>
              </div>
              <div className="flex gap-4 border-b border-rule mb-4">
                 {['Top gainers', 'Top losers', 'Most traded'].map(t => (
                   <button 
                     key={t}
                     onClick={() => setMarketTab(t)}
                     className={`text-sm font-medium pb-2 border-b-2 transition-colors ${marketTab === t ? 'border-lime text-cream' : 'border-transparent text-bone hover:text-cream'}`}
                   >
                     {t}
                   </button>
                 ))}
              </div>
              <div className="space-y-3">
                 <MarketRow name="Solana" ticker="SOL" price="₦142,500" change="+12.4%" isUp={true} spark={sparklineData} />
                 <MarketRow name="Avalanche" ticker="AVAX" price="₦45,200" change="+8.2%" isUp={true} spark={sparklineData} />
                 <MarketRow name="Chainlink" ticker="LINK" price="₦21,400" change="+5.1%" isUp={true} spark={sparklineData} />
              </div>
           </Card>

           {/* Watchlist */}
           <Card className="p-6">
              <h3 className="font-display font-bold text-cream text-lg mb-4">Your watchlist</h3>
              <div className="grid grid-cols-2 gap-4">
                 <WatchlistCard ticker="ETH" price="₦2,105,300" change="+1.80%" isUp={true} />
                 <WatchlistCard ticker="DOGE" price="₦185.40" change="-0.50%" isUp={false} />
                 <WatchlistCard ticker="XRP" price="₦840.50" change="+2.10%" isUp={true} />
                 <WatchlistCard ticker="LTC" price="₦98,400" change="-1.20%" isUp={false} />
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, color, to }: { icon: React.ReactNode, label: string, color: string, to: string }) {
  return (
    <Link to={to} className={`flex flex-col items-center justify-center p-3 rounded-3 border transition-colors ${color} gap-2`}>
      {icon}
      <span className="text-xs font-bold text-cream">{label}</span>
    </Link>
  )
}

function ActivityRow({ icon, color, bg, title, sub, amount, subAmount, amountClass, status, isLast }: any) {
  return (
    <div className={`flex justify-between items-center group ${isLast ? '' : 'border-b border-rule/50 pb-4'}`}>
      <div className="flex gap-3 items-center">
         <div className={`w-10 h-10 rounded-pill flex items-center justify-center ${bg} ${color}`}>
           {icon}
         </div>
         <div>
           <div className="text-sm font-medium text-cream">{title}</div>
           <div className="text-xs text-bone">{sub}</div>
         </div>
      </div>
      <div className="text-right">
         <div className={`text-sm font-mono font-medium ${amountClass}`}>{amount}</div>
         <div className="text-xs text-bone font-mono flex items-center justify-end gap-2">
           {subAmount} <span className="w-1.5 h-1.5 rounded-full bg-good/50 inline-block"></span>
         </div>
      </div>
    </div>
  )
}

function MarketRow({ name, ticker, price, change, isUp, spark }: any) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-rule-soft rounded-2 transition-colors cursor-pointer group">
      <div className="flex items-center gap-3 w-1/3">
         <div className="w-8 h-8 rounded-pill bg-bg-elev border border-rule flex items-center justify-center font-bold text-xs">{ticker[0]}</div>
         <div>
           <div className="text-sm font-medium text-cream">{name}</div>
           <div className="text-xs text-bone font-mono">{ticker}</div>
         </div>
      </div>
      <div className="w-20 h-8 hidden sm:block">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mapSparkline(spark, isUp ? 'var(--color-good)' : 'var(--color-bad)')}>
            <Area type="monotone" dataKey="val" stroke={isUp ? 'var(--color-good)' : 'var(--color-bad)'} strokeWidth={1.5} fill="transparent" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="text-right w-1/3">
         <div className="text-sm font-mono text-cream">{price}</div>
         <div className={`text-xs font-mono font-medium ${isUp ? 'text-good' : 'text-bad'}`}>{change}</div>
      </div>
      <div className="w-16 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
         <Link to="/app/trade">
            <Button variant="secondary" size="sm" className="h-7 text-xs px-2">Trade</Button>
         </Link>
      </div>
    </div>
  )
}

function WatchlistCard({ ticker, price, change, isUp }: any) {
  return (
    <div className="p-3 border border-rule rounded-2 bg-bg-elev hover:border-rule-strong transition-colors cursor-pointer flex flex-col gap-2 relative group">
       <Star className="w-4 h-4 text-lime absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity" />
       <div className="flex items-center gap-2">
         <div className="w-6 h-6 rounded-pill bg-bg-base border border-rule flex items-center justify-center font-bold text-[10px]">{ticker[0]}</div>
         <div className="text-sm font-bold text-cream">{ticker}</div>
       </div>
       <div className="mt-1">
         <div className="text-sm font-mono text-cream">{price}</div>
         <div className={`text-xs font-mono font-medium ${isUp ? 'text-good' : 'text-bad'}`}>{change}</div>
       </div>
    </div>
  )
}
