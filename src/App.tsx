import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MarketingLayout } from './layouts/MarketingLayout';
import { AppLayout } from './layouts/AppLayout';
import Landing from './pages/Landing';
import { Login, Signup, VerifyEmail, Verify2FA, ForgotPassword } from './pages/Auth';
import Dashboard from './pages/Dashboard';

import Trade from './pages/Trade';
import P2P from './pages/P2P';
import GiftCards from './pages/GiftCards';
import Wallet from './pages/Wallet';
import Markets from './pages/Markets';
import Settings from './pages/Settings';
import Rewards from './pages/Rewards';
import Notifications from './pages/Notifications';
import Support from './pages/Support';
import AdminDashboard from './pages/AdminDashboard';

import Features from './pages/marketing/Features';
import About from './pages/marketing/About';
import Help from './pages/marketing/Help';

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
      <h2 className="text-4xl font-display font-medium mb-4">{title}</h2>
      <p className="text-bone">This view is coming soon.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Marketing Site Links */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/buy" element={<Navigate to="/app/trade" replace />} />
          <Route path="/sell" element={<Navigate to="/app/trade" replace />} />
          <Route path="/gift-cards" element={<Navigate to="/app/gift-cards" replace />} />
          <Route path="/p2p" element={<Navigate to="/app/p2p" replace />} />
          <Route path="/fees" element={<Features />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<About />} />
          <Route path="/help" element={<Help />} />
        </Route>
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-2fa" element={<Verify2FA />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* App Shell Routes */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="trade" element={<Trade />} />
          <Route path="p2p" element={<P2P />} />
          <Route path="gift-cards" element={<GiftCards />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="markets" element={<Markets />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="support" element={<Support />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Admin UI */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
