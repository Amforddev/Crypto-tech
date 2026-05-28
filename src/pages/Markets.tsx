import React, { useState } from 'react';
import { Card, Button, Input } from '../components/ui';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Search, ChevronDown, ArrowUpRight, ArrowDownRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const MARKETS_DATA = [
  { name: 'Bitcoin', ticker: 'BTC', price: '₦35,120,400', change: '+2.45%', isUp: true, vol: '₦1.2B', mcap: '$1.3T', chart: Array.from({length:20}).map(()=>({v: 10 + Math.random()*5})) },
  { name: 'Ethereum', ticker: 'ETH', price: '₦2,882,529', change: '+1.80%', isUp: true, vol: '₦850M', mcap: '$380B', chart: Array.from({length:20}).map(()=>({v: 10 + Math.random()*5})) },
  { name: 'Tether', ticker: 'USDT', price: '₦1,425.00', change: '-0.10%', isUp: false, vol: '₦2.5B', mcap: '$95B', chart: Array.from({length:20}).map(()=>({v: 14 + Math.random()})) },
  { name: 'Solana', ticker: 'SOL', price: '₦142,500', change: '+12.4%', isUp: true, vol: '₦520M', mcap: '$65B', chart: Array.from({length:20}).map(()=>({v: 5 + Math.random()*15})) },
  { name: 'Binance Coin', ticker: 'BNB', price: '₦520,400', change: '-1.20%', isUp: false, vol: '₦120M', mcap: '$58B', chart: Array.from({length:20}).map(()=>({v: 20 - Math.random()*5})) },
  { name: 'XRP', ticker: 'XRP', price: '₦840.50', change: '+0.50%', isUp: true, vol: '₦85M', mcap: '$32B', chart: Array.from({length:20}).map(()=>({v: 10 + Math.random()*2})) },
  { name: 'Cardano', ticker: 'ADA', price: '₦580.20', change: '-2.10%', isUp: false, vol: '₦45M', mcap: '$18B', chart: Array.from({length:20}).map(()=>({v: 15 - Math.random()*4})) },
  { name: 'Avalanche', ticker: 'AVAX', price: '₦45,200', change: '+8.20%', isUp: true, vol: '₦110M', mcap: '$14B', chart: Array.from({length:20}).map(()=>({v: 10 + Math.random()*8})) },
  { name: 'Dogecoin', ticker: 'DOGE', price: '₦185.40', change: '+5.50%', isUp: true, vol: '₦90M', mcap: '$12B', chart: Array.from({length:20}).map(()=>({v: 5 + Math.random()*6})) },
  { name: 'Polkadot', ticker: 'DOT', price: '₦9,800', change: '-1.50%', isUp: false, vol: '₦35M', mcap: '$9B', chart: Array.from({length:20}).map(()=>({v: 12 - Math.random()*3})) },
];

export default function Markets() {
  const [tab, setTab] = useState('all');

  return (
    <div className="max-w-7xl mx-auto pb-24 lg:pb-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-cream">Markets</h1>
          <p className="text-bone text-sm mt-1">Real-time prices and market data.</p>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid sm:grid-cols-3 gap-4">
         <Card className="p-4 bg-gradient-to-br from-bg-elev to-bg-base hover:border-lime/50 cursor-pointer transition-colors group">
            <div className="text-sm text-bone mb-2 flex items-center gap-2"><ArrowUpRight className="w-4 h-4 text-lime" /> Top Gainer</div>
            <div className="flex justify-between items-end">
               <div>
                  <div className="font-bold text-cream text-lg">Solana <span className="text-bone text-sm">SOL</span></div>
                  <div className="font-mono text-lime font-bold">+12.4%</div>
               </div>
               <div className="w-16 h-10 opacity-50 group-hover:opacity-100 transition-opacity">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={MARKETS_DATA[3].chart}>
                     <Area type="monotone" dataKey="v" stroke="var(--color-lime)" fill="transparent" strokeWidth={2} />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
            </div>
         </Card>
         <Card className="p-4 bg-gradient-to-br from-bg-elev to-bg-base hover:border-rust/50 cursor-pointer transition-colors group">
            <div className="text-sm text-bone mb-2 flex items-center gap-2"><ArrowDownRight className="w-4 h-4 text-rust" /> Top Loser</div>
            <div className="flex justify-between items-end">
               <div>
                  <div className="font-bold text-cream text-lg">Cardano <span className="text-bone text-sm">ADA</span></div>
                  <div className="font-mono text-rust font-bold">-2.10%</div>
               </div>
               <div className="w-16 h-10 opacity-50 group-hover:opacity-100 transition-opacity">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={MARKETS_DATA[6].chart}>
                     <Area type="monotone" dataKey="v" stroke="var(--color-rust)" fill="transparent" strokeWidth={2} />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
            </div>
         </Card>
         <Card className="p-4 bg-gradient-to-br from-bg-elev to-bg-base hover:border-info/50 cursor-pointer transition-colors group">
            <div className="text-sm text-bone mb-2 flex items-center gap-2"><ArrowUpRight className="w-4 h-4 text-info" /> Most Traded</div>
            <div className="flex justify-between items-end">
               <div>
                  <div className="font-bold text-cream text-lg">Tether <span className="text-bone text-sm">USDT</span></div>
                  <div className="font-mono text-info font-bold">₦2.5B Vol</div>
               </div>
               <div className="w-16 h-10 opacity-50 group-hover:opacity-100 transition-opacity">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={MARKETS_DATA[2].chart}>
                     <Area type="monotone" dataKey="v" stroke="var(--color-info)" fill="transparent" strokeWidth={2} />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
            </div>
         </Card>
      </div>

      <Card className="overflow-hidden p-0">
         <div className="p-4 border-b border-rule flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-bg-elev">
            <div className="flex gap-4 overflow-x-auto w-full sm:w-auto p-1 sm:p-0">
              {['All Assets', 'Watchlist', 'DeFi', 'Layer 1', 'Meme'].map((t, i) => {
                 const id = t.toLowerCase().replace(' ', '-');
                 return (
                   <button 
                     key={id}
                     className={`text-sm font-bold pb-2 border-b-2 transition-colors whitespace-nowrap ${tab === id || (i===0 && tab==='all') ? 'border-lime text-cream' : 'border-transparent text-bone hover:text-cream'}`}
                     onClick={() => setTab(id === 'all assets' ? 'all' : id)}
                   >
                     {t}
                   </button>
                 )
              })}
            </div>
            <div className="relative w-full sm:w-auto">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-bone" />
               <input type="text" placeholder="Search markets..." className="bg-bg-base border border-rule rounded-pill pl-9 pr-4 py-1.5 text-sm w-full sm:w-48 text-cream focus:outline-none focus:border-lime" />
            </div>
         </div>

         <div className="overflow-x-auto">
           <table className="w-full text-sm">
             <thead className="bg-bg-base font-medium text-bone text-xs">
               <tr>
                 <th className="w-10"></th>
                 <th className="text-left py-3 px-6 uppercase tracking-wider font-normal">Asset</th>
                 <th className="text-right py-3 px-6 uppercase tracking-wider font-normal">Price</th>
                 <th className="text-right py-3 px-6 uppercase tracking-wider font-normal">24h Change</th>
                 <th className="text-right py-3 px-6 uppercase tracking-wider font-normal hidden md:table-cell">24h Vol</th>
                 <th className="text-right py-3 px-6 uppercase tracking-wider font-normal hidden lg:table-cell">Market Cap</th>
                 <th className="text-right py-3 px-6 uppercase tracking-wider font-normal hidden sm:table-cell">7D Chart</th>
                 <th className="w-20"></th>
               </tr>
             </thead>
             <tbody className="divide-y divide-rule/50">
                {MARKETS_DATA.map((asset, i) => (
                  <tr key={i} className="hover:bg-bg-elev transition-colors cursor-pointer group">
                     <td className="py-4 pl-4 text-center">
                       <Star className={`w-4 h-4 mx-auto cursor-pointer transition-colors ${i < 3 ? 'text-lime fill-lime/20' : 'text-rule-strong hover:text-lime'}`} />
                     </td>
                     <td className="py-4 px-6">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-pill bg-bg-base border border-rule flex items-center justify-center font-bold text-xs">{asset.ticker[0]}</div>
                          <div>
                             <div className="font-bold text-cream group-hover:text-lime transition-colors">{asset.name}</div>
                             <div className="text-xs text-bone">{asset.ticker}</div>
                          </div>
                       </div>
                     </td>
                     <td className="py-4 px-6 text-right">
                       <div className="font-mono text-cream font-medium">{asset.price}</div>
                     </td>
                     <td className="py-4 px-6 text-right">
                       <div className={`font-mono text-xs font-bold ${asset.isUp ? 'text-good' : 'text-bad'}`}>{asset.change}</div>
                     </td>
                     <td className="py-4 px-6 text-right hidden md:table-cell">
                       <div className="font-mono text-cream">{asset.vol}</div>
                     </td>
                     <td className="py-4 px-6 text-right hidden lg:table-cell">
                       <div className="font-mono text-bone">{asset.mcap}</div>
                     </td>
                     <td className="py-4 px-6 text-right hidden sm:table-cell">
                       <div className="w-16 h-8 ml-auto">
                         <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={asset.chart}>
                             <Area type="monotone" dataKey="v" stroke={asset.isUp ? 'var(--color-good)' : 'var(--color-bad)'} strokeWidth={1.5} fill="transparent" />
                           </AreaChart>
                         </ResponsiveContainer>
                       </div>
                     </td>
                     <td className="py-4 pr-6 text-right">
                       <Link to="/app/trade">
                         <Button variant="secondary" size="sm" className="h-8 text-xs px-3 opacity-0 group-hover:opacity-100 transition-opacity">Trade</Button>
                       </Link>
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
