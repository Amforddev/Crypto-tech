import React from 'react';
import { Shield, Zap, RefreshCw, BarChart, Smartphone, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui';

export default function Features() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-display font-medium text-cream mb-6 leading-tight">
          A platform built for <span className="text-lime border-b-2 border-lime/30">performance</span>
        </h1>
        <p className="text-lg text-bone max-w-2xl mx-auto mb-10">
          From lightning-fast execution to institutional-grade security, Voltex provides all the tools you need to trade with confidence.
        </p>
        <Link to="/signup">
          <Button size="lg">Get Started Today</Button>
        </Link>
      </section>

      {/* Grid */}
      <section className="px-6 max-w-7xl mx-auto py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-lime" />}
            title="Instant Execution"
            desc="Our proprietary matching engine handles up to 1 million orders per second."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-lime" />}
            title="Bank-grade Security"
            desc="98% of digital assets are stored securely in offline cold storage."
          />
          <FeatureCard 
            icon={<RefreshCw className="w-6 h-6 text-lime" />}
            title="Zero-fee Swaps"
            desc="Swap between your favorite crypto assets with no hidden fees or spread markups."
          />
          <FeatureCard 
            icon={<BarChart className="w-6 h-6 text-lime" />}
            title="Advanced Trading Tools"
            desc="Access professional charts, technical indicators, and real-time market data."
          />
          <FeatureCard 
            icon={<Smartphone className="w-6 h-6 text-lime" />}
            title="Mobile First"
            desc="Manage your portfolio on the go with our fully optimized mobile experience."
          />
          <FeatureCard 
            icon={<Globe className="w-6 h-6 text-lime" />}
            title="Global Liquidity"
            desc="Deep liquidity pools ensure the best prices across all our supported markets."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-bg-elev to-bg-base border border-rule rounded-3 p-12">
           <h2 className="text-3xl font-display font-medium text-cream mb-4">Ready to start trading?</h2>
           <p className="text-bone mb-8">Join thousands of users trading on Voltex every day.</p>
           <Link to="/signup">
             <Button size="lg">Create Free Account</Button>
           </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-3 bg-bg-elev border border-rule hover:border-lime/30 transition-colors">
      <div className="w-12 h-12 rounded-2 bg-bg-base border border-rule flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-cream mb-3">{title}</h3>
      <p className="text-bone leading-relaxed">{desc}</p>
    </div>
  );
}
