import React from 'react';
import { Card, Button, Input, Chip } from '../components/ui';
import { Users, Activity, DollarSign, ShieldAlert, ArrowUpRight, Search, Menu, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-bg-base overflow-hidden">
      {/* Admin Sidebar */}
      <div className="w-64 bg-bg-elev border-r border-rule hidden md:flex flex-col">
         <div className="p-6 border-b border-rule">
            <Link to="/app" className="flex items-center gap-2">
               <div className="bg-lime text-bg-base p-1.5 rounded text-xs font-bold leading-none">V</div>
               <span className="font-display font-medium text-cream tracking-tight text-xl">Volt<span className="text-lime">Admin</span></span>
            </Link>
         </div>
         <div className="p-4 flex-1 space-y-1">
            <button className="w-full flex items-center gap-3 p-3 rounded-2 bg-rule-soft text-cream text-sm font-medium">
               <Activity className="w-4 h-4" /> Overview
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-2 text-bone hover:bg-rule-soft hover:text-cream text-sm font-medium transition-colors">
               <Users className="w-4 h-4" /> Users
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-2 text-bone hover:bg-rule-soft hover:text-cream text-sm font-medium transition-colors">
               <DollarSign className="w-4 h-4" /> Transactions
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-2 flex justify-between text-bone hover:bg-rule-soft hover:text-cream text-sm font-medium transition-colors">
               <div className="flex items-center gap-3"><ShieldAlert className="w-4 h-4" /> KYC Approvals</div>
               <Chip variant="warn">12</Chip>
            </button>
         </div>
         <div className="p-4 border-t border-rule text-xs text-bone text-center">
            Admin Portal v1.0
         </div>
      </div>

      {/* Admin Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
         <header className="h-16 border-b border-rule bg-bg-elev flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4">
               <button className="md:hidden text-bone"><Menu className="w-5 h-5" /></button>
               <h1 className="text-lg font-bold text-cream">Dashboard Overview</h1>
            </div>
            <div className="flex items-center gap-4">
               <div className="relative text-bone">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input type="text" placeholder="Search user ID, email..." className="pl-9 h-9 w-64 bg-bg-base text-sm" />
               </div>
               <div className="w-8 h-8 rounded-full bg-lime/10 text-lime flex items-center justify-center text-xs font-bold uppercase">AD</div>
            </div>
         </header>

         <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
            {/* Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
               <Card className="p-4 flex flex-col pt-5">
                  <div className="text-bone text-xs mb-1">Total Users</div>
                  <div className="text-2xl font-bold text-cream mb-2 tabular-nums">24,592</div>
                  <div className="text-xs text-good flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> 12% this month</div>
               </Card>
               <Card className="p-4 flex flex-col pt-5">
                  <div className="text-bone text-xs mb-1">24h Trade Volume</div>
                  <div className="text-2xl font-bold text-cream mb-2 tabular-nums">₦142.5M</div>
                  <div className="text-xs text-good flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> 5.4% vs yday</div>
               </Card>
               <Card className="p-4 flex flex-col pt-5">
                  <div className="text-bone text-xs mb-1">Pending KYC</div>
                  <div className="text-2xl font-bold text-cream mb-2 tabular-nums text-amber">12</div>
                  <div className="text-xs text-bone">Needs attention</div>
               </Card>
               <Card className="p-4 flex flex-col pt-5">
                  <div className="text-bone text-xs mb-1">Revenue (30d)</div>
                  <div className="text-2xl font-bold text-cream mb-2 tabular-nums font-mono">₦4.2M</div>
                  <div className="text-xs text-good flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> 8.1% vs last mo</div>
               </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
               <Card className="lg:col-span-2 p-0 overflow-hidden">
                  <div className="p-4 border-b border-rule flex justify-between items-center bg-bg-elev">
                     <h2 className="font-bold text-cream">Recent Transactions</h2>
                     <button className="text-bone hover:text-cream"><Filter className="w-4 h-4" /></button>
                  </div>
                  <div className="overflow-x-auto">
                     <table className="w-full text-sm">
                        <thead className="bg-bg-base font-medium text-bone text-xs border-b border-rule">
                           <tr>
                              <th className="text-left py-3 px-4">User</th>
                              <th className="text-left py-3 px-4">Type</th>
                              <th className="text-right py-3 px-4">Amount</th>
                              <th className="text-right py-3 px-4">Status</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-rule/50">
                           {[
                              { user: 'judith_m', type: 'Buy BTC', amount: '₦150,000', status: 'Completed', color: 'text-good' },
                              { user: 'alex_cube', type: 'Withdraw NGN', amount: '₦40,000', status: 'Pending', color: 'text-amber' },
                              { user: 'michaelsam', type: 'P2P Sell USDT', amount: '$500', status: 'Completed', color: 'text-good' },
                              { user: 'kalu99', type: 'Sell Amz Gift Card', amount: '$100', status: 'Failed', color: 'text-rust' },
                           ].map((tx, i) => (
                              <tr key={i} className="hover:bg-bg-elev">
                                 <td className="py-3 px-4 font-medium text-cream">{tx.user}</td>
                                 <td className="py-3 px-4 text-bone">{tx.type}</td>
                                 <td className="py-3 px-4 text-right font-mono text-cream">{tx.amount}</td>
                                 <td className={`py-3 px-4 text-right font-medium ${tx.color}`}>{tx.status}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </Card>

               <Card className="p-0 overflow-hidden">
                  <div className="p-4 border-b border-rule bg-bg-elev">
                     <h2 className="font-bold text-cream">Pending Approvals</h2>
                  </div>
                  <div className="divide-y divide-rule/50">
                     {[
                        { title: 'KYC Level 2', user: '@tolu11', time: '10m ago' },
                        { title: 'Large Withdrawal', user: '@ade_xyz', time: '1h ago', wait: true },
                        { title: 'Gift Card Verification', user: '@sarah', time: '2h ago' },
                     ].map((task, i) => (
                        <div key={i} className="p-4 hover:bg-rule-soft transition-colors cursor-pointer">
                           <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-sm text-cream">{task.title}</span>
                              <span className="text-xs text-bone">{task.time}</span>
                           </div>
                           <div className="text-sm text-bone mb-3">Requested by {task.user}</div>
                           <Button size="sm" className="w-full text-xs" variant={task.wait ? 'secondary' : 'primary'}>Review Request</Button>
                        </div>
                     ))}
                  </div>
               </Card>
            </div>
         </main>
      </div>
    </div>
  )
}
