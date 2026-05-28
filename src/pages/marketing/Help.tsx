import React from 'react';
import { Button, Input } from '../../components/ui';
import { Search, Book, MessageSquare, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Help() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-display font-medium text-cream mb-6 leading-tight">
          How can we help?
        </h1>
        <div className="relative max-w-2xl mx-auto mt-8">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-bone" />
           <Input 
             type="text" 
             placeholder="Search for articles, guides, or troubleshooting..." 
             className="pl-14 h-16 text-lg w-full shadow-2xl bg-bg-elev border-rule" 
           />
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 max-w-5xl mx-auto py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3 bg-bg-elev border border-rule hover:border-lime/30 transition-colors group cursor-pointer">
            <div className="w-12 h-12 rounded-2 bg-lime/10 text-lime flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Book className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-cream mb-3">Getting Started</h3>
            <p className="text-bone leading-relaxed mb-6">Learn the basics of creating an account, securing your profile, and making your first trade.</p>
            <div className="text-lime font-medium flex items-center gap-2">Read Guides <ArrowRight className="w-4 h-4" /></div>
          </div>

          <div className="p-8 rounded-3 bg-bg-elev border border-rule hover:border-lime/30 transition-colors group cursor-pointer">
            <div className="w-12 h-12 rounded-2 bg-info/10 text-info flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-cream mb-3">Trading & Fees</h3>
            <p className="text-bone leading-relaxed mb-6">Understand how our P2P market works, gift card rates, and trading fee structures.</p>
            <div className="text-lime font-medium flex items-center gap-2">View Topics <ArrowRight className="w-4 h-4" /></div>
          </div>

          <div className="p-8 rounded-3 bg-bg-elev border border-rule hover:border-lime/30 transition-colors group cursor-pointer">
            <div className="w-12 h-12 rounded-2 bg-amber/10 text-amber flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-cream mb-3">Contact Support</h3>
            <p className="text-bone leading-relaxed mb-6">Can't find what you're looking for? Our support team is available 24/7 to assist you.</p>
            <div className="text-lime font-medium flex items-center gap-2">Get in Touch <ArrowRight className="w-4 h-4" /></div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-display font-medium text-cream mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
           {[
             { q: 'How do I withdraw my funds to my local bank?', a: 'You can withdraw funds by navigating to your Wallet, selecting "Withdraw NGN", and entering your bank details. Withdrawals are typically processed within 5 minutes.' },
             { q: 'Are there any hidden fees?', a: 'No. Our fee structure is fully transparent. P2P trades have zero fees, and standard exchange trades have a flat 0.1% maker/taker fee.' },
             { q: 'How do I verify my account?', a: 'To unlock higher limits, go to Settings > Profile and submit your government-issued ID and a selfie for verification. Approval usually takes under 10 minutes.' },
             { q: 'What happens if a gift card trade fails?', a: 'If a trade is declined due to an invalid code, you can open a dispute. Our dedicated team will review the transaction within 24 hours.' }
           ].map((faq, i) => (
             <div key={i} className="p-6 bg-bg-elev border border-rule rounded-3">
                <h4 className="font-bold text-cream text-lg mb-2">{faq.q}</h4>
                <p className="text-bone">{faq.a}</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
