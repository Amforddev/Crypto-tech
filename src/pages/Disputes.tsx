import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Input, Chip, Label } from '../components/ui';
import { 
  ShieldAlert, Upload, Image as ImageIcon, MessageSquare, Send, 
  ChevronRight, AlertCircle, CheckCircle, Calendar, RefreshCw, 
  ArrowLeft, FileText, Check, Paperclip, Phone, HelpCircle, ShieldAlert as GavelIcon,
  X, ExternalLink, Info
} from 'lucide-react';
import { useToast } from '../components/Toast';
import { motion, AnimatePresence } from 'motion/react';

interface DisputeMessage {
  id: string;
  sender: 'user' | 'counterparty' | 'staff';
  senderName: string;
  text: string;
  timestamp: string;
  attachments?: {
    name: string;
    type: 'image' | 'pdf' | 'document';
    url?: string;
    size?: string;
  }[];
}

interface Dispute {
  id: string;
  tradeId: string;
  tradeType: 'Buy' | 'Sell';
  asset: string;
  amount: string;
  fiatAmount: string;
  status: 'Under Review' | 'Awaiting your response' | 'Awaiting counterparty' | 'Resolved' | 'Cancelled';
  chipVariant: 'info' | 'warn' | 'neutral' | 'success' | 'danger';
  reason: string;
  counterparty: string;
  staffName: string;
  dateCreated: string;
  lastUpdated: string;
  messages: DisputeMessage[];
}

const INITIAL_DISPUTES: Dispute[] = [
  {
    id: 'DIS-87401',
    tradeId: 'P2P-87401',
    tradeType: 'Buy',
    asset: 'BTC',
    amount: '0.025 BTC',
    fiatAmount: '₦878,000.00',
    status: 'Under Review',
    chipVariant: 'info',
    reason: "Seller hasn't released BTC and claims did not receive bank transfer. Transfer made via GTBank.",
    counterparty: '@NgoziTrader',
    staffName: 'Agent Farouk (P2P Mediator)',
    dateCreated: 'May 28, 2026, 09:12',
    lastUpdated: '10 mins ago',
    messages: [
      {
        id: '1',
        sender: 'staff',
        senderName: 'Agent Farouk (P2P Mediator)',
        text: "Hello! I have taken over this dispute. @AdaezeOkonkwo, please upload your completed bank transfer receipt screenshot with full transaction reference & date. @NgoziTrader, please prepare and check your latest bank statement ledger.",
        timestamp: '09:15 AM'
      },
      {
        id: '2',
        sender: 'user',
        senderName: 'Adaeze Okonkwo',
        text: "I made the transfer to Ngozi's bank account 1 hour ago. The money has already left my account. Ngozi please double check.",
        timestamp: '09:30 AM'
      },
      {
        id: '3',
        sender: 'counterparty',
        senderName: 'NgoziTrader',
        text: "No payment received on my side yet. Banks are extremely slow today, I have refreshed my app 10 times already. Please submit receipt info so I can track.",
        timestamp: '09:45 AM'
      }
    ]
  },
  {
    id: 'DIS-86105',
    tradeId: 'P2P-86105',
    tradeType: 'Sell',
    asset: 'Amazon Gift Card',
    amount: '$100 Gift Card',
    fiatAmount: '₦115,000.00',
    status: 'Awaiting your response',
    chipVariant: 'warn',
    reason: "Buyer claims the code was already redeemed when typed.",
    counterparty: '@CardKing_99',
    staffName: 'Agent Chinedu (Gift Card Verifier)',
    dateCreated: 'May 27, 2026, 14:32',
    lastUpdated: '1 hour ago',
    messages: [
      {
        id: '1',
        sender: 'staff',
        senderName: 'Agent Chinedu (Gift Card Verifier)',
        text: "Hello @AdaezeOkonkwo. The buyer @CardKing_99 uploaded a screenshot showing an edit-locked 'Code already redeemed' error. Could you supply the raw receipt and video of physical card scratch to verify the origin of this gift card?",
        timestamp: 'Yesterday'
      },
      {
        id: '2',
        sender: 'counterparty',
        senderName: 'CardKing_99',
        text: "Yes bro, this card has already been claimed. I couldn't claim it. Staff please verify, I uploaded my screenshot already. Waiting for seller's receipt.",
        timestamp: 'Yesterday'
      }
    ]
  },
  {
    id: 'DIS-85301',
    tradeId: 'P2P-85301',
    tradeType: 'Sell',
    asset: 'ETH',
    amount: '1.2 ETH',
    fiatAmount: '₦2,520,000.00',
    status: 'Resolved',
    chipVariant: 'success',
    reason: "Buyer claimed reference code typo on Naira transaction payment.",
    counterparty: '@KaluCrypto',
    staffName: 'Agent Amadi (Senior Auditor)',
    dateCreated: 'May 25, 2026, 11:05',
    lastUpdated: 'May 25, 2026',
    messages: [
      {
        id: '1',
        sender: 'user',
        senderName: 'Adaeze Okonkwo',
        text: "The buyer sent the right payment but wrote a crypto description in the bank notation. This is strictly forbidden under our P2P guidelines and puts my account at risk of suspension. Please resolve.",
        timestamp: 'May 25, 11:15'
      },
      {
         id: '2',
         sender: 'counterparty',
         senderName: 'KaluCrypto',
         text: "Extremely sorry about that! I am a beginner, I won't do it again. I have submitted the proof of transfer showing it is actually from my verified bank account.",
         timestamp: 'May 25, 11:30'
      },
      {
        id: '3',
        sender: 'staff',
        senderName: 'Agent Amadi (Senior Auditor)',
        text: "I have reviewed both sides. Since the payment was cleared, and the account details match, we have released the 1.2 ETH to the buyer and issued a guidelines warning. Dispute closed.",
        timestamp: 'May 25, 12:00'
      }
    ]
  }
];

export default function Disputes() {
  const { showToast } = useToast();
  const [disputes, setDisputes] = useState<Dispute[]>(INITIAL_DISPUTES);
  const [selectedId, setSelectedId] = useState<string>('DIS-87401');
  const [filter, setFilter] = useState<'All' | 'Active' | 'Resolved'>('All');
  const [inputText, setInputText] = useState('');
  const [mobileViewChat, setMobileViewChat] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isStaffReplying, setIsStaffReplying] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedDispute = disputes.find(d => d.id === selectedId) || disputes[0];

  // Auto scroll chat to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedDispute?.messages, isStaffReplying]);

  // Filtered Disputes
  const filteredDisputes = disputes.filter(d => {
    if (filter === 'Active') return d.status !== 'Resolved' && d.status !== 'Cancelled';
    if (filter === 'Resolved') return d.status === 'Resolved' || d.status === 'Cancelled';
    return true;
  });

  const handleSendMessage = (textToSend = inputText, attachments: any[] = []) => {
    if (!textToSend.trim() && attachments.length === 0) return;

    const newMessage: DisputeMessage = {
      id: Math.random().toString(),
      sender: 'user',
      senderName: 'Adaeze Okonkwo',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments: attachments.length > 0 ? attachments : undefined
    };

    // Update active dispute messages
    setDisputes(prev => prev.map(disp => {
      if (disp.id === selectedId) {
        return {
          ...disp,
          lastUpdated: 'Just now',
          messages: [...disp.messages, newMessage]
        };
      }
      return disp;
    }));

    setInputText('');

    // Trigger mock Staff Reply
    setIsStaffReplying(true);
    setTimeout(() => {
      setIsStaffReplying(false);
      
      const responseMessages = [
        "Received. I am matching this transaction hash with the physical ledger database right now. Please keep your notifications on.",
        "Ref evidence submitted successfully. We have flagged this transaction to our compliance supervisor. The counterparty has been given 6 hours to provide concrete bank ledger statements.",
        "Understood. Let me cross check with our payment gateway and verification partners. We appreciate your patience.",
        "Thank you for uploading the receipt. I have sent an automated alert to the buyer, requesting them to unlock and authorize. If no answer is received in 3 hours, we will force release."
      ];
      
      const randomReply = responseMessages[Math.floor(Math.random() * responseMessages.length)];
      
      const staffReply: DisputeMessage = {
        id: Math.random().toString(),
        sender: 'staff',
        senderName: selectedDispute.staffName,
        text: randomReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setDisputes(prev => prev.map(disp => {
        if (disp.id === selectedId) {
          return {
            ...disp,
            messages: [...disp.messages, staffReply]
          };
        }
        return disp;
      }));

      showToast("Mediator staff has responded to your dispute.", "info");
    }, 2500);
  };

  // Mock Preset evidence click handler (great for sandbox testing)
  const injectPresetEvidence = (name: string, type: 'receipt' | 'card_scratch') => {
    setIsUploading(true);
    setUploadProgress(10);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            const sizeStr = type === 'receipt' ? '340 KB' : '1.4 MB';
            const attachItem = {
              name,
              type: 'image' as const,
              size: sizeStr
            };
            handleSendMessage(`Ref: Attached official verification file: ${name}`, [attachItem]);
            showToast(`Evidence "${name}" successfully compiled and integrated.`, "success");
          }, 300);
          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            const sizeStr = `${(file.size / 1024).toFixed(0)} KB`;
            const attachItem = {
              name: file.name,
              type: file.type.includes('pdf') ? 'pdf' as const : 'image' as const,
              size: sizeStr
            };
            handleSendMessage(`Uploaded evidence file: ${file.name}`, [attachItem]);
            showToast(`File "${file.name}" uploaded to dispute record.`, "success");
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleActionClick = (action: string) => {
    if (selectedDispute.status === 'Resolved' || selectedDispute.status === 'Cancelled') {
      showToast("This dispute is already closed.", "info");
      return;
    }

    if (action === 'cancel') {
      setDisputes(prev => prev.map(disp => {
        if (disp.id === selectedId) {
          return {
            ...disp,
            status: 'Cancelled',
            chipVariant: 'neutral'
          };
        }
        return disp;
      }));
      showToast("Dispute cancelled successfully. Trade status reverted.", "success");
    } else if (action === 'call') {
      showToast("Support line requested. An agent will call your registered phone number in 5 minutes.", "info");
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-safe">
      {/* Title Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-rule pb-6">
        <div>
          <div className="flex items-center gap-2 text-lime text-xs font-mono font-bold tracking-widest uppercase mb-1.5">
            <ShieldAlert className="w-4 h-4" /> 24/7 Asset Escrow Security
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-cream tracking-tight">Dispute Resolution Center</h1>
          <p className="text-sm text-bone mt-1.5 max-w-xl">
             Submit transfer evidence, trace transactions, and collaborate directly with Voltex mediators to resolve trade friction.
          </p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="secondary" size="sm" className="h-10 text-xs border-rule/60 text-bone hover:text-cream" onClick={() => handleActionClick('call')}>
              <Phone className="w-3.5 h-3.5 mr-1.5" /> Request Call Support
           </Button>
           <a href="/app/support" className="hidden sm:inline-block">
             <Button variant="ghost" size="sm" className="h-10 text-xs text-bone hover:text-cream">
                <HelpCircle className="w-3.5 h-3.5 mr-1.5" /> Support Home
             </Button>
           </a>
        </div>
      </div>

      {/* Main Container Workspace */}
      <div className="grid lg:grid-cols-12 gap-6 items-stretch min-h-[620px] lg:h-[calc(100vh-230px)]">
         
         {/* LEFT LIST PANEL (Responsive Toggled: hidden on mobile if chat is active) */}
         <div className={`lg:col-span-4 flex flex-col gap-4 h-full ${mobileViewChat ? 'hidden lg:flex' : 'flex'}`}>
            <Card className="p-4 flex flex-col h-full overflow-hidden border-rule bg-bg-paper">
               {/* Search/Filter heading */}
               <div className="pb-4 border-b border-rule flex items-center justify-between gap-2">
                  <div className="flex gap-2 bg-bg-base p-1.5 rounded-2 w-full">
                     {(['All', 'Active', 'Resolved'] as const).map(tab => (
                        <button
                          key={tab}
                          onClick={() => setFilter(tab)}
                          className={`text-xs font-bold py-1 px-3 flex-1 rounded-1.5 transition-colors ${filter === tab ? 'bg-lime text-bg-base shadow-sm' : 'text-bone hover:text-cream'}`}
                        >
                          {tab}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Disputes List Area */}
               <div className="flex-1 overflow-y-auto pt-4 space-y-3.5 pr-1 divide-y divide-rule/30">
                  {filteredDisputes.length === 0 ? (
                     <div className="text-center py-12 flex flex-col items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-lime/40 mb-3" />
                        <span className="text-sm text-bone font-medium">No disputes match feedback filter</span>
                     </div>
                  ) : (
                     filteredDisputes.map((disp, i) => {
                        const isSelected = disp.id === selectedId;
                        return (
                           <div 
                             key={disp.id}
                             onClick={() => {
                               setSelectedId(disp.id);
                               setMobileViewChat(true);
                             }}
                             className={`cursor-pointer rounded-2 p-3 transition-all text-left flex flex-col gap-2.5 hover:bg-rule-soft duration-200 ${i > 0 ? 'pt-4' : ''} ${isSelected ? 'bg-bg-elev border border-lime/30' : 'border border-transparent'}`}
                           >
                              <div className="flex items-center justify-between">
                                 <span className="text-xs font-mono font-semibold text-lime">{disp.id}</span>
                                 <Chip variant={disp.chipVariant as any} className="text-[10px] uppercase font-bold px-2 py-0.5">
                                    {disp.status}
                                 </Chip>
                              </div>
                              <div>
                                 <div className="font-display font-medium text-cream text-sm leading-snug">
                                    {disp.tradeType} {disp.asset} with {disp.counterparty}
                                 </div>
                                 <div className="text-xs text-bone mt-1 flex justify-between items-center bg-bg-base/40 px-2 py-1.5 rounded">
                                    <span className="font-mono text-cream font-bold">{disp.amount}</span>
                                    <span className="font-mono text-lime/90 font-bold">{disp.fiatAmount}</span>
                                 </div>
                              </div>
                              <div className="flex justify-between items-center text-[10px] text-bone pt-1">
                                 <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-bone" /> {disp.lastUpdated}
                                 </span>
                                 <ChevronRight className="w-4 h-4 text-bone" />
                              </div>
                           </div>
                        );
                     })
                  )}
               </div>

               {/* Guidelines micro card */}
               <div className="mt-4 pt-3 border-t border-rule bg-bg-base/40 p-3 rounded-2 text-xs flex gap-2">
                  <Info className="w-4 h-4 text-lime shrink-0 mt-0.5" />
                  <p className="text-bone leading-normal">
                     Voltex escrow stays active for up to 7 days during dispute reviews. Do not trade outside of the escrow system.
                  </p>
               </div>
            </Card>
         </div>

         {/* RIGHT CHAT WINDOW INTERFACE (Responsive: full height on mobile if active) */}
         <div className={`lg:col-span-8 flex flex-col h-full overflow-hidden ${!mobileViewChat ? 'hidden lg:flex' : 'flex'}`}>
            <Card className="flex flex-col h-full overflow-hidden border-rule bg-bg-paper relative">
               
               {/* Mobile Header containing Back Button & details */}
               <div className="p-4 border-b border-rule bg-bg-elev flex items-center justify-between gap-5">
                  <div className="flex items-center gap-3">
                     <button 
                       onClick={() => setMobileViewChat(false)} 
                       className="lg:hidden p-1 rounded hover:bg-rule text-bone hover:text-cream transition-colors"
                     >
                       <ArrowLeft className="w-5 h-5" />
                     </button>
                     <div>
                        <div className="flex items-center gap-2">
                           <h2 className="font-display font-bold text-cream text-base leading-none">
                              Active Case: {selectedDispute.id}
                           </h2>
                           <Chip variant={selectedDispute.chipVariant as any} className="text-[10px] font-bold py-0 ml-1">
                              {selectedDispute.status}
                           </Chip>
                        </div>
                        <div className="text-xs text-bone mt-1.5 flex flex-wrap items-center gap-1">
                           <span>Associated trade:</span>
                           <span className="font-mono font-medium text-cream">{selectedDispute.tradeId}</span>
                           <span className="text-rule/60 font-normal">|</span>
                           <span>Mediator:</span>
                           <span className="font-medium text-lime">{selectedDispute.staffName}</span>
                        </div>
                     </div>
                  </div>

                  {/* Top-Right action selectors inside active chat */}
                  <div className="flex items-center gap-1.5">
                     {selectedDispute.status !== 'Resolved' && selectedDispute.status !== 'Cancelled' && (
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="h-8 text-xs border-rust/40 text-rust hover:bg-rust/5 font-bold"
                          onClick={() => handleActionClick('cancel')}
                        >
                           Cancel Dispute
                        </Button>
                     )}
                  </div>
               </div>

               {/* Dispute Incident Meta Banner */}
               <div className="bg-bg-base/60 p-3.5 border-b border-rule text-xs flex flex-col sm:flex-row justify-between gap-3 text-bone">
                  <div className="flex-1">
                     <span className="font-bold text-cream block mb-0.5">Dispute Reason:</span>
                     <p className="leading-relaxed text-bone italic">"{selectedDispute.reason}"</p>
                  </div>
                  <div className="sm:text-right shrink-0 bg-bg-elev/50 p-2 rounded border border-rule/50 flex flex-col gap-1 justify-center">
                     <div>Trade Partner: <strong className="text-cream">{selectedDispute.counterparty}</strong></div>
                     <div>Value: <strong className="text-lime">{selectedDispute.fiatAmount}</strong></div>
                  </div>
               </div>

               {/* Active Messages Chat Flow Area */}
               <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-bg-base/25">
                  <div className="text-center py-2">
                     <span className="text-[10px] font-mono font-medium px-2.5 py-1 bg-bg-elev border border-rule/50 rounded-pill text-bone">
                       SECURE DIALOGUE LINK ESTABLISHED UNDER VOLTEX MASTER KEY
                     </span>
                  </div>

                  {selectedDispute.messages.map((msg) => {
                     const isSelf = msg.sender === 'user';
                     const isStaff = msg.sender === 'staff';
                     
                     return (
                        <div 
                          key={msg.id}
                          className={`flex flex-col max-w-[85%] ${isSelf ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                        >
                           {/* Sender Title and Time info */}
                           <div className="flex items-center gap-1.5 mb-1 text-[11px] text-bone px-1">
                              <span className={`font-bold ${isSelf ? 'text-lime' : isStaff ? 'text-[#ff9800]' : 'text-cream'}`}>
                                 {msg.senderName}
                              </span>
                              <span className="opacity-30">/</span>
                              <span>{msg.timestamp}</span>
                           </div>

                           {/* Message Body Block */}
                           <div className={`p-3.5 rounded-2 text-sm leading-relaxed ${
                             isSelf 
                               ? 'bg-lime text-bg-base rounded-tr-none font-medium' 
                               : isStaff 
                               ? 'bg-gradient-to-br from-[#ffa726]/10 to-bg-elev border border-[#f57c00]/30 text-cream rounded-tl-none' 
                               : 'bg-bg-elev border border-rule text-cream rounded-tl-none'
                           }`}>
                              {msg.text}

                              {/* Attachment preview lists inside bubble */}
                              {msg.attachments && (
                                 <div className="mt-3 pt-2.5 border-t border-rule/20 space-y-2">
                                    {msg.attachments.map((file, idx) => (
                                       <div 
                                         key={idx} 
                                         className={`flex items-center justify-between p-2 rounded ${
                                           isSelf ? 'bg-bg-base/10 text-bg-base' : 'bg-bg-base/50 text-cream'
                                         }`}
                                       >
                                          <div className="flex items-center gap-2 overflow-hidden mr-3">
                                             {file.type === 'pdf' ? (
                                                <FileText className="w-5 h-5 shrink-0" />
                                             ) : (
                                                <ImageIcon className="w-5 h-5 shrink-0" />
                                             )}
                                             <div className="truncate text-xs font-semibold">
                                                <div className="truncate font-mono">{file.name}</div>
                                                <div className="text-[10px] opacity-75">{file.size}</div>
                                             </div>
                                          </div>
                                          <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
                                             <CheckCircle className="w-4 h-4 text-green-700" /> Loaded
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              )}
                           </div>
                        </div>
                     );
                  })}

                  {/* Live typing staff indicator */}
                  {isStaffReplying && (
                     <div className="flex flex-col items-start max-w-[80%] mr-auto">
                        <div className="flex items-center gap-1.5 mb-1 text-[11px] text-bone px-1">
                           <span className="font-bold text-[#ffa726]">{selectedDispute.staffName}</span>
                           <span className="opacity-30">/</span>
                           <span className="italic">Typing...</span>
                        </div>
                        <div className="p-3 bg-bg-elev border border-rule rounded-2 rounded-tl-none flex items-center gap-1 ml-1 text-xs text-bone">
                           <RefreshCw className="w-3.5 h-3.5 animate-spin text-lime" /> Mediator reviewing digital verification file...
                        </div>
                     </div>
                  )}
               </div>

               {/* Mock evidence Quick Upload Panel (Brilliant UX sandbox helper) */}
               {selectedDispute.status !== 'Resolved' && selectedDispute.status !== 'Cancelled' && (
                  <div className="px-4 py-2 border-t border-b border-rule bg-bg-base/30 flex flex-wrap gap-2 items-center text-xs">
                     <span className="text-bone font-medium">Quick evidence preset:</span>
                     <button 
                       onClick={() => injectPresetEvidence("GTBank_NGN_Debit_Success.png", "receipt")}
                       className="px-2 py-1 bg-bg-elev border border-rule rounded hover:border-lime hover:text-lime transition-all text-bone"
                     >
                       + Bank Transfer NGN Receipt.png
                     </button>
                     <button 
                       onClick={() => injectPresetEvidence("Scratch_Physical_Amazon_Card.jpg", "card_scratch")}
                       className="px-2 py-1 bg-bg-elev border border-rule rounded hover:border-lime hover:text-lime transition-all text-bone"
                     >
                       + Raw Scratch Card Photo.jpg
                     </button>
                  </div>
               )}

               {/* Chat input form and submit elements */}
               <div className="p-4 border-t border-rule bg-bg-elev">
                  {selectedDispute.status === 'Resolved' || selectedDispute.status === 'Cancelled' ? (
                     <div className="bg-bg-base/50 text-center py-3 rounded-2 text-sm text-bone font-semibold border border-rule/50 flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-lime" /> This dispute is closed. No further communication is permitted.
                     </div>
                  ) : (
                     <div className="flex gap-2.5 items-center relative">
                        {/* Hidden input file connector */}
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileChange}
                          accept="image/*,application/pdf"
                          className="hidden" 
                        />

                        {/* Drag and Drop style click triggers */}
                        <button 
                          onClick={handleFileUploadClick}
                          disabled={isUploading}
                          className="p-3 rounded-2 bg-bg-base border border-rule hover:bg-rule-soft hover:border-lime hover:text-lime text-bone transition-all disabled:opacity-50 shrink-0"
                          title="Upload screenshot evidence"
                        >
                           {isUploading ? (
                              <RefreshCw className="w-5 h-5 animate-spin" />
                           ) : (
                              <Paperclip className="w-5 h-5" />
                           )}
                        </button>

                        {/* Interactive upload indicator slider */}
                        {isUploading && (
                           <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 bg-bg-base rounded px-4 py-2 flex items-center justify-between border border-rule text-xs z-10 animate-pulse">
                              <span className="text-lime flex items-center gap-2 font-semibold">
                                 <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Compiling Evidence Block... ({uploadProgress}%)
                              </span>
                              <div className="w-24 h-1.5 bg-bg-paper rounded overflow-hidden">
                                 <div className="h-full bg-lime transition-all duration-200" style={{ width: `${uploadProgress}%` }}></div>
                              </div>
                           </div>
                        )}

                        <input 
                          type="text" 
                          placeholder="Type details for mediator or counterparty, or describe evidence..." 
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          disabled={isUploading || isStaffReplying}
                          className="flex h-11 w-full rounded-2 bg-bg-base border border-rule px-4 text-sm text-cream transition-colors placeholder:text-char focus-visible:outline-none focus-visible:border-lime disabled:opacity-50"
                        />

                        <Button 
                          onClick={() => handleSendMessage()}
                          disabled={!inputText.trim() || isUploading || isStaffReplying}
                          className="h-11 px-6 shrink-0 font-bold"
                        >
                           <Send className="w-4 h-4" />
                        </Button>
                     </div>
                  )}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
