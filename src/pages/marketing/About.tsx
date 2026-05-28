import React from 'react';
import { Button } from '../../components/ui';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-display font-medium text-cream mb-6 leading-tight">
          Democratizing access to <span className="text-lime">digital finance</span>
        </h1>
        <p className="text-lg text-bone max-w-2xl mx-auto">
          We believe everyone deserves equal access to the financial opportunities of the future. Our mission is to build the most accessible, secure, and intuitive platform for digital assets.
        </p>
      </section>

      {/* Story */}
      <section className="px-6 max-w-4xl mx-auto py-16 space-y-12">
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-bone leading-relaxed text-lg">
            Founded in 2026, Voltex started with a simple belief: the existing financial infrastructure was too slow, too expensive, and fundamentally exclusionary. We set out to build a bridge between traditional finance and the emerging digital economy.
          </p>
          <p className="text-bone leading-relaxed text-lg mt-6">
            Today, Voltex serves thousands of customers across the globe, providing a seamless gateway to cryptocurrency trading, P2P exchanges, and cross-border value transfer through our innovative gift card trading platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-rule">
           <div className="p-6 bg-bg-elev rounded-3 border border-rule text-center">
              <div className="text-4xl font-display font-bold text-lime mb-2">2M+</div>
              <div className="text-sm font-medium text-bone uppercase tracking-wider">Registered Users</div>
           </div>
           <div className="p-6 bg-bg-elev rounded-3 border border-rule text-center">
              <div className="text-4xl font-display font-bold text-lime mb-2">$5B+</div>
              <div className="text-sm font-medium text-bone uppercase tracking-wider">Quarterly Volume</div>
           </div>
           <div className="p-6 bg-bg-elev rounded-3 border border-rule text-center">
              <div className="text-4xl font-display font-bold text-lime mb-2">150+</div>
              <div className="text-sm font-medium text-bone uppercase tracking-wider">Countries Served</div>
           </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-display font-medium text-cream mb-8">Join the Team</h2>
        <p className="text-bone mb-8 max-w-xl mx-auto">We're always looking for talented individuals who are passionate about building the future of finance.</p>
        <Link to="/careers">
          <Button variant="secondary" size="lg">View Open Positions</Button>
        </Link>
      </section>
    </div>
  );
}
