import React, { Component, ReactNode, ErrorInfo } from 'react';
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
import Disputes from './pages/Disputes';

import Features from './pages/marketing/Features';
import About from './pages/marketing/About';
import Help from './pages/marketing/Help';
import { ToastProvider } from './components/Toast';

// Premium Error Boundary Component to gracefully intercept rendering crashes
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary intercepted a rendering crash:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center p-6 text-center text-cream">
          <div className="w-16 h-16 rounded-full bg-rust/10 border border-rust/40 flex items-center justify-center mb-6">
            <span className="text-rust text-2xl font-bold">⚠️</span>
          </div>
          <h2 className="text-2xl font-display font-bold mb-3 text-cream">Something went wrong</h2>
          <p className="text-bone mb-6 max-w-md text-sm leading-relaxed">
            An unexpected error occurred while rendering this interface. Our system stability team has been alerted.
          </p>
          {this.state.error && (
            <div className="font-mono text-xs text-rust bg-bg-elev border border-rule/50 p-4 rounded-3 max-w-lg overflow-x-auto mb-8 w-full text-left whitespace-pre-wrap max-h-48">
              {this.state.error.stack || this.state.error.message}
            </div>
          )}
          <button
            onClick={this.handleReset}
            className="h-11 px-6 bg-lime text-bg-base font-semibold rounded-2 hover:bg-lime/90 transition-colors text-sm shadow-[0_2px_0_#6B7F1A]"
          >
            Reset and return Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

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
    <ErrorBoundary>
      <ToastProvider>
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
              <Route path="disputes" element={<Disputes />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Admin UI */}
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
}
