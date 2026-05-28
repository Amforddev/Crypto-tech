import React, { useState } from 'react';
import { Card, Button, Input, Label } from '../components/ui';
import { User, Shield, Bell, CreditCard, Smartphone, Check, Lock, ChevronRight } from 'lucide-react';

export default function Settings() {
  const [tab, setTab] = useState('profile');

  return (
    <div className="max-w-5xl mx-auto pb-24 lg:pb-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-cream">Settings</h1>
          <p className="text-bone text-sm mt-1">Manage your account preferences and security.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
         {/* Navigation */}
         <div className="w-full md:w-64 shrink-0 space-y-1">
            <button onClick={() => setTab('profile')} className={`w-full flex items-center gap-3 p-3 rounded-2 text-sm font-medium transition-colors ${tab === 'profile' ? 'bg-rule text-cream' : 'text-bone hover:bg-rule-soft hover:text-cream'}`}>
               <User className="w-4 h-4" /> Profile
            </button>
            <button onClick={() => setTab('security')} className={`w-full flex items-center gap-3 p-3 rounded-2 text-sm font-medium transition-colors ${tab === 'security' ? 'bg-rule text-cream' : 'text-bone hover:bg-rule-soft hover:text-cream'}`}>
               <Shield className="w-4 h-4" /> Security
            </button>
            <button onClick={() => setTab('payment')} className={`w-full flex items-center gap-3 p-3 rounded-2 text-sm font-medium transition-colors ${tab === 'payment' ? 'bg-rule text-cream' : 'text-bone hover:bg-rule-soft hover:text-cream'}`}>
               <CreditCard className="w-4 h-4" /> Payment Methods
            </button>
            <button onClick={() => setTab('notifications')} className={`w-full flex items-center gap-3 p-3 rounded-2 text-sm font-medium transition-colors ${tab === 'notifications' ? 'bg-rule text-cream' : 'text-bone hover:bg-rule-soft hover:text-cream'}`}>
               <Bell className="w-4 h-4" /> Notifications
            </button>
         </div>

         {/* Content */}
         <div className="flex-1 space-y-6">
            {tab === 'profile' && (
               <Card className="p-6 space-y-6">
                  <div>
                     <h3 className="text-lg font-bold text-cream mb-4">Personal Information</h3>
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 rounded-full bg-lime/10 text-lime flex items-center justify-center text-2xl font-bold uppercase">
                           AD
                        </div>
                        <div>
                           <Button variant="secondary" size="sm">Change Avatar</Button>
                           <p className="text-xs text-bone mt-2">JPG, GIF or PNG. Max size of 800K</p>
                        </div>
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label>First Name</Label>
                           <Input defaultValue="Adaeze" />
                        </div>
                        <div className="space-y-2">
                           <Label>Last Name</Label>
                           <Input defaultValue="Doe" />
                        </div>
                        <div className="space-y-2">
                           <Label>Email Address</Label>
                           <Input defaultValue="adaeze@example.com" disabled />
                        </div>
                        <div className="space-y-2">
                           <Label>Phone Number</Label>
                           <Input defaultValue="+234 800 000 0000" disabled />
                        </div>
                     </div>
                  </div>
                  <div className="pt-6 border-t border-rule-soft">
                     <Button>Save Changes</Button>
                  </div>
               </Card>
            )}

            {tab === 'security' && (
               <div className="space-y-6">
                  <Card className="p-6 space-y-6">
                     <div>
                        <h3 className="text-lg font-bold text-cream mb-4">Two-Factor Authentication (2FA)</h3>
                        <p className="text-sm text-bone mb-4">Protect your account with an extra layer of security. Once configured you'll be required to enter both your password and an authentication code from your mobile phone in order to sign in.</p>
                        
                        <div className="flex items-center justify-between p-4 border border-lime/30 bg-lime/5 rounded-3">
                           <div className="flex items-center gap-3">
                              <Smartphone className="w-6 h-6 text-lime" />
                              <div>
                                 <div className="font-bold text-cream">Authenticator App</div>
                                 <div className="text-xs text-good flex items-center gap-1"><Check className="w-3 h-3" /> Enabled</div>
                              </div>
                           </div>
                           <Button variant="secondary" size="sm">Configure</Button>
                        </div>
                     </div>
                  </Card>
                  
                  <Card className="p-6 space-y-6">
                     <div>
                        <h3 className="text-lg font-bold text-cream mb-4">Change Password</h3>
                        <div className="space-y-4 max-w-md">
                           <div className="space-y-2">
                              <Label>Current Password</Label>
                              <Input type="password" />
                           </div>
                           <div className="space-y-2">
                              <Label>New Password</Label>
                              <Input type="password" />
                           </div>
                           <div className="space-y-2">
                              <Label>Confirm New Password</Label>
                              <Input type="password" />
                           </div>
                           <Button>Update Password</Button>
                        </div>
                     </div>
                  </Card>
               </div>
            )}

            {tab === 'payment' && (
               <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="text-lg font-bold text-cream">Bank Accounts</h3>
                     <Button size="sm">Add Account</Button>
                  </div>
                  
                  <div className="space-y-3">
                     <div className="p-4 border border-rule rounded-3 bg-bg-base flex justify-between items-center">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-pill bg-[#008751]/10 flex items-center justify-center border border-[#008751]/20">
                              <div className="w-6 h-4 bg-white rounded-sm border border-rule relative overflow-hidden">
                                 <div className="absolute inset-y-0 left-0 w-2 bg-[#008751]"></div>
                                 <div className="absolute inset-y-0 right-0 w-2 bg-[#008751]"></div>
                              </div>
                           </div>
                           <div>
                              <div className="font-bold text-cream">Guaranty Trust Bank</div>
                              <div className="text-sm text-bone">****4920</div>
                           </div>
                        </div>
                        <Button variant="secondary" size="sm">Remove</Button>
                     </div>
                  </div>
               </Card>
            )}

            {tab === 'notifications' && (
               <Card className="p-6 space-y-6">
                  <h3 className="text-lg font-bold text-cream mb-4">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                     <div className="flex items-start justify-between border-b border-rule-soft pb-4">
                        <div>
                           <div className="font-bold text-cream">Trade Updates</div>
                           <div className="text-sm text-bone">Receive notifications when your trades complete or change status.</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-rule rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime"></div>
                        </label>
                     </div>
                     <div className="flex items-start justify-between border-b border-rule-soft pb-4">
                        <div>
                           <div className="font-bold text-cream">Security Alerts</div>
                           <div className="text-sm text-bone">Get notified of suspicious logins or changes to your account security.</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked disabled />
                          <div className="w-11 h-6 bg-lime rounded-full opacity-70 after:content-[''] after:absolute after:top-[2px] after:left-[calc(100%-22px)] after:bg-white after:rounded-full after:h-5 after:w-5"></div>
                        </label>
                     </div>
                     <div className="flex items-start justify-between">
                        <div>
                           <div className="font-bold text-cream">Marketing Emails</div>
                           <div className="text-sm text-bone">Receive newsletters, promotions, and feature announcements.</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-rule rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime"></div>
                        </label>
                     </div>
                  </div>
               </Card>
            )}
         </div>
      </div>
    </div>
  )
}
