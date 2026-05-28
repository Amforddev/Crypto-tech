import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Label, Card } from '../components/ui';
import { ArrowLeft, Check, AlertCircle, Eye, EyeOff, Loader2, Mail, ShieldCheck } from 'lucide-react';

function BrandPanel() {
  const testimonials = [
    { text: "Voltex has the deepest liquidity for NGN. I can execute large blocks with minimal slippage and instant settlement.", author: "Kwame O." },
    { text: "Trading gift cards for Naira used to take hours. On Voltex, it's done in under 5 minutes. Game changer.", author: "Amina S." },
    { text: "The lowest fees I've seen across any platform. A true game changer for African traders.", author: "Chinedu M." }
  ];
  
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden lg:flex w-1/2 bg-bg-paper relative items-center justify-center overflow-hidden border-l border-rule">
      {/* Lime accent shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-tint rounded-full blur-[120px] opacity-20" />
      
      <div className="z-10 w-full max-w-lg p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-3xl font-display font-medium leading-relaxed mb-6 text-cream">
              "{testimonials[index].text}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-pill bg-bg-elev border border-rule flex items-center justify-center font-bold text-lime text-xs">
                 {testimonials[index].author[0]}
              </div>
              <div>
                <div className="font-medium text-cream">{testimonials[index].author}</div>
                <div className="text-sm text-bone">Verified Trader</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SplitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-bg-base font-sans">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 relative">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm text-bone hover:text-cream transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <Link to="/" className="lg:hidden absolute top-8 right-8 text-xl font-display font-bold text-lime">
          Voltex.
        </Link>
        <div className="w-full max-w-sm mx-auto">
          <motion.div
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
      <BrandPanel />
    </div>
  );
}

function CenteredLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base px-6 py-12 font-sans relative">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm text-bone hover:text-cream transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <div className="w-full max-w-md">
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export function Signup() {
  const [password, setPassword] = useState('');
  const [showReferral, setShowReferral] = useState(false);
  const navigate = useNavigate();

  const strength = Math.min(100, password.length * 10 + (/[A-Z]/.test(password) ? 20 : 0) + (/[0-9]/.test(password) ? 20 : 0));
  const getStrengthColor = () => {
    if (strength === 0) return 'bg-rule-soft';
    if (strength < 40) return 'bg-bad';
    if (strength < 80) return 'bg-warn';
    return 'bg-good';
  };

  return (
    <SplitLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold mb-2 text-cream">Create an account</h2>
        <p className="text-bone">Join millions of users on Voltex today.</p>
      </div>

      <form className="space-y-4" onSubmit={e => { e.preventDefault(); navigate('/verify-email'); }}>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Full Name</Label>
            <Input type="text" placeholder="Adaeze Okonkwo" required />
          </div>

          <div className="space-y-1.5">
            <Label>Email Address</Label>
            <Input type="email" placeholder="adaeze@example.com" required />
          </div>

          <div className="space-y-1.5">
            <Label>Phone Number</Label>
            <div className="flex gap-2">
              <select className="bg-bg-high border border-rule rounded-2 px-3 text-sm text-cream shrink-0 focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-colors h-11">
                <option>+234</option>
                <option>+233</option>
                <option>+254</option>
              </select>
              <Input type="tel" placeholder="801 234 5678" className="flex-1" required />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Password</Label>
            <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {password && (
              <div className="pt-1">
                <div className="h-1 w-full bg-rule-strong rounded-pill overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: `${Math.max(10, strength)}%` }} />
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label className="mb-0">Country</Label>
            </div>
            <select className="w-full bg-bg-high border border-rule rounded-2 px-3 text-sm text-cream focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-colors h-11">
              <option>Nigeria</option>
              <option>Ghana</option>
              <option>Kenya</option>
            </select>
          </div>

          <div className="pt-2">
            {!showReferral ? (
              <button type="button" onClick={() => setShowReferral(true)} className="text-sm text-lime hover:text-lime-soft font-medium transition-colors">
                + Add referral code (optional)
              </button>
            ) : (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                 <Label>Referral Code</Label>
                 <Input type="text" placeholder="Enter code" />
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3 pt-3 pb-2">
          <div className="pt-0.5">
            <input type="checkbox" id="tos" required className="rounded-1 border-rule bg-bg-high text-lime focus:ring-lime w-4 h-4 cursor-pointer" />
          </div>
          <label htmlFor="tos" className="text-sm text-bone leading-normal cursor-pointer select-none">
            I agree to the <a href="#" className="text-cream hover:underline">Terms of Service</a> & <a href="#" className="text-cream hover:underline">Privacy Policy</a>
          </label>
        </div>

        <Button className="w-full h-12 text-base" type="submit">Create account</Button>
      </form>

      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-rule"></div>
        <div className="text-xs text-stone font-medium uppercase tracking-widest">or</div>
        <div className="flex-1 h-px bg-rule"></div>
      </div>

      <div className="space-y-3">
        <Button variant="secondary" className="w-full h-12">Continue with Google</Button>
        <Button variant="secondary" className="w-full h-12">Continue with Apple</Button>
      </div>

      <div className="mt-8 text-center text-sm text-bone">
        Already have an account? <Link to="/login" className="text-cream hover:text-lime transition-colors font-medium">Sign in</Link>
      </div>
    </SplitLayout>
  );
}

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate error then success
    setTimeout(() => {
      setError(true);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <SplitLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold mb-2 text-cream">Welcome back</h2>
        <p className="text-bone">Securely sign in to your Voltex account.</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="bg-bad/10 border border-bad/20 rounded-2 p-3 flex gap-3 text-bad items-start">
               <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
               <div className="text-sm flex-1">
                 <p className="font-medium">Invalid credentials</p>
                 <p className="opacity-80 mt-0.5">The email or password you entered is incorrect.</p>
               </div>
               <button onClick={() => setError(false)} className="opacity-80 hover:opacity-100">×</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <Label>Email or Phone Number</Label>
          <Input type="text" placeholder="Adaeze Okonkwo" className={error ? "border-bad focus-visible:border-bad focus-visible:ring-bad" : ""} required />
        </div>
        
        <div className="space-y-1.5 relative">
          <div className="flex justify-between items-center mb-1.5">
            <Label className="mb-0">Password</Label>
            <Link to="/forgot-password" className="text-sm text-lime hover:text-lime-soft transition-colors font-medium">Forgot?</Link>
          </div>
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className={error ? "border-bad focus-visible:border-bad focus-visible:ring-bad pr-10" : "pr-10"} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-cream">
              {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input type="checkbox" id="remember" className="rounded-1 border-rule bg-bg-high text-lime w-4 h-4 cursor-pointer" />
          <label htmlFor="remember" className="text-sm text-bone select-none cursor-pointer">Remember this device</label>
        </div>

        <div className="pt-2">
          <Button className="w-full h-12 text-base mt-2" type="button" onClick={() => navigate('/app')} disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign in"}
          </Button>
        </div>
      </form>

      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-rule"></div>
        <div className="text-xs text-stone font-medium uppercase tracking-widest">or</div>
        <div className="flex-1 h-px bg-rule"></div>
      </div>

      <div className="space-y-3">
        <Button variant="secondary" className="w-full h-12">Continue with Google</Button>
        <Button variant="secondary" className="w-full h-12">Continue with Apple</Button>
      </div>

      <div className="mt-8 text-center text-sm text-bone">
        New here? <Link to="/signup" className="text-cream hover:text-lime transition-colors font-medium">Create an account</Link>
      </div>
    </SplitLayout>
  );
}

export function VerifyEmail() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);
    if (val && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  return (
    <CenteredLayout>
      <Card className="p-8 text-center bg-bg-paper border-rule shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="w-16 h-16 bg-lime-tint rounded-pill flex items-center justify-center mx-auto mb-6 border border-lime-line">
          <Mail className="w-8 h-8 text-lime" />
        </div>
        <h2 className="text-2xl font-display font-bold mb-2 text-cream">Check your email</h2>
        <p className="text-bone text-sm mb-8 leading-relaxed">
          We've sent a 6-digit confirmation code to <br/>
          <span className="font-semibold text-cream">adaeze@example.com</span>.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); navigate('/verify-2fa'); }}>
          <div className="flex justify-center gap-2 sm:gap-3 mb-8">
            {code.map((digit, i) => (
               <input
                 key={i}
                 id={`otp-${i}`}
                 type="text"
                 maxLength={1}
                 value={digit}
                 onChange={(e) => handleChange(i, e.target.value)}
                 onKeyDown={(e) => handleKeyDown(i, e)}
                 className="w-10 sm:w-12 h-14 bg-bg-high border border-rule rounded-2 text-center text-xl font-mono text-cream focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-all"
               />
            ))}
          </div>

          <Button className="w-full h-12 text-base mb-6" type="submit" disabled={code.join('').length < 6}>
            Verify Email
          </Button>
        </form>

        <div className="text-sm font-medium text-bone">
           {timeLeft > 0 ? (
             <span>Resend code in <span className="font-mono text-cream">{timeLeft}s</span></span>
           ) : (
             <button className="text-lime hover:text-lime-soft transition-colors" onClick={() => setTimeLeft(60)}>Resend code now</button>
           )}
        </div>
      </Card>
    </CenteredLayout>
  )
}

export function Verify2FA() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  return (
    <CenteredLayout>
      <Card className="p-8 text-center bg-bg-paper border-rule shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="w-16 h-16 bg-lime-tint rounded-pill flex items-center justify-center mx-auto mb-6 border border-lime-line">
          <ShieldCheck className="w-8 h-8 text-lime" />
        </div>
        <h2 className="text-2xl font-display font-bold mb-2 text-cream">Verify it's you</h2>
        <p className="text-bone text-sm mb-8 leading-relaxed">
          Enter the 6-digit code from your authenticator app.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); navigate('/app'); }}>
          <div className="space-y-4 mb-8">
            <Input 
              type="text" 
              placeholder="000 000" 
              className="text-center text-2xl font-mono tracking-widest h-14 pb-2 pt-2" 
              maxLength={6} 
              value={code} 
              onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
              required
            />
          </div>

          <Button className="w-full h-12 text-base mb-6" type="submit" disabled={code.length !== 6}>
            Verify
          </Button>
        </form>

        <div className="space-y-2 text-sm font-medium">
           <div><button className="text-lime hover:text-lime-soft transition-colors text-sm">Use SMS code instead</button></div>
           <div><button className="text-stone hover:text-cream transition-colors text-sm">Use a backup code</button></div>
        </div>
      </Card>
    </CenteredLayout>
  )
}

export function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const strength = Math.min(100, password.length * 10 + (/[A-Z]/.test(password) ? 20 : 0) + (/[0-9]/.test(password) ? 20 : 0));
  const getStrengthColor = () => {
    if (strength === 0) return 'bg-rule-soft';
    if (strength < 40) return 'bg-bad';
    if (strength < 80) return 'bg-warn';
    return 'bg-good';
  };

  return (
    <CenteredLayout>
      <Card className="p-8 text-center bg-bg-paper border-rule shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
        {step === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-bg-paper flex flex-col justify-center items-center p-8 z-10">
            <div className="w-16 h-16 bg-good/20 border border-good/30 rounded-pill flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-good" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-2 text-cream">Password reset</h2>
            <p className="text-bone text-sm mb-8 max-w-xs">Your password has been successfully updated. You can now sign in.</p>
            <Button className="w-full h-12" onClick={() => navigate('/login')}>Go to login</Button>
          </motion.div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold mb-2 text-cream">Reset password</h2>
          <p className="text-bone text-sm">
            {step === 1 && "Enter your email to receive a reset code."}
            {step === 2 && "We sent a 6-digit code to adaeze@example.com."}
            {step === 3 && "Create a new strong password."}
          </p>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="text-left space-y-6">
            <div className="space-y-1.5">
              <Label>Email Address</Label>
              <Input type="email" placeholder="adaeze@example.com" required />
            </div>
            <div className="pt-2">
              <Button className="w-full h-12" type="submit">Send reset code</Button>
            </div>
            <div className="text-center"><Link to="/login" className="text-sm font-medium text-bone hover:text-cream">Cancel</Link></div>
          </form>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-6 text-left">
            <div className="space-y-1.5">
              <Label className="text-center w-full mb-3">Verification Code</Label>
              <Input type="text" placeholder="000 000" className="font-mono text-center tracking-widest text-2xl h-14" required maxLength={6} />
            </div>
            <div className="pt-2">
              <Button className="w-full h-12" type="submit">Verify code</Button>
            </div>
            <div className="text-center"><button type="button" onClick={() => setStep(1)} className="text-sm font-medium text-bone hover:text-cream transition-colors">Back</button></div>
          </form>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(4); }} className="space-y-6 text-left">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>New Password</Label>
                <Input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                {password && (
                  <div className="pt-1">
                    <div className="h-1 w-full bg-rule-strong rounded-pill overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: `${Math.max(10, strength)}%` }} />
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label>Confirm Password</Label>
                <Input type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required 
                  className={confirmPassword && password !== confirmPassword ? "border-bad focus-visible:ring-bad" : ""}
                />
              </div>
            </div>
            <div className="pt-2">
              <Button className="w-full h-12" type="submit" disabled={!password || password !== confirmPassword}>Reset password</Button>
            </div>
          </form>
        )}

      </Card>
    </CenteredLayout>
  )
}
