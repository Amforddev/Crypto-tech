import React, { useState } from 'react';
import { Card, Button, Input } from '../components/ui';
import { MessageSquare, Headset, BookOpen, Send, HelpCircle, ChevronRight, FileQuestion, Mail } from 'lucide-react';

export default function Support() {
  return (
    <div className="max-w-5xl mx-auto pb-24 lg:pb-8 space-y-8">
      <div className="text-center py-8">
         <h1 className="text-3xl font-display font-bold text-cream mb-4">How can we help?</h1>
         <div className="relative max-w-xl mx-auto">
            <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-bone" />
            <Input type="text" placeholder="Search for articles, guides, and FAQs..." className="pl-12 h-14 text-base w-full shadow-lg" />
         </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
         {/* Live Chat */}
         <Card className="p-6 flex flex-col items-start bg-gradient-to-br from-lime/10 to-bg-base border-lime/30 hover:border-lime/60 transition-colors">
            <div className="w-12 h-12 rounded-2 bg-lime-tint text-lime flex items-center justify-center mb-4 border-2 border-lime">
               <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-cream text-lg mb-2">Live Chat</h3>
            <p className="text-bone text-sm flex-1 mb-6">Chat directly with our support team. We usually reply within 5 minutes.</p>
            <Button className="w-full">Start a Conversation</Button>
         </Card>

         {/* Call Us */}
         <Card className="p-6 flex flex-col items-start hover:border-rule-strong transition-colors">
            <div className="w-12 h-12 rounded-2 bg-bg-elev text-cream flex items-center justify-center mb-4 border border-rule">
               <Headset className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-cream text-lg mb-2">Phone Support</h3>
            <p className="text-bone text-sm flex-1 mb-6">Speak with an agent directly. Available 9am to 6pm, Monday to Friday.</p>
            <Button variant="secondary" className="w-full">+234 800 000 0000</Button>
         </Card>

         {/* Email Ticket */}
         <Card className="p-6 flex flex-col items-start hover:border-rule-strong transition-colors">
            <div className="w-12 h-12 rounded-2 bg-bg-elev text-cream flex items-center justify-center mb-4 border border-rule">
               <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-cream text-lg mb-2">Submit a Ticket</h3>
            <p className="text-bone text-sm flex-1 mb-6">Send us an email with details about your issue and we'll investigate.</p>
            <Button variant="secondary" className="w-full">support@example.com</Button>
         </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 pt-8">
         <div>
            <h3 className="font-display font-bold text-cream text-xl mb-4 flex items-center gap-2">
               <BookOpen className="w-5 h-5 text-lime" /> Help Topics
            </h3>
            <div className="space-y-2">
               {['Account & Security', 'Deposits & Withdrawals', 'Gift Card Trading Guidelines', 'P2P Trading Rules', 'Fees & Limits', 'Resolving Disputes'].map((topic, i) => (
                  <button key={i} className="w-full p-4 rounded-2 bg-bg-elev border border-rule hover:border-rule-strong text-left flex justify-between items-center group transition-colors">
                     <span className="font-medium text-cream">{topic}</span>
                     <ChevronRight className="w-5 h-5 text-bone group-hover:text-lime transition-colors" />
                  </button>
               ))}
            </div>
         </div>

         <div>
            <h3 className="font-display font-bold text-cream text-xl mb-4 flex items-center gap-2">
               <FileQuestion className="w-5 h-5 text-lime" /> Frequent Questions
            </h3>
            <div className="space-y-4">
               {[
                 { q: 'How long do withdrawals take?', a: 'Naira withdrawals to your bank account are processed instantly, but can take up to 5 minutes depending on the network.' },
                 { q: 'Why did my gift card trade fail?', a: 'Trades usually fail if the card code is incorrect, already redeemed, or the image uploaded is too blurry to be verified.' },
                 { q: 'Are there hidden fees?', a: 'No. P2P trades have zero fees. We clearly display any spread or network fees before you confirm any direct buy/sell transaction.' },
               ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2 bg-bg-base border border-rule">
                     <h4 className="font-bold text-cream text-sm mb-2">{item.q}</h4>
                     <p className="text-bone text-sm">{item.a}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  )
}
