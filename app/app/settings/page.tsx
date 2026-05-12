'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Palette, 
  Globe, 
  ShieldCheck, 
  CreditCard, 
  Users, 
  Upload,
  Check,
  Layout,
  Mail,
  Save
} from 'lucide-react';
import { useAppContext } from '@/components/context/app-context';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { currentTenant, setCurrentTenant } = useAppContext();
  const [loading, setLoading] = useState(false);

  const handleColorChange = (color: string) => {
    setCurrentTenant({ ...currentTenant, brandColor: color });
    toast.success('Brand color updated', {
      description: 'The change has been applied to the entire dashboard.'
    });
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Settings saved successfully');
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">Settings</h1>
        <p className="text-ink-2">Manage your agency profile, branding, and billing.</p>
      </div>

      <Tabs defaultValue="branding" className="space-y-8">
        <TabsList className="bg-surface border border-border p-1 rounded-2xl h-14 w-full justify-start overflow-x-auto no-scrollbar">
          <TabsTrigger value="general" className="px-6 rounded-xl data-[state=active]:bg-bg data-[state=active]:text-ink text-ink-3 font-bold text-xs uppercase tracking-widest gap-2">
            <Layout className="w-4 h-4" /> General
          </TabsTrigger>
          <TabsTrigger value="branding" className="px-6 rounded-xl data-[state=active]:bg-bg data-[state=active]:text-ink text-ink-3 font-bold text-xs uppercase tracking-widest gap-2">
            <Palette className="w-4 h-4" /> Branding
          </TabsTrigger>
          <TabsTrigger value="roles" className="px-6 rounded-xl data-[state=active]:bg-bg data-[state=active]:text-ink text-ink-3 font-bold text-xs uppercase tracking-widest gap-2">
            <Users className="w-4 h-4" /> Team Roles
          </TabsTrigger>
          <TabsTrigger value="billing" className="px-6 rounded-xl data-[state=active]:bg-bg data-[state=active]:text-ink text-ink-3 font-bold text-xs uppercase tracking-widest gap-2">
            <CreditCard className="w-4 h-4" /> Billing
          </TabsTrigger>
          <TabsTrigger value="api" className="px-6 rounded-xl data-[state=active]:bg-bg data-[state=active]:text-ink text-ink-3 font-bold text-xs uppercase tracking-widest gap-2">
            <Globe className="w-4 h-4" /> API Access
          </TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-8 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-border shadow-subtle overflow-hidden">
                <CardHeader className="border-b border-border p-8 bg-bg/50">
                  <CardTitle className="font-display font-bold">Visual Identity</CardTitle>
                  <CardDescription>Customise how your agency appears to customers and guides.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-10">
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="space-y-4">
                      <label className="text-xs font-bold text-ink-3 uppercase tracking-widest">Agency Logo</label>
                      <div className="flex items-center gap-6">
                        <img src={currentTenant.logo} className="w-20 h-20 rounded-2xl border border-border object-cover" alt="" />
                        <Button variant="outline" className="font-bold border-border shadow-sm h-11 px-6 rounded-xl">
                          <Upload className="w-4 h-4 mr-2" /> Upload New
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4 flex-1">
                      <label className="text-xs font-bold text-ink-3 uppercase tracking-widest">Primary Brand Color</label>
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-2xl border-4 border-white shadow-md ring-1 ring-border"
                          style={{ backgroundColor: currentTenant.brandColor }}
                        />
                        <div className="flex-1">
                          <Input 
                            value={currentTenant.brandColor} 
                            onChange={(e) => setCurrentTenant({ ...currentTenant, brandColor: e.target.value })}
                            className="font-mono font-bold h-11 rounded-xl" 
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {['#0F172A', '#1E3A8A', '#166534', '#E07B39', '#DC2626', '#1E293B'].map(color => (
                          <button 
                            key={color}
                            onClick={() => handleColorChange(color)}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                              currentTenant.brandColor === color ? 'border-accent scale-110 shadow-sm' : 'border-white hover:scale-105'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border">
                    <label className="text-xs font-bold text-ink-3 uppercase tracking-widest">Custom Domain</label>
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <Input placeholder="book.unitedworldtours.eu" className="h-11 pl-4 pr-12 rounded-xl font-medium" />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-success">
                          <Check className="w-4 h-4" />
                        </div>
                      </div>
                      <Button variant="outline" className="font-bold border-border shadow-sm px-6 h-11 rounded-xl">
                        Verify
                      </Button>
                    </div>
                    <p className="text-xs text-ink-3">Must point your CNAME records to <code>ingress.travelecosystem.eu</code></p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border">
                    <label className="text-xs font-bold text-ink-3 uppercase tracking-widest">Email Signature</label>
                    <textarea 
                      className="w-full h-32 p-4 bg-bg border border-border rounded-xl text-sm font-medium focus:ring-2 ring-accent/20 outline-none transition-all resize-none"
                      defaultValue="Kind regards, \nUnited World Tours Team"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Button variant="ghost" className="font-bold text-ink-2 h-12 px-8 rounded-xl">Discard Changes</Button>
                <Button 
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-accent hover:bg-accent/90 text-white font-bold h-12 px-8 rounded-xl shadow-lg gap-2"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-brand text-white border-none shadow-lg overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                    <Layout className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="font-display font-bold">White-label Preview</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <p className="text-sm text-white/70 leading-relaxed mb-8">
                    Your branding will be applied to the booking engine, automated emails, and the traveler mobile app.
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-accent" />
                      <div className="h-2 w-24 bg-white/20 rounded" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-white/10 rounded" />
                      <div className="h-2 w-3/4 bg-white/10 rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-subtle">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent" /> Email Branding
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <p className="text-xs text-ink-2 leading-relaxed mb-6">
                    All outgoing emails will use your brand color for buttons and links, and include your logo in the header.
                  </p>
                  <Button variant="outline" className="w-full text-xs font-bold uppercase tracking-widest h-9 border-border">
                    Preview Email
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
