import React, { useState } from 'react';
import { Card } from '../components/ui';
import { Bell, ArrowUpRight, ArrowDownRight, Shield, Gift, Megaphone, Check } from 'lucide-react';

export default function Notifications() {
  const [filter, setFilter] = useState('all');

  const DUMMY_NOTIFS = [
    { id: 1, type: 'trade', icon: <ArrowUpRight/>, color: 'text-good', bg: 'bg-good/10', title: 'Buy order successful', desc: 'You successfully bought 0.015 BTC for ₦526,800.00', time: '2 hours ago', read: false },
    { id: 2, type: 'system', icon: <Megaphone/>, color: 'text-info', bg: 'bg-info/10', title: 'New Feature: Zero-fee Swaps', desc: 'You can now swap between any crypto assets with zero fees for the next 48 hours!', time: '5 hours ago', read: false },
    { id: 3, type: 'deposit', icon: <ArrowDownRight/>, color: 'text-cream', bg: 'bg-rule', title: 'Deposit successful', desc: 'Your bank transfer of ₦2,500,000.00 has been credited to your NGN wallet.', time: 'Yesterday', read: true },
    { id: 4, type: 'giftcard', icon: <Gift/>, color: 'text-amber', bg: 'bg-amber/10', title: 'Gift card sold', desc: 'Your $100 Amazon gift card has been verified. ₦115,000.00 has been credited.', time: 'Oct 25', read: true },
    { id: 5, type: 'security', icon: <Shield/>, color: 'text-rust', bg: 'bg-rust/10', title: 'New login detected', desc: 'We noticed a new login from a Mac device in Lagos, Nigeria. If this wasn\'t you, secure your account immediately.', time: 'Oct 23', read: true },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-24 lg:pb-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-cream flex items-center gap-3">
             Notifications <span className="bg-lime text-bg-base text-xs px-2 py-0.5 rounded-full font-bold">2 New</span>
          </h1>
        </div>
        <button className="text-sm font-medium text-bone hover:text-cream flex items-center gap-2">
           <Check className="w-4 h-4" /> Mark all as read
        </button>
      </div>

      <Card className="overflow-hidden p-0">
         <div className="border-b border-rule bg-bg-elev flex overflow-x-auto">
            {['All', 'Trades', 'Deposits', 'System'].map((t) => (
              <button 
                 key={t}
                 onClick={() => setFilter(t.toLowerCase())}
                 className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${filter === t.toLowerCase() ? 'border-lime text-cream' : 'border-transparent text-bone hover:text-cream'}`}
              >
                 {t}
              </button>
            ))}
         </div>

         <div className="divide-y divide-rule/50">
            {DUMMY_NOTIFS.map((item) => (
               <div key={item.id} className={`p-4 sm:p-6 flex gap-4 hover:bg-rule-soft transition-colors cursor-pointer ${!item.read ? 'bg-bg-elev/30' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
                     {React.cloneElement(item.icon as React.ReactElement, { className: 'w-5 h-5' })}
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between items-start gap-4 mb-1">
                        <h4 className={`text-sm font-bold ${!item.read ? 'text-cream' : 'text-bone'}`}>{item.title}</h4>
                        <span className="text-xs text-bone shrink-0 whitespace-nowrap">{item.time}</span>
                     </div>
                     <p className="text-sm text-bone">{item.desc}</p>
                  </div>
                  {!item.read && (
                     <div className="w-2.5 h-2.5 rounded-full bg-lime shrink-0 mt-1"></div>
                  )}
               </div>
            ))}
         </div>
      </Card>
    </div>
  )
}
