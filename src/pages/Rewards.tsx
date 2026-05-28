import React from 'react';
import { Card, Button, Chip } from '../components/ui';
import { Gift, Copy, Award, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Rewards() {
  return (
    <div className="max-w-5xl mx-auto pb-24 lg:pb-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-cream">Rewards Hub</h1>
          <p className="text-bone text-sm mt-1">Earn points, unlock tiers, and claim exclusive benefits.</p>
        </div>
        <Chip variant="success">VIP Tier: Silver</Chip>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
         {/* Main Points Card */}
         <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-bg-elev to-bg-base border-lime border flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime/10 blur-3xl rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
               <div>
                  <div className="text-sm font-medium text-bone mb-2">Available Points</div>
                  <div className="text-5xl font-display font-bold text-cream mb-4 tabular-nums">12,450 <span className="text-2xl text-lime">pts</span></div>
                  <Button className="bg-lime text-bg-base hover:bg-lime-soft w-40">Claim Rewards</Button>
               </div>
               
               <div className="bg-bg-elev border border-rule rounded-3 p-4 flex-1 w-full text-sm">
                  <div className="flex justify-between items-center mb-2">
                     <span className="font-bold text-cream">Silver Tier</span>
                     <span className="text-bone">Gold at 20k pts</span>
                  </div>
                  <div className="w-full h-2 bg-rule rounded-full overflow-hidden mb-3">
                     <div className="h-full bg-lime rounded-full" style={{ width: '62%' }}></div>
                  </div>
                  <p className="text-bone text-xs mb-4">You're 7,550 points away from unlocking Gold Tier benefits.</p>
                  
                  <div className="space-y-2 text-xs">
                     <div className="flex items-center gap-2 text-cream"><Award className="w-4 h-4 text-lime" /> <span className="font-medium">Current Perk:</span> 5% fee discount</div>
                     <div className="flex items-center gap-2 text-bone"><Award className="w-4 h-4" /> <span className="font-medium">Next Perk:</span> 10% fee discount + Priority Support</div>
                  </div>
               </div>
            </div>
         </Card>

         {/* Referral */}
         <Card className="p-6 bg-amber/5 border-amber/20 flex flex-col">
            <h3 className="text-lg font-bold text-cream mb-2 flex items-center gap-2"><Users className="w-5 h-5 text-amber" /> Invite & Earn</h3>
            <p className="text-sm text-bone mb-6 flex-1">Give ₦2,500, get ₦2,500. Invite a friend and you both earn a bonus when they complete their first trade of ₦50k+.</p>
            
            <div className="bg-bg-base border border-rule-strong rounded-2 p-3 flex justify-between items-center mb-4">
               <span className="font-mono text-sm text-amber font-bold">VOLT-A0CKR</span>
               <button className="text-bone hover:text-cream transition-colors"><Copy className="w-4 h-4" /></button>
            </div>
            
            <Button variant="secondary" className="w-full">Share Invite Link</Button>
         </Card>
      </div>

      {/* Ways to earn */}
      <h3 className="text-lg font-bold text-cream pt-4 border-t border-rule">Ways to Earn</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { icon: <TrendingUp/>, title: 'Trade Crypto', desc: '10 pts per $100 volume', action: 'Trade Now', color: 'text-info', bg: 'bg-info/10', to: '/app/trade', done: false },
           { icon: <Gift/>, title: 'Sell Gift Cards', desc: '50 pts per card', action: 'Sell Cards', color: 'text-rust', bg: 'bg-rust/10', to: '/app/gift-cards', done: false },
           { icon: <Users/>, title: 'P2P Trading', desc: '20 pts per completed order', action: 'Go to P2P', color: 'text-lime', bg: 'bg-lime/10', to: '/app/p2p', done: false },
           { icon: <Award/>, title: 'Daily Login', desc: '5 pts every day', action: 'Claimed', color: 'text-amber', bg: 'bg-amber/10', done: true, to: '#' },
         ].map((item, i) => (
            <Card key={i} className="p-5 flex flex-col items-center text-center hover:border-rule-strong transition-colors group">
               <div className={`w-12 h-12 rounded-full ${item.bg} ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {item.icon}
               </div>
               <h4 className="font-bold text-cream text-sm mb-1">{item.title}</h4>
               <p className="text-xs text-bone mb-6 flex-1">{item.desc}</p>
               {item.done ? (
                 <Button variant="secondary" size="sm" className="w-full text-xs" disabled>
                    {item.action}
                 </Button>
               ) : (
                 <Link to={item.to} className="w-full block">
                   <Button variant="primary" size="sm" className="w-full text-xs">
                      {item.action}
                   </Button>
                 </Link>
               )}
            </Card>
         ))}
      </div>

      {/* Reward History */}
      <Card className="p-0 overflow-hidden">
         <div className="p-4 border-b border-rule flex justify-between items-center bg-bg-elev">
            <h3 className="font-bold text-cream">Recent Rewards</h3>
            <button className="text-sm text-lime hover:text-lime-soft font-medium flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></button>
         </div>
         <div className="divide-y divide-rule/50">
            {[
              { title: 'Trade Bonus (BTC/NGN)', time: 'Today, 14:32', pts: '+120' },
              { title: 'Daily Login', time: 'Today, 08:00', pts: '+5' },
              { title: 'Referral Bonus: @alex99', time: 'Yesterday', pts: '+2,500' },
              { title: 'Gift Card Sale (Amazon)', time: 'Oct 24', pts: '+50' },
            ].map((row, i) => (
               <div key={i} className="p-4 flex justify-between items-center hover:bg-bg-elev transition-colors">
                  <div>
                     <div className="font-medium text-sm text-cream">{row.title}</div>
                     <div className="text-xs text-bone mt-0.5">{row.time}</div>
                  </div>
                  <div className="font-mono font-bold text-lime text-base">{row.pts}</div>
               </div>
            ))}
         </div>
      </Card>
    </div>
  )
}
