import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ArrowRightLeft, Users, Gift, Wallet, 
  LineChart, Award, Bell, HelpCircle, Settings, Search, Menu
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: <LayoutDashboard className="w-5 h-5"/>, label: "Dashboard", path: "/app" },
  { icon: <ArrowRightLeft className="w-5 h-5"/>, label: "Trade", path: "/app/trade" },
  { icon: <Users className="w-5 h-5"/>, label: "P2P", path: "/app/p2p" },
  { icon: <Gift className="w-5 h-5"/>, label: "Gift Cards", path: "/app/gift-cards" },
  { icon: <Wallet className="w-5 h-5"/>, label: "Wallet", path: "/app/wallet" },
  { icon: <LineChart className="w-5 h-5"/>, label: "Markets", path: "/app/markets" },
  { icon: <Award className="w-5 h-5"/>, label: "Rewards", path: "/app/rewards" },
];

const SECONDARY_NAV = [
  { icon: <Bell className="w-5 h-5"/>, label: "Notifications", path: "/app/notifications" },
  { icon: <HelpCircle className="w-5 h-5"/>, label: "Support", path: "/app/support" },
  { icon: <Settings className="w-5 h-5"/>, label: "Settings", path: "/app/settings" },
];

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-bg-base flex text-cream font-sans">
      {/* Sidebar Desktop */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-bg-paper border-r border-rule flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-16 flex items-center px-6 border-b border-rule shrink-0">
          <span className="text-xl font-display font-bold text-lime tracking-tight">Voltex.</span>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-6">
          <div className="space-y-1">
            {NAV_ITEMS.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-2 text-sm font-medium transition-colors ${active ? 'bg-rule text-lime' : 'text-bone hover:text-cream hover:bg-rule-soft'}`}>
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="h-px bg-rule mx-3" />

          <div className="space-y-1">
            {SECONDARY_NAV.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-2 text-sm font-medium transition-colors ${active ? 'bg-rule text-lime' : 'text-bone hover:text-cream hover:bg-rule-soft'}`}>
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* User Card */}
        <div className="p-4 border-t border-rule shrink-0">
          <div className="flex items-center gap-3 p-2 rounded-2 hover:bg-rule-soft transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-pill bg-bg-elev border border-rule flex items-center justify-center shrink-0">
              <span className="text-lime text-xs font-bold leading-none">AO</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-medium text-cream truncate">Adaeze Okonkwo</div>
              <div className="text-xs text-lime flex items-center gap-1 mt-0.5 font-medium">Tier 2 Verified</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 shrink-0 bg-bg-base/80 backdrop-blur-md border-b border-rule flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-bone hover:text-cream">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:block text-sm text-bone font-medium">Dashboard</div>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 bg-bg-paper border border-rule rounded-2 px-3 py-1.5 text-sm text-bone w-64 hover:border-rule-strong cursor-text transition-colors">
                <Search className="w-4 h-4" />
                <span>Search (⌘K)</span>
             </div>
             <button className="text-bone hover:text-cream relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rust rounded-pill border-2 border-bg-base" />
             </button>
          </div>
        </header>

        {/* Dashboard Content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
           <Outlet />
        </main>
      </div>

      {/* Bottom Tab Bar (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-bg-paper border-t border-rule flex items-center justify-around pb-safe h-16 z-50">
        {[NAV_ITEMS[0], NAV_ITEMS[1], NAV_ITEMS[2], NAV_ITEMS[4]].map(item => (
           <Link key={item.path} to={item.path} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === item.path ? 'text-lime' : 'text-bone'}`}>
             {item.icon}
             <span className="text-[10px] font-medium">{item.label}</span>
           </Link>
        ))}
        <button className="flex flex-col items-center justify-center w-full h-full space-y-1 text-bone">
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </div>
    </div>
  );
}
